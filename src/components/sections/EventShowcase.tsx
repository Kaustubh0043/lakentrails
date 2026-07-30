"use client";

import { motion } from "framer-motion";
import { Music, CloudRain, Flame, Heart, Briefcase, Sparkles } from "lucide-react";

interface EventShowcaseProps {
  onOpenBooking: () => void;
}

export default function EventShowcase({ onOpenBooking }: EventShowcaseProps) {
  const events = [
    {
      icon: <Music className="w-6 h-6 text-sunset" />,
      title: "DJ Night Parties",
      tag: "VIBRANT VIBES",
      desc: "Dance to pounding electronic and commercial music on our lakeside deck, lit with neon strobe setups.",
    },
    {
      icon: <CloudRain className="w-6 h-6 text-sunset" />,
      title: "Lakeside Rain Dance",
      tag: "COOL ESCAPE",
      desc: "Beat the heat and dive into fun with high-pressure overhead showers synchronized to music.",
    },
    {
      icon: <Flame className="w-6 h-6 text-sunset" />,
      title: "Acoustic Bonfire Jamming",
      tag: "COZY RETREAT",
      desc: "Gather under stars for live unplugged sessions, acoustic guitar notes, and roasted marshmallows.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sunset" />,
      title: "Custom Celebrations",
      tag: "MEMORABLE EVENTS",
      desc: "Host breathtaking birthdays, anniversaries, and custom lakeside parties on our lush lawns.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-sunset" />,
      title: "Corporate Retreats",
      tag: "TEAM BONDING",
      desc: "Energize your workforce with team-building games, kayaking, and luxurious dinners.",
    },
  ];

  return (
    <section id="events" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-luxury-teal/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Dynamic Gatherings
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Events & <br />
            <span className="text-glow-sunset italic font-normal text-sunset">Resort Showcases</span>
          </h2>
          <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed">
            From loud music dance floors to peaceful stargazing bonfires, explore our curated resort happenings.
          </p>
        </div>

        {/* Timeline-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              className="p-8 rounded-2xl glass-panel border border-sand/15 hover:border-sunset/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between group h-full shadow-lg relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Top Accent Icon & Tag */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sunset/10 flex items-center justify-center group-hover:scale-108 transition-transform duration-300">
                    {event.icon}
                  </div>
                  <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.25em] text-sunset px-2.5 py-1 rounded-full bg-sunset/10">
                    {event.tag}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-light uppercase tracking-wider text-white mb-3 group-hover:text-sunset transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-xs text-sand/65 font-sans leading-relaxed">
                  {event.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-sand/10 flex items-center justify-between">
                <span className="text-[9px] font-sans text-sand/40 uppercase tracking-widest">Inquire for pricing</span>
                <button
                  onClick={onOpenBooking}
                  className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-sunset hover:text-white transition-colors cursor-pointer flex items-center gap-1 group/btn"
                >
                  Book Event 
                  <Sparkles className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
