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
      src: "/images/DVP_9210.JPG",
      title: "Scenic Waterfront Glamping Dome",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9230.JPG",
      title: "Cozy Geodesic Dome Suite Interior",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9256.JPG",
      title: "Dome Suite Bathroom & Amenities",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/20260715_181522.mp4",
      title: "Geodesic Dome Stay Vibe Tour",
      category: "Glamping Dome",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9216.JPG",
      title: "Lakeside Infinity Swimming Pool",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9243.JPG",
      title: "Reflections on the Infinity Pool",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9268.JPG",
      title: "Infinity Pool Shimmering in the Sun",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9208.JPG",
      title: "Luxury Shoreline Lounge Deck",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9233.JPG",
      title: "Gateway Steps to Adoshi Reservoir",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9260.JPG",
      title: "Adoshi Dam Waterfront Panorama",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/VID-20260726-WA0041.mp4",
      title: "Lakeside Sunset & Breeze Vibe",
      category: "Lakeside View",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9220.JPG",
      title: "Dazzling Sunset Skies over Reservoir",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9246.JPG",
      title: "Crimson Dusk over Sahyadri Peaks",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9272.JPG",
      title: "Sunset High Tea on the Lawn",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9223.JPG",
      title: "Premium Lakeside Canopy Dining",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9249.JPG",
      title: "Rustic Woodfired Clay Pizza Oven",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9276.JPG",
      title: "Lakeside Barbecue Grill Platter",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9226.JPG",
      title: "Shoreline Wedding Ceremony Lawn",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9253.JPG",
      title: "Elegant Shoreline Reception Arch",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/DVP_9279.JPG",
      title: "Lawn Reception Canopy Lighting",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/DVP_9213.JPG",
      title: "Lush Shoreline Palm Gardens",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9237.JPG",
      title: "Sitout Under the Palms",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/DVP_9264.JPG",
      title: "Tropical Hammocks Under Palm Canopy",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/20260726_141031.jpg.jpeg",
      title: "Playful Resort Pets on Lawns",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/20260726_142353.jpg.jpeg",
      title: "Lakeside Celebration with Furry Friends",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/20260719_105948.mp4",
      title: "Waterfront Fun & Resort Lawns Tour",
      category: "Resort Lifestyle",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
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
                {item.src.toLowerCase().endsWith(".mp4") || item.src.toLowerCase().endsWith(".mov") ? (
                  <div className="absolute inset-0 w-full h-full">
                    <video
                      src={item.src}
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-[3]">
                      <div className="w-12 h-12 rounded-full bg-sunset/80 backdrop-blur-sm flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                )}

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
              {filteredItems[activeIdx].src.toLowerCase().endsWith(".mp4") || filteredItems[activeIdx].src.toLowerCase().endsWith(".mov") ? (
                <video
                  src={filteredItems[activeIdx].src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain max-h-[80vh] rounded-2xl shadow-2xl bg-black"
                />
              ) : (
                <img
                  src={filteredItems[activeIdx].src}
                  alt={filteredItems[activeIdx].title}
                  className="w-full h-full object-contain max-h-[80vh] rounded-2xl shadow-2xl"
                />
              )}

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
