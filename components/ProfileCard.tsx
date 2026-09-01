"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { Github } from "@/components/BrandIcons";

export default function ProfileCard() {
  const [terminalCommand, setTerminalCommand] = useState(0);
  const commands = [
    { cmd: "whoami", res: "Udit Pandey — CS Engineering Student · Full Stack & AI Builder" },
    { cmd: "cat education.json", res: '{\n  "degree": "B.Tech Computer Science Engineering",\n  "institution": "ITM Gwalior",\n  "batch": "2025 – 2029",\n  "status": "In Progress"\n}' },
    { cmd: "cat interests.txt", res: "Artificial Intelligence · Machine Learning · Robotics · Web Systems" },
    { cmd: "run robotics-telemetry --status", res: "Microcontroller Core Online · Servo Kinematics Initialized · Voice Protocol Ready" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalCommand((prev) => (prev + 1) % commands.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [commands.length]);

  return (
    <section id="about" className="relative w-full text-white bg-[#050508] py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting and stippled grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-cyan-400/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Label: 01 — Profile */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-12 flex items-center gap-4 text-cyan-400"
        >
          <span className="w-10 h-px bg-cyan-400/60 inline-block" />
          01 — Profile
        </motion.p>

        {/* Top Grid: Title & Bio on Left, Interactive Terminal on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Title & Bio */}
          <div>
            <div className="relative">
              {/* Background ghost number */}
              <div className="pointer-events-none select-none absolute -right-4 -top-12 text-[20vw] lg:text-[12rem] font-black leading-none tracking-tighter text-white/[0.02]">
                01
              </div>

              {/* Main Headline */}
              <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[0.88] tracking-tight relative z-10 drop-shadow-2xl">
                <span>FULL STACK</span>
                <br />
                <span className="relative inline-flex items-baseline text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-cyan-200">
                  &amp; AI ENGINEER
                  <span className="inline-block w-[3px] ml-2 h-[0.8em] bg-cyan-400 animate-cursor" />
                </span>
              </h2>
            </div>

            {/* Availability Pill */}
            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-emerald-400/90 font-semibold">
                Available for projects &amp; internships
              </span>
            </div>

            {/* Bio Glass Card */}
            <div className="mt-8 max-w-xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <p className="text-sm md:text-base leading-relaxed text-white/75 font-light tracking-wide">
                B.Tech in Computer Science Engineering at{" "}
                <span className="text-white font-semibold">ITM, Gwalior</span>.
                Passionate about bridging intelligent machine learning systems with robust full-stack web platforms and voice-controlled embedded robotics.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-cyan-400 hover:text-white transition-colors duration-300 group cursor-pointer"
                >
                  <span>Get in touch</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-cyan-400/40 group-hover:border-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[9px]">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Console */}
          <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#09090e]/80 backdrop-blur-xl shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-[10px] font-mono text-white/40 tracking-widest flex items-center gap-1">
                    <TerminalIcon className="w-3 h-3 text-cyan-400 inline" /> bash — udit@dev ~
                  </span>
                </div>
                <span className="text-[9px] font-mono text-cyan-400/70 uppercase tracking-widest hidden sm:inline">
                  Interactive Node
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs text-white/80 space-y-4 min-h-[300px] flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <span className="text-cyan-400 font-bold">$ </span>
                    <span className="text-white/90 font-medium">cat manifesto.md</span>
                    <p className="mt-1 text-white/60 text-[11px] leading-relaxed">
                      &gt; Crafting responsive web applications, neural computer vision pipelines, and voice-activated hardware prototypes from scratch.
                    </p>
                  </div>

                  <div className="border-t border-white/[0.05] pt-3">
                    <span className="text-cyan-400 font-bold">$ </span>
                    <span className="text-white/90 font-medium">{commands[terminalCommand].cmd}</span>
                    <pre className="mt-1 text-cyan-300/90 text-[11px] leading-relaxed whitespace-pre-wrap">
                      {commands[terminalCommand].res}
                    </pre>
                  </div>
                </div>

                {/* Blinking input line */}
                <div className="pt-2 border-t border-white/[0.05] flex items-center gap-2 text-white/40 text-[11px]">
                  <span className="text-emerald-400">● ready</span>
                  <span>|</span>
                  <span className="text-cyan-400">$ </span>
                  <span className="text-white/80">npm run build</span>
                  <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card: Live GitHub Activity & Stats Integration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/30 transition-all duration-500 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <Github className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono tracking-widest uppercase text-white/70 font-semibold">
                  GitHub Ecosystem
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                  Active Builder
                </span>
              </div>
            </div>

            <a
              href="https://github.com/uditpandey645-cpu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 bg-white text-black hover:bg-cyan-400 hover:text-black rounded-lg px-5 py-2.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] group/btn cursor-pointer"
              data-cursor-text="GITHUB"
            >
              <span>View GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* GitHub Activity Visual Strip / Card */}
          <div className="rounded-xl border border-white/[0.06] bg-[#09090e]/60 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-left w-full md:w-auto">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                Contribution Profile
              </span>
              <span className="text-xl md:text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
                @uditpandey645-cpu
                <Sparkles className="w-4 h-4 text-cyan-400 inline" />
              </span>
              <p className="text-xs text-white/60 font-mono">
                Full stack platforms, AI models, and robotics repositories in active development.
              </p>
            </div>

            {/* Micro Contribution Grid Representation */}
            <div className="flex flex-col gap-2 items-end w-full md:w-auto">
              <div className="grid grid-cols-12 gap-1.5 p-2 rounded-lg bg-black/40 border border-white/[0.04]">
                {Array.from({ length: 48 }).map((_, i) => {
                  const opacityLevel =
                    i % 7 === 0
                      ? "bg-cyan-400"
                      : i % 4 === 0
                      ? "bg-cyan-400/70"
                      : i % 3 === 0
                      ? "bg-cyan-400/40"
                      : "bg-white/10";
                  return (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-sm ${opacityLevel} transition-all duration-300 hover:scale-125`}
                      title="Active Contribution"
                    />
                  );
                })}
              </div>
              <span className="text-[9px] font-mono text-white/40 tracking-wider">
                Continuous Repository Commit Activity
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
