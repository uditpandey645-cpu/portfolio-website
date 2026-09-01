import os
import cv2
import numpy as np

def process_user_video():
    video_path = r'f:\udit pandey\antiortfolio\scripts\hero video.mp4'
    out_dir = r'f:\udit pandey\antiortfolio\public\frames\hero-sequence'
    clean_video_path = r'f:\udit pandey\antiortfolio\public\hero-revolution.mp4'
    
    os.makedirs(out_dir, exist_ok=True)
    
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    
    print(f"Loaded user video: {w}x{h}, {total_frames} frames, {fps} fps")
    
    # We will extract 120 frames for the 360 scroll sequence
    target_count = 120
    indices = [int(i * (total_frames - 1) / (target_count - 1)) for i in range(target_count)]
    
    # Setup video writer for cleaned full video
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(clean_video_path, fourcc, 24, (w, h))
    
    # Star watermark bounding box: y 560:640, x 1120:1200
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    
    frame_idx = 0
    saved_count = 0
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Clean star in bottom-right corner
        patch = frame[560:640, 1120:1200].copy()
        gray = cv2.cvtColor(patch, cv2.COLOR_BGR2GRAY)
        mask = (gray > 75).astype(np.uint8) * 255
        mask = cv2.dilate(mask, kernel)
        inp = cv2.inpaint(patch, mask, 7, cv2.INPAINT_TELEA)
        frame[560:640, 1120:1200] = inp
        
        # Write to cleaned video
        writer.write(frame)
        
        # If this frame is one of the 120 sequence sample points
        if frame_idx in indices:
            saved_count += 1
            out_filename = f"frame_{saved_count:03d}.webp"
            out_path = os.path.join(out_dir, out_filename)
            cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 86])
            
        frame_idx += 1

    cap.release()
    writer.release()
    print(f"Successfully extracted {saved_count} frames to {out_dir}")
    print(f"Successfully created clean video at {clean_video_path}")

if __name__ == '__main__':
    process_user_video()
