"use client";

import { motion } from "framer-motion";
import { Waves, Compass, Sparkles, GlassWater } from "lucide-react";

interface PoolPartyProps {
  onOpenBooking: () => void;
}

export default function PoolParty({ onOpenBooking }: PoolPartyProps) {
  return (
    <section id="pool" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden">
      {/* Neon Gradient Glow Overlays (simulating party club light) */}
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-luxury-teal/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Grid container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side Info */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs font-sans tracking-[0.3em] text-luxury-teal uppercase mb-3 font-medium">
              Serene Pool Vibe
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
              Lakeside Swimming <br />
              <span className="text-glow-teal italic font-normal text-luxury-teal">Pool & Relaxation</span>
            </h2>
            <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed mb-8 max-w-xl">
              Cool off and relax by our premium lakeside infinity swimming pool. Surrounded by lush tropical palms and scenic views of Adoshi lake, it's the perfect spot to unwind, take a refreshing dip, or lounge on the deck with a chilled drink under the warm sun.
            </p>

            {/* Vibe Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8 font-sans">
              <div className="flex gap-3.5 items-center">
                <div className="w-8 h-8 rounded-full bg-[#0d9488]/15 border border-[#0d9488]/30 flex items-center justify-center text-luxury-teal flex-shrink-0">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Infinity Pool Views</span>
                  <span className="text-xs text-sand/50">Soak in panoramic vistas of the lake and mountains as you swim.</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="w-8 h-8 rounded-full bg-[#0d9488]/15 border border-[#0d9488]/30 flex items-center justify-center text-luxury-teal flex-shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Lakeside Lounge Deck</span>
                  <span className="text-xs text-sand/50">Relax on comfortable deck loungers surrounded by beautiful palms.</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="w-8 h-8 rounded-full bg-[#0d9488]/15 border border-[#0d9488]/30 flex items-center justify-center text-luxury-teal flex-shrink-0">
                  <GlassWater className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Poolside Refreshments</span>
                  <span className="text-xs text-sand/50">Sip handcrafted mocktails and premium juices on the deck.</span>
                </div>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="w-8 h-8 rounded-full bg-[#0d9488]/15 border border-[#0d9488]/30 flex items-center justify-center text-luxury-teal flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Tranquil Sunset Dips</span>
                  <span className="text-xs text-sand/50">Witness the sky change colors directly from the edge of the pool.</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-luxury-teal to-[#14b8a6] hover:from-[#14b8a6] hover:to-[#0d9488] text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl shadow-teal-950/40 cursor-pointer"
            >
              Book Pool Stay
            </button>
          </motion.div>

          {/* Right Side Visual */}
          <motion.div 
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-glow-teal group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <img 
              src="/images/img3.jpeg"
              alt="Lakeside Infinity Swimming Pool"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-purple-950/20 group-hover:bg-purple-950/10 transition-colors duration-500 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030a16] via-transparent to-transparent opacity-85 z-[2]" />

            {/* Glowing Pool Label */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-luxury-teal mb-2 block font-semibold">
                Tropical Vibe Stay
              </span>
              <h3 className="text-2xl font-serif font-light text-white leading-tight uppercase tracking-wider mb-2">
                Infinity Vibe
              </h3>
              <p className="text-[11px] font-sans text-sand/70 leading-relaxed max-w-xs">
                Perfect setting for relaxing pool days, family getaways, and peaceful weekend escapes.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
