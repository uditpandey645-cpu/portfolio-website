"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { preloadHeroFrames } from "@/lib/frameLoader";

interface PreloaderProps {
  onComplete: () => void;
}

const QUIPS = [
  "INITIALIZING NEURAL NETWORKS & EMBEDDED SYSTEMS...",
  "CALIBRATING ROBOTIC ACTUATORS & MICROCONTROLLERS...",
  "TRAINING FACIAL RECOGNITION MODELS...",
  "COMPILING FULL STACK APIS & WEBSOCKETS...",
  "Oh wow, another portfolio. Let's make it unforgettable.",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [quipIndex, setQuipIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Cycle quips every 900ms
    const quipInterval = setInterval(() => {
      setQuipIndex((prev) => (prev + 1) % QUIPS.length);
    }, 900);

    // Preload hero frames while ticking progress counter
    let currentDisplayProgress = 0;
    let actualPreloadProgress = 0;

    preloadHeroFrames({
      totalFrames: 120,
      onProgress: (p) => {
        actualPreloadProgress = p;
      },
    }).catch((err) => {
      console.warn("Preload issue, continuing:", err);
      actualPreloadProgress = 100;
    });

    // Smooth ticking timer up to 100
    const progressTimer = setInterval(() => {
      // Advance display progress towards actual preload progress (with min advancement for feel)
      if (currentDisplayProgress < 90) {
        currentDisplayProgress += Math.max(1, Math.floor((actualPreloadProgress - currentDisplayProgress) * 0.25) || 2);
      } else if (actualPreloadProgress >= 100) {
        currentDisplayProgress += 3;
      }

      if (currentDisplayProgress >= 100) {
        currentDisplayProgress = 100;
        setProgress(100);
        clearInterval(progressTimer);
        clearInterval(quipInterval);

        // Curtain reveal trigger
        setTimeout(() => {
          setIsFinished(true);
          onComplete();
          // Remove preloader DOM after curtain animation completes
          setTimeout(() => {
            setIsRemoved(true);
          }, 900);
        }, 350);
      } else {
        setProgress(currentDisplayProgress);
      }
    }, 45);

    return () => {
      clearInterval(quipInterval);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-700 pointer-events-none select-none ${
        isFinished ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Split Curtain */}
      <div
        className="absolute inset-x-0 top-0 bg-[#050507] border-b border-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          height: "51vh",
          transformOrigin: "top",
          transform: isFinished ? "translateY(-101%)" : "translateY(0%)",
        }}
      />

      {/* Bottom Split Curtain */}
      <div
        className="absolute inset-x-0 bottom-0 bg-[#050507] border-t border-white/[0.06] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          height: "51vh",
          transformOrigin: "bottom",
          transform: isFinished ? "translateY(101%)" : "translateY(0%)",
        }}
      />

      {/* Center Anchor Content */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 z-10 transition-all duration-500 ${
          isFinished ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Glowing Anchor Portrait */}
        <div className="relative">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-cyan-400/25 blur-xl rounded-full" />
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 border border-white/20 bg-[#09090e] shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden">
            <Image
              src="/udit-portrait.jpg"
              alt="Udit Pandey"
              fill
              priority
              className="object-cover object-top scale-105"
            />
          </div>
        </div>

        {/* Name Title */}
        <h1 className="font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white leading-none text-center mt-2">
          UDIT<span className="text-cyan-400 animate-pulse">_</span>PANDEY
        </h1>

        {/* Dynamic Status Monospace Quip */}
        <div className="h-6 flex items-center justify-center">
          <p className="font-mono text-[9px] md:text-[11px] tracking-[0.25em] text-white/70 uppercase text-center px-4 max-w-lg transition-all duration-300">
            {QUIPS[quipIndex]}
          </p>
        </div>

        {/* Progress Bar & Counter */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs mt-2">
          <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 shadow-[0_0_12px_#00F0FF] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-white/50 tabular-nums tracking-widest">
            {progress.toString().padStart(3, "0")} %
          </span>
        </div>
      </div>
    </div>
  );
}
