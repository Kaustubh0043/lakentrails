"use client";

import { useEffect, useState } from "react";
import { Menu, X, Bell, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const active = document.documentElement.classList.contains("light") ? "light" : "dark";
    setTheme(active);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBannerClick = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
      const targetFilter = bannerIdx === 0 ? "Riders Special" : "Dog's Birthday";
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("filter-gallery", { detail: targetFilter }));
      }, 100);
    }
  };

  const notifications = [
    {
      id: "riders",
      title: "🏍️ Rider's Special Pitstop Active",
      description: "Breakfast glamping packages & passionate touring gatherings are live. Tap to see media snaps!",
      tag: "Riders Special"
    },
    {
      id: "dogs",
      title: "🐶 Dog's Birthday Celebration Active",
      description: "Lakeside party lawns & pet-friendly stay packages are live. Tap to see media snaps!",
      tag: "Dog's Birthday"
    }
  ];

  const handleNotificationClick = (tag: string) => {
    setIsNotificationsOpen(false);
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("filter-gallery", { detail: tag }));
      }, 100);
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experiences", href: "#experiences" },
    { name: "Packages", href: "#packages" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
    { name: "Brochure", href: "/images/brochure.pdf", isExternal: true },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-nav shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Top Promo Banner */}
        <div 
          onClick={handleBannerClick}
          className="w-full bg-gradient-to-r from-sunset via-[#fd5e53] to-orange-600 text-[#fcfbf7] py-2.5 px-4 text-center text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-sans font-semibold border-b border-white/10 flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-all duration-300"
        >
          {bannerIdx === 0 ? (
            <span>🏍️ Rider's Special Pitstop & Glamping Package — Click to see snaps and videos! 🏍️</span>
          ) : (
            <span>🐶 Dog's Birthday Celebration Lakeside Package — Click to see snaps and videos! 🐶</span>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-4">
          {/* Logo / Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-500" 
              alt="Lake N Trails Logo" 
            />
            <span className="font-serif text-lg tracking-[0.3em] font-light text-white group-hover:text-glow-sunset transition-all duration-500">
              LAKE N TRAILS
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="text-xs uppercase tracking-widest text-sand/70 hover:text-sunset transition-colors duration-300 font-sans"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA & Notification Bell (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 relative">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-sand/15 text-sand hover:text-sunset hover:border-sunset/50 transition-all cursor-pointer bg-white/5 hover:bg-white/10 relative"
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Bell Icon */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-full border border-sand/15 text-sand hover:text-sunset hover:border-sunset/50 transition-all cursor-pointer bg-white/5 hover:bg-white/10 relative"
                aria-label="Notification Center"
              >
                <Bell className="w-4 h-4" />
                {/* Glowing badge dot */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sunset animate-pulse shadow-md shadow-sunset/50" />
              </button>

              {/* Desktop Notification Panel Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-[#080e1a]/95 backdrop-blur-xl border border-sand/20 rounded-2xl p-4.5 shadow-2xl z-[999] space-y-3 text-left"
                  >
                    <div className="flex justify-between items-center border-b border-sand/10 pb-2.5">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-sunset">Events & Highlights</span>
                      <span className="text-[8px] bg-sunset/15 text-sunset px-2 py-0.5 rounded-full font-semibold">2 New</span>
                    </div>

                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif.tag)}
                          className="p-3 rounded-xl bg-white/5 border border-sand/10 hover:border-sunset/35 cursor-pointer transition-all duration-300 hover:bg-white/10"
                        >
                          <h4 className="text-[11px] font-serif font-bold text-[#fcfbf7] mb-1 leading-snug">
                            {notif.title}
                          </h4>
                          <p className="text-[10px] text-sand/50 font-sans leading-relaxed">
                            {notif.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-white glass-button rounded-full cursor-pointer"
            >
              Book Stay
            </button>
          </div>

          {/* Hamburger Mobile Icon & Notification Bell */}
          <div className="lg:hidden flex items-center gap-3">
            
            {/* Bell Button (Mobile) */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full border border-sand/15 text-sand hover:text-sunset hover:border-sunset/50 transition-all cursor-pointer bg-white/5 hover:bg-white/10 relative"
                aria-label="Notification Center"
              >
                <Bell className="w-5 h-5" />
                {/* Glowing badge dot */}
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sunset animate-pulse shadow-md shadow-sunset/50" />
              </button>

              {/* Mobile Notification Panel Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-[-3rem] mt-3 w-[290px] bg-[#080e1a]/95 backdrop-blur-xl border border-sand/20 rounded-2xl p-4 shadow-2xl z-[999] space-y-3 text-left"
                  >
                    <div className="flex justify-between items-center border-b border-sand/10 pb-2">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-sunset">Events & Highlights</span>
                      <span className="text-[8px] bg-sunset/15 text-sunset px-2 py-0.5 rounded-full font-semibold">2 New</span>
                    </div>

                    <div className="space-y-2.5">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif.tag)}
                          className="p-3 rounded-xl bg-white/5 border border-sand/10 hover:border-sunset/35 cursor-pointer transition-all duration-300 active:bg-white/10"
                        >
                          <h4 className="text-[11px] font-serif font-bold text-[#fcfbf7] mb-1 leading-snug">
                            {notif.title}
                          </h4>
                          <p className="text-[9px] text-sand/50 font-sans leading-relaxed">
                            {notif.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 mr-1 text-white hover:text-sunset transition-colors cursor-pointer"
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-sunset transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#030a16]/98 backdrop-blur-xl flex flex-col justify-center items-center lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
          >
            {/* Soft decorative visual background in drawer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sunset/5 blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-6 items-center z-10">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl font-light uppercase tracking-widest text-white/80 hover:text-sunset transition-all duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mt-8 px-10 py-4 text-xs uppercase tracking-[0.2em] font-sans font-medium text-white bg-sunset hover:bg-[#fd5e53] rounded-full shadow-lg shadow-sunset/20 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
              >
                Book Your Escape
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
