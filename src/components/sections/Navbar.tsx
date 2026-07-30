"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          onClick={onOpenBooking}
          className="w-full bg-gradient-to-r from-sunset via-[#fd5e53] to-orange-600 text-[#fcfbf7] py-2.5 px-4 text-center text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-sans font-semibold border-b border-white/10 flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-all duration-300"
        >
          <span>🏍️ Rider's Special Pitstop & Glamping Package — Click to book your route! 🏍️</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-4">
          {/* Logo / Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-sand group-hover:text-sunset transition-colors duration-500 drop-shadow-[0_0_8px_rgba(255,107,53,0.3)]"
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

          {/* CTA / Booking Button (Desktop) */}
          <div className="hidden lg:block">
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-white glass-button rounded-full cursor-pointer"
            >
              Book Stay
            </button>
          </div>

          {/* Hamburger Mobile Icon */}
          <div className="lg:hidden flex items-center">
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
