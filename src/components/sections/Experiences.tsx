"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  Waves, 
  Heart, 
  Sunset as SunsetIcon, 
  Utensils, 
  Compass, 
  GlassWater, 
  Sparkles, 
  Award, 
  CalendarDays,
  Smile
} from "lucide-react";

interface ExperiencesProps {
  onOpenBooking: (experience: string) => void;
}

export default function Experiences({ onOpenBooking }: ExperiencesProps) {
  const [activeTab, setActiveTab] = useState<string>("stays");

  const tabs = [
    { id: "stays", label: "Glamping Stays", icon: "🏕️" },
    { id: "pool", label: "Lakeside Pool", icon: "🏊" },
    { id: "dining", label: "Lakeside Dining", icon: "🍽️" },
    { id: "weddings", label: "Weddings & lawns", icon: "💍" },
    { id: "sunset", label: "Sunset Vibe", icon: "🌅" },
    { id: "riders", label: "Riders Special", icon: "🏍️" },
  ];

  const experienceData: Record<string, {
    category: string;
    title: string;
    titleAccent: string;
    description: string;
    image: string;
    imageLabel: string;
    imageDesc: string;
    ctaLabel: string;
    bookingCode: string;
    highlights: { icon: React.ReactNode; label: string; desc: string }[];
  }> = {
    stays: {
      category: "Starlit Wilderness",
      title: "Campfire Nights &",
      titleAccent: "Starry Glamping",
      description: "Unplug from the daily grid and gather around the warmth of a lakeside bonfire. Our premium camping setup features spacious, waterproof luxury glamping tents with comfortable bedding, ambient solar lighting, clean modern restroom facilities, and pet-friendly spaces. Perfect for friend groups, couples, and stargazers.",
      image: "/images/IMG_8399.jpeg", // Camping image
      imageLabel: "Lakeside Tents",
      imageDesc: "Gather around the warm lakeside bonfire under a starry night sky.",
      ctaLabel: "Book Camping Stay",
      bookingCode: "camping",
      highlights: [
        {
          icon: <Flame className="w-4.5 h-4.5" />,
          label: "Bonfires & Live Acoustic Jamming",
          desc: "Roast marshmallows, share stories, and play guitar by the water edge."
        },
        {
          icon: <Smile className="w-4.5 h-4.5" />,
          label: "Pet-Friendly Campsites",
          desc: "Open shoreline spaces where your pets can play and enjoy the outdoors."
        }
      ]
    },
    pool: {
      category: "Serene Pool Vibe",
      title: "Lakeside Swimming",
      titleAccent: "Pool & Relaxation",
      description: "Cool off and relax by our premium lakeside infinity swimming pool. Surrounded by lush tropical palms and scenic views of Adoshi lake, it's the perfect spot to unwind, take a refreshing dip, or lounge on the deck with a chilled drink under the warm sun.",
      image: "/images/img3.jpeg", // Pool image
      imageLabel: "Tropical Vibe Stay",
      imageDesc: "Relax by our sparkling pool deck with peaceful landscape views.",
      ctaLabel: "Book Pool Stay",
      bookingCode: "pool-party",
      highlights: [
        {
          icon: <Waves className="w-4.5 h-4.5" />,
          label: "Infinity Pool Views",
          desc: "Soak in panoramic vistas of the lake and mountains as you swim."
        },
        {
          icon: <Compass className="w-4.5 h-4.5" />,
          label: "Lakeside Lounge Deck",
          desc: "Relax on comfortable deck loungers surrounded by beautiful palms."
        },
        {
          icon: <GlassWater className="w-4.5 h-4.5" />,
          label: "Poolside Refreshments",
          desc: "Sip handcrafted mocktails and premium juices on the deck."
        },
        {
          icon: <Sparkles className="w-4.5 h-4.5" />,
          label: "Tranquil Sunset Dips",
          desc: "Witness the sky change colors directly from the edge of the pool."
        }
      ]
    },
    dining: {
      category: "Culinary Artistry",
      title: "Luxury Tropical",
      titleAccent: "Lakeside Dining",
      description: "Relax with uninterrupted views of the calm Adoshi reservoir and the majestic Sahyadri mountain peaks. Our lakeside dining space blends natural, open-air scenery with a premium tropical atmosphere, offering the perfect spot to enjoy sunset tea, refreshing mocktails, and fresh local dishes as twilight paints the sky.",
      image: "/images/IMG_8361.MOV", // Dining video
      imageLabel: "Scenic Shoreline View",
      imageDesc: "Gaze across the calm waters at the majestic Sahyadri mountain peaks from your dining table.",
      ctaLabel: "Reserve a Table",
      bookingCode: "camping",
      highlights: [
        {
          icon: <SunsetIcon className="w-4.5 h-4.5" />,
          label: "Panoramic Sunset Views",
          desc: "Watch the sun set directly behind the mountain ridges, reflecting gold on the water."
        },
        {
          icon: <Compass className="w-4.5 h-4.5" />,
          label: "Open-Air Lakeside Tables",
          desc: "Unwind at shoreline dining setups designed to give you prime views of the reservoir."
        },
        {
          icon: <Utensils className="w-4.5 h-4.5" />,
          label: "Twilight Mocktails & Tea",
          desc: "Sip handcrafted fresh fruit infusions and enjoy warm tea as evening sets in."
        },
        {
          icon: <Sparkles className="w-4.5 h-4.5" />,
          label: "Scenic Ambiance & Calm",
          desc: "Dine in a tranquil environment where the only sounds are the ripples of Adoshi Lake."
        }
      ]
    },
    weddings: {
      category: "Magical Gatherings",
      title: "Destination Weddings",
      titleAccent: "& Elite Celebrations",
      description: "From fairy-tale lakeside vows to high-energy corporate galas, LakeNtrails provides the perfect blend of natural beauty and top-tier hospitality. Our expansive lawn accommodates grand outdoor weddings, pre-wedding photography sessions, corporate retreats, team building outings, and custom event structures designed to leave a lasting impression.",
      image: "/images/IMG_8399.jpeg", // Wedding image
      imageLabel: "Bespoke Lakeside Events",
      imageDesc: "A stunning waterfront ceremony setup featuring elegant drapes, white floral arches, and seating directly on the reservoir edge.",
      ctaLabel: "Enquire for Events",
      bookingCode: "wedding",
      highlights: [
        {
          icon: <Heart className="w-4.5 h-4.5" />,
          label: "Lakeside Marriage Vows",
          desc: "Say your vows under a beautiful white floral arch right on the waterfront stage at sunset."
        },
        {
          icon: <Award className="w-4.5 h-4.5" />,
          label: "Premium Corporate Outings",
          desc: "Inspire your teams with dynamic team-building games, kayaking, and dj-led nights."
        },
        {
          icon: <CalendarDays className="w-4.5 h-4.5" />,
          label: "Custom Thematic Decors",
          desc: "Bespoke lighting, gourmet catering menus, audio setup, and premium stays."
        }
      ]
    },
    sunset: {
      category: "Golden Hour Magic",
      title: "The Sunset",
      titleAccent: "Experience",
      description: "When the sky catches fire and the lake mirrors the warm colors of dusk, LakeNtrails transforms into a dreamy paradise. It is a moment of pure magic, perfect for quiet reflection, photography, or enjoying high-tea with friends on our sunset decks.",
      image: "/images/img2_hd.png", // Sunset image
      imageLabel: "Daily Sunset Ritual",
      imageDesc: "Gaze at the crimson and gold of the departing sun reflecting on the calm lake reservoir.",
      ctaLabel: "Book Sunset Stay",
      bookingCode: "camping",
      highlights: [
        {
          icon: <SunsetIcon className="w-4.5 h-4.5" />,
          label: "Golden Hour Gazebo",
          desc: "The ultimate deck to watch the sun slip behind the Sahyadri mountains."
        },
        {
          icon: <Compass className="w-4.5 h-4.5" />,
          label: "Kayaking & Rowboats",
          desc: "Paddle out into the calm water as the sunset colors reflect around you."
        },
        {
          icon: <Sparkles className="w-4.5 h-4.5" />,
          label: "Visual Shoots",
          desc: "Ideal lighting and reflections for premium photography and couples' shots."
        }
      ]
    },
    riders: {
      category: "Complimentary Rider Special",
      title: "Breakfast Ride for",
      titleAccent: "Passionate Riders",
      description: "Gear up for a scenic morning cruise along the winding roads to Adoshi Dam. Every weekend, we host a special Complimentary Breakfast Ride for riding groups and solo motor enthusiasts. Park your bikes in our dedicated secure spaces, stretch out on our lakeside lawns, and enjoy a piping-hot, hearty complimentary breakfast with fellow riders overlooking the calm reservoir.",
      image: "/images/IMG_6645.jpg", // Converted rider image!
      imageLabel: "Lakeside Riding Destination",
      imageDesc: "Connect with the community, park along the scenic lawns, and recharge with a hearty breakfast.",
      ctaLabel: "Register for Ride",
      bookingCode: "day-outing",
      highlights: [
        {
          icon: <Award className="w-4.5 h-4.5" />,
          label: "Dedicated Rider Parking",
          desc: "Secure, paved parking spots right next to the lawns for your precious machines."
        },
        {
          icon: <Utensils className="w-4.5 h-4.5" />,
          label: "Hot Breakfast Buffet",
          desc: "Unlimited tea, coffee, hot regional specialties, and breakfast favorites."
        },
        {
          icon: <Compass className="w-4.5 h-4.5" />,
          label: "Scenic Riding Routes",
          desc: "Winding, picturesque approach roads perfect for a morning weekend cruise."
        }
      ]
    }
  };

  const activeData = experienceData[activeTab];

  return (
    <section id="experiences" className="relative w-full py-24 md:py-32 bg-[#030a16] overflow-hidden border-b border-sand/5">
      {/* Decorative Glow Mesh */}
      <div className="absolute top-[20%] left-[80%] w-[350px] h-[350px] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-luxury-teal/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Lakeside Adventures
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Resort <span className="text-glow-sunset italic font-normal text-sunset">Experiences</span>
          </h2>
          <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed">
            Unwind, celebrate, or embark on a water adventure. Switch between tabs below to explore our luxury offerings.
          </p>
        </div>

        {/* Dynamic Glassmorphic Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-4xl mx-auto p-2 rounded-2xl glass-panel border border-sand/15 bg-black/20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3 rounded-xl text-xs font-sans font-medium uppercase tracking-[0.15em] transition-all duration-500 cursor-pointer flex items-center gap-2 ${
                  isActive 
                    ? "text-white" 
                    : "text-sand/60 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-sunset rounded-xl shadow-lg shadow-sunset/15 z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Experiences Content Block Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[500px]">
          
          {/* Column 1: Details & Info */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="w-full space-y-6"
              >
                <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase font-medium block">
                  {activeData.category}
                </span>
                
                <h3 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
                  {activeData.title} <br />
                  <span className="text-glow-sunset italic font-normal text-sunset">
                    {activeData.titleAccent}
                  </span>
                </h3>

                <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed max-w-xl">
                  {activeData.description}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 w-full font-sans">
                  {activeData.highlights.map((item, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start">
                      <div className="w-8 h-8 rounded-full bg-sunset/10 border border-sunset/20 flex items-center justify-center text-sunset flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#fcfbf7] block">
                          {item.label}
                        </span>
                        <span className="text-xs text-sand/50 leading-relaxed block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onOpenBooking(activeData.bookingCode)}
                    className="px-8 py-4 rounded-full bg-sunset hover:bg-[#fd5e53] text-white text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-xl shadow-sunset/15 cursor-pointer hover:-translate-y-0.5"
                  >
                    {activeData.ctaLabel}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Column 2: Visual Card */}
          <div className="lg:col-span-5 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-sand/20 group cursor-pointer"
              >
                {activeData.image.toLowerCase().endsWith(".mov") || activeData.image.toLowerCase().endsWith(".mp4") ? (
                  <video
                    src={activeData.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={activeData.image}
                    alt={activeData.imageLabel}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                  />
                )}
                <div className="absolute inset-0 bg-orange-950/10 group-hover:bg-transparent transition-colors duration-500 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a16] via-transparent to-transparent opacity-85 z-[2]" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-8 left-8 right-8 z-10 text-left">
                  <span className="text-[9px] font-sans uppercase tracking-[0.35em] text-sunset mb-2 block font-semibold">
                    {activeData.imageLabel}
                  </span>
                  <h4 className="text-lg font-serif font-light text-white leading-tight uppercase tracking-wider mb-1">
                    At LakeNtrails
                  </h4>
                  <p className="text-[11px] font-sans text-sand/70 leading-relaxed max-w-xs">
                    {activeData.imageDesc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
