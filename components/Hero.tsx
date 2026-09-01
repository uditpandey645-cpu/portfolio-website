"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ScrollFaceVideo from "./ScrollFaceVideo";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const statements = [
    {
      number: "01 — Full-Stack · AI & Robotics",
      headlinePrefix: "Udit",
      headlineSuffix: "Pandey",
      isName: true,
      description: "Computer Science Engineering Student · Full Stack & AI Engineer.",
      align: "items-start md:items-end text-left md:text-right",
    },
    {
      number: "02 — Focus",
      headlinePrefix: "Build",
      headlineSuffix: "And Learn",
      isName: false,
      description:
        "I build AI, web, and robotics projects while mastering full-stack development.",
      align: "items-start text-left",
    },
    {
      number: "03 — Curiosity",
      headlinePrefix: "AI-",
      headlineSuffix: "Driven",
      isName: false,
      description:
        "Exploring machine learning, facial recognition, and intelligent systems through hands-on projects.",
      align: "items-start md:items-end text-left md:text-right",
    },
    {
      number: "04 — Craft",
      headlinePrefix: "Detail",
      headlineSuffix: "Focused",
      isName: false,
      description:
        "From scalable web architectures to intelligent algorithms and physical computing — every system is crafted with precision.",
      align: "items-start text-left",
    },
    {
      number: "05 — Momentum",
      headlinePrefix: "Always",
      headlineSuffix: "Shipping",
      isName: false,
      description:
        "Turning ideas into working projects: web platforms, AI tools, and embedded robotics.",
      align: "items-start md:items-end text-left md:text-right",
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {/* Pinned Sticky Face-Scroll Canvas Player */}
      <ScrollFaceVideo containerRef={containerRef} totalFrames={120} />

      {/* Layered Scroll-Revealed Stacked Statements */}
      <div className="relative z-10 w-full -mt-[100vh] pointer-events-none">
        {statements.map((item, index) => (
          <div
            key={index}
            className={`h-screen flex flex-col justify-center px-6 md:px-20 ${
              index === 0 ? "justify-end pb-36 md:pb-24" : ""
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${item.align} max-w-4xl ${
                item.align.includes("items-end") ? "ml-auto" : ""
              }`}
            >
              {/* Numbered Category Header */}
              <span className="font-mono text-[11px] md:text-[13px] tracking-[0.35em] text-cyan-400 uppercase mb-4 md:mb-6 border-l-2 border-cyan-400 pl-3 md:border-none md:pl-0 flex items-center gap-2">
                {item.number}
              </span>

              {/* High-Impact Display Typography */}
              {item.isName ? (
                <h1 className="text-[5.5rem] sm:text-[7rem] md:text-[clamp(4.5rem,13vw,11rem)] tracking-tighter leading-[0.82] text-white flex flex-col items-start md:items-end drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  <span className="font-light italic pr-2 text-white/90">
                    {item.headlinePrefix}
                  </span>
                  <span className="font-black uppercase tracking-tight">
                    {item.headlineSuffix}
                  </span>
                </h1>
              ) : (
                <h2 className="text-[4rem] sm:text-[6rem] md:text-[clamp(3.5rem,9.5vw,7.5rem)] tracking-tighter leading-[0.85] text-white mb-6 flex flex-col drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  <span className="font-light italic pl-1 text-cyan-300">
                    {item.headlinePrefix}
                  </span>
                  <span className="font-black uppercase">
                    {item.headlineSuffix}
                  </span>
                </h2>
              )}

              {/* Supporting Statement Sentence */}
              <p className="text-base sm:text-lg md:text-xl text-white/85 font-medium leading-relaxed max-w-sm md:max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mt-2">
                {item.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
