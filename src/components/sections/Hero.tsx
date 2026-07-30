"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Compass, Calendar, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Three.js background to optimize load time on mobile devices
const Lakeside3DBackground = dynamic(() => import("./Lakeside3DBackground"), {
  ssr: false,
});

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(window.innerWidth < 1024 || mobileUA);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#030a16]">
      {/* Real-time 3D WebGL Lakeside Background for Desktop, Video/Image background for Mobile */}
      {mounted && !isMobile ? (
        <Lakeside3DBackground />
      ) : (
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#030a16]"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)"
          }}
        >
          {mounted ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60"
            >
              <source src="/images/IMG_8361.MOV" type="video/quicktime" />
              <source src="/images/IMG_8361.MOV" type="video/mp4" />
              <img 
                src="/images/resort_background_hd_4k.jpg" 
                className="w-full h-full object-cover opacity-80" 
                alt="Resort background fallback" 
              />
            </video>
          ) : (
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80"
              style={{
                backgroundImage: "url('/images/resort_background_hd_4k.jpg')",
              }}
            />
          )}
        </div>
      )}

      {/* Luxury Dark Radial Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030a16]/60 via-transparent to-[#030a16] z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,10,22,0)_20%,rgba(3,10,22,0.85)_100%)] z-[1] pointer-events-none" />

      {/* Ambient Lens Flare Effect */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-sunset/5 blur-[120px] pointer-events-none z-[1] animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-luxury-teal/5 blur-[140px] pointer-events-none z-[1] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center select-none pt-16">
        
        {/* Soft Glowing Badge */}
        <motion.div
          className="px-4 py-1.5 rounded-full glass-panel border border-sand/15 flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sunset animate-ping" />
          <span className="text-[9px] font-sans font-medium uppercase tracking-[0.3em] text-sand">
            Luxury Lakeside Haven
          </span>
        </motion.div>

        {/* Big Luxury Serif Title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white tracking-wider leading-[0.95] flex flex-col items-center gap-2"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay: 1.4 }}
          >
            <span>Lake N Trails</span>
            <span className="text-glow-sunset italic font-normal text-sunset text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-wide mt-2 font-serif">
              Exotic Glamping
            </span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="text-lg sm:text-2xl md:text-3xl font-serif italic text-sand/80 tracking-wide"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 1.6 }}
          >
            “Your Lakeside Escape Begins Here”
          </motion.p>
        </div>

        {/* Interactive Glassmorphism CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 z-20"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.8 }}
        >
          <a
            href="#about"
            className="w-48 py-3.5 px-6 rounded-full glass-button text-[10px] font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-lg"
          >
            <Compass className="w-3.5 h-3.5" />
            Explore Experience
          </a>

          <button
            onClick={onOpenBooking}
            className="w-48 py-3.5 px-6 rounded-full bg-sunset hover:bg-[#fd5e53] text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-sunset/15 cursor-pointer hover:-translate-y-0.5 hover:shadow-sunset/25"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Events
          </button>

          <a
            href="#gallery"
            className="w-48 py-3.5 px-6 rounded-full glass-button text-[10px] font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-lg"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            View Gallery
          </a>
        </motion.div>
      </div>

      {/* Smooth Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="text-[8px] font-sans uppercase tracking-[0.3em] text-sand/60">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-sunset" />
        </motion.div>
      </motion.div>
    </section>
  );
}
