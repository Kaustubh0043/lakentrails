"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Moon, Tent } from "lucide-react";

interface CampingProps {
  onOpenBooking: () => void;
}

export default function Camping({ onOpenBooking }: CampingProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Monitor section visibility to pause/resume animation loop
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.02 } // trigger when even 2% is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let isLoopActive = true;

    // Stars data
    const stars: Array<{ x: number; y: number; size: number; speed: number; alpha: number; delta: number }> = [];
    const starCount = 60; // Slightly reduced for performance
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height - 150),
        size: Math.random() * 1.2 + 0.4,
        speed: 0.015 + Math.random() * 0.02,
        alpha: Math.random(),
        delta: Math.random() > 0.5 ? 1 : -1,
      });
    }

    // Sparks data
    const sparks: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number; maxLife: number }> = [];
    const spawnSpark = () => {
      sparks.push({
        x: width * 0.5 + (Math.random() * 40 - 20),
        y: height - 60,
        vx: Math.random() * 1.2 - 0.6,
        vy: -(Math.random() * 1.8 + 0.8),
        size: Math.random() * 2.5 + 0.8,
        alpha: 1,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Loop
    const render = () => {
      if (!isLoopActive) return;

      ctx.clearRect(0, 0, width, height);

      // Twinkle Stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.delta;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.delta = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.delta = 1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn Bonfire Sparks
      if (Math.random() < 0.22) {
        spawnSpark();
      }

      // Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx += Math.sin(spark.y * 0.05) * 0.04;
        spark.life++;
        spark.alpha = 1 - spark.life / spark.maxLife;

        if (spark.alpha <= 0 || spark.y < 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 107, 53, ${spark.alpha})`;
        ctx.shadowBlur = 4; // reduced blur shadow size to save composition time
        ctx.shadowColor = "#ff6b35";
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isLoopActive = false;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <section 
      id="camping" 
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-[#020612] overflow-hidden"
    >
      {/* Canvas for Star Twinkle & Bonfire Sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

      {/* Decorative dark ambient overlays */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030a16] to-transparent z-[2]" />
      
      {/* Bonfire Glow Shader */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] rounded-full bg-sunset/15 blur-[60px] pointer-events-none z-[2]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Cozy visuals */}
          <motion.div 
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-sunset/20 group cursor-pointer order-last lg:order-first"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/IMG_8399.jpeg')" }}
            />
            <div className="absolute inset-0 bg-[#020612]/40 group-hover:bg-[#020612]/30 transition-colors duration-500 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-transparent to-transparent opacity-80 z-[2]" />
            
            {/* Visual description badge */}
            <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col items-start">
              <span className="px-3 py-1 bg-sunset/20 border border-sunset/40 text-sunset text-[8px] font-sans font-semibold uppercase tracking-[0.2em] rounded-full mb-3">
                Lakeside Glamping
              </span>
              <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider mb-2">
                Nights Under the Stars
              </h3>
              <p className="text-[11px] font-sans text-sand/70 leading-relaxed max-w-xs">
                A perfect mix of cozy premium outdoor setup, roaring lakeside bonfires, and acoustic background tunes.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Information content */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 font-medium">
              Starlit Wilderness
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
              Campfire Nights & <br />
              <span className="text-glow-sunset italic font-normal text-sunset">Starry Glamping</span>
            </h2>
            <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed mb-8 max-w-xl">
              Unplug from the daily grid and gather around the warmth of a lakeside bonfire. Our premium camping setup features spacious, waterproof luxury glamping tents with comfortable bedding, ambient solar lighting, clean modern restroom facilities, and pet-friendly spaces. Perfect for friend groups, couples, and stargazers.
            </p>

            {/* Highlights */}
            <div className="space-y-4 w-full mb-8 font-sans">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-[#ff6b35]/15 flex items-center justify-center text-sunset flex-shrink-0">
                  <Flame className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Bonfires & Live Acoustic Jamming</span>
                  <span className="text-xs text-sand/55">Roast marshmallows, share stories, and play guitar by the water edge.</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-[#ff6b35]/15 flex items-center justify-center text-sunset flex-shrink-0">
                  <Tent className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Luxury Glamping Tents</span>
                  <span className="text-xs text-sand/55">Fitted with plush mattresses, pillows, blankets, and charging ports.</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-sunset hover:bg-[#fd5e53] text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl shadow-sunset/15 cursor-pointer"
            >
              Book Camping Vibe
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
