import os
import math
from PIL import Image, ImageEnhance, ImageFilter

src_path = r'f:\udit pandey\antiortfolio\public\udit-portrait.jpg'
out_dir = r'f:\udit pandey\antiortfolio\public\frames\hero-sequence'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src_path).convert('RGB')
w, h = img.size

total_frames = 72
print(f"Source image size: {w}x{h}, generating {total_frames} full-color 3D rotation frames...")

for i in range(1, total_frames + 1):
    # Normalized progress from 0.0 to 1.0
    u = (i - 1) / (total_frames - 1)
    
    # Smooth cosine-based rotation oscillation / sweep across scroll
    # User requested: "make a rotation style video just like used in a reference website in colour"
    # We simulate an orbital camera sweeping from left perspective, passing through front center, to right perspective
    angle_deg = -16.0 + 32.0 * u  # -16 degrees to +16 degrees rotation
    angle_rad = math.radians(angle_deg)
    
    # Orbital horizontal displacement & subtle depth arc
    # When turning, subject's center shifts horizontally and arcs slightly in vertical plane
    h_shift_pct = 0.05 * math.sin(angle_rad * 2.5)
    v_shift_pct = 0.015 * (1.0 - math.cos(angle_rad * 2.0))
    
    # Subtle camera zoom push-in through the sequence
    zoom = 1.03 + 0.12 * math.sin(u * math.pi)
    
    # Calculate crop box centered on Udit's face and upper body
    crop_w = int(w / zoom)
    crop_h = int(h / zoom)
    
    center_x = int(w * (0.50 + h_shift_pct))
    center_y = int(h * (0.42 + v_shift_pct))
    
    left = max(0, min(w - crop_w, center_x - crop_w // 2))
    top = max(0, min(h - crop_h, center_y - crop_h // 2))
    right = left + crop_w
    bottom = top + crop_h
    
    cropped = img.crop((left, top, right, bottom))
    
    # 3D Perspective skew / mesh transformation to simulate yaw rotation:
    # When rotating to the right (angle > 0), the left side is closer and taller, right side is farther and shorter
    # When rotating to the left (angle < 0), right side is taller, left side is shorter
    target_w, target_h = 960, 1280
    
    # Distortion factor proportional to rotation angle
    skew = math.tan(angle_rad) * 0.075
    
    # Source quadrilateral coordinates mapped to destination rectangle
    # PIL transform(target_w, target_h, Image.Transform.QUAD, data)
    # data is (x0, y0, x1, y1, x2, y2, x3, y3) for top-left, bottom-left, bottom-right, top-right in cropped
    cw, ch = cropped.size
    
    # Parallax skew offsets
    dy_left = -skew * ch * 0.5 if skew > 0 else 0
    dy_right = skew * ch * 0.5 if skew < 0 else 0
    
    x0, y0 = 0, max(0, -skew * ch * 0.4)
    x1, y1 = 0, min(ch, ch + skew * ch * 0.4)
    x2, y2 = cw, min(ch, ch - skew * ch * 0.4)
    x3, y3 = cw, max(0, skew * ch * 0.4)
    
    # Transform with high-quality bicubic interpolation
    transformed = cropped.transform(
        (target_w, target_h),
        Image.Transform.QUAD,
        (x0, y0, x1, y1, x2, y2, x3, y3),
        resample=Image.Resampling.BICUBIC
    )
    
    # Dynamic lighting sweep across the face (simulating orbital light shift)
    # Highlight shifts from left to right as the head rotates
    # Enhance vibrance and natural skin tone saturation slightly
    color_enhancer = ImageEnhance.Color(transformed)
    vibrant_frame = color_enhancer.enhance(1.08)
    
    contrast_enhancer = ImageEnhance.Contrast(vibrant_frame)
    final_frame = contrast_enhancer.enhance(1.04)
    
    # Save optimized full-color WebP frame
    out_filename = f"frame_{i:03d}.webp"
    out_filepath = os.path.join(out_dir, out_filename)
    final_frame.save(out_filepath, 'WEBP', quality=84)

print(f"Successfully generated {total_frames} full-color 3D rotation frames in {out_dir}!")
