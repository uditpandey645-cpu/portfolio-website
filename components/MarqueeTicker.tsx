"use client";

interface MarqueeTickerProps {
  reverse?: boolean;
  items?: string[];
}

const DEFAULT_ITEMS = [
  "FULL STACK",
  "NEXT.JS 14",
  "PYTHON",
  "NUMPY & PANDAS",
  "SCIKIT-LEARN",
  "MACHINE LEARNING",
  "FACIAL RECOGNITION",
  "ROBOTICS & EMBEDDED",
  "ESP32",
  "TAILWIND CSS",
  "TYPESCRIPT",
  "COMPUTER VISION",
  "REACT.JS",
  "GESTURE 3D",
  "EMERGENCY TECH",
];

export default function MarqueeTicker({
  reverse = false,
  items = DEFAULT_ITEMS,
}: MarqueeTickerProps) {
  // Duplicate array multiple times for smooth continuous loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-4 relative border-y border-white/[0.08] bg-white/[0.015]">
      {/* Left & Right Soft Fade Masks */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-black via-black/80 to-transparent" />

      {/* Ticker Track */}
      <div
        className={`inline-flex items-center gap-6 select-none ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {duplicatedItems.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-6">
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase font-bold text-white/60 hover:text-cyan-400 transition-colors">
              {item}
            </span>
            <span className="text-cyan-400/50 text-xs select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
