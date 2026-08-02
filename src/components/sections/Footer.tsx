"use client";

import { Flame } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020612] pt-24 pb-12 overflow-hidden border-t border-sand/5">
      {/* Animated Flowing Waves SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 opacity-15">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wave 1 */}
          <path
            d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1300,60 1400,60 L1400,120 L0,120 Z"
            fill="#d6c8b3"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          {/* Wave 2 */}
          <path
            d="M0,60 C200,30 400,90 600,60 C800,30 1000,90 1200,60 L1200,120 L0,120 Z"
            fill="#ff6b35"
            opacity="0.25"
            className="animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-sand/10 pb-16">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-2 space-y-4 text-left">
            <a href="#" className="flex items-center gap-3 group">
              <img 
                src="/images/logo.png" 
                className="w-9 h-9 object-contain rounded-full group-hover:scale-105 transition-transform duration-500" 
                alt="Lake N Trails Logo" 
              />
              <span className="font-serif text-md tracking-[0.3em] font-light text-white">
                LAKE N TRAILS
              </span>
            </a>
            
            <p className="text-xs text-sand/65 max-w-sm leading-relaxed">
              Your futuristic tropical lakeside haven. Blending Bali aesthetics with vibrant nightlife, camping under starry skies, water sports, and custom group event lawns.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/lakentrails/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass-panel border border-sand/15 flex items-center justify-center text-sand hover:text-sunset hover:border-sunset/50 transition-all duration-300 shadow-md"
                aria-label="Instagram Profile"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#fcfbf7] font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="text-sand/65 hover:text-sunset transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#experiences" className="text-sand/65 hover:text-sunset transition-colors">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#packages" className="text-sand/65 hover:text-sunset transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sand/65 hover:text-sunset transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="/images/brochure.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sunset font-medium hover:underline transition-all block mt-1"
                >
                  Digital Brochure (PDF)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#fcfbf7] font-semibold mb-4">
              Resort Contacts
            </h4>
            <ul className="space-y-2.5 text-xs text-sand/65">
              <li>
                Adoshi Dam, Mandad Atkargaon, Khopoli 410203 India
              </li>
              <li>
                <a href="tel:+917058434645" className="hover:text-sunset transition-colors block">
                  +91 7058434645
                </a>
                <a href="tel:+919769040883" className="hover:text-sunset transition-colors block mt-1">
                  +91 97690 40883
                </a>
              </li>
              <li>
                <a href="mailto:lakentrailsglamping@gmail.com" className="hover:text-sunset transition-colors block break-all">
                  lakentrailsglamping@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-sand/40 text-left">
          <span>
            &copy; {currentYear} Lake N Trails Exotic Glamping. All Rights Reserved.
          </span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              Made for outdoor luxury escapes <Flame className="w-3 h-3 text-sunset" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
