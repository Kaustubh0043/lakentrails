"use client";

import { motion } from "framer-motion";
import { Sparkles, CalendarDays, Heart, Award } from "lucide-react";

interface WeddingsProps {
  onOpenBooking: () => void;
}

export default function Weddings({ onOpenBooking }: WeddingsProps) {
  return (
    <section id="weddings" className="relative w-full py-24 md:py-32 bg-[#020612] overflow-hidden">
      {/* Decorative Warm Sunset Glow Mesh */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-sunset/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Elegant Visual card */}
          <motion.div 
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-sand/20 group cursor-pointer order-last lg:order-first"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/IMG_8399.jpeg')" }}
            />
            <div className="absolute inset-0 bg-orange-950/15 group-hover:bg-orange-950/10 transition-colors duration-500 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-transparent to-transparent opacity-85 z-[2]" />

            {/* Visual bottom text */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-sunset mb-2 block font-semibold">
                Bespoke Lakeside Events
              </span>
              <h3 className="text-2xl font-serif font-light text-white leading-tight uppercase tracking-wider mb-2">
                Unforgettable Vows
              </h3>
              <p className="text-[11px] font-sans text-sand/70 leading-relaxed max-w-xs">
                A stunning waterfront ceremony setup featuring elegant drapes, white floral arches, and seating directly on the reservoir edge.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Elegant Text Details */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs font-sans tracking-[0.3em] text-sand uppercase mb-3 font-medium">
              Magical Gatherings
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#fcfbf7] mb-6 leading-tight">
              Destination Weddings <br />
              <span className="text-glow-sunset italic font-normal text-sunset">& Elite Celebrations</span>
            </h2>
            <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed mb-8 max-w-xl">
              From fairy-tale lakeside vows to high-energy corporate galas, LakeNtrails provides the perfect blend of natural beauty and top-tier hospitality. Our expansive lawn accommodates grand outdoor weddings, pre-wedding photography sessions, corporate retreats, team building outings, and custom event structures designed to leave a lasting impression.
            </p>

            {/* List details */}
            <div className="space-y-4 w-full mb-8 font-sans">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-sand/10 border border-sand/20 flex items-center justify-center text-sand flex-shrink-0">
                  <Heart className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Lakeside Marriage Vows</span>
                  <span className="text-xs text-sand/50">Say your vows under a beautiful white floral arch right on the waterfront stage at sunset.</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-sand/10 border border-sand/20 flex items-center justify-center text-sand flex-shrink-0">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Premium Corporate Outings</span>
                  <span className="text-xs text-sand/50">Inspire your teams with dynamic team-building games, kayaking, and dj-led nights.</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-sand/10 border border-sand/20 flex items-center justify-center text-sand flex-shrink-0">
                  <CalendarDays className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-medium text-[#fcfbf7] block">Custom Thematic Decors</span>
                  <span className="text-xs text-sand/50">Bespoke lighting, gourmet catering menus, audio setup, and premium stays.</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full bg-[#fcfbf7] text-black hover:bg-sunset hover:text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl cursor-pointer"
            >
              Book Event Consultation
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
