"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface GalleryItem {
  src: string;
  title: string;
  category: string;
  type: "image" | "video";
  colSpan?: string;
  rowSpan?: string;
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      src: "/images/DVP_9208.JPG",
      title: "Premium Shoreline Lounger Deck (1)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9209.JPG",
      title: "Romantic Dinner Setup by the Water (2)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9210.JPG",
      title: "Lakeside Glamping Dome View (3)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9212.JPG",
      title: "Infinity Pool overlooking Adoshi Lake (4)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9213.JPG",
      title: "Starlit Event & Gathering Space (5)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9214.JPG",
      title: "Serene Lake & Sahyadri Peaks (6)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9215.JPG",
      title: "Inside our Luxury Geodesic Dome (7)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9216.JPG",
      title: "Lush Greenery Surrounding the Retreat (8)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9217.JPG",
      title: "Reflecting Pool & Lakeside Palms (9)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9218.JPG",
      title: "Lakeside Gatherings on Lawn (10)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9219.JPG",
      title: "Cozy Canopy Lounge & Sitout (11)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9220.JPG",
      title: "Panoramic Palms & Waterfront Steps (12)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9221.JPG",
      title: "Gateway Steps from Reservoir (13)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9222.JPG",
      title: "Stunning Overlook of Adoshi Reservoir (14)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9223.JPG",
      title: "Sunset Skies over Mountain Ridges (15)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9224.JPG",
      title: "Infinity Pool Shimmering in the Sun (16)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9226.JPG",
      title: "Lakeside Sunset Palms Silhouette (17)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9227.JPG",
      title: "Dazzling Sunset Paint on the Sky (18)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9228.JPG",
      title: "Tropical Hammocks & Gardens (19)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9229.JPG",
      title: "Luxury Geodesic Dome Silhouette (20)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9230.JPG",
      title: "Luxury Dining Under the Palm Canopy (21)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9231.JPG",
      title: "Sunrise Reflections over Swimming Pool (22)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9232.JPG",
      title: "Kayaks Ready on the Shore (23)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9233.JPG",
      title: "Fairytale Wedding Setup by the Water (24)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9234.JPG",
      title: "Lakeside Reception Ceremony Setup (25)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9235.JPG",
      title: "Warm Firepit Sparkles & Glamping (26)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9236.JPG",
      title: "Exquisite Geodesic Dome Suite Interior (27)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9237.JPG",
      title: "Fresh Grilled Tandoor Lakeside Plating (28)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9243.JPG",
      title: "Resort Pathway in Lush Green Surroundings (29)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9245.JPG",
      title: "Sunset High Tea overlooking the Waters (30)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9246.JPG",
      title: "Relaxing Deck Loungers by the Infinity Pool (31)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9247.JPG",
      title: "Elegant Floral Canopy Detail (32)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9248.JPG",
      title: "Lakeside Kayaks & Jetty Platform (33)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9249.JPG",
      title: "Artisanal Woodfired Clay Oven Pizzas (34)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9250.JPG",
      title: "Premium Shoreline Lounger Deck (35)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9252.JPG",
      title: "Romantic Dinner Setup by the Water (36)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9253.JPG",
      title: "Lakeside Glamping Dome View (37)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9254.JPG",
      title: "Infinity Pool overlooking Adoshi Lake (38)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9255.JPG",
      title: "Starlit Event & Gathering Space (39)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9256.JPG",
      title: "Serene Lake & Sahyadri Peaks (40)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9257.JPG",
      title: "Inside our Luxury Geodesic Dome (41)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9258.JPG",
      title: "Lush Greenery Surrounding the Retreat (42)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9260.JPG",
      title: "Reflecting Pool & Lakeside Palms (43)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9261.JPG",
      title: "Lakeside Gatherings on Lawn (44)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9262.JPG",
      title: "Cozy Canopy Lounge & Sitout (45)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9263.JPG",
      title: "Panoramic Palms & Waterfront Steps (46)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9264.JPG",
      title: "Gateway Steps from Reservoir (47)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9265.JPG",
      title: "Stunning Overlook of Adoshi Reservoir (48)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9266.JPG",
      title: "Sunset Skies over Mountain Ridges (49)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9267.JPG",
      title: "Infinity Pool Shimmering in the Sun (50)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9268.JPG",
      title: "Lakeside Sunset Palms Silhouette (51)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9269.JPG",
      title: "Dazzling Sunset Paint on the Sky (52)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9270.JPG",
      title: "Tropical Hammocks & Gardens (53)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9271.JPG",
      title: "Luxury Geodesic Dome Silhouette (54)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9272.JPG",
      title: "Luxury Dining Under the Palm Canopy (55)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9273.JPG",
      title: "Sunrise Reflections over Swimming Pool (56)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9274.JPG",
      title: "Kayaks Ready on the Shore (57)",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9276.JPG",
      title: "Fairytale Wedding Setup by the Water (58)",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9277.JPG",
      title: "Lakeside Reception Ceremony Setup (59)",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9278.JPG",
      title: "Warm Firepit Sparkles & Glamping (60)",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9279.JPG",
      title: "Exquisite Geodesic Dome Suite Interior (61)",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9280.JPG",
      title: "Fresh Grilled Tandoor Lakeside Plating (62)",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9281.JPG",
      title: "Resort Pathway in Lush Green Surroundings (63)",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
  ];

  // Filtering Categories list
  const categories = [
    "All",
    "Glamping Dome",
    "Swimming Pool Vibe",
    "Lakeside View",
    "Sunset Experience",
    "Dining & BBQ",
    "Destination Weddings",
    "Resort Lifestyle",
  ];

  // Apply filters
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  // Navigation handlers for Lightbox
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-[30%] left-[20%] w-[450px] h-[450px] rounded-full bg-luxury-teal/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Visual Storytelling
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Resort <span className="text-glow-sunset italic font-normal text-sunset">Gallery</span>
          </h2>
          <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed">
            Step into the magical atmosphere of LakeNtrails. Explore our real drone footage and snaps highlighting beautiful sunsets, luxury glamping, poolside vibe stay, romantic weddings, and lakeside tables.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(12); // Reset count on filter change
              }}
              className={`px-4 py-2 rounded-full text-[10px] font-sans font-medium uppercase tracking-[0.15em] transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? "bg-sunset border-sunset text-white shadow-lg shadow-sunset/15"
                  : "bg-[#030f26]/40 border-sand/15 text-sand hover:text-white hover:border-sunset/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item, idx) => (
              <motion.div
                key={`${item.src}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`${item.colSpan || "md:col-span-1"} ${item.rowSpan || "h-[300px]"} rounded-2xl overflow-hidden glass-panel border border-sand/15 relative group cursor-pointer`}
                onClick={() => setActiveIdx(idx)}
              >
                {/* Media Element */}
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a16]/90 via-[#030a16]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-[1] pointer-events-none" />
                <div className="absolute inset-0 border border-transparent group-hover:border-sunset/30 rounded-2xl transition-colors duration-500 z-[2] pointer-events-none" />

                {/* Hover content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 pointer-events-none">
                  <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-sunset mb-1.5 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    {item.category}
                  </span>
                  <h3 className="text-base font-serif font-light text-[#fcfbf7] opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-out">
                    {item.title}
                  </h3>
                  
                  {/* Maximize / Preview Icon */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full glass-panel border border-sand/20 flex items-center justify-center text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, filteredItems.length))}
              className="px-8 py-3.5 rounded-full bg-[#fcfbf7] text-black hover:bg-sunset hover:text-white text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-0.5"
            >
              View More Snaps
            </button>
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {activeIdx !== null && filteredItems[activeIdx] && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
            />

            {/* Content box */}
            <motion.div
              className="w-full max-w-5xl aspect-video md:aspect-[16/9] relative z-10 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30 }}
            >
              {/* Media viewer */}
              <img
                src={filteredItems[activeIdx].src}
                alt={filteredItems[activeIdx].title}
                className="w-full h-full object-contain max-h-[80vh] rounded-2xl shadow-2xl"
              />

              {/* Top Banner Info */}
              <div className="absolute top-4 left-4 z-20 text-left glass-panel py-2.5 px-4 rounded-xl border border-sand/15 bg-black/40 backdrop-blur-sm">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-sunset font-semibold block">
                  {filteredItems[activeIdx].category}
                </span>
                <h3 className="text-sm md:text-base font-serif font-light text-white leading-normal">
                  {filteredItems[activeIdx].title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-sunset transition-colors duration-300 p-2.5 glass-panel rounded-full border border-sand/20 cursor-pointer bg-black/40 backdrop-blur-sm"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Left / Right */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3.5 glass-panel rounded-full border border-sand/20 text-white/70 hover:text-sunset hover:border-sunset transition-all cursor-pointer bg-black/40 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3.5 glass-panel rounded-full border border-sand/20 text-white/70 hover:text-sunset hover:border-sunset transition-all cursor-pointer bg-black/40 backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
