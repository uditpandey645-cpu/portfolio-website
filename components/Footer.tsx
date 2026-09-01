"use client";

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 border-t border-white/10 bg-black text-center relative z-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-[10px] text-white/50 uppercase tracking-[0.3em]">
          © 2026 Udit Pandey. All rights reserved.
        </p>

        <p className="font-mono text-[10px] text-white/30 tracking-wider">
          Built with Next.js 14 · Framer Motion · GSAP · Tailwind CSS
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=uditpandey645@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.2em] text-cyan-400 hover:text-white uppercase transition-colors"
          >
            Email
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Udit_Pandey_Resume.pdf"
            className="font-mono text-[10px] tracking-[0.2em] text-white/60 hover:text-cyan-400 uppercase transition-colors"
          >
            Resume
          </a>
          <a
            href="https://github.com/uditpandey645-cpu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-cyan-400 uppercase transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/udit-pandey-b30191384"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-cyan-400 uppercase transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/_udit__pandey_"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-cyan-400 uppercase transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
