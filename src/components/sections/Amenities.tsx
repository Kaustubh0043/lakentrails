"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tent, 
  Waves, 
  Utensils, 
  Flame, 
  Compass, 
  Tv, 
  Sparkles, 
  X, 
  Check, 
  Smile, 
  ShieldAlert
} from "lucide-react";

export default function Amenities() {
  const [isOpen, setIsOpen] = useState(false);

  // Quick-view amenities (8 key items)
  const quickAmenities = [
    { icon: <Tent className="w-5 h-5 text-sunset" />, name: "Luxury Waterproof Tents", desc: "Cozy bedding, premium blankets & pillows" },
    { icon: <Waves className="w-5 h-5 text-sunset" />, name: "Infinity Pool Access", desc: "Unobstructed views of mountains & dam" },
    { icon: <Utensils className="w-5 h-5 text-sunset" />, name: "Separate Veg / Non-Veg Kitchens", desc: "Premium quality cooking oils (No palm oil)" },
    { icon: <Flame className="w-5 h-5 text-sunset" />, name: "Lakeside Bonfire & BBQ", desc: "DIY BBQ setups & warm campfire chats" },
    { icon: <Compass className="w-5 h-5 text-sunset" />, name: "Adventure Trekking", desc: "Guided trails & nearby waterfall visits" },
    { icon: <Smile className="w-5 h-5 text-sunset" />, name: "Pet-Friendly Glamping", desc: "Open spaces & activities for your furry friends" },
    { icon: <Tv className="w-5 h-5 text-sunset" />, name: "Outdoor Big Screen Movie", desc: "Night screenings under the starlit sky" },
    { icon: <Sparkles className="w-5 h-5 text-sunset" />, name: "Activity Zone Games", desc: "Table tennis, volleyball, dartboard & badminton" },
  ];

  // Full detailed categorization for the "Show all amenities" Modal
  const detailedAmenities = [
    {
      category: "Stays & Accommodations",
      items: [
        "Premium geodesic glamping domes & waterproof tents",
        "Cozy clean bedding (sheets, pillows, warm blankets)",
        "Clean, modern common washrooms & vanity area",
        "Scenic lakeside view sitouts & premium hammocks",
        "Dedicated charging points inside/near tents"
      ]
    },
    {
      category: "Kitchen & Dining",
      items: [
        "Strictly separate Veg & Non-Veg kitchen spaces",
        "High-quality cooking oils used (Absolutely NO palm oil)",
        "Complimentary High Tea, snacks & morning breakfast",
        "DIY BBQ preparation & dedicated marination service",
        "Delicious à la carte dinner ordering starts at 8:00 PM"
      ]
    },
    {
      category: "Activities & Water Sports",
      items: [
        "Waterfront Kayaking (life jackets mandatory, weather permitting)",
        "Infinity Pool access (4:00 PM - 9:00 PM)",
        "Ice Bath therapy session at the Activity Zone",
        "Scenic Watch Tower for photo-ops & sunset views",
        "Guided mountain trekking & local Adoshi Waterfall visits"
      ]
    },
    {
      category: "Games & Entertainment",
      items: [
        "Table Tennis & Badminton court racket games",
        "Sand Volleyball court & pool games",
        "Creative art & canvas painting sessions",
        "Indoor board games (Uno, playing cards, puzzles, magnetic games)",
        "Lakeside DJ & Music Night setups",
        "Big screen outdoor movie screenings under the stars"
      ]
    },
    {
      category: "Safety & Policies",
      items: [
        "Mandatory life jacket rules for all lake activities",
        "First-aid emergency kit & on-site security guards",
        "Eco-friendly waste management rules",
        "Dedicated safe parking space on premises",
        "Pet-friendly guidelines (special pet meals available on request)"
      ]
    }
  ];

  return (
    <section className="relative w-full py-16 bg-[#030a16] border-t border-b border-sand/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Text Header */}
          <div className="lg:col-span-4 text-left">
            <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-2 block font-medium">
              Convenience & Comfort
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4 uppercase tracking-wider">
              What This <br />
              <span className="text-glow-sunset italic font-normal text-sunset">Place Offers</span>
            </h2>
            <p className="text-sand/75 text-sm font-sans leading-relaxed mb-6">
              Our Adoshi Dam campsite blends luxury glamping with active adventure. Review all the amenities, custom cooking rules, and recreational activities included in your stay.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 rounded-xl border border-sand/20 hover:border-sunset text-white hover:text-sunset text-xs font-sans uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer bg-white/5 hover:bg-white/10"
            >
              Show All 25+ Amenities
            </button>
          </div>

          {/* Right Quick Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-left">
            {quickAmenities.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start group p-4 rounded-xl hover:bg-[#030f26]/30 border border-transparent hover:border-sand/10 transition-all duration-300">
                <div className="p-3 rounded-lg bg-[#030f26]/60 border border-sand/10 group-hover:border-sunset/40 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-serif font-medium text-white mb-0.5 group-hover:text-sunset transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-sand/50 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Full Amenities Modal (Airbnb-style detail sheet) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-3xl bg-[#030a16] border border-sand/20 rounded-2xl relative z-10 max-h-[85vh] flex flex-col overflow-hidden text-left"
            >
              {/* Glow accent */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sunset via-orange-500 to-amber-500" />

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-sand/65 hover:text-sunset transition-colors p-2 cursor-pointer z-30"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="p-6 pb-4 border-b border-sand/10 flex-shrink-0">
                <h3 className="text-xl md:text-2xl font-serif font-light text-white uppercase tracking-wider">
                  What this place <span className="text-sunset italic font-normal">Offers</span>
                </h3>
                <p className="text-[10px] text-sand/40 font-sans uppercase tracking-widest mt-1">
                  Full amenities list & terms as per official brochure
                </p>
              </div>

              {/* Body (Scrollable) */}
              <div className="p-6 overflow-y-auto flex-1 space-y-8 pr-4">
                {detailedAmenities.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-3.5">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-sunset border-b border-sand/5 pb-1">
                      {group.category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {group.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-sand/80 font-sans leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Important Notes banner */}
                <div className="p-4 rounded-xl bg-sunset/5 border border-sunset/15 flex gap-3.5 items-start mt-6">
                  <ShieldAlert className="w-5 h-5 text-sunset flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-sans font-semibold text-sunset uppercase tracking-wider">Camping Terms & Rules</h5>
                    <p className="text-[10px] text-sand/60 font-sans leading-relaxed mt-1">
                      * Life jackets are strictly mandatory for all lake activities. Cooking oils are high-quality only. Guests are kindly requested to maintain eco-hygiene and respect other glampers.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
