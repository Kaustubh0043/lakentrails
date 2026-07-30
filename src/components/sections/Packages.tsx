"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Coffee, 
  Utensils, 
  Sunset, 
  Tent, 
  Compass, 
  Flame, 
  Music, 
  Waves, 
  Map, 
  Gamepad2, 
  Camera, 
  MapPin, 
  Phone, 
  Download, 
  Eye, 
  X,
  ArrowRight
} from "lucide-react";

interface PackagesProps {
  onOpenBooking: (experience: string) => void;
}

export default function Packages({ onOpenBooking }: PackagesProps) {
  const inclusionsAll = [
    { icon: Waves, label: "Kayaking" },
    { icon: Map, label: "Nature Trails" },
    { icon: Gamepad2, label: "Indoor/Outdoor Games" },
    { icon: Camera, label: "Photography Spots" },
  ];

  return (
    <section id="packages" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden border-t border-sand/5">
      {/* Dynamic Background Soft Ambient Light */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-pink-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Logo Banner */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col items-center gap-3 group">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-sand group-hover:text-sunset transition-colors duration-500 drop-shadow-[0_0_12px_rgba(255,107,53,0.25)]"
            >
              <path
                d="M15 65 C 25 55, 35 55, 45 65 C 55 75, 65 75, 75 65 C 85 55, 90 58, 95 62"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M50 20 L75 60 H25 L50 20 Z"
                stroke="#ff6b35"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-serif text-2xl tracking-[0.3em] font-light text-white group-hover:text-glow-sunset transition-all duration-500 uppercase">
              LAKE N TRAILS
            </span>
            <span className="text-[9px] font-sans tracking-[0.4em] font-semibold text-sunset uppercase -mt-1 block">
              Exotic Glamping
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Tariffs & Tariffs
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Exotic Glamping <span className="text-glow-sunset italic font-normal text-sunset">& Day Packages</span>
          </h2>
          <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed">
            Choose the perfect experience for your escape. Whether it is a quick mid-week break, a corporate event, or an overnight glamping getaway, we have curated options for everyone.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-20">
          
          {/* Day Outing Package - Code Pink */}
          <motion.div 
            className="rounded-2xl overflow-hidden glass-panel border border-pink-500/10 hover:border-pink-500/30 transition-all duration-500 relative group flex flex-col justify-between h-full bg-gradient-to-b from-pink-500/[0.02] to-transparent"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glowing Accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent group-hover:via-pink-500/75 transition-all duration-500" />
            
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3 py-1 bg-pink-500/15 border border-pink-500/35 text-pink-400 text-[8px] font-sans font-bold uppercase tracking-[0.25em] rounded-full mb-3 inline-block">
                    Code - Pink
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-white uppercase tracking-wider">
                    Day Outing Package
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-sans font-semibold text-pink-400">
                    ₹1,300<span className="text-xs text-sand/50 font-normal"> / Person</span>
                  </div>
                  <div className="text-[8px] md:text-[9px] text-sand/40 uppercase tracking-widest font-medium mt-0.5">
                    Weekday Starting Rate
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 bg-[#030f26]/40 border border-sand/10 rounded-xl p-4 mb-6 text-xs text-sand/80 divide-y xs:divide-y-0 xs:divide-x divide-sand/10">
                <div className="pb-3 xs:pb-0 xs:pr-3">
                  <span className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold block mb-1">Weekdays</span>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>Adult:</span><span className="text-white font-medium">₹1,300</span></div>
                    <div className="flex justify-between"><span>5–12 yrs:</span><span className="text-white font-medium">₹700</span></div>
                    <div className="flex justify-between"><span>Under 5:</span><span className="text-emerald-400 font-medium">Complimentary</span></div>
                  </div>
                </div>
                <div className="pt-3 xs:pt-0 xs:pl-3">
                  <span className="text-[10px] uppercase tracking-wider text-pink-400 font-semibold block mb-1">Weekends</span>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>Adult:</span><span className="text-white font-medium">₹1,600</span></div>
                    <div className="flex justify-between"><span>5–12 yrs:</span><span className="text-white font-medium">₹800</span></div>
                    <div className="flex justify-between"><span>Under 5:</span><span className="text-emerald-400 font-medium">Complimentary</span></div>
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-sand/40 italic mt-[-10px] mb-8 pl-1">
                * Note: Rates differ during long weekends & holidays.
              </p>

              {/* Inclusions List */}
              <div className="space-y-5">
                <h4 className="text-xs uppercase tracking-widest text-sand/40 font-semibold mb-2">Package Inclusions:</h4>
                
                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <Coffee className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Welcome Breakfast</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <Utensils className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Sumptuous Buffet Lunch</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <Sunset className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Evening High Tea with a Lakeside View</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <Compass className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Unlimited Access to Activities & Games</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 pt-0">
              <button 
                onClick={() => onOpenBooking("day-outing")}
                className="w-full py-4 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer shadow-lg shadow-pink-950/20"
              >
                <span>Book Day Outing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Ultimate Stay Package - Code Blue */}
          <motion.div 
            className="rounded-2xl overflow-hidden glass-panel border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 relative group flex flex-col justify-between h-full bg-gradient-to-b from-blue-500/[0.02] to-transparent"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glowing Accent */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent group-hover:via-blue-500/75 transition-all duration-500" />
            
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3 py-1 bg-blue-500/15 border border-blue-500/35 text-blue-400 text-[8px] font-sans font-bold uppercase tracking-[0.25em] rounded-full mb-3 inline-block">
                    Code - Blue
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-white uppercase tracking-wider">
                    Ultimate Stay Package
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-sans font-semibold text-blue-400">
                    ₹2,200<span className="text-xs text-sand/50 font-normal"> / Person</span>
                  </div>
                  <div className="text-[8px] md:text-[9px] text-sand/40 uppercase tracking-widest font-medium mt-0.5">
                    Weekday Starting Rate
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 bg-[#030f26]/40 border border-sand/10 rounded-xl p-4 mb-6 text-xs text-sand/80 divide-y xs:divide-y-0 xs:divide-x divide-sand/10">
                <div className="pb-3 xs:pb-0 xs:pr-3">
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold block mb-1">Weekdays</span>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>Adult:</span><span className="text-white font-medium">₹2,200</span></div>
                    <div className="flex justify-between"><span>5–12 yrs:</span><span className="text-white font-medium">₹1,100</span></div>
                    <div className="flex justify-between"><span>Under 5:</span><span className="text-emerald-400 font-medium">Complimentary</span></div>
                  </div>
                </div>
                <div className="pt-3 xs:pt-0 xs:pl-3">
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold block mb-1">Weekends</span>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span>Adult:</span><span className="text-white font-medium">₹2,800</span></div>
                    <div className="flex justify-between"><span>5–12 yrs:</span><span className="text-white font-medium">₹1,400</span></div>
                    <div className="flex justify-between"><span>Under 5:</span><span className="text-emerald-400 font-medium">Complimentary</span></div>
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-sand/40 italic mt-[-10px] mb-8 pl-1">
                * Note: Rates differ during long weekends & holidays.
              </p>

              {/* Inclusions List */}
              <div className="space-y-5">
                <h4 className="text-xs uppercase tracking-widest text-sand/40 font-semibold mb-2">Package Inclusions:</h4>
                
                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Tent className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Luxury Glamping Dome or Small Tent Accommodation</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Sunset className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Evening High Tea at Lakeside Sunset</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Flame className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Special Hosted Event (Bonfire, Music, etc.)</span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Utensils className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm text-sand/80 font-sans">Gourmet Dinner & Next-Morning Breakfast</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 pt-0">
              <button 
                onClick={() => onOpenBooking("stay-package")}
                className="w-full py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.01] cursor-pointer shadow-lg shadow-blue-950/20"
              >
                <span>Book Stay Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Common Inclusions Footer Banner */}
        <motion.div 
          className="max-w-5xl mx-auto rounded-2xl glass-panel border border-sand/10 p-8 text-center relative bg-[#030f26]/20 mb-12"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-sunset font-semibold mb-4 block">
            Included in All Packages
          </span>
          <h3 className="text-lg md:text-xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Enjoy Unlimited Access To These Resort Activities
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {inclusionsAll.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center p-3 rounded-lg hover:bg-[#030a16]/40 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-sunset/10 border border-sunset/20 flex items-center justify-center text-sunset mb-3">
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-sans text-sand/85 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Digital Brochure Banner Section */}
        <motion.div 
          className="max-w-5xl mx-auto rounded-2xl border border-sunset/20 p-8 md:p-12 text-center relative bg-gradient-to-r from-sunset/5 via-transparent to-sunset/5 overflow-hidden mb-16 shadow-xl shadow-sunset/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle glow background element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-sunset/10 blur-3xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-sunset/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-sunset font-semibold mb-3 block">
                Digital Brochure
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-4 uppercase tracking-wider">
                Download Our Complete Guide
              </h3>
              <p className="text-sand/80 text-xs md:text-sm font-sans leading-relaxed">
                Planning a corporate getaway, an exotic destination wedding, or a weekend group stay? Get all details about Lake N Trails Exotic Glamping in a handy PDF. Features amenities, package inclusions, and custom event menus.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href="/images/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-sand/30 hover:border-sunset text-white hover:text-sunset text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-[#030a16]/40 cursor-pointer shadow-lg hover:shadow-sunset/10"
              >
                <Eye className="w-4 h-4" />
                <span>View Online</span>
              </a>
              <a 
                href="/images/brochure.pdf"
                download="Lake_N_Trails_Exotic_Glamping_Brochure.pdf"
                className="px-6 py-3.5 rounded-full bg-sunset hover:bg-[#fd5e53] text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sunset/15 hover:shadow-sunset/25 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-sand/5 mt-16 max-w-2xl mx-auto" />

      </div>

    </section>
  );
}
