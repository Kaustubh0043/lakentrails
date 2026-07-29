"use client";

import { useRef } from "react";
import { 
  Flame, 
  Waves, 
  Sunset as SunsetIcon, 
  Utensils, 
  Compass, 
  Sparkles, 
  Award, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface ExperiencesProps {
  onOpenBooking: (experience: string) => void;
}

export default function Experiences({ onOpenBooking }: ExperiencesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by 80% of container width for a smooth card-by-card feel
      const scrollAmount = clientWidth > 768 ? 600 : 320;
      const scrollTo = direction === "left" 
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const experienceData = [
    {
      id: "stays",
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
          icon: <Flame className="w-4 h-4" />,
          label: "Lakeside Bonfire Night",
          desc: "Warm up with cozy fires, marshmallows, and acoustic tunes right on the water edge."
        },
        {
          icon: <Sparkles className="w-4 h-4" />,
          label: "Stargazing Deck",
          desc: "Unobstructed night sky views away from city light pollution."
        }
      ]
    },
    {
      id: "pool",
      category: "Serene Pool Vibe",
      title: "Lakeside Swimming",
      titleAccent: "Pool & Relaxation",
      description: "Cool off and relax by our premium lakeside infinity swimming pool. Surrounded by lush tropical palms and scenic views of Adoshi lake, it's the perfect spot to unwind, take a refreshing dip, or lounge on the deck with a chilled drink under the warm sun.",
      image: "/images/DVP_9228.JPG", // Pool image
      imageLabel: "Tropical Vibe Stay",
      imageDesc: "Relax by our sparkling pool deck with peaceful landscape views.",
      ctaLabel: "Book Pool Stay",
      bookingCode: "pool-party",
      highlights: [
        {
          icon: <Waves className="w-4 h-4" />,
          label: "Infinity Pool Views",
          desc: "Soak in panoramic vistas of the lake and mountains as you swim."
        },
        {
          icon: <Compass className="w-4 h-4" />,
          label: "Lakeside Lounge Deck",
          desc: "Relax on comfortable deck loungers surrounded by beautiful palms."
        }
      ]
    },
    {
      id: "dining",
      category: "Culinary Artistry",
      title: "Luxury Tropical",
      titleAccent: "Lakeside Dining",
      description: "Relax with uninterrupted views of the calm Adoshi reservoir and the majestic Sahyadri mountain peaks. Our lakeside dining space blends natural, open-air scenery with a premium tropical atmosphere, offering the perfect spot to enjoy sunset tea, refreshing mocktails, and fresh local dishes as twilight paints the sky.",
      image: "/images/IMG_6673.jpg", // Converted Dining image
      imageLabel: "Scenic Shoreline View",
      imageDesc: "Gaze across the calm waters at the majestic Sahyadri mountain peaks from your dining table.",
      ctaLabel: "Reserve a Table",
      bookingCode: "camping",
      highlights: [
        {
          icon: <SunsetIcon className="w-4 h-4" />,
          label: "Panoramic Sunset Views",
          desc: "Watch the sun set directly behind the mountain ridges, reflecting gold on the water."
        },
        {
          icon: <Utensils className="w-4 h-4" />,
          label: "Twilight Mocktails & Tea",
          desc: "Sip handcrafted fresh fruit infusions and enjoy warm tea as evening sets in."
        }
      ]
    },
    {
      id: "sunset",
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
          icon: <SunsetIcon className="w-4 h-4" />,
          label: "Golden Hour Gazebo",
          desc: "The ultimate deck to watch the sun slip behind the Sahyadri mountains."
        },
        {
          icon: <Compass className="w-4 h-4" />,
          label: "Kayaking & Rowboats",
          desc: "Paddle out into the calm water as the sunset colors reflect around you."
        }
      ]
    },
    {
      id: "riders",
      category: "Complimentary Rider Special",
      title: "Breakfast Ride for",
      titleAccent: "Passionate Riders",
      description: "Gear up for a scenic morning cruise along the winding roads to Adoshi Dam. Every weekend, we host a special Complimentary Breakfast Ride for riding groups and solo motor enthusiasts. Park your bikes in our dedicated secure spaces, stretch out on our lakeside lawns, and enjoy a piping-hot, hearty complimentary breakfast with fellow riders overlooking the calm reservoir.",
      image: "/images/20260719_123000.jpg.jpeg", // Rider image
      imageLabel: "Lakeside Riding Destination",
      imageDesc: "Connect with the community, park along the scenic lawns, and recharge with a hearty breakfast.",
      ctaLabel: "Register for Ride",
      bookingCode: "day-outing",
      highlights: [
        {
          icon: <Award className="w-4 h-4" />,
          label: "Dedicated Rider Parking",
          desc: "Secure, paved parking spots right next to the lawns for your precious machines."
        },
        {
          icon: <Utensils className="w-4 h-4" />,
          label: "Hot Breakfast Buffet",
          desc: "Enjoy tea, coffee, regional specialties, and breakfast favorites."
        }
      ]
    }
  ];

  return (
    <section id="experiences" className="relative w-full py-20 md:py-28 bg-[#030a16] overflow-hidden border-b border-sand/5">
      {/* Decorative Glow Mesh */}
      <div className="absolute top-[20%] left-[80%] w-[350px] h-[350px] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-luxury-teal/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with Slider Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="text-left max-w-2xl">
            <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
              Lakeside Adventures
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-4 uppercase tracking-wider">
              Resort <span className="text-glow-sunset italic font-normal text-sunset">Experiences</span>
            </h2>
            <p className="text-sand/80 text-sm font-sans leading-relaxed">
              Unwind, explore, or embark on a water adventure. Swipe or scroll right to discover all our luxury offerings.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3 self-end md:self-auto">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset hover:text-sunset transition-all cursor-pointer bg-[#030f26]/20 backdrop-blur-sm shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset hover:text-sunset transition-all cursor-pointer bg-[#030f26]/20 backdrop-blur-sm shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scrollable container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 pt-2 px-1 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {experienceData.map((exp) => (
            <div 
              key={exp.id}
              className="w-[290px] sm:w-[380px] md:w-[780px] flex-shrink-0 snap-center rounded-2xl overflow-hidden glass-panel border border-sand/15 bg-black/10 p-5 md:p-7 flex flex-col md:flex-row gap-5 md:gap-7 relative group hover:border-sunset/30 transition-all duration-500"
            >
              {/* Content Column */}
              <div className="flex-1 flex flex-col justify-between text-left space-y-4 md:space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-sans tracking-[0.25em] text-sunset uppercase font-semibold block">
                    {exp.category}
                  </span>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-white leading-tight">
                    {exp.title} <br />
                    <span className="text-glow-sunset italic font-normal text-sunset">
                      {exp.titleAccent}
                    </span>
                  </h3>
                  <p className="text-sand/80 text-[11px] md:text-xs font-sans leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="grid grid-cols-1 gap-3 pt-1 w-full font-sans">
                  {exp.highlights.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-full bg-sunset/10 border border-sunset/20 flex items-center justify-center text-sunset flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-[#fcfbf7] block">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-sand/50 leading-relaxed block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking(exp.bookingCode)}
                    className="px-5 py-2.5 rounded-full bg-sunset hover:bg-[#fd5e53] text-white text-[9px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shadow-lg shadow-sunset/10"
                  >
                    {exp.ctaLabel}
                  </button>
                </div>
              </div>

              {/* Media Column */}
              <div className="w-full md:w-[280px] aspect-video md:aspect-[3/4] rounded-xl overflow-hidden relative flex-shrink-0">
                {exp.image.toLowerCase().endsWith(".mov") || exp.image.toLowerCase().endsWith(".mp4") ? (
                  <video
                    src={exp.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={exp.image}
                    alt={exp.imageLabel}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                  />
                )}
                <div className="absolute inset-0 bg-orange-950/5 group-hover:bg-transparent transition-colors duration-500 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a16] via-transparent to-transparent opacity-80 z-[2]" />
                
                <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                  <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-sunset font-medium block">
                    {exp.imageLabel}
                  </span>
                  <p className="text-[9px] text-sand/60 font-sans mt-0.5 leading-normal">
                    {exp.imageDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
