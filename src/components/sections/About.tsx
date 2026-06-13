"use client";

import { motion } from "framer-motion";
import { Compass, Music, Flame, Sparkles, MapPin, Smile } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const amenities = [
    {
      icon: <Compass className="w-5 h-5 text-sunset" />,
      title: "Kayaking & Boating",
      desc: "Chart your path across the quiet ripples of Adoshi lake.",
    },
    {
      icon: <Flame className="w-5 h-5 text-sunset" />,
      title: "Bonfire & Camping",
      desc: "Gather under a velvet sky for stories, warmth, and acoustic tunes.",
    },
    {
      icon: <Music className="w-5 h-5 text-sunset" />,
      title: "DJ Nights & Rain Dance",
      desc: "Electrify your senses with lakeside club beats and vibrant rain parties.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-sunset" />,
      title: "Weddings & Celebrations",
      desc: "Host breathtaking destination weddings on the scenic shoreline.",
    },
    {
      icon: <Smile className="w-5 h-5 text-sunset" />,
      title: "Pet-Friendly Stay",
      desc: "Bring your furry family members along for the outdoor adventures.",
    },
    {
      icon: <MapPin className="w-5 h-5 text-sunset" />,
      title: "Prime Location",
      desc: "Easily accessible sanctuary nestled in Khopoli, Maharashtra.",
    },
  ];

  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden">
      {/* Background Soft Glow Mesh */}
      <div className="absolute top-[30%] left-[60%] w-[500px] h-[500px] rounded-full bg-emerald-dark/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span 
              variants={itemVariants}
              className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 font-medium"
            >
              The Sanctuary
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight"
            >
              Where Lush Tropics Meet <br />
              <span className="text-glow-sunset italic font-normal text-sunset">Serene Waters</span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-sand/80 text-sm md:text-base font-sans leading-relaxed mb-6 max-w-xl"
            >
              LakeNtrails is a futuristic lakeside tropical resort designed for seekers of ultimate luxury and electric vibes. Tucked away near Adoshi Dam, Khopoli, we blend the peaceful, lush green atmosphere of Bali with next-generation party vibes, camping under the starlit skies, and dynamic lake activities. 
            </motion.p>

            {/* Travel Distance Badges */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-8 text-[10px] font-sans font-medium uppercase tracking-wider"
            >
              <span className="px-3.5 py-1.5 rounded-full bg-sunset/10 border border-sunset/25 text-sunset">🚗 25 km from Lonavala (~30 mins)</span>
              <span className="px-3.5 py-1.5 rounded-full bg-sunset/10 border border-sunset/25 text-sunset">🚗 80 km from Mumbai (~1.5 hrs)</span>
              <span className="px-3.5 py-1.5 rounded-full bg-sunset/10 border border-sunset/25 text-sunset">🚗 90 km from Pune (~1.5 hrs)</span>
            </motion.div>

            {/* Amenities Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-4"
            >
              {amenities.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="p-2.5 rounded-lg bg-[#030f26]/40 border border-sand/10 group-hover:border-sunset/40 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-medium text-[#fcfbf7] mb-1 group-hover:text-sunset transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-sand/60 font-sans leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image/Mesh Column */}
          <motion.div 
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-sand/20 group cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {/* Visual background image with zoom hover */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/lakesideview.jpeg')" }}
            />
            {/* Matte gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030a16] via-transparent to-transparent opacity-60 z-[1]" />
            <div className="absolute inset-0 bg-emerald-dark/10 group-hover:bg-sunset/5 transition-colors duration-500 z-[1]" />

            {/* Dynamic visual overlay text */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-sunset mb-2 block font-semibold">
                Lakeside Gateway
              </span>
              <h3 className="text-2xl font-serif font-light text-white leading-tight uppercase tracking-wider mb-2">
                A Pet-Friendly Oasis
              </h3>
              <p className="text-[11px] font-sans text-sand/70 leading-relaxed max-w-xs">
                Walk down our stone steps directly to the waterfront shore. Our palm-fringed shoreline lawns provide a spacious, open space for your pets to run, play, and enjoy the cool lake breeze.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
