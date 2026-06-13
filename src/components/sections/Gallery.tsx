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
      src: "/images/main_background_hd.png",
      title: "Vibrant Lakeside Resort Entrance",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.49 PM (1).jpeg",
      title: "Premium Shoreline Lounger Deck",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.49 PM (2).jpeg",
      title: "Romantic Dinner Setup by the Water",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.50 PM.jpeg",
      title: "Lakeside Glamping Dome View",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.50 PM (1).jpeg",
      title: "Infinity Pool overlooking Adoshi Lake",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/WhatsApp Image 2026-05-25 at 8.22.50 PM (2).jpeg",
      title: "Starlit Event & Gathering Space",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/lakesideview3.jpeg",
      title: "Serene Lake & Sahyadri Peaks",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/img4.jpeg",
      title: "Inside our Luxury Geodesic Dome",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/IMG_8327.jpeg",
      title: "Lush Greenery Surrounding the Retreat",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img13.jpeg",
      title: "Reflecting Pool & Lakeside Palms",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img9.jpeg",
      title: "Lakeside Gatherings on Lawn",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/IMG_8338.jpeg",
      title: "Cozy Canopy Lounge & Sitout",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/lakesideview.jpeg",
      title: "Panoramic Palms & Waterfront Steps",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/lakesideview2.jpeg",
      title: "Gateway Steps from Reservoir",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/IMG_8342.jpeg",
      title: "Stunning Overlook of Adoshi Reservoir",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/img1.jpeg",
      title: "Sunset Skies over Mountain Ridges",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/IMG_8343.jpeg",
      title: "Infinity Pool Shimmering in the Sun",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/img2_hd.png",
      title: "Lakeside Sunset Palms Silhouette",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/IMG_8376.jpeg",
      title: "Dazzling Sunset Paint on the Sky",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img3.jpeg",
      title: "Tropical Hammocks & Gardens",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/img4.jpeg",
      title: "Luxury Geodesic Dome Silhouette",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/IMG_8398.jpeg",
      title: "Luxury Dining Under the Palm Canopy",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img5.jpeg",
      title: "Sunrise Reflections over Swimming Pool",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/img6.jpeg",
      title: "Kayaks Ready on the Shore",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/IMG_8399.jpeg",
      title: "Fairytale Wedding Setup by the Water",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img7.jpeg",
      title: "Lakeside Reception Ceremony Setup",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img8.jpeg",
      title: "Warm Firepit Sparkles & Glamping",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/IMG_8400.jpeg",
      title: "Exquisite Geodesic Dome Suite Interior",
      category: "Glamping Dome",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/img9.jpeg",
      title: "Fresh Grilled Tandoor Lakeside Plating",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/img11.jpeg",
      title: "Resort Pathway in Lush Green Surroundings",
      category: "Resort Lifestyle",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img12.jpeg",
      title: "Sunset High Tea overlooking the Waters",
      category: "Sunset Experience",
      type: "image",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img13.jpeg",
      title: "Relaxing Deck Loungers by the Infinity Pool",
      category: "Swimming Pool Vibe",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[300px]",
    },
    {
      src: "/images/img14.jpeg",
      title: "Elegant Floral Canopy Detail",
      category: "Destination Weddings",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/img15.jpeg",
      title: "Lakeside Kayaks & Jetty Platform",
      category: "Lakeside View",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/img16.jpeg",
      title: "Artisanal Woodfired Clay Oven Pizzas",
      category: "Dining & BBQ",
      type: "image",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[400px]",
    },
    {
      src: "/images/IMG_8360.MOV",
      title: "Gentle Ripples of Adoshi Lake",
      category: "Lakeside View",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/IMG_8361.MOV",
      title: "Peaceful Morning from the Pool Deck",
      category: "Swimming Pool Vibe",
      type: "video",
      colSpan: "md:col-span-1",
      rowSpan: "h-[300px] md:h-[350px]",
    },
    {
      src: "/images/IMG_8394.MOV",
      title: "Golden Hour Glow Drone Movement",
      category: "Sunset Experience",
      type: "video",
      colSpan: "md:col-span-2",
      rowSpan: "h-[300px] md:h-[350px]",
    },
  ];

  // Filtering Categories list
  const categories = [
    "All",
    "Photos",
    "Videos",
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
    if (activeCategory === "Photos") return item.type === "image";
    if (activeCategory === "Videos") return item.type === "video";
    return item.category === activeCategory;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  // Play on hover handlers
  const handleMouseEnterVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play().catch(() => {});
  };

  const handleMouseLeaveVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  };

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
                {item.type === "video" ? (
                  <div className="absolute inset-0 bg-[#030a16] overflow-hidden">
                    <video
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      src={item.src}
                      onMouseEnter={handleMouseEnterVideo}
                      onMouseLeave={handleMouseLeaveVideo}
                      preload="metadata"
                    />
                    {/* Glowing Play Indicator Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
                      <div className="w-12 h-12 rounded-full glass-panel border border-white/20 bg-[#030a16]/40 flex items-center justify-center text-white shadow-xl group-hover:bg-sunset group-hover:border-sunset group-hover:scale-110 transition-all duration-500 pointer-events-auto">
                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
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
              {filteredItems[activeIdx].type === "video" ? (
                <video
                  src={filteredItems[activeIdx].src}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-contain max-h-[80vh] rounded-2xl shadow-2xl"
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
