"use client";

import { motion } from "framer-motion";
import { Sunrise, Sunset as SunsetIcon, Ship, Camera } from "lucide-react";

export default function Sunset() {
  const highlights = [
    {
      icon: <SunsetIcon className="w-5 h-5 text-sunset" />,
      label: "Golden Hour Gazebo",
      text: "The ultimate deck to watch the sun slip behind the Sahyadri mountains.",
    },
    {
      icon: <Ship className="w-5 h-5 text-sunset" />,
      label: "Kayaking & Rowboats",
      text: "Paddle out into the calm water as the sunset colors reflect around you.",
    },
    {
      icon: <Camera className="w-5 h-5 text-sunset" />,
      label: "Visual Shoots",
      text: "Ideal lighting and reflections for premium photography and couples' shots.",
    },
  ];

  return (
    <section id="sunset" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden">
      {/* Intense Golden Hour Sunlight Overlay Simulation */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-sunset/10 blur-[130px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Golden Hour Magic
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            The Sunset <span className="text-glow-sunset italic font-normal text-sunset">Experience</span>
          </motion.h2>
          <motion.p 
            className="text-sand/80 text-sm md:text-base font-sans leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            When the sky catches fire and the lake mirrors the warm colors of dusk, LakeNtrails transforms into a dreamy paradise. It is a moment of pure magic, perfect for quiet reflection, photography, or enjoying high-tea with friends on our sunset decks.
          </motion.p>
        </div>

        {/* Triple Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-8 rounded-2xl glass-panel border border-sand/15 hover:border-sunset/40 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
            >
              <div className="w-12 h-12 rounded-full bg-sunset/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-serif font-light uppercase tracking-wider text-[#fcfbf7] mb-3 group-hover:text-sunset transition-colors">
                {item.label}
              </h3>
              <p className="text-xs text-sand/65 font-sans leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Large Cinematic Wide Photo block */}
        <motion.div
          className="mt-16 w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden relative glass-panel border border-sand/20 group cursor-pointer"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-103"
            style={{ backgroundImage: "url('/images/lakesideview3.jpeg')" }}
          />
          <div className="absolute inset-0 bg-orange-950/20 group-hover:bg-transparent transition-colors duration-700 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030a16] via-[#030a16]/30 to-transparent z-[2]" />
          
          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="text-left">
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-sunset mb-2 block font-semibold">
                Daily Sunset Ritual
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-light text-white uppercase tracking-wider">
                Quiet Waters, Blazing Skies
              </h3>
            </div>
            <div className="flex gap-4">
              <span className="text-xs font-serif italic text-sand/80 max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-sunset px-4 py-1">
                “There is nothing more beautiful than the lake when it reflects the crimson and gold of the departing sun.”
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
