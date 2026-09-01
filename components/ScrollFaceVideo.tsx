"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * CENTERPIECE FEATURE:
 * Canvas-based Face/Photo Scroll-Scrub Video Player.
 * 
 * Preloads 60 optimized WebP frames from /public/frames/hero-sequence/
 * and uses GSAP ScrollTrigger with scrub: true to advance or reverse
 * the frame sequence synchronously with user scroll.
 * 
 * TODO: Replace with Udit's 60-120 real filmed clip / burst photo sequence
 * when new footage is recorded. Keep filenames as frame_001.webp ... frame_060.webp.
 */

interface ScrollFaceVideoProps {
  containerRef: React.RefObject<HTMLDivElement>;
  totalFrames?: number;
}

export default function ScrollFaceVideo({
  containerRef,
  totalFrames = 120,
}: ScrollFaceVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const currentFrameIndexRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let isMounted = true;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    // Load all frames into memory
    for (let i = 0; i < totalFrames; i++) {
      const frameNum = (i + 1).toString().padStart(3, "0");
      const img = new Image();
      img.src = `/frames/hero-sequence/frame_${frameNum}.webp`;

      img.onload = () => {
        images[i] = img;
        loadedCount++;
        if (loadedCount === totalFrames && isMounted) {
          imagesRef.current = images;
          setFramesLoaded(true);
          renderFrame(0);
        }
      };

      img.onerror = () => {
        console.warn(`Could not load frame ${i + 1}`);
        images[i] = img;
        loadedCount++;
        if (loadedCount === totalFrames && isMounted) {
          imagesRef.current = images;
          setFramesLoaded(true);
        }
      };
    }

    // Function to render an image onto the canvas with object-fit: cover
    const renderFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Handle High DPI displays
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Object-fit: cover math
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    };

    // Resize handler
    const handleResize = () => {
      renderFrame(currentFrameIndexRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [totalFrames]);

  // Set up GSAP ScrollTrigger once frames are ready and container exists
  useEffect(() => {
    if (!framesLoaded || !containerRef.current || !canvasRef.current) return;

    const render = (index: number) => {
      const clampedIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(index)));
      currentFrameIndexRef.current = clampedIndex;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[clampedIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(self.progress * totalFrames)
        );
        render(frameIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [framesLoaded, containerRef, totalFrames]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
      {/* Top & Bottom Vignette Overlays for Maximum Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-10 opacity-70" />

      {/* Primary Video Scrub Canvas (Full Color 3D Rotation) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-95 brightness-100 contrast-105 transform-gpu"
      />

      {/* Cyber Subtle Grid Overlay for AI Vibe */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-10 pointer-events-none" />
    </div>
  );
}
