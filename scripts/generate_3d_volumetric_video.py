import os
import math
import numpy as np
import cv2

def create_cinematic_3d_rotation():
    src_path = r'f:\udit pandey\antiortfolio\public\udit-portrait.jpg'
    out_dir = r'f:\udit pandey\antiortfolio\public\frames\hero-sequence'
    video_out = r'f:\udit pandey\antiortfolio\public\hero-rotation.mp4'
    os.makedirs(out_dir, exist_ok=True)

    img = cv2.imread(src_path)
    if img is None:
        raise FileNotFoundError(f"Cannot load image at {src_path}")

    h, w = img.shape[:2]
    print(f"Source image loaded: {w}x{h}")

    # Step 1: Build anatomical 3D depth map Z(x, y)
    # Head and face center
    cx_head = w * 0.50
    cy_head = h * 0.40
    rx_head = w * 0.26
    ry_head = h * 0.22

    # Grid coordinates
    y_indices, x_indices = np.indices((h, w), dtype=np.float32)

    # Ellipsoidal head depth model
    dx = (x_indices - cx_head) / rx_head
    dy = (y_indices - cy_head) / ry_head
    dist_sq = dx**2 + dy**2
    head_mask = np.clip(1.0 - dist_sq, 0.0, 1.0)
    z_head = np.sqrt(head_mask) * 85.0  # Max depth 85 units

    # Nose protrusion ridge
    dx_nose = (x_indices - cx_head) / (w * 0.06)
    dy_nose = (y_indices - (cy_head + h * 0.02)) / (h * 0.07)
    nose_dist = dx_nose**2 + dy_nose**2
    z_nose = np.clip(1.0 - nose_dist, 0.0, 1.0) * 35.0

    # Torso and shoulders depth (lower half, further back than face but in front of background)
    torso_mask = np.clip((y_indices - cy_head) / (h * 0.35), 0.0, 1.0)
    torso_width_mask = np.clip(1.0 - np.abs(x_indices - cx_head) / (w * 0.45), 0.0, 1.0)
    z_torso = torso_mask * torso_width_mask * 40.0

    # Combined composite depth map
    depth_map = np.maximum(z_head + z_nose, z_torso)

    # Smooth the depth map with Gaussian blur for fluid, organic warping
    depth_map = cv2.GaussianBlur(depth_map, (71, 71), 25.0)

    # Normalize depth for displacement
    depth_norm = depth_map / np.max(depth_map)

    # Compute surface normals for dynamic 3D lighting
    dz_dy, dz_dx = np.gradient(depth_map)
    # Normal vector components (-dz_dx, -dz_dy, 1)
    norm_len = np.sqrt(dz_dx**2 + dz_dy**2 + 1.0)
    normal_x = -dz_dx / norm_len
    normal_y = -dz_dy / norm_len
    normal_z = 1.0 / norm_len

    # Sequence parameters
    total_frames = 84
    fps = 30
    print(f"Generating {total_frames} cinematic 3D volumetric rotation frames...")

    # Video writer setup
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(video_out, fourcc, fps, (w, h))

    for i in range(total_frames):
        # Progress u: 0.0 -> 1.0
        u = i / (total_frames - 1)

        # Smooth orbital rotation curve (eased sine trajectory)
        # From left perspective (-14 deg) through center (0 deg) to right perspective (+14 deg)
        # Or a complete continuous orbital swing: turning head left, facing forward, turning right
        rot_angle_deg = -15.0 * math.cos(u * math.pi)
        rot_rad = math.radians(rot_angle_deg)

        # Orbital pitch tilt (subtle chin elevation / breathing)
        pitch_deg = 2.0 * math.sin(u * math.pi * 2.0)
        pitch_rad = math.radians(pitch_deg)

        # Camera dolly zoom factor (slight dramatic push-in during scroll)
        zoom = 1.02 + 0.06 * math.sin(u * math.pi)

        # Inverse warping grid for cv2.remap
        # Parallax displacement is proportional to depth Z:
        # Foreground pixels shift more than background pixels!
        disp_x = depth_norm * (math.sin(rot_rad) * 45.0)
        disp_y = depth_norm * (math.sin(pitch_rad) * 20.0)

        # Perspective zoom around center
        scaled_x = (x_indices - cx_head) / zoom + cx_head
        scaled_y = (y_indices - cy_head) / zoom + cy_head

        # Final source map coordinates
        map_x = (scaled_x - disp_x).astype(np.float32)
        map_y = (scaled_y - disp_y).astype(np.float32)

        # High-fidelity cubic texture remapping
        warped = cv2.remap(
            img,
            map_x,
            map_y,
            interpolation=cv2.INTER_CUBIC,
            borderMode=cv2.BORDER_REFLECT_101
        )

        # Dynamic 3D Volumetric Lighting Sweep:
        # Light source moves from top-left to top-right as the camera orbits
        light_angle = math.radians(-30.0 + 60.0 * u)
        lx = math.sin(light_angle)
        ly = -0.3
        lz = math.cos(light_angle)
        l_len = math.sqrt(lx**2 + ly**2 + lz**2)
        lx, ly, lz = lx/l_len, ly/l_len, lz/l_len

        # Diffuse dot product (N . L)
        dot_nl = np.clip(normal_x * lx + normal_y * ly + normal_z * lz, 0.0, 1.0)
        specular = np.power(dot_nl, 12.0) * 0.18  # Soft specular sheen

        # Apply subtle lighting adjustment (warm key + cyan rim)
        light_layer = np.zeros_like(warped, dtype=np.float32)
        # Warm highlight on face
        light_layer[:, :, 2] += (dot_nl * depth_norm * 28.0) # Red
        light_layer[:, :, 1] += (dot_nl * depth_norm * 20.0) # Green
        # Cool cyan rim on opposite edge
        cyan_rim = np.clip(-normal_x * lx, 0.0, 1.0) * depth_norm
        light_layer[:, :, 0] += (cyan_rim * 35.0) # Blue
        light_layer[:, :, 1] += (cyan_rim * 25.0) # Green

        # Add specular sheen
        light_layer += (specular[:, :, None] * depth_norm[:, :, None] * 255.0)

        # Blend lighting
        rendered_f = np.clip(warped.astype(np.float32) + light_layer, 0, 255)
        rendered = rendered_f.astype(np.uint8)

        # Filmic contrast and vibrant color curve
        # Enhance colors slightly without clipping
        hsv = cv2.cvtColor(rendered, cv2.COLOR_BGR2HSV).astype(np.float32)
        hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.08, 0, 255) # 8% more saturation
        hsv[:, :, 2] = np.clip(hsv[:, :, 2] * 1.03, 0, 255) # 3% brighter value
        final_bgr = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

        # Write to video
        writer.write(final_bgr)

        # Save as high quality WebP frame
        frame_filename = f"frame_{i+1:03d}.webp"
        frame_path = os.path.join(out_dir, frame_filename)
        cv2.imwrite(frame_path, final_bgr, [cv2.IMWRITE_WEBP_QUALITY, 86])

    writer.release()
    print(f"Successfully generated {total_frames} frames in {out_dir}")
    print(f"Successfully generated video at {video_out}")

if __name__ == '__main__':
    create_cinematic_3d_rotation()
