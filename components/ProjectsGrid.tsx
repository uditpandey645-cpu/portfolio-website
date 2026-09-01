"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Bot, Eye, Radio, Sparkles } from "lucide-react";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  link?: string;
  isLive: boolean;
  tags: string[];
  gradient: string;
  highlightIcon: React.ComponentType<{ className?: string }>;
  image?: string;
}

export default function ProjectsGrid() {

  const projects: Project[] = [
    {
      number: "01",
      title: "ResqLink",
      category: "Emergency Response / Technology",
      description:
        "A technology-driven emergency and disaster response platform focused on assisting individuals during critical situations through instantaneous emergency communication, real-time alerts, and coordinated incident relief.",
      link: "https://resqlinkref.vercel.app/",
      isLive: true,
      tags: ["Emergency Tech", "Real-Time Alerts", "Next.js", "Coordination API"],
      gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
      highlightIcon: Radio,
      image: "/projects/resqlink.jpg",
    },
    {
      number: "02",
      title: "PresentX",
      category: "AI / Face Recognition / Attendance",
      description:
        "An intelligent automated attendance management system powered by deep learning facial recognition algorithms, delivering contactless biometric verification and real-time attendance logs.",
      link: "https://presen-x.vercel.app/",
      isLive: true,
      tags: ["Computer Vision", "Facial Recognition", "Python AI", "Automation"],
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      highlightIcon: Eye,
      image: "/projects/presentx.jpg",
    },
    {
      number: "03",
      title: "Gestyxra",
      category: "Gesture Interaction / 3D",
      description:
        "An innovative gesture-driven spatial computing and 3D modeling interface enabling intuitive hands-free interaction with three-dimensional meshes and viewport manipulation.",
      link: "https://gestyxra.vercel.app/",
      isLive: true,
      tags: ["Gesture Recognition", "3D Graphics", "Spatial Interaction", "WebXR"],
      gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
      highlightIcon: Sparkles,
      image: "/projects/gestyxra.jpg",
    },
    {
      number: "04",
      title: "Robotic Helmet Prototype",
      category: "Robotics / Embedded Systems / Hardware",
      description:
        "A voice-controlled robotic helmet featuring motorized servo kinematics for automated faceplate actuation, low-latency hands-free voice command recognition, and illuminated optical telemetry.",
      // TODO: Replace with video showcase or documentation link when available
      link: undefined,
      isLive: false,
      tags: ["Robotics", "Microcontrollers", "Servo Kinematics", "Voice Recognition", "Embedded Systems"],
      gradient: "from-amber-500/20 via-red-500/10 to-transparent",
      highlightIcon: Bot,
      image: "/robotic-helmet-crop.jpg",
    },
  ];

  return (
    <section id="work" className="relative w-full bg-[#060608] text-white py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Background stippled effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-cyan-400 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-cyan-400/60" />
              03 — Selected Work
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              FEATURED BUILDS
            </h2>
          </div>
          <span className="font-mono text-xs text-white/40 text-left md:text-right max-w-xs leading-relaxed">
            Production web platforms, intelligent neural systems, and custom embedded robotics.
          </span>
        </div>

        {/* 2x2 Grid of Project Cards (matching yashships.live) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20 mb-24">
          {projects.map((project, idx) => {
            const Icon = project.highlightIcon;
            return (
              <motion.div
                key={project.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group relative flex flex-col"
              >
                {/* Project Visual Cover Window */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                      <div className="absolute bottom-5 left-5 z-10">
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-400 font-bold">
                          {project.category}
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight drop-shadow-md">
                          {project.title}
                        </h4>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Stylized Ambient Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-75 transition-opacity duration-700`}
                      />

                      {/* Graphical Center Graphic */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-500 shadow-xl">
                          <Icon className="w-8 h-8 text-cyan-400" />
                        </div>
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/50">
                          {project.category}
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
                          {project.title}
                        </h4>
                      </div>
                    </>
                  )}

                  {/* Live Status Pill */}
                  <div className="absolute top-4 right-4 z-20">
                    {project.isLive ? (
                      <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-emerald-500/40 text-[9px] font-mono tracking-wider text-emerald-400 uppercase backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE PROJECT
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/40 text-[9px] font-mono tracking-wider text-amber-400 uppercase backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        HARDWARE BUILD
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Information Meta */}
                <div className="mt-6 flex flex-col gap-3">
                  {/* Number line */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-bold text-cyan-400">
                      {project.number}
                    </span>
                    <div className="h-[1px] flex-1 bg-white/[0.1] group-hover:bg-cyan-400/40 transition-colors" />
                    <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider">
                      {project.category.split("/")[0].trim()}
                    </span>
                  </div>

                  {/* Title & Action Link */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm font-light leading-relaxed mt-2 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {project.isLive && project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-11 h-11 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-black hover:bg-cyan-400 hover:border-cyan-400 transition-all duration-300 shadow-md group-hover:scale-105 cursor-pointer"
                        data-cursor-text="VISIT"
                        aria-label={`Open ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
