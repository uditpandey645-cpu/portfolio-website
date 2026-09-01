"use client";

import { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { ArrowUpRight, Mail, Phone, Send, Check, Download, Sparkles, ExternalLink } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/BrandIcons";

export default function ClosingCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);

  // Form State
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [projectService, setProjectService] = useState("Full Stack Development");
  const [inquiryDetails, setInquiryDetails] = useState("");
  const [lastMailUrl, setLastMailUrl] = useState("");

  const email = "uditpandey645@gmail.com";
  const phone = "+91 9893412469";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#00F0FF", "#ffffff", "#00B8C4"],
    });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Project Inquiry from ${senderName} — Udit Pandey Portfolio`;
    const body = `Hi Udit,

You have received a new inquiry via your portfolio website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SENDER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:     ${senderName}
Email:    ${senderEmail}
Category: ${projectService}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT / INQUIRY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${inquiryDetails}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent via Udit Pandey Portfolio (uditpandey645@gmail.com)`;

    // Copy formatted details to clipboard for convenience
    try {
      await navigator.clipboard.writeText(body);
    } catch {
      // ignore clipboard error if unavailable
    }

    // Prepare Gmail Web composer URL
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setLastMailUrl(gmailComposeUrl);

    // Also send to internal API endpoint
    try {
      fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          scope: projectService,
          details: inquiryDetails,
        }),
      }).catch(() => {});
    } catch {
      // continue regardless
    }

    // Open Gmail composer in a new tab immediately
    window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");

    setFormSent(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#00F0FF", "#38BDF8", "#ffffff", "#34D399"],
    });
  };

  return (
    <section id="contact" className="text-white relative overflow-hidden bg-[#050508] border-t border-white/[0.06] pt-32 md:pt-40 pb-16">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,240,255,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 mb-28">
          {/* Left Column: Heading & CTAs */}
          <div className="flex-1 w-full relative z-20 flex flex-col items-start text-left">
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-cyan-400 uppercase mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-cyan-400/50" />
              05 — Let&apos;s Work Together
            </p>

            <h2 className="text-[14vw] sm:text-[10vw] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Start a<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 italic pr-4">
                Project
              </span>
            </h2>

            <p className="text-white/60 text-base md:text-xl font-light max-w-lg leading-relaxed mb-10">
              Open to collaboration, internships, research initiatives, and interesting projects in AI, full stack engineering, and robotics.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Primary Inquiry CTA Button */}
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 rounded-full bg-white text-black font-black text-xs tracking-[0.2em] uppercase hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] flex items-center gap-3 hover:scale-105 cursor-pointer"
                data-cursor-text="INQUIRE"
              >
                <span>Start an Inquiry →</span>
              </button>

              {/* Direct Mail CTA Button */}
              <a
                href={`mailto:${email}?subject=Hello%20Udit%20-%20Project%20Inquiry`}
                className="px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
                data-cursor-text="MAIL"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email Directly</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Copy Email Fast Button */}
              <button
                onClick={handleCopyEmail}
                className="px-5 py-4 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <span>Copy Address</span>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Signature Portrait Card with Spinning Circular Badge */}
          <div className="w-full lg:w-[45%] xl:w-[40%] relative mt-8 lg:mt-0 flex justify-center">
            {/* The Signature Portrait Frame */}
            <div className="group relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-cyan-400/40">
              <div className="absolute inset-0">
                <Image
                  src="/udit-portrait.jpg"
                  alt="Udit Pandey"
                  fill
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>

              {/* Gradient Vignette over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem] md:rounded-[3rem] pointer-events-none" />

              {/* Bottom Tag - Shifted to Left */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 max-w-[65%]">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black uppercase text-xl sm:text-2xl tracking-tight drop-shadow-lg">
                      Udit Pandey
                    </span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                  </div>
                  <p className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    Full Stack · AI Engineer · Robotics
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Spinning Circular Badge Stamp - Positioned at Bottom-Right */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 md:-right-8 w-32 h-32 md:w-36 md:h-36 bg-[#0a0a0f] rounded-full border border-white/15 flex items-center justify-center shadow-2xl z-30 overflow-hidden">
              <div className="w-full h-full relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-[85%] h-[85%] overflow-visible animate-[spin_12s_linear_infinite]"
                >
                  <path
                    id="circlePathUdit"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="transparent"
                  />
                  <text fill="white" className="text-[10px] font-mono tracking-[0.22em] uppercase font-bold opacity-80">
                    <textPath href="#circlePathUdit" startOffset="0%">
                      • OPEN TO OFFERS • LET&apos;S BUILD
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_15px_#00F0FF]" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Status & Direct Contact Ribbon */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
              Available — Internships &amp; Collaborative Projects
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest text-cyan-400 hover:text-white uppercase transition-colors flex items-center gap-1.5"
              title="Open Gmail Composer directly"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{email}</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Udit_Pandey_Resume.pdf"
              className="font-mono text-[10px] tracking-widest text-white/70 hover:text-cyan-400 uppercase transition-colors flex items-center gap-1.5"
              title="View & Download Resume PDF"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume (PDF)</span>
            </a>
            <a
              href="https://github.com/uditpandey645-cpu"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] tracking-widest text-white/50 hover:text-cyan-400 uppercase transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/udit-pandey-b30191384"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] tracking-widest text-white/50 hover:text-cyan-400 uppercase transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/_udit__pandey_"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] tracking-widest text-white/50 hover:text-cyan-400 uppercase transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="font-mono text-[10px] tracking-widest text-cyan-400 hover:text-white uppercase transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Quick Inquiry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#09090f] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white font-mono text-xs uppercase"
            >
              [CLOSE]
            </button>

            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2">
              Start an Inquiry
            </h3>
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-6">
              Connect with Udit Pandey
            </p>

            {formSent ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                    Inquiry Generated &amp; Prepared
                  </h4>
                  <p className="text-xs text-white/70 font-mono mt-1.5 max-w-sm leading-relaxed">
                    A pre-filled email to <span className="text-cyan-400 font-bold">uditpandey645@gmail.com</span> with your name, email, and inquiry details has been created.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 w-full text-left font-mono text-[11px] text-white/60 space-y-1">
                  <p className="text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Text copied to your clipboard
                  </p>
                  <p className="text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Opening mail client to send to Udit
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
                  {lastMailUrl && (
                    <a
                      href={lastMailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 text-black font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
                    >
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setSenderName("");
                      setSenderEmail("");
                      setInquiryDetails("");
                    }}
                    className="py-3 px-4 rounded-xl border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-mono text-xs uppercase transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                    Your Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={projectService}
                    onChange={(e) => setProjectService(e.target.value)}
                    className="w-full rounded-xl bg-[#0f0f18] border border-white/10 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-sans cursor-pointer"
                  >
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Robotics & Physical Computing">Robotics & Physical Computing</option>
                    <option value="Software Internship / Role">Software Internship / Role</option>
                    <option value="Other Collaboration">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                    Project / Inquiry Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryDetails}
                    onChange={(e) => setInquiryDetails(e.target.value)}
                    placeholder="Tell me about the role, project, requirements, or collaboration idea..."
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-cyan-400 hover:bg-white text-black font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to uditpandey645@gmail.com</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
