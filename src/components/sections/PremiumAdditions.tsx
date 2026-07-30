"use client";

import { useState } from "react";
import { 
  CloudSun, 
  MapPin, 
  CheckSquare, 
  Compass, 
  Sun, 
  Moon, 
  Thermometer, 
  Wind, 
  Compass as CompassIcon, 
  Check, 
  ChevronRight,
  Flame,
  Waves
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumAdditions() {
  const [activeTab, setActiveTab] = useState<"weather" | "attractions" | "checklist" | "tour">("weather");
  
  // Checklist state
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Sturdy trekking shoes (for Adoshi waterfall trail)", checked: false, category: "gear" },
    { id: 2, text: "Quick-dry clothes & swimwear (for infinity pool & kayaking)", checked: false, category: "gear" },
    { id: 3, text: "Mosquito repellent cream (essential for lakeside forests)", checked: false, category: "monsoon" },
    { id: 4, text: "Windbreaker or light jacket (evenings get chilly)", checked: false, category: "monsoon" },
    { id: 5, text: "Pet leash, treats & vaccination cert (if bringing your pet)", checked: false, category: "pet" },
    { id: 6, text: "Waterproof pouch for phones (during kayaking activities)", checked: false, category: "gear" },
    { id: 7, text: "Personal toiletries & dynamic slides/slippers", checked: false, category: "gear" },
    { id: 8, text: "Portable powerbank (for capturing late night stargazing)", checked: false, category: "tech" }
  ]);

  const toggleChecklistItem = (id: number) => {
    setChecklistItems(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const checkedCount = checklistItems.filter(i => i.checked).length;
  const progressPercent = Math.round((checkedCount / checklistItems.length) * 100);

  // Mapped Attractions Data
  const attractions = [
    {
      name: "Adoshi Dam & Reservoir",
      distance: "2 min walk",
      desc: "Lush shoreline directly adjoining our resort. Perfect for early morning reflection, photography, or launchpad for kayaking.",
      tag: "Nature & Lake"
    },
    {
      name: "Adoshi Seasonal Waterfalls",
      distance: "5 min trek",
      desc: "A beautiful seasonal cascade hiding right behind our lawns. Easy scenic trail guided by our resort team.",
      tag: "Monsoon Special"
    },
    {
      name: "Imagicaa Theme Park",
      distance: "15 min drive",
      desc: "India's premier entertainment park featuring adrenaline-pumping rides and a water park. Great for pre-checkin excitement.",
      tag: "Adventure Park"
    },
    {
      name: "Zenith Waterfalls (Khopoli)",
      distance: "20 min drive",
      desc: "One of the most famous heavy monsoon treks in Maharashtra, offering spectacular valley views and deep forest pools.",
      tag: "Monsoon Trek"
    }
  ];

  // 360 Tour State (simulating panorama frame rotation offset)
  const [tourRotation, setTourRotation] = useState(0);

  return (
    <section id="companion" className="relative w-full py-20 bg-[#030a16] overflow-hidden border-b border-sand/5">
      {/* Mesh Glow Background */}
      <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-luxury-teal/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Resort Companion
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-4 uppercase tracking-wider font-semibold">
            Lakeside <span className="text-glow-sunset italic font-normal text-sunset">Guides & Tools</span>
          </h2>
          <p className="text-sand/80 text-sm font-sans leading-relaxed">
            Prepare for your glamping journey with our interactive tools, packing checklists, local weather, and nearby exploration guides.
          </p>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto font-sans">
          {[
            { id: "weather", icon: <CloudSun className="w-4 h-4" />, label: "Weather & Sun" },
            { id: "attractions", icon: <MapPin className="w-4 h-4" />, label: "Local Attractions" },
            { id: "checklist", icon: <CheckSquare className="w-4 h-4" />, label: "Packing Checklist" },
            { id: "tour", icon: <Compass className="w-4 h-4" />, label: "360° Virtual Preview" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-sunset border-sunset text-white shadow-lg shadow-sunset/15 animate-none"
                  : "bg-[#030f26]/30 border-sand/15 text-sand hover:border-sunset/50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content Area */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl border border-sand/15 overflow-hidden shadow-2xl relative bg-[#030f26]/10">
          
          <AnimatePresence mode="wait">
            
            {/* TAB 1: WEATHER & LAKESIDE Breeze */}
            {activeTab === "weather" && (
              <motion.div
                key="weather"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left"
              >
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-sunset font-bold font-sans">Khopoli Lakeside Live</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white font-light mt-1">Lakeside Weather</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 font-sans">
                    <div className="bg-white/5 border border-sand/10 rounded-xl p-4.5">
                      <span className="block text-[8px] uppercase tracking-widest text-sand/40 font-bold mb-1">Temperature</span>
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-5 h-5 text-sunset" />
                        <span className="text-2xl font-sans font-semibold text-white">24°C</span>
                      </div>
                      <span className="text-[9px] text-sand/50 block mt-1">Cool Lakeside Breeze</span>
                    </div>

                    <div className="bg-white/5 border border-sand/10 rounded-xl p-4.5">
                      <span className="block text-[8px] uppercase tracking-widest text-sand/40 font-bold mb-1">Wind Speed</span>
                      <div className="flex items-center gap-2">
                        <Wind className="w-5 h-5 text-[#0d9488]" />
                        <span className="text-xl font-sans font-semibold text-white">12 km/h</span>
                      </div>
                      <span className="text-[9px] text-sand/50 block mt-1">From Adoshi Reservoir</span>
                    </div>
                  </div>

                  <div className="bg-sunset/10 border border-sunset/35 rounded-xl p-4 flex justify-between items-center gap-3 font-sans">
                    <div className="flex items-center gap-2.5">
                      <Flame className="w-5 h-5 text-sunset" />
                      <div>
                        <h4 className="text-xs font-semibold text-white">Lakeside Bonfire Status</h4>
                        <p className="text-[9px] text-sand/60">Scheduled for 7:30 PM - 10:30 PM</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-sunset/20 text-sunset px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Confirmed</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 border border-sand/10 rounded-xl p-5 space-y-4 text-xs font-sans text-sand/70">
                    <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider pb-2 border-b border-sand/5 flex items-center gap-1.5">
                      <CompassIcon className="w-4 h-4 text-sunset" /> Activities Feasibility Check
                    </h4>
                    
                    {[
                      { name: "Lakeside Kayaking & Boating", status: "Highly Recommended" },
                      { name: "Infinity Pool Relaxation", status: "Active (4 PM - 9 PM)" },
                      { name: "Late Night Bonfire & Acoustic", status: "Active (Clear Sky)" },
                      { name: "Adoshi Waterfall Forest Trek", status: "Guided Path Safe" }
                    ].map((act, i) => (
                      <div key={i} className="flex justify-between items-center gap-2">
                        <span className="font-medium text-white">{act.name}</span>
                        <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> {act.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: LOCAL ATTRACTIONS MAP */}
            {activeTab === "attractions" && (
              <motion.div
                key="attractions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-10 text-left space-y-6"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-sunset font-bold font-sans">Nearby Exploration</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white font-light mt-1">Local Attractions Guide</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attractions.map((attr, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/5 border border-sand/10 hover:border-sunset/40 rounded-xl p-5 hover:bg-[#030f26]/30 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <span className="text-[8px] bg-sunset/15 text-sunset px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans mb-1.5 inline-block">
                            {attr.tag}
                          </span>
                          <h4 className="text-sm font-serif font-bold text-white group-hover:text-sunset transition-colors">
                            {attr.name}
                          </h4>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-[#0d9488] font-bold font-sans bg-[#0d9488]/10 px-2.5 py-1 rounded-lg shrink-0">
                          {attr.distance}
                        </span>
                      </div>
                      <p className="text-[10px] text-sand/50 font-sans mt-2.5 leading-relaxed">
                        {attr.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: PACKING CHECKLIST */}
            {activeTab === "checklist" && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-10 text-left space-y-6 font-sans text-xs"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-sunset font-bold">Interactive Packing Assistant</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white font-light mt-1">Glamping Packing Checklist</h3>
                  </div>
                  
                  {/* Progress tracker */}
                  <div className="w-full sm:w-48 space-y-1.5 shrink-0 bg-white/5 border border-sand/10 rounded-xl p-3">
                    <div className="flex justify-between text-[10px] font-bold text-white uppercase tracking-wider">
                      <span>Packing Progress</span>
                      <span className="text-sunset">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#030a16] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-sunset" 
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span className="text-[9px] text-sand/40 block text-right">{checkedCount} of {checklistItems.length} packed</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {checklistItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                        item.checked 
                          ? "bg-sunset/10 border-sunset/40 text-white" 
                          : "bg-white/5 border-sand/10 text-sand/70 hover:border-sunset/35"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        item.checked ? "bg-sunset border-sunset text-white" : "border-sand/30"
                      }`}>
                        {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`text-[11px] leading-snug select-none ${item.checked ? "line-through text-sand/40" : ""}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 4: 360 VIRTUAL PREVIEW */}
            {activeTab === "tour" && (
              <motion.div
                key="tour"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-10 text-left space-y-6"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-sunset font-bold font-sans">Lakeside 360 Panorama</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white font-light mt-1">360° Virtual Preview</h3>
                </div>

                {/* Coming Soon Showcase */}
                <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden border border-sand/15 bg-[#030a16] flex flex-col items-center justify-center p-5 sm:p-8 text-center group shadow-lg dark-force">
                  {/* Blurred Background image for high-end feel */}
                  <img 
                    src="/images/resort_background_hd_4k.jpg" 
                    alt="360 Tour coming soon preview" 
                    className="absolute inset-0 w-full h-full object-cover blur-[6px] opacity-40"
                  />
                  <div className="absolute inset-0 bg-[#030a16]/80 backdrop-blur-sm pointer-events-none" />

                  <div className="relative z-10 space-y-3 sm:space-y-4 max-w-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-sunset/30 bg-sunset/10 flex items-center justify-center text-sunset mx-auto animate-pulse">
                      <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.3em] text-sunset font-bold uppercase">Coming Soon</span>
                      <h4 className="text-sm sm:text-lg font-serif font-light text-white uppercase tracking-wider">360° Immersive Walkthrough</h4>
                      <p className="text-[9px] sm:text-[10px] text-white/70 font-sans leading-relaxed">
                        We are currently capturing our premium geodesic domes, starlit camping decks, and lakeside dining areas in stunning 8K panoramic photography. Stay tuned!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
