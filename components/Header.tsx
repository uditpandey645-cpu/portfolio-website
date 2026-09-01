"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Download, ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Arsenal", href: "#arsenal" },
    { label: "Work", href: "#work" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.07] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        {/* Left: Brand Identity Mark */}
        <a
          href="#"
          className="flex items-center gap-3 group relative z-50 cursor-pointer"
          data-cursor-text="HOME"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-cyan-400 transition-colors">
            <Image
              src="/udit-portrait.jpg"
              alt="Udit Pandey"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-white uppercase group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              UDIT PANDEY
              <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse" />
            </span>
            <span className="font-mono text-[8px] tracking-[0.15em] text-white/40 uppercase hidden sm:block">
              AI · FULL STACK · ROBOTICS
            </span>
          </div>
        </a>

        {/* Center: Desktop Floating Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] rounded-full p-1.5 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-5 py-2 rounded-full font-mono text-[10px] font-medium tracking-[0.2em] text-white/60 hover:text-white uppercase transition-all duration-300 hover:bg-white/[0.08]"
              data-cursor-text={link.label.toUpperCase()}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Resume CTA Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-white/80 hover:text-white border border-white/20 hover:border-cyan-400/50 hover:text-cyan-400 px-5 py-2.5 rounded-full uppercase transition-all duration-300 hover:bg-white/10 group cursor-pointer"
            data-cursor-text="RESUME"
            title="View & Download Resume PDF"
          >
            <span>Resume</span>
            <Download className="w-3 h-3 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Hire Me / Contact CTA Button */}
          <a
            href="#contact"
            className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.2em] text-black bg-cyan-400 px-5 py-2.5 rounded-full uppercase transition-all duration-300 hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)] group cursor-pointer"
            data-cursor-text="HIRE"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] text-white hover:text-cyan-400 transition-colors z-50 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center px-8 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 items-start">
          <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
            NAVIGATION
          </p>
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tight text-white/80 hover:text-cyan-400 transition-colors flex items-center gap-4"
            >
              <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
              {link.label}
            </a>
          ))}

          <div className="w-full h-px bg-white/10 my-4" />

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-white border border-white/20 py-3.5 rounded-full uppercase hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              Resume <Download className="w-3.5 h-3.5 text-cyan-400" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-black bg-cyan-400 py-3.5 rounded-full uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Hire Me <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
