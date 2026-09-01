import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Udit Pandey — Full Stack & AI Engineer | CS Engineering",
  description:
    "Portfolio of Udit Pandey. Computer Science Engineering Student at ITM Gwalior building intelligent AI platforms, full-stack web architectures, and embedded robotics.",
  keywords: [
    "Udit Pandey",
    "Udit Pandey Portfolio",
    "Full Stack Developer",
    "AI Engineer",
    "Machine Learning",
    "Next.js Developer",
    "Robotics",
    "Microcontrollers",
    "Facial Recognition",
    "PresentX",
    "ResqLink",
    "Gestyxra",
    "ITM Gwalior",
  ],
  authors: [{ name: "Udit Pandey", url: "https://github.com/uditpandey645-cpu" }],
  creator: "Udit Pandey",
  openGraph: {
    title: "Udit Pandey — Full Stack & AI Engineer",
    description:
      "Computer Science Engineering Student at ITM Gwalior building intelligent AI platforms, full-stack web architectures, and embedded robotics.",
    type: "website",
    locale: "en_US",
    siteName: "Udit Pandey Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udit Pandey — Full Stack & AI Engineer",
    description:
      "Computer Science Engineering Student at ITM Gwalior building intelligent AI platforms, full-stack web architectures, and embedded robotics.",
  },
  icons: {
    icon: "/udit-portrait.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black selection:bg-cyan-400/20 selection:text-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white font-sans antialiased overflow-x-hidden`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
