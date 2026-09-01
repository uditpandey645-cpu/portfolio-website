"use client";

import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/BrandIcons";

export default function StillScrollingTeaser() {
  return (
    <div className="border-t border-white/[0.06] bg-[#07070a] py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Headline & Body */}
        <div className="max-w-xl text-left">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-400 uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-cyan-400/60" />
            PLOT TWIST
          </p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.1] mb-6">
            Still Scrolling? <br />
            <span className="text-white/35">There&apos;s more where that came from.</span>
          </h3>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
            These are just the highlighted projects that made the cut for the front page. More builds, neural experiments, robotics prototypes, and open-source contributions live on GitHub.
          </p>
        </div>

        {/* Right: High-Contrast CTA Button */}
        <a
          href="https://github.com/uditpandey645-cpu"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center cursor-pointer select-none shrink-0"
          data-cursor-text="EXPLORE"
        >
          <span className="relative overflow-hidden flex items-center gap-4 bg-white text-black rounded-full px-8 py-5 md:px-10 md:py-6 shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] group-hover:scale-105 border border-white/20">
            {/* Sliding Accent Background */}
            <span className="absolute inset-0 bg-cyan-400 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full" />
            
            <Github className="w-6 h-6 relative z-10 text-black transition-colors" />
            <span className="relative z-10 font-black text-lg md:text-xl uppercase tracking-widest text-black transition-colors duration-300">
              View GitHub
            </span>
            <ArrowUpRight className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-black" />
          </span>
        </a>
      </div>
    </div>
  );
}
