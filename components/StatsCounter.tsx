"use client";

import { motion } from "framer-motion";

export default function StatsCounter() {
  const stats = [
    {
      value: "15+",
      label: "Projects Built",
      subtext: "Web, AI & Robotics",
    },
    {
      value: "06+",
      label: "Tech Stacks in Use",
      subtext: "Languages & Frameworks",
    },
    {
      value: "5+",
      label: "Production Builds",
      subtext: "Deployed & Running",
    },
    {
      // TODO: Replace with Udit's live GitHub contribution streak or custom metric
      value: "100%",
      label: "Always Shipping",
      subtext: "End-to-end builds",
    },
  ];

  return (
    <div className="relative bg-black/40 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 border-y md:border-y-0 md:border-l border-white/[0.06]">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden flex flex-col items-center justify-center text-center gap-1.5 md:gap-2 py-10 md:py-16 px-4 md:px-8 border-r border-b border-white/[0.06] hover:bg-white/[0.015] transition-colors"
            >
              {/* Ambient Hover Spotlight */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,240,255,0.08),transparent)]" />
              
              {/* Bottom Glowing Accent Line */}
              <span className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              {/* Number Value */}
              <span className="text-4xl sm:text-5xl md:text-[5rem] font-black leading-none tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                {stat.value}
              </span>

              {/* Stat Label */}
              <span className="text-[8px] md:text-[10px] font-mono tracking-[0.25em] uppercase text-white/50 group-hover:text-white/80 transition-colors mt-1">
                {stat.label}
              </span>

              {/* Sub-label */}
              <span className="text-[8px] font-mono text-white/30 hidden sm:block">
                {stat.subtext}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
