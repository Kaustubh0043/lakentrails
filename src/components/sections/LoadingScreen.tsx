"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bypassed, setBypassed] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("hasSeenLoading");
      if (hasSeen === "true") {
        setBypassed(true);
        onComplete();
        return;
      }
    }
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800); // Let exit animations play
          }, 500);
          return 100;
        }
        // Increment progress by randomized amounts for realism
        const increment = Math.floor(Math.random() * 12) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Prevent hydration mismatch by returning null during server prerendering
  if (!mounted || bypassed) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 bg-[#030a16] z-[9999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
        >
          {/* Animated Water Ripples Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <span className="absolute w-[400px] h-[400px] rounded-full border border-sand/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple" style={{ animationDelay: '0s' }} />
            <span className="absolute w-[600px] h-[600px] rounded-full border border-sand/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple" style={{ animationDelay: '1s' }} />
            <span className="absolute w-[800px] h-[800px] rounded-full border border-sand/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple" style={{ animationDelay: '2s' }} />
          </div>

          {/* Tropical Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-sunset opacity-60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 6 + Math.random() * 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xs text-center">
            {/* Minimalist Tropical Luxury Wave + Trail Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-24 h-24 mb-6 text-sand flex items-center justify-center"
            >
              <img 
                src="/images/logo.png" 
                className="w-full h-full object-contain rounded-full drop-shadow-[0_0_15px_rgba(255,107,53,0.4)]" 
                alt="Lake N Trails Logo" 
              />
            </motion.div>

            {/* Glowing Hotel Branding */}
            <motion.h1
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.4em", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-[#fcfbf7] font-serif text-2xl font-light uppercase tracking-[0.4em] mb-2 text-glow-sunset"
            >
              LAKE N TRAILS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-[10px] uppercase font-sans tracking-[0.25em] text-sand/80 mb-8"
            >
              Exotic Glamping
            </motion.p>

            {/* Premium Loading Progress Bar */}
            <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-sunset to-sunset-orange shadow-[0_0_8px_rgba(255,107,53,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.span
              key={progress}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-mono tracking-widest text-sunset font-light"
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
