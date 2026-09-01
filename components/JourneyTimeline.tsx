"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface DossierItem {
  id: string;
  number: string;
  category: string;
  period: string;
  title: string;
  role: string;
  status: string;
  statusColor: string;
  missionCode: string;
  location: string;
  clearance: string;
  objective: string;
  metrics: { label: string; value: string; progress: number }[];
  techStack: string[];
  executionLogs: string[];
  image?: string;
}

export default function JourneyTimeline() {
  const [expandedId, setExpandedId] = useState<string>("01");

  const dossiers: DossierItem[] = [
    {
      id: "01",
      number: "01",
      category: "Academic Degree",
      period: "In Progress [2025 – Present]",
      title: "Institute of Technology & Management (ITM)",
      role: "B.Tech Computer Science Engineering",
      status: "CURRENT MISSION",
      statusColor: "text-cyan-400 bg-cyan-400",
      missionCode: "EDU.INIT // ITM.GWALIOR",
      location: "Gwalior, India",
      clearance: "ACTIVE CANDIDATE",
      objective:
        "Mastering computer science fundamentals, data structures, algorithms, machine learning concepts, and full-stack software architecture.",
      metrics: [
        { label: "Curriculum Mastery", value: "Algorithms & Systems", progress: 85 },
        { label: "Practical Projects Built", value: "4+ Full Builds", progress: 90 },
        { label: "Hands-on Specialization", value: "AI, Web & Robotics", progress: 95 },
      ],
      techStack: ["C", "C++", "Python", "Data Structures", "Web Development", "SQL"],
      executionLogs: [
        "Rigorous coursework in object-oriented programming, systems architecture, and database theory.",
        "Developing real-world platforms and hardware prototypes alongside academic research.",
        "Exploring edge computing, computer vision pipelines, and intelligent robotics interfaces.",
      ],
    },
    {
      id: "02",
      number: "02",
      category: "Robotics & Physical Computing",
      period: "Hardware Build",
      title: "Robotic Helmet Kinematics System",
      role: "Lead Hardware & Embedded Developer",
      status: "TACTICAL PROTOTYPE",
      statusColor: "text-amber-400 bg-amber-400",
      missionCode: "HW.PROJ // ROBOTICS.SYS",
      location: "Laboratory & Workshop",
      clearance: "AVIONICS LVL 04",
      objective:
        "Engineered a voice-actuated robotic helmet prototype using embedded microcontrollers, dual servo kinematics, and low-latency audio processing.",
      metrics: [
        { label: "Servo Kinematics", value: "Precision Actuation", progress: 100 },
        { label: "Voice Recognition Response", value: "< 300ms", progress: 95 },
        { label: "Power Regulation", value: "Dedicated Circuit", progress: 90 },
      ],
      techStack: ["Microcontrollers", "Servo Kinematics", "Voice Recognition", "Sensors & Actuators", "Embedded C/C++"],
      executionLogs: [
        "Programmed embedded microcontrollers for continuous voice command processing without cloud latency.",
        "Calibrated dual servo motor linkages for smooth, synchronous mechanical actuation cycles.",
        "Integrated status telemetry, optical HUD indicators, and dedicated power distribution for portable runtime.",
      ],
      image: "/robotic-helmet-crop.jpg",
    },
    {
      id: "03",
      number: "03",
      category: "AI & Computer Vision",
      period: "System Architecture",
      title: "PresentX Facial Attendance",
      role: "AI Developer & Architect",
      status: "DEPLOYED SYSTEM",
      statusColor: "text-emerald-400 bg-emerald-400",
      missionCode: "SYS.AI // PRESENTX.VISION",
      location: "Cloud & Local Edge",
      clearance: "BIOMETRICS LVL 05",
      objective:
        "Building an automated contactless attendance tracking infrastructure utilizing deep learning facial detection and recognition.",
      metrics: [
        { label: "Recognition Accuracy", value: "High Precision", progress: 94 },
        { label: "Verification Latency", value: "Sub-Second", progress: 92 },
        { label: "Contactless Processing", value: "100% Automated", progress: 100 },
      ],
      techStack: ["Python", "Facial Recognition", "Computer Vision", "Web Platform", "Automation"],
      executionLogs: [
        "Implemented real-time facial feature extraction and distance matching for automated roster check-in.",
        "Engineered automated logging pipeline reducing manual attendance record keeping to zero touch.",
        "Deployed responsive dashboard for tracking attendance metrics and historical records.",
      ],
      image: "/projects/presentx.jpg",
    },
    {
      id: "04",
      number: "04",
      category: "Emergency Technology",
      period: "Platform Build",
      title: "ResqLink Disaster Platform",
      role: "Full Stack Engineer",
      status: "PRODUCTION BUILD",
      statusColor: "text-rose-400 bg-rose-400",
      missionCode: "EMERGENCY.NET // RESQLINK",
      location: "Vercel Cloud",
      clearance: "PUBLIC DISASTER RELIEF",
      objective:
        "Engineered a digital lifeline for critical situations providing emergency communication, SOS broadcasting, and relief coordination.",
      metrics: [
        { label: "Alert Dispatch", value: "Instantaneous", progress: 98 },
        { label: "System Uptime", value: "99.9%", progress: 99 },
        { label: "Accessibility", value: "Mobile Optimized", progress: 100 },
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Emergency APIs", "Real-Time Alerts"],
      executionLogs: [
        "Architected emergency relief user interface prioritizing fast load times on weak connections.",
        "Built coordinated emergency response system with live status feeds and essential resource dispatching.",
        "Deployed to Vercel with high availability for mission-critical reliability.",
      ],
      image: "/projects/resqlink.jpg",
    },
  ];

  return (
    <section id="journey" className="relative w-full bg-[#030305] text-white py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Background grid and ambient lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6 border-b border-white/[0.08] pb-10">
          <div>
            <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-cyan-400 mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-cyan-400/60" />
              04 — The Journey
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white">
              EDUCATION <br />
              <span className="text-white/25 italic font-light">&amp; MILESTONES</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400 uppercase">
                INTERACTIVE DOSSIER MATRIX
              </span>
            </div>
            <p className="font-mono text-xs text-white/40 text-left md:text-right">
              SELECT ANY MISSION TO ENGAGE FULL TELEMETRY &amp; LOGS.
            </p>
          </div>
        </div>

        {/* Dossier Matrix Accordion Cards */}
        <div className="flex flex-col gap-4">
          {dossiers.map((dossier) => {
            const isExpanded = expandedId === dossier.id;

            return (
              <div
                key={dossier.id}
                className={`rounded-2xl md:rounded-3xl transition-all duration-500 overflow-hidden border ${
                  isExpanded
                    ? "bg-[#08080f] border-cyan-400/50 shadow-[0_0_40px_rgba(0,240,255,0.08)]"
                    : "bg-[#06060a] border-white/[0.06] hover:border-white/[0.2] hover:bg-[#0a0a10]"
                }`}
              >
                {/* Dossier Summary Header (Clickable) */}
                <div
                  onClick={() => setExpandedId(isExpanded ? "" : dossier.id)}
                  className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none"
                  data-cursor-text={isExpanded ? "CLOSE" : "OPEN"}
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span
                      className={`font-mono font-black text-2xl sm:text-3xl md:text-4xl transition-colors duration-300 ${
                        isExpanded ? "text-cyan-400" : "text-white/20"
                      }`}
                    >
                      {dossier.number}
                    </span>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/40">
                          {dossier.category}
                        </span>
                        <span className="text-white/20">/</span>
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-cyan-400 uppercase">
                          {dossier.period}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                        {dossier.title}{" "}
                        <span className="font-light italic text-white/50 text-base sm:text-xl md:text-2xl">
                          / {dossier.role}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 border border-white/[0.08]">
                      <span className={`w-2 h-2 rounded-full ${dossier.statusColor.split(" ")[1]} animate-pulse`} />
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
                        {dossier.status}
                      </span>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isExpanded
                          ? "bg-cyan-400 text-black border-cyan-400 rotate-90 shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                          : "bg-white/[0.03] text-white/50 border-white/[0.1]"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Expanded Dossier Telemetry Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="border-t border-white/[0.08] bg-[#040407]/90 backdrop-blur-2xl overflow-hidden"
                    >
                      <div className="p-6 sm:p-10 md:p-12">
                        {/* Dossier Code Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.06] font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase">
                          <span className="flex items-center gap-2">
                            <span className="text-cyan-400">MISSION CODE:</span> {dossier.missionCode}
                          </span>
                          <span>LOCATION: {dossier.location}</span>
                          <span className="text-emerald-400">CLEARANCE: {dossier.clearance}</span>
                        </div>

                        {/* Telemetry 2-Column Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                          {/* Left Column: Objective, Metrics & Tech */}
                          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                              <div className="font-mono text-[9px] tracking-[0.3em] text-cyan-400 uppercase mb-2">
                                MISSION OBJECTIVE
                              </div>
                              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                                {dossier.objective}
                              </p>
                            </div>

                            {/* Performance & Metric Benchmarks */}
                            <div className="space-y-4">
                              <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">
                                PERFORMANCE &amp; TELEMETRY
                              </div>
                              {dossier.metrics.map((metric, mIdx) => (
                                <div key={mIdx} className="space-y-1.5">
                                  <div className="flex justify-between items-center text-xs font-mono">
                                    <span className="text-white/60 uppercase">{metric.label}</span>
                                    <span className="text-cyan-400 font-bold">{metric.value}</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                                      style={{ width: `${metric.progress}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack Pills */}
                            <div>
                              <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-3">
                                ARMORED TECH STACK
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {dossier.techStack.map((tech, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-white/80 uppercase"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Execution Logs & Hardware Photo Preview */}
                          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                            <div>
                              {dossier.image && (
                                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-6 group/img">
                                  <Image
                                    src={dossier.image}
                                    alt={dossier.title}
                                    fill
                                    className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00F0FF]" />
                                    <span className="font-mono text-[10px] text-cyan-300 font-bold tracking-widest uppercase drop-shadow-md">
                                      HARDWARE LAB CAPTURE // PROTOTYPE BENCH
                                    </span>
                                  </div>
                                </div>
                              )}

                              <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase mb-4">
                                KEY EXECUTION LOGS &amp; DELIVERABLES
                              </div>
                              <div className="space-y-3">
                                {dossier.executionLogs.map((log, lIdx) => (
                                  <div
                                    key={lIdx}
                                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-4 hover:border-cyan-400/30 transition-colors"
                                  >
                                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded font-bold shrink-0 mt-0.5">
                                      0{lIdx + 1}
                                    </span>
                                    <p className="text-sm text-white/80 font-light leading-relaxed">
                                      {log}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
                              <span>STATUS: TELEMETRY VERIFIED</span>
                              <span className="text-cyan-400 font-semibold">ALL SYSTEMS NOMINAL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
