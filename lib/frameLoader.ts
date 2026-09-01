/**
 * High-performance frame preloader for the Hero Canvas Sequence
 * Preloads all 60 WebP frames into memory and tracks loading percentage
 * 
 * TODO: When Udit provides his 60-120 frame video/burst sequence,
 * drop them into /public/frames/hero-sequence/ as frame_001.webp to frame_060.webp
 */

export interface FramePreloaderOptions {
  totalFrames: number;
  framePrefix?: string;
  frameExtension?: string;
  onProgress?: (progress: number, loadedCount: number) => void;
}

export async function preloadHeroFrames(
  options: FramePreloaderOptions = { totalFrames: 120 }
): Promise<HTMLImageElement[]> {
  const {
    totalFrames = 120,
    framePrefix = "/frames/hero-sequence/frame_",
    frameExtension = ".webp",
    onProgress,
  } = options;

  const images: HTMLImageElement[] = new Array(totalFrames);
  let loadedCount = 0;

  const loadPromises = Array.from({ length: totalFrames }, (_, index) => {
    return new Promise<void>((resolve) => {
      const frameNum = (index + 1).toString().padStart(3, "0");
      const src = `${framePrefix}${frameNum}${frameExtension}`;
      const img = new Image();

      img.onload = () => {
        images[index] = img;
        loadedCount++;
        if (onProgress) {
          onProgress(Math.round((loadedCount / totalFrames) * 100), loadedCount);
        }
        resolve();
      };

      img.onerror = () => {
        // Fallback placeholder or retry
        console.warn(`Failed to load frame: ${src}`);
        images[index] = img;
        loadedCount++;
        if (onProgress) {
          onProgress(Math.round((loadedCount / totalFrames) * 100), loadedCount);
        }
        resolve();
      };

      img.src = src;
    });
  });

  await Promise.all(loadPromises);
  return images;
}
