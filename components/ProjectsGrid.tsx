"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Bot,
  Eye,
  Radio,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sliders,
  LayoutGrid,
  Cpu,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  highlights?: string[];
  link?: string;
  isLive: boolean;
  tags: string[];
  gradient: string;
  highlightIcon: React.ComponentType<{ className?: string }>;
  image?: string;
}

export default function ProjectsGrid() {
  const [viewMode, setViewMode] = useState<"slide" | "grid">("slide");
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const projects: Project[] = [
    {
      number: "01",
      title: "AirMouse Drone Simulator",
      category: "Robotics / SLAM / Autonomous Systems",
      description:
        "An autonomous rescue drone project focused on SLAM-based mapping and intelligent disaster-environment perception across simulated post-disaster zones.",
      highlights: [
        "ROS 2 is used as the core robotics middleware for communication, control, and autonomous system integration.",
        "Gazebo provides the simulation environment, while RViz is used for real-time visualization of maps, sensors, and robot state.",
        "LiDAR enables SLAM-based environment mapping, with Raspberry Pi and Pixhawk supporting onboard computation and flight-control integration.",
        "PyTorch and TensorFlow are used for AI-based perception, including survivor detection and intelligent environmental analysis.",
      ],
      link: "https://dronesimulatorup.vercel.app/",
      isLive: true,
      tags: ["ROS 2 Humble", "LiDAR SLAM", "Gazebo 11", "RViz2", "PyTorch / TensorFlow", "Raspberry Pi & Pixhawk"],
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      highlightIcon: Cpu,
      image: "/projects/drone-simulator.png",
    },
    {
      number: "02",
      title: "ResqLink",
      category: "Emergency Response / Technology",
      description:
        "A technology-driven emergency and disaster response platform focused on assisting individuals during critical situations through instantaneous emergency communication, real-time alerts, and coordinated incident relief.",
      highlights: [
        "Sub-second emergency SOS broadcasting and priority dispatch relay.",
        "Real-time location triangulation for localized civilian disaster relief.",
        "High availability architectural failover deployed on Vercel Edge.",
      ],
      link: "https://resqlinkref.vercel.app/",
      isLive: true,
      tags: ["Emergency Tech", "Real-Time Alerts", "Next.js", "Coordination API"],
      gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
      highlightIcon: Radio,
      image: "/projects/resqlink.jpg",
    },
    {
      number: "03",
      title: "PresentX",
      category: "AI / Face Recognition / Attendance",
      description:
        "An intelligent automated attendance management system powered by deep learning facial recognition algorithms, delivering contactless biometric verification and real-time attendance logs.",
      highlights: [
        "Computer vision facial feature extraction and distance threshold matching.",
        "Contactless automated attendance roster logging with zero human touch.",
        "Real-time biometric monitoring dashboard with detailed audit telemetry.",
      ],
      link: "https://presen-x.vercel.app/",
      isLive: true,
      tags: ["Computer Vision", "Facial Recognition", "Python AI", "Automation"],
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      highlightIcon: Eye,
      image: "/projects/presentx.jpg",
    },
    {
      number: "04",
      title: "Gestyxra",
      category: "Gesture Interaction / 3D",
      description:
        "An innovative gesture-driven spatial computing and 3D modeling interface enabling intuitive hands-free interaction with three-dimensional meshes and viewport manipulation.",
      highlights: [
        "Real-time hand tracking and spatial pinch/rotate transformation matrices.",
        "Interactive WebGL 3D mesh rendering and dynamic camera viewport control.",
        "Hands-free spatial interaction interface built for future WebXR devices.",
      ],
      link: "https://gestyxra.vercel.app/",
      isLive: true,
      tags: ["Gesture Recognition", "3D Graphics", "Spatial Interaction", "WebXR"],
      gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
      highlightIcon: Sparkles,
      image: "/projects/gestyxra.jpg",
    },
    {
      number: "05",
      title: "Robotic Helmet Prototype",
      category: "Robotics / Embedded Systems / Hardware",
      description:
        "A voice-controlled robotic helmet featuring motorized servo kinematics for automated faceplate actuation, low-latency hands-free voice command recognition, and illuminated optical telemetry.",
      highlights: [
        "Motorized dual-servo kinematics calibrated for synchronous mechanical actuation cycles.",
        "Embedded offline voice recognition microcontroller for zero-cloud latency.",
        "Integrated status telemetry, optical HUD indicators, and dedicated power distribution.",
      ],
      link: undefined,
      isLive: false,
      tags: ["Robotics", "Microcontrollers", "Servo Kinematics", "Voice Recognition", "Embedded Systems"],
      gradient: "from-amber-500/20 via-red-500/10 to-transparent",
      highlightIcon: Bot,
      image: "/robotic-helmet-crop.jpg",
    },
  ];

  const currentProject = projects[activeSlide];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="work" className="relative w-full bg-[#060608] text-white py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Background stippled effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/[0.08] gap-6">
          <div>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-cyan-400 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-cyan-400/60" />
              03 — Selected Work
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
              FEATURED BUILDS
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="font-mono text-xs text-white/40 max-w-xs leading-relaxed hidden lg:block">
              Production web platforms, intelligent neural systems, and custom embedded robotics.
            </span>

            {/* View Mode Toggle: Slide Showcase vs Grid Matrix */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setViewMode("slide")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  viewMode === "slide"
                    ? "bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.35)]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
                aria-label="Switch to Slide Showcase View"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Slide Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.35)]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
                aria-label="Switch to Grid Matrix View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid Matrix</span>
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- VIEW 1: CINEMATIC SLIDE SHOWCASE ---------------- */}
        {viewMode === "slide" && (
          <div className="relative mb-20">
            {/* Slide Navigation Header Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold">
                  PROJECT {currentProject.number} / 0{projects.length}
                </span>
                <span className="text-white/20">•</span>
                <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                  {currentProject.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-cyan-400 transition-all duration-200"
                  aria-label="Previous Project Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-cyan-400 transition-all duration-200"
                  aria-label="Next Project Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Main Container with Framer Motion AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 rounded-3xl border border-white/10 bg-gradient-to-b from-[#0c0c14] to-[#07070b] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group"
              >
                {/* Ambient glow accent behind card */}
                <div
                  className={`absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br ${currentProject.gradient} opacity-20 blur-3xl pointer-events-none`}
                />

                {/* Left Visual Stage (7 cols on lg) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl group/img">
                    {currentProject.image ? (
                      <>
                        <Image
                          src={currentProject.image}
                          alt={currentProject.title}
                          fill
                          priority
                          className="object-cover object-center scale-100 group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#0d0d14]">
                        <currentProject.highlightIcon className="w-16 h-16 text-cyan-400 mb-4" />
                        <h4 className="text-2xl font-black uppercase text-white tracking-tight">
                          {currentProject.title}
                        </h4>
                      </div>
                    )}

                    {/* Live status badge */}
                    <div className="absolute top-4 right-4 z-20">
                      {currentProject.isLive ? (
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-emerald-500/40 text-[10px] font-mono tracking-wider text-emerald-400 uppercase backdrop-blur-md shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          LIVE SIMULATION & DEPLOYMENT
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-amber-500/40 text-[10px] font-mono tracking-wider text-amber-400 uppercase backdrop-blur-md shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          HARDWARE PROTOTYPE
                        </span>
                      )}
                    </div>

                    {/* Image Footer Caption */}
                    <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
                      <div>
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold block mb-1">
                          {currentProject.category}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight drop-shadow-md">
                          {currentProject.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Quick Selector Bar */}
                  <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4 pt-4 border-t border-white/[0.08]">
                    {projects.map((p, idx) => (
                      <button
                        key={p.number}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`relative rounded-xl p-2 text-left transition-all duration-300 border ${
                          idx === activeSlide
                            ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                            : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        <span className="block font-mono text-[9px] font-bold text-cyan-400">
                          {p.number}
                        </span>
                        <span className="block font-sans text-[11px] font-semibold text-white/80 truncate">
                          {p.title.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Technical Specification & Description Panel (5 cols on lg) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Number Badge & Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs font-bold">
                        BUILD #{currentProject.number}
                      </span>
                      <span className="text-white/40 font-mono text-xs uppercase tracking-wider">
                        {currentProject.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                      {currentProject.title}
                    </h3>

                    {/* Primary Overview Description */}
                    <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed mt-4">
                      {currentProject.description}
                    </p>

                    {/* Architecture & Telemetry Specs Breakdown */}
                    {currentProject.highlights && currentProject.highlights.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-white/[0.08]">
                        <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400 mb-3.5 flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5" />
                          System Architecture & Tech Specs
                        </h4>
                        <div className="space-y-2.5">
                          {currentProject.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/70 leading-relaxed bg-white/[0.02] border border-white/[0.04] rounded-lg p-2.5 hover:border-cyan-400/30 hover:bg-white/[0.04] transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      {currentProject.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link / Launch Button */}
                  <div className="pt-6 border-t border-white/[0.08] flex items-center gap-4">
                    {currentProject.isLive && currentProject.link ? (
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] group/btn"
                      >
                        <span>Launch Live Simulation</span>
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div className="px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/50 font-mono text-xs uppercase tracking-wider">
                        Hardware Lab Prototype
                      </div>
                    )}

                    {currentProject.link && (
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-white/50 hover:text-cyan-400 transition-colors underline underline-offset-4"
                      >
                        {currentProject.link.replace("https://", "").replace("/", "")}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ---------------- VIEW 2: FULL GRID MATRIX ---------------- */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 mb-24">
            {projects.map((project, idx) => {
              const Icon = project.highlightIcon;
              return (
                <motion.div
                  key={project.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0a0a10] p-6 hover:border-cyan-400/40 transition-all duration-500 shadow-xl"
                >
                  {/* Project Visual Cover Window */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#0d0d14] shadow-2xl transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]">
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
                          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold block mb-1">
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
                  <div className="mt-6 flex flex-col gap-3 flex-1 justify-between">
                    <div>
                      {/* Number line */}
                      <div className="flex items-center gap-4 mb-3">
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
                          <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-white/70 text-sm font-light leading-relaxed mt-2">
                            {project.description}
                          </p>
                        </div>

                        {project.isLive && project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 w-11 h-11 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-black hover:bg-cyan-400 hover:border-cyan-400 transition-all duration-300 shadow-md group-hover:scale-105 cursor-pointer"
                            aria-label={`Open ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Architecture Highlights Bullets if present */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
                          {project.highlights.map((item, iIdx) => (
                            <div key={iIdx} className="flex items-start gap-2 text-xs text-white/60">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/[0.06]">
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
        )}
      </div>
    </section>
  );
}
