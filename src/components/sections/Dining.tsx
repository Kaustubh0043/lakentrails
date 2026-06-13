"use client";

import { motion } from "framer-motion";
import { Utensils, Flame, Sparkles, Compass } from "lucide-react";

interface DiningProps {
  onOpenBooking: () => void;
}

export default function Dining({ onOpenBooking }: DiningProps) {
  const menuHighlights = [
    {
      title: "Panoramic Sunset Views",
      desc: "Watch the sun set directly behind the mountain ridges, reflecting gold on the water.",
    },
    {
      title: "Open-Air Lakeside Tables",
      desc: "Unwind at shoreline dining setups designed to give you prime views of the reservoir.",
    },
    {
      title: "Twilight Mocktails & Tea",
      desc: "Sip handcrafted fresh fruit infusions and enjoy warm tea as evening sets in.",
    },
    {
      title: "Scenic Ambiance & Calm",
      desc: "Dine in a tranquil environment where the only sounds are the ripples of Adoshi Lake.",
    },
  ];

  return (
    <section id="dining" className="relative w-full py-24 md:py-32 bg-[#020612] overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-sunset/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side Content */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 font-medium">
              Culinary Artistry
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
              Luxury Tropical <br />
              <span className="text-glow-sunset italic font-normal text-sunset">Lakeside Dining</span>
            </h2>
            <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed mb-8 max-w-xl">
              Relax with uninterrupted views of the calm Adoshi reservoir and the majestic Sahyadri mountain peaks. Our lakeside dining space blends natural, open-air scenery with a premium tropical atmosphere, offering the perfect spot to enjoy sunset tea, refreshing mocktails, and fresh local dishes as twilight paints the sky.
            </p>

            {/* Menu Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8 font-sans">
              {menuHighlights.map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#030f26]/30 border border-sand/10 hover:border-sunset/20 transition-all duration-300">
                  <h3 className="text-sm font-serif font-medium text-white mb-1 uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-xs text-sand/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-sunset hover:bg-[#fd5e53] text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl shadow-sunset/15 cursor-pointer"
            >
              Reserve a Table
            </button>
          </motion.div>

          {/* Right Side Visual Image */}
          <motion.div 
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-sand/20 group cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/lakesideview3.jpeg')" }}
            />
            <div className="absolute inset-0 bg-orange-950/10 group-hover:bg-orange-950/5 transition-colors duration-500 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-transparent to-transparent opacity-85 z-[2]" />

            {/* Visual description badge */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-sunset mb-2 block font-semibold">
                Scenic Shoreline View
              </span>
              <h3 className="text-2xl font-serif font-light text-white leading-tight uppercase tracking-wider mb-2">
                Tranquil Reservoir
              </h3>
              <p className="text-[11px] font-sans text-sand/70 leading-relaxed max-w-xs">
                Gaze across the calm waters at the majestic Sahyadri mountain peaks from your dining table.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
