"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import { 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  User, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  ArrowLeft,
  Tent, 
  Waves, 
  Utensils, 
  Flame, 
  Compass, 
  Tv, 
  Sparkles, 
  Smile, 
  X, 
  Check, 
  ShieldAlert,
  Star,
  MapPin,
  Clock,
  Car,
  Heart
} from "lucide-react";

// Suspense-wrapped content
function BookingContent() {
  const searchParams = useSearchParams();
  const rawExperience = searchParams.get("experience") || "camping";
  
  let defaultExp = "stay-package";
  if (!["camping", "stay-package", "stay-glamp", "stay-tent", "pool-party", "wedding", "corporate"].includes(rawExperience)) {
    defaultExp = "day-outing";
  }

  // State
  const [step, setStep] = useState<"details" | "confirm">("details");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    experience: defaultExp,
    notes: "",
  });

  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    childrenAbove5: 0,
    childrenBelow5: 0,
    infants: 0,
    pets: 0,
    isLargeEvent: false,
  });

  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [tempCheckIn, setTempCheckIn] = useState<Date | null>(null);
  const [tempCheckOut, setTempCheckOut] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);

  const guestSelectorRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  // Click outside to close guest selector popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target as Node)) {
        setIsGuestDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync total guests to formData
  useEffect(() => {
    if (guestCounts.isLargeEvent) {
      setFormData((prev) => ({ ...prev, guests: "event" }));
    } else {
      const totalPayingGuests = guestCounts.adults + guestCounts.childrenAbove5;
      setFormData((prev) => ({ ...prev, guests: totalPayingGuests.toString() }));
    }
  }, [guestCounts]);

  const getGuestsSummary = () => {
    if (guestCounts.isLargeEvent) return "Large Event (50+ guests)";
    const totalPayingGuests = guestCounts.adults + guestCounts.childrenAbove5;
    const totalFreeGuests = guestCounts.childrenBelow5 + guestCounts.infants;
    const totalGuests = totalPayingGuests + totalFreeGuests;
    
    let summary = `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`;
    if (guestCounts.pets > 0) {
      summary += `, ${guestCounts.pets} pet${guestCounts.pets > 1 ? "s" : ""}`;
    }
    return summary;
  };

  const getDetailedGuestBreakdown = () => {
    if (guestCounts.isLargeEvent) return "Large Event (50+)";
    const parts = [`${guestCounts.adults} Adults`];
    if (guestCounts.childrenAbove5 > 0) {
      parts.push(`${guestCounts.childrenAbove5} Children (5-12y)`);
    }
    if (guestCounts.childrenBelow5 > 0) {
      parts.push(`${guestCounts.childrenBelow5} Children (<5y)`);
    }
    if (guestCounts.infants > 0) {
      parts.push(`${guestCounts.infants} Infants`);
    }
    if (guestCounts.pets > 0) {
      parts.push(`${guestCounts.pets} Pets`);
    }
    return parts.join(", ");
  };

  const updateGuestCount = (type: "adults" | "childrenAbove5" | "childrenBelow5" | "infants" | "pets", delta: number) => {
    setGuestCounts((prev) => {
      const val = prev[type];
      const newVal = val + delta;
      if (type === "adults" && newVal < 1) return prev;
      if (type !== "adults" && newVal < 0) return prev;
      return {
        ...prev,
        [type]: newVal,
        isLargeEvent: false,
      };
    });
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const [yyyy, mm, dd] = dateStr.split("-").map(Number);
    const date = new Date(yyyy, mm - 1, dd);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDateBetween = (date: Date, start: Date, end: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    return d > s && d < e;
  };

  const getMonthYear = (offset: number) => {
    const date = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    return {
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  };

  const getMonthName = (offset: number) => {
    const { month, year } = getMonthYear(offset);
    return new Date(year, month, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  };

  const handleDateClick = (date: Date) => {
    if (!tempCheckIn || (tempCheckIn && tempCheckOut)) {
      setTempCheckIn(date);
      setTempCheckOut(null);
      setFormData((prev) => ({ ...prev, checkIn: formatDate(date), checkOut: "" }));
    } else if (tempCheckIn && !tempCheckOut) {
      if (date < tempCheckIn) {
        setTempCheckIn(date);
        setFormData((prev) => ({ ...prev, checkIn: formatDate(date), checkOut: "" }));
      } else {
        setTempCheckOut(date);
        setFormData((prev) => ({ ...prev, checkOut: formatDate(date) }));
      }
    }
  };

  const handleDateMouseEnter = (date: Date) => {
    if (tempCheckIn && !tempCheckOut) {
      setHoveredDate(date);
    }
  };

  const handleClearDates = () => {
    setTempCheckIn(null);
    setTempCheckOut(null);
    setHoveredDate(null);
    setFormData((prev) => ({ ...prev, checkIn: "", checkOut: "" }));
  };

  const getNumberOfNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 1;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculatePricing = () => {
    const adults = guestCounts.isLargeEvent ? 50 : guestCounts.adults;
    const children = guestCounts.isLargeEvent ? 0 : guestCounts.childrenAbove5;
    
    let isWeekendDay = true;
    if (formData.checkIn) {
      const date = new Date(formData.checkIn);
      const day = date.getDay();
      isWeekendDay = (day === 0 || day === 5 || day === 6);
    }

    let adultRate = 0;
    let childRate = 0;
    let packageName = "";
    let isStay = false;

    if (formData.experience.startsWith("stay") || formData.experience === "camping") {
      isStay = true;
      packageName = "Ultimate Stay Package";
      if (isWeekendDay) {
        adultRate = 2800;
        childRate = 1400;
      } else {
        adultRate = 2200;
        childRate = 1100;
      }
    } else {
      packageName = "Day Outing Package";
      if (isWeekendDay) {
        adultRate = 1600;
        childRate = 800;
      } else {
        adultRate = 1300;
        childRate = 700;
      }
    }

    const nights = isStay ? getNumberOfNights() : 1;
    const petCharge = guestCounts.pets > 0 ? (isStay ? 400 : 200) : 0;
    const subtotal = (adultRate * adults + childRate * children) * nights + petCharge;
    const taxes = Math.round(subtotal * 0.05);
    const total = subtotal + taxes;

    return {
      packageName,
      rate: adultRate,
      adultRate,
      childRate,
      guestsNum: adults + children,
      nights,
      subtotal,
      taxes,
      total,
      isStay,
      isWeekend: isWeekendDay,
      petCharge
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill in your Name, Email, and Phone number.");
      return;
    }
    if (!isAgreedToTerms) {
      alert("Please agree to the booking policies and terms.");
      return;
    }
    const pricing = calculatePricing();
    const guestDetails = getDetailedGuestBreakdown();

    let rateDetailsText = "";
    if (guestCounts.isLargeEvent) {
      rateDetailsText = `• Event Rate: Custom Quote Requested`;
    } else {
      const parts = [];
      if (guestCounts.adults > 0) {
        parts.push(`Adults: ${guestCounts.adults} x ₹${pricing.adultRate}/night`);
      }
      if (guestCounts.childrenAbove5 > 0) {
        parts.push(`Kids (5-12): ${guestCounts.childrenAbove5} x ₹${pricing.childRate}/night`);
      }
      if (pricing.petCharge > 0) {
        parts.push(`${pricing.isStay ? "Pet Stay Charge" : "Pet Charge"}: ₹${pricing.petCharge}`);
      }
      rateDetailsText = `• Rates (${pricing.isWeekend ? "Weekend" : "Weekday"}):\n  ${parts.join("\n  ")}`;
    }

    const text = `*New Booking Enquiry for Lake N Trails*
-------------------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Check-in:* ${formData.checkIn ? formatDateDisplay(formData.checkIn) : "N/A"}
*Check-out:* ${formData.checkOut ? formatDateDisplay(formData.checkOut) : "N/A"}
*Nights:* ${pricing.isStay ? pricing.nights : "1 (Day Trip)"}
*Guests:* ${guestDetails}
*Experience:* ${pricing.packageName}
-------------------------------
*Price Breakdown:*
${rateDetailsText}
• Subtotal: ₹${pricing.subtotal.toLocaleString()}
• Taxes (5% GST): ₹${pricing.taxes.toLocaleString()}
• *Total Estimated:* ₹${pricing.total.toLocaleString()}
-------------------------------
*Special Notes:* ${formData.notes || "None"}
-------------------------------
_Submitted via website booking request._`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/917058434645?text=${encodedText}`, "_blank");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill in your Name, Email, and Phone number.");
      return;
    }
    if (!isAgreedToTerms) {
      alert("Please agree to the booking policies and terms.");
      return;
    }
    const pricing = calculatePricing();
    const guestDetails = getDetailedGuestBreakdown();

    let rateDetailsText = "";
    if (guestCounts.isLargeEvent) {
      rateDetailsText = `• Event Rate: Custom Quote Requested`;
    } else {
      const parts = [];
      if (guestCounts.adults > 0) {
        parts.push(`Adults: ${guestCounts.adults} x Rs. ${pricing.adultRate}/night`);
      }
      if (guestCounts.childrenAbove5 > 0) {
        parts.push(`Kids (5-12): ${guestCounts.childrenAbove5} x Rs. ${pricing.childRate}/night`);
      }
      if (pricing.petCharge > 0) {
        parts.push(`${pricing.isStay ? "Pet Stay Charge" : "Pet Charge"}: Rs. ${pricing.petCharge}`);
      }
      rateDetailsText = `• Rates (${pricing.isWeekend ? "Weekend" : "Weekday"}):\n  ${parts.join("\n  ")}`;
    }

    const subject = `Booking Inquiry: ${formData.name} - ${pricing.packageName}`;
    const body = `Hi Lake N Trails Team,

I would like to inquire about a booking:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Check-in Date: ${formData.checkIn ? formatDateDisplay(formData.checkIn) : "N/A"}
Check-out Date: ${formData.checkOut ? formatDateDisplay(formData.checkOut) : "N/A"}
Number of Guests: ${guestDetails}
Preferred Experience: ${pricing.packageName}

Price Details:
${rateDetailsText}
• Subtotal: Rs. ${pricing.subtotal.toLocaleString()}
• Taxes (5% GST): Rs. ${pricing.taxes.toLocaleString()}
• Total Estimated: Rs. ${pricing.total.toLocaleString()}

Special Request / Notes:
${formData.notes || "No special requests."}

Looking forward to your response.

Best regards,
${formData.name}`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open(`mailto:lakentrailsglamping@gmail.com?subject=${encodedSubject}&body=${encodedBody}`, "_blank");
  };

  const renderMonth = (monthOffset: number) => {
    const { month, year } = getMonthYear(monthOffset);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));

    const baseToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return (
      <div className="grid grid-cols-7 gap-y-1 gap-x-0">
        {days.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} className="aspect-square w-full h-full" />;

          const isSelectedStart = tempCheckIn && isSameDay(date, tempCheckIn);
          const isSelectedEnd = tempCheckOut && isSameDay(date, tempCheckOut);
          const isBetween = tempCheckIn && tempCheckOut && isDateBetween(date, tempCheckIn, tempCheckOut);
          const isPast = date < baseToday;
          const hoveredEnd = tempCheckIn && !tempCheckOut && hoveredDate && isDateBetween(date, tempCheckIn, hoveredDate);
          const sameAsHovered = tempCheckIn && !tempCheckOut && hoveredDate && isSameDay(date, hoveredDate);

          let cellBgClass = "";
          let btnClass = "text-sand/80 hover:bg-sand/10 hover:text-white cursor-pointer";

          if (isPast) {
            btnClass = "text-sand/20 cursor-not-allowed";
          } else if (isSelectedStart) {
            btnClass = "bg-sunset text-white font-semibold shadow-md z-10 scale-105";
            if (tempCheckOut) cellBgClass = "bg-gradient-to-r from-transparent to-sunset/15 rounded-l-full";
            else if (hoveredDate && hoveredDate > tempCheckIn) cellBgClass = "bg-gradient-to-r from-transparent to-sunset/10 rounded-l-full";
          } else if (isSelectedEnd) {
            btnClass = "bg-sunset text-white font-semibold shadow-md z-10 scale-105";
            cellBgClass = "bg-gradient-to-r from-sunset/15 to-transparent rounded-r-full";
          } else if (isBetween) {
            btnClass = "text-white font-medium";
            cellBgClass = "bg-sunset/15";
          } else if (hoveredEnd) {
            btnClass = "text-white font-medium";
            cellBgClass = "bg-sunset/10";
          } else if (sameAsHovered) {
            btnClass = "bg-sunset/20 text-white font-medium border border-sunset/50";
            cellBgClass = "bg-gradient-to-r from-sunset/10 to-transparent rounded-r-full";
          }

          return (
            <div key={date.toISOString()} className={`aspect-square w-full h-full relative flex items-center justify-center ${cellBgClass}`}>
              <button
                type="button"
                disabled={isPast}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => handleDateMouseEnter(date)}
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-[11px] font-sans transition-all duration-150 z-10 ${btnClass}`}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const handleNextStep = () => {
    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select your Check-in and Check-out dates on the calendar first.");
      return;
    }
    setStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Static amenities for listing view
  const quickAmenities = [
    { icon: <Tent className="w-4.5 h-4.5 text-sunset" />, name: "Waterproof Tents", desc: "Cozy custom bedding & layers" },
    { icon: <Waves className="w-4.5 h-4.5 text-sunset" />, name: "Infinity Pool", desc: "Views of mountains & reservoir" },
    { icon: <Utensils className="w-4.5 h-4.5 text-sunset" />, name: "Separate Kitchens", desc: "Dietary split Veg & Non-Veg (No palm oil)" },
    { icon: <Flame className="w-4.5 h-4.5 text-sunset" />, name: "Lakeside Campfire", desc: "Warm bonfires & BBQ service" },
    { icon: <Compass className="w-4.5 h-4.5 text-sunset" />, name: "Adventure Trek", desc: "Guided waterfall trail trekking" },
    { icon: <Smile className="w-4.5 h-4.5 text-sunset" />, name: "Pet Friendly Oasis", desc: "Lawn yards for running & playing" }
  ];

  // Brochure list of amenities for the modal popup
  const detailedAmenities = [
    {
      category: "Stays & Accommodations",
      items: [
        "Premium geodesic glamping domes & waterproof tents",
        "Cozy clean bedding (sheets, pillows, warm blankets)",
        "Clean, modern common washrooms & vanity area",
        "Scenic lakeside view sitouts & premium hammocks",
        "Dedicated charging points inside/near tents"
      ]
    },
    {
      category: "Kitchen & Dining",
      items: [
        "Strictly separate Veg & Non-Veg kitchen spaces",
        "High-quality cooking oils used (Absolutely NO palm oil)",
        "Complimentary High Tea, snacks & morning breakfast",
        "DIY BBQ preparation & dedicated marination service",
        "Delicious à la carte dinner ordering starts at 8:00 PM"
      ]
    },
    {
      category: "Activities & Water Sports",
      items: [
        "Waterfront Kayaking (life jackets mandatory, weather permitting)",
        "Infinity Pool access (4:00 PM - 9:00 PM)",
        "Ice Bath therapy session at the Activity Zone",
        "Scenic Watch Tower for photo-ops & sunset views",
        "Guided mountain trekking & local Adoshi Waterfall visits"
      ]
    },
    {
      category: "Games & Entertainment",
      items: [
        "Table Tennis & Badminton court racket games",
        "Sand Volleyball court & pool games",
        "Creative art & canvas painting sessions",
        "Indoor board games (Uno, playing cards, puzzles, magnetic games)",
        "Lakeside DJ & Music Night setups",
        "Big screen outdoor movie screenings under the stars"
      ]
    },
    {
      category: "Safety & Policies",
      items: [
        "Mandatory life jacket rules for all lake activities",
        "First-aid emergency kit & on-site security guards",
        "Eco-friendly waste management rules",
        "Dedicated safe parking space on premises",
        "Pet-friendly guidelines (special pet meals available on request)"
      ]
    }
  ];

  // Testimonial reviews loaded from database / local copy for detail view
  const reviewsData = [
    { name: "Rahul Sharma", date: "June 2026", rating: 5, text: "Loved the glamping domes. The setup next to Adoshi Dam is spectacular, and the Veg/Non-Veg separate kitchens are a big plus!" },
    { name: "Aditi Rao", date: "July 2026", rating: 5, text: "My golden retriever had the best time running around the lawn. Kayaking with life jackets was safe and very fun. Will visit again!" },
    { name: "Vikram Malhotra", date: "May 2026", rating: 5, text: "Ideal pitstop for motorcyclists. Clean tents, warm hosts, great music by the campfire, and no palm oil rules in cooking feel very premium." },
    { name: "Priya Patel", date: "July 2026", rating: 5, text: "Outdoor screen movie watching under the starlit sky next to a bonfire was a dreamy experience. Worth every rupee." }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12 relative z-10">
      
      {/* STEP 1: EXPERIENCE LISTING DETAILS */}
      {step === "details" && (
        <div className="space-y-10">
          
          {/* Header Back Link */}
          <div className="flex justify-start">
            <a href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-sand/50 hover:text-sunset transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
          </div>

          {/* Banner Images layout - Airbnb Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden aspect-[16/7] w-full">
            <div className="md:col-span-2 relative h-full w-full">
              <img src="/images/resort_background_hd_4k.jpg" alt="Glamping Domes" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-rows-2 gap-3 md:col-span-2 h-full">
              <div className="grid grid-cols-2 gap-3 h-full">
                <img src="/images/IMG_8399.jpeg" alt="Lakeside View" className="w-full h-full object-cover" />
                <img src="/images/img3.jpeg" alt="Infinity Pool" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3 h-full">
                <img src="/images/Dog birthday celebration/20260726_142225.jpg.jpeg" alt="Oasis Yards" className="w-full h-full object-cover" />
                <img src="/images/Rider's Special/20260719_122956.jpg" alt="Riders Camp" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Main Content & Reservation Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
            
            {/* Left Column: Info & Calendar (Airbnb style listing) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Title Header */}
              <div className="border-b border-sand/10 pb-6 space-y-2">
                <h1 className="text-3xl md:text-4xl font-serif font-light text-white uppercase tracking-wider">
                  Lake N Trails Exotic Glamping
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-sans text-sand/60">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-sunset stroke-sunset text-sunset" /> 4.9 (195 reviews)</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-sunset" /> Adoshi Dam Reservoir, Khopoli</span>
                </div>
              </div>

              {/* Host details */}
              <div className="flex items-center justify-between border-b border-sand/10 pb-6">
                <div>
                  <h3 className="text-lg font-serif font-light text-white uppercase">Hosted by Abhay</h3>
                  <p className="text-xs text-sand/50 font-sans mt-0.5">Resort Managing Partner • 5 years hosting</p>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border border-sand/20">
                  <img src="/images/img2.jpeg" alt="Host Profile" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Stays - Where you'll sleep */}
              <div className="border-b border-sand/10 pb-8 space-y-4">
                <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider">Where you'll sleep</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#030f26]/30 border border-sand/10 rounded-xl space-y-2">
                    <Tent className="w-6 h-6 text-sunset" />
                    <h4 className="text-sm font-serif text-white">Luxury Geodesic Domes</h4>
                    <p className="text-xs text-sand/50 leading-relaxed">Spacious weatherproof dome stays equipped with premium comfortable mattresses and lake vistas.</p>
                  </div>
                  <div className="p-5 bg-[#030f26]/30 border border-sand/10 rounded-xl space-y-2">
                    <Tent className="w-6 h-6 text-sunset" />
                    <h4 className="text-sm font-serif text-white">Waterproof Glamping Tents</h4>
                    <p className="text-xs text-sand/50 leading-relaxed">Premium waterproof outdoor tents with clean bedding, pillows, and cozy layouts right by the shore.</p>
                  </div>
                </div>
              </div>

              {/* What this place offers */}
              <div className="border-b border-sand/10 pb-8 space-y-6">
                <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider">What this place offers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {quickAmenities.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="p-2 rounded-lg bg-[#030f26]/50 border border-sand/5 text-sunset">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-serif text-white font-medium">{item.name}</h4>
                        <p className="text-[10px] text-sand/50">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setIsAmenitiesModalOpen(true)}
                    className="px-6 py-2.5 rounded-lg border border-sand/20 hover:border-sunset text-white hover:text-sunset text-[10px] font-sans uppercase tracking-widest font-semibold transition-all cursor-pointer bg-white/5"
                  >
                    Show All 25+ Amenities
                  </button>
                </div>
              </div>

              {/* Dynamic Calendar Selector - Rendered Inline on the page */}
              <div className="border-b border-sand/10 pb-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider">Select check-in & check-out dates</h3>
                    <p className="text-xs text-sand/50 font-sans mt-0.5">Select your stay dates on the calendar map below</p>
                  </div>
                  {formData.checkIn && (
                    <button 
                      onClick={handleClearDates}
                      className="text-xs text-sunset hover:underline cursor-pointer"
                    >
                      Clear Dates
                    </button>
                  )}
                </div>

                {/* Inline calendar container */}
                <div className="p-6 bg-[#030f26]/30 border border-sand/15 rounded-2xl shadow-xl w-full">
                  
                  {/* Calendar Navigation header */}
                  <div className="flex justify-between items-center mb-6 px-2 w-full border-b border-sand/5 pb-4">
                    <button
                      type="button"
                      onClick={() => setCurrentMonthOffset((p) => p - 1)}
                      className="w-8 h-8 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset cursor-pointer transition-all hover:bg-white/5"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex gap-16 md:gap-32">
                      <span className="text-xs font-serif text-white tracking-widest uppercase font-semibold">
                        {getMonthName(currentMonthOffset)}
                      </span>
                      <span className="text-xs font-serif text-white tracking-widest uppercase font-semibold hidden md:block">
                        {getMonthName(currentMonthOffset + 1)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentMonthOffset((p) => p + 1)}
                      className="w-8 h-8 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset cursor-pointer transition-all hover:bg-white/5"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Monthly grid */}
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      {renderMonth(currentMonthOffset)}
                    </div>
                    <div className="flex-1 hidden md:block border-l border-sand/10 pl-8">
                      {renderMonth(currentMonthOffset + 1)}
                    </div>
                  </div>

                  {/* Summary of dates selected */}
                  {formData.checkIn && (
                    <div className="mt-6 pt-4 border-t border-sand/10 flex justify-between items-center text-xs font-sans text-sand/60">
                      <span>Selected stay dates:</span>
                      <span className="text-white font-semibold uppercase tracking-wider">
                        {formatDateDisplay(formData.checkIn)}
                        {formData.checkOut ? ` — ${formatDateDisplay(formData.checkOut)}` : " (Select Check-Out Date)"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews & Testimonials list */}
              <div className="border-b border-sand/10 pb-8 space-y-6">
                <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider">Guest Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviewsData.map((rev, idx) => (
                    <div key={idx} className="p-5 bg-[#030f26]/20 border border-sand/5 rounded-xl space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-serif font-medium text-white">{rev.name}</h4>
                          <p className="text-[10px] text-sand/40">{rev.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-sunset text-sunset" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-sand/70 font-sans leading-relaxed">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Things to know (Resort guidelines & policies) */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider">Things to Know</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Cancellation */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-sunset">Cancellation Policy</h4>
                    <ul className="text-[10px] text-sand/50 space-y-2 list-disc pl-4 font-sans">
                      <li>Complimentary cancellation up to 7 days before check-in.</li>
                      <li>Cancellation is non-refundable within 7 days of stay.</li>
                      <li>Refund rules differ during long weekends & holiday periods.</li>
                    </ul>
                  </div>

                  {/* House Rules */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-sunset">House Rules</h4>
                    <ul className="text-[10px] text-sand/50 space-y-2 list-disc pl-4 font-sans">
                      <li>Check-in: 3:00 PM | Check-out: 11:00 AM next day.</li>
                      <li>Strict segregation of Veg & Non-Veg kitchens.</li>
                      <li>NO Palm Oil used in any meals prepared.</li>
                      <li>Quiet hours start after 11:00 PM for lakeside peace.</li>
                    </ul>
                  </div>

                  {/* Safety */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-sunset">Safety & Property</h4>
                    <ul className="text-[10px] text-sand/50 space-y-2 list-disc pl-4 font-sans">
                      <li>Mandatory life jacket rules for kayaking & lake sports.</li>
                      <li>Infinity pool access hours: 4:00 PM - 9:00 PM.</li>
                      <li>Safe, secured parking space inside premises.</li>
                      <li>First-aid support kit on site.</li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Floating Reservation Card (Airbnb-Style Widget) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              
              {(() => {
                const pricing = calculatePricing();
                return (
                  <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 space-y-6 shadow-2xl">
                    
                    {/* Price Header */}
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-2xl font-serif text-white">₹{pricing.adultRate.toLocaleString()}</span>
                        <span className="text-xs text-sand/50"> / {pricing.isStay ? "night" : "person"}</span>
                      </div>
                      <span className="text-[10px] font-sans tracking-wide text-sunset font-semibold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-sunset text-sunset" /> 4.9
                      </span>
                    </div>

                    {/* Booking Form options (inside floating box) */}
                    <div className="space-y-4">
                      
                      {/* Dates Selector Info display */}
                      <div className="border border-sand/10 rounded-lg p-3 font-sans text-xs space-y-2 bg-[#030f26]/40">
                        <div className="flex justify-between">
                          <span className="text-sand/40 uppercase tracking-widest text-[9px]">Check-in</span>
                          <span className="text-white font-medium">{formData.checkIn ? formatDateDisplay(formData.checkIn) : "Select date"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sand/40 uppercase tracking-widest text-[9px]">Check-out</span>
                          <span className="text-white font-medium">{formData.checkOut ? formatDateDisplay(formData.checkOut) : "Select date"}</span>
                        </div>
                      </div>

                      {/* Guest Selector Dropdown */}
                      <div className="relative" ref={guestSelectorRef}>
                        <button
                          type="button"
                          onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                          className="w-full pl-4 pr-10 py-3.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-left text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors relative cursor-pointer flex justify-between items-center"
                        >
                          <div className="flex flex-col text-left">
                            <span className="text-[8px] uppercase tracking-widest text-sand/40">Guests</span>
                            <span className="text-xs font-sans truncate max-w-[170px]">{getGuestsSummary()}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-sand/40" />
                        </button>

                        {/* Guest Selector popover */}
                        <AnimatePresence>
                          {isGuestDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 left-0 mt-2 bg-[#080e1a]/95 backdrop-blur-xl border border-sand/20 rounded-xl p-4 shadow-2xl z-[999] space-y-4 text-left"
                            >
                              {/* Adults Row */}
                              <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                                <div>
                                  <h5 className="text-xs font-sans font-medium text-white">Adults</h5>
                                  <p className="text-[9px] text-sand/40">Age 13+</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("adults", -1)}
                                    disabled={guestCounts.adults <= 1 || guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs text-white font-medium w-4 text-center">
                                    {guestCounts.isLargeEvent ? "-" : guestCounts.adults}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("adults", 1)}
                                    disabled={guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Children (5-12y) */}
                              <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                                <div>
                                  <h5 className="text-xs font-sans font-medium text-white">Children</h5>
                                  <p className="text-[9px] text-sand/40">Ages 5-12 (Charged)</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("childrenAbove5", -1)}
                                    disabled={guestCounts.childrenAbove5 <= 0 || guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs text-white font-medium w-4 text-center">
                                    {guestCounts.isLargeEvent ? "-" : guestCounts.childrenAbove5}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("childrenAbove5", 1)}
                                    disabled={guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Children under 5 */}
                              <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                                <div>
                                  <h5 className="text-xs font-sans font-medium text-white">Children</h5>
                                  <p className="text-[9px] text-sand/40">Under 5 (Complimentary)</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("childrenBelow5", -1)}
                                    disabled={guestCounts.childrenBelow5 <= 0 || guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs text-white font-medium w-4 text-center">
                                    {guestCounts.isLargeEvent ? "-" : guestCounts.childrenBelow5}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("childrenBelow5", 1)}
                                    disabled={guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Infants */}
                              <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                                <div>
                                  <h5 className="text-xs font-sans font-medium text-white">Infants</h5>
                                  <p className="text-[9px] text-sand/40">Under 2</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("infants", -1)}
                                    disabled={guestCounts.infants <= 0 || guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs text-white font-medium w-4 text-center">
                                    {guestCounts.isLargeEvent ? "-" : guestCounts.infants}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateGuestCount("infants", 1)}
                                    disabled={guestCounts.isLargeEvent}
                                    className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Pets */}
                              <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                                <div>
                                  <h5 className="text-xs font-sans font-medium text-white">Bringing a Pet?</h5>
                                  <p className="text-[9px] text-sand/40">
                                    {pricing.isStay ? "Pet stay charge: + ₹400" : "Pet charge: + ₹200"}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={guestCounts.pets > 0}
                                    onChange={(e) => {
                                      setGuestCounts((prev) => ({
                                        ...prev,
                                        pets: e.target.checked ? 1 : 0
                                      }));
                                    }}
                                    disabled={guestCounts.isLargeEvent}
                                    className="w-4 h-4 rounded border-sand/20 text-sunset focus:ring-sunset bg-[#030f26]/30 cursor-pointer accent-sunset"
                                  />
                                </div>
                              </div>

                              {/* Dropdown footer */}
                              <div className="flex items-center justify-between pt-2 border-t border-sand/10">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="isLargeEventDetail"
                                    checked={guestCounts.isLargeEvent}
                                    onChange={(e) => {
                                      setGuestCounts((prev) => ({
                                        ...prev,
                                        isLargeEvent: e.target.checked,
                                      }));
                                    }}
                                    className="w-4 h-4 accent-sunset rounded border-sand/15 bg-[#030f26] cursor-pointer"
                                  />
                                  <label htmlFor="isLargeEventDetail" className="text-[10px] text-sand/60 cursor-pointer select-none">
                                    Large Event (50+)
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setIsGuestDropdownOpen(false)}
                                  className="px-3 py-1.5 bg-sunset hover:bg-[#fd5e53] text-white text-[10px] font-sans uppercase tracking-widest font-semibold rounded-lg cursor-pointer"
                                >
                                  Close
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Package Select option */}
                      <div>
                        <label className="block text-[9px] uppercase tracking-widest text-sand/40 mb-1.5 pl-1 font-sans">Experience Package</label>
                        <div className="relative">
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full pl-4 pr-10 py-3.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-xs text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset appearance-none cursor-pointer"
                          >
                            <option value="day-outing" className="bg-[#030a16]">Day Outing Package</option>
                            <option value="stay-package" className="bg-[#030a16]">Ultimate Stay Package</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-4.5 w-4 h-4 text-sand/40 pointer-events-none" />
                        </div>
                      </div>

                    </div>

                    {/* Reserve CTA */}
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-4.5 rounded-xl bg-[#ff385c] hover:bg-[#e61e4d] text-[#fcfbf7] font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center cursor-pointer shadow-lg shadow-[#ff385c]/25 uppercase font-sans font-semibold"
                    >
                      Reserve
                    </button>
                    
                    <p className="text-[10px] text-sand/40 font-sans text-center">You won't be charged yet. Confirms on WhatsApp / Email.</p>

                    {/* Quick calculation display inside floating card */}
                    {formData.checkIn && formData.checkOut && (
                      <div className="border-t border-sand/10 pt-4.5 space-y-2.5 text-xs text-sand/70 font-sans">
                        <div className="flex justify-between">
                          <span className="underline">₹{pricing.adultRate.toLocaleString()} x {pricing.nights} night{pricing.nights > 1 ? "s" : ""}</span>
                          <span>₹{(pricing.adultRate * pricing.nights).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-white font-semibold pt-2.5 border-t border-sand/5">
                          <span>Total estimated (pre-tax)</span>
                          <span>₹{(pricing.adultRate * pricing.nights).toLocaleString()}</span>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })()}

            </div>

          </div>

        </div>
      )}

      {/* STEP 2: CONFIRM AND PAY (Airbnb checkout screen style) */}
      {step === "confirm" && (
        <div className="space-y-10 text-left max-w-5xl mx-auto">
          
          {/* Header title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setStep("details")}
              className="p-2 hover:bg-white/5 border border-sand/10 hover:border-sand/20 rounded-full text-white cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-serif font-light text-white uppercase tracking-wider">
              Confirm and pay
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Form Details & Policies check */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Trip details card */}
              <div className="border-b border-sand/10 pb-6 space-y-4">
                <h3 className="text-lg font-serif font-light text-white uppercase tracking-wider">Your Trip</h3>
                
                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Dates Details */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">Dates</h4>
                      <p className="text-sand/50 mt-0.5">
                        {formatDateDisplay(formData.checkIn)} – {formatDateDisplay(formData.checkOut)} ({getNumberOfNights()} night{getNumberOfNights() > 1 ? "s" : ""})
                      </p>
                    </div>
                    <button 
                      onClick={() => setStep("details")}
                      className="text-xs text-white underline font-semibold cursor-pointer hover:text-sunset"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Guests Details */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">Guests</h4>
                      <p className="text-sand/50 mt-0.5">{getDetailedGuestBreakdown()}</p>
                    </div>
                    <button 
                      onClick={() => setStep("details")}
                      className="text-xs text-white underline font-semibold cursor-pointer hover:text-sunset"
                    >
                      Edit
                    </button>
                  </div>

                </div>
              </div>

              {/* Guest Information Inputs */}
              <div className="border-b border-sand/10 pb-6 space-y-4">
                <h3 className="text-lg font-serif font-light text-white uppercase tracking-wider">Required Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-4.5 w-4 h-4 text-sand/40" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-xs text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-4.5 w-4 h-4 text-sand/40" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-xs text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-4.5 w-4 h-4 text-sand/40" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-xs text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="notes"
                      placeholder="Add custom notes, special dietary requirements, or pet details..."
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-xs text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Cancellation Policy terms */}
              <div className="border-b border-sand/10 pb-6 space-y-3 font-sans text-xs">
                <h3 className="text-lg font-serif font-light text-white uppercase tracking-wider">Cancellation Policy</h3>
                <p className="text-sand/60 leading-relaxed">
                  Complimentary cancellation is available up to 7 days before check-in. In case of cancel request made within 7 days, the reservation payment is non-refundable. Refund terms and rates are subject to change during long weekends & festive holiday slots.
                </p>
              </div>

              {/* Agree Terms Checkbox */}
              <div className="flex items-start gap-3 text-xs font-sans text-sand/60 leading-relaxed">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={isAgreedToTerms}
                  onChange={(e) => setIsAgreedToTerms(e.target.checked)}
                  className="w-4.5 h-4.5 text-sunset focus:ring-sunset border-sand/20 rounded bg-[#030f26] cursor-pointer accent-sunset mt-0.5"
                />
                <label htmlFor="agreeTerms" className="cursor-pointer select-none">
                  By selecting the button below, I agree to the <span className="text-white underline font-semibold">resort stay rules</span>, safety policies (including mandatory life jackets for water sports), and cancellation policies.
                </label>
              </div>

              {/* Confirm CTAs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <button
                  type="submit"
                  onClick={handleWhatsAppSubmit}
                  className="w-full py-4.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs font-sans uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20"
                >
                  Confirm & Pay (WhatsApp)
                </button>
                <button
                  type="submit"
                  onClick={handleEmailSubmit}
                  className="w-full py-4.5 rounded-xl bg-sunset hover:bg-[#fd5e53] text-white font-medium text-xs font-sans uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sunset/20"
                >
                  Confirm & Pay (Email)
                </button>
              </div>
              <p className="text-[10px] text-sand/40 text-center font-sans">
                Payment confirmation link will be sent directly by resort executives upon reservation request.
              </p>

            </div>

            {/* Right Column: Pricing Summary checkout widget */}
            <div className="lg:col-span-5">
              
              {(() => {
                const pricing = calculatePricing();
                return (
                  <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
                    
                    {/* Stay Detail Summary */}
                    <div className="flex gap-4 items-center border-b border-sand/10 pb-5">
                      <img
                        src={pricing.isStay ? "/images/IMG_8399.jpeg" : "/images/img3.jpeg"}
                        alt={pricing.packageName}
                        className="w-18 h-18 rounded-xl object-cover border border-sand/10 flex-shrink-0"
                      />
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="text-sm font-serif font-light text-white uppercase tracking-wider leading-snug truncate-2-lines">
                          {pricing.packageName}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-sand/50 font-sans mt-1">
                          <Star className="w-3.5 h-3.5 fill-sunset text-sunset" /> 4.9 (195 reviews)
                        </div>
                      </div>
                    </div>

                    {/* Pricing details */}
                    <div className="space-y-4 font-sans text-xs">
                      <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-white">Price Details</h4>
                      
                      {guestCounts.isLargeEvent ? (
                        <div className="flex justify-between items-center py-2 text-sand/80 italic">
                          <span>Group pricing (50+ guests)</span>
                          <span>Custom Quote</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {guestCounts.adults > 0 && (
                            <div className="flex justify-between text-sand/70">
                              <span>Adults (₹{pricing.adultRate.toLocaleString()} x {guestCounts.adults} guest{guestCounts.adults > 1 ? "s" : ""})</span>
                              <span>₹{(pricing.adultRate * guestCounts.adults * pricing.nights).toLocaleString()}</span>
                            </div>
                          )}
                          {guestCounts.childrenAbove5 > 0 && (
                            <div className="flex justify-between text-sand/70">
                              <span>Kids 5-12y (₹{pricing.childRate.toLocaleString()} x {guestCounts.childrenAbove5} guest{guestCounts.childrenAbove5 > 1 ? "s" : ""})</span>
                              <span>₹{(pricing.childRate * guestCounts.childrenAbove5 * pricing.nights).toLocaleString()}</span>
                            </div>
                          )}
                          {pricing.petCharge > 0 && (
                            <div className="flex justify-between text-sand/70">
                              <span>Pet Surcharge ({guestCounts.pets} pet)</span>
                              <span>₹{pricing.petCharge.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sand/70 pt-2.5 border-t border-sand/5">
                            <span>Subtotal</span>
                            <span>₹{pricing.subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sand/70">
                            <span>Taxes (5% GST)</span>
                            <span>₹{pricing.taxes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-white font-semibold text-sm pt-3.5 border-t border-sand/10">
                            <span>Total (INR)</span>
                            <span className="text-sunset text-glow-sunset">₹{pricing.total.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })()}

            </div>

          </div>

        </div>
      )}

      {/* Full Detailed Amenities Modal */}
      <AnimatePresence>
        {isAmenitiesModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAmenitiesModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-3xl bg-[#030a16] border border-sand/20 rounded-2xl relative z-10 max-h-[85vh] flex flex-col overflow-hidden text-left"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sunset via-orange-500 to-amber-500" />
              <button
                onClick={() => setIsAmenitiesModalOpen(false)}
                className="absolute top-4 right-4 text-sand/65 hover:text-sunset transition-colors p-2 cursor-pointer z-30"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6 pb-4 border-b border-sand/10 flex-shrink-0">
                <h3 className="text-xl md:text-2xl font-serif font-light text-white uppercase tracking-wider">
                  What this place <span className="text-sunset italic font-normal">Offers</span>
                </h3>
                <p className="text-[10px] text-sand/40 font-sans uppercase tracking-widest mt-1">
                  Full amenities list & terms as per official brochure
                </p>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-8 pr-4">
                {detailedAmenities.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-3.5">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-sunset border-b border-sand/5 pb-1">
                      {group.category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {group.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-sand/80 font-sans leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Main page route component
export default function BookingPage() {
  return (
    <div className="bg-[#030a16] text-[#fcfbf7] min-h-screen relative overflow-hidden">
      
      {/* Custom Animated Mouse Cursor */}
      <CustomCursor />
      
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sunset/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-luxury-teal/5 blur-[150px] pointer-events-none" />

      {/* Booking Header */}
      <header className="relative z-10 w-full border-b border-sand/5 bg-[#030a16]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <svg
              className="w-6 h-6 stroke-sunset fill-none group-hover:rotate-6 transition-transform duration-300"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9yM3 9h18M3 15h18" />
            </svg>
            <span className="text-sm font-serif uppercase tracking-[0.35em] text-[#fcfbf7] font-semibold">
              Lake N Trails
            </span>
          </a>
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-sand/40">
            Booking Portal
          </span>
        </div>
      </header>

      {/* Suspense Wrapper */}
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-sm font-sans tracking-widest uppercase text-sand/40">
          Loading Booking Portal...
        </div>
      }>
        <BookingContent />
      </Suspense>

      {/* Simplified Footer */}
      <footer className="relative z-10 py-8 border-t border-sand/5 bg-[#030a16] text-center text-[10px] font-sans text-sand/30 tracking-widest uppercase">
        © {new Date().getFullYear()} Lake N Trails Exotic Glamping. All Rights Reserved.
      </footer>

    </div>
  );
}
