"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

// Components
import CustomCursor from "@/components/CustomCursor";
import BackgroundAudio from "@/components/BackgroundAudio";

// Sections
import LoadingScreen from "@/components/sections/LoadingScreen";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Amenities from "@/components/sections/Amenities";
import Experiences from "@/components/sections/Experiences";
import Packages from "@/components/sections/Packages";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import EventShowcase from "@/components/sections/EventShowcase";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BookingModal from "@/components/sections/BookingModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingExperience, setBookingExperience] = useState("camping");

  const openBooking = (experience: string) => {
    setBookingExperience(experience);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    if (isLoading) return;

    // Initialize smooth scrolling with Lenis on desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <div className="relative min-h-screen bg-[#030a16] text-[#fcfbf7] overflow-x-hidden selection:bg-sunset selection:text-white">
          {/* Custom Animated Mouse Cursor */}
          <CustomCursor />

          {/* Persistent Ambient Sound Controller */}
          <BackgroundAudio />

          {/* Background styled with modern CSS ambient glows */}

          {/* Header Navigation */}
          <Navbar onOpenBooking={() => openBooking("camping")} />

          {/* Main Storyteller Layout */}
          <main className="relative z-10 w-full">
            <Hero onOpenBooking={() => openBooking("camping")} />
            
            <About />
            
            <Amenities />
            
            <Experiences onOpenBooking={openBooking} />
            
            <Packages onOpenBooking={openBooking} />
            
            <Gallery />
            
            <Testimonials />
            
            <EventShowcase onOpenBooking={() => openBooking("corporate")} />
            
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Booking Modal Sheet */}
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            defaultExperience={bookingExperience}
          />
        </div>
      )}
    </>
  );
}
