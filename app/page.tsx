"use client";

import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import MarqueeTicker from "@/components/MarqueeTicker";
import StatsCounter from "@/components/StatsCounter";
import TechArsenal from "@/components/TechArsenal";
import ProjectsGrid from "@/components/ProjectsGrid";
import StillScrollingTeaser from "@/components/StillScrollingTeaser";
import JourneyTimeline from "@/components/JourneyTimeline";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-400/20 selection:text-white">
      {/* Cinematic Split Preloader */}
      <Preloader onComplete={() => {}} />

      {/* Sticky Glass Navigation Bar */}
      <Header />

      {/* Hero Section with Signature Photo-Scrub Canvas Player */}
      <Hero />

      {/* 01 — Profile Section (Bio, Full-Stack, Terminal, GitHub Stats) */}
      <ProfileCard />

      {/* Upper Infinite Marquee Ticker Band */}
      <MarqueeTicker />

      {/* 4 Animated Metric Counters */}
      <StatsCounter />

      {/* Lower Infinite Marquee Ticker Band (Reverse Flow) */}
      <MarqueeTicker reverse />

      {/* 02 — Technical Stack Arsenal (Two-Pass Showcase & Matrix) */}
      <TechArsenal />

      {/* 03 — Selected Work Project Grid (ResqLink, PresentX, Gestyxra, Mark 50) */}
      <ProjectsGrid />

      {/* Cheeky Mid-Page "Still Scrolling?" Callout */}
      <StillScrollingTeaser />

      {/* 04 — The Journey (Interactive Dossier Timeline Matrix) */}
      <JourneyTimeline />

      {/* 05 — Closing CTA Section (Portrait, Spinning Badge, Contact Inquiries) */}
      <ClosingCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
