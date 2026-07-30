"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  ShieldAlert
} from "lucide-react";

// Booking Form & Pricing Logic
function BookingContent() {
  const searchParams = useSearchParams();
  const rawExperience = searchParams.get("experience") || "camping";
  
  // Map general experiences to the two actual package options
  let defaultExp = "stay-package";
  if (!["camping", "stay-package", "stay-glamp", "stay-tent", "pool-party", "wedding", "corporate"].includes(rawExperience)) {
    defaultExp = "day-outing";
  }

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempCheckIn, setTempCheckIn] = useState<Date | null>(null);
  const [tempCheckOut, setTempCheckOut] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);

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

  const handleDateClick = (date: Date) => {
    if (!tempCheckIn || (tempCheckIn && tempCheckOut)) {
      setTempCheckIn(date);
      setTempCheckOut(null);
    } else if (tempCheckIn && !tempCheckOut) {
      if (date < tempCheckIn) {
        setTempCheckIn(date);
      } else {
        setTempCheckOut(date);
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
  };

  const handleSaveDates = () => {
    setFormData((prev) => ({
      ...prev,
      checkIn: formatDate(tempCheckIn),
      checkOut: formatDate(tempCheckOut),
    }));
    setIsCalendarOpen(false);
  };

  // Sync calendar temp values when calendar opens or changes
  useEffect(() => {
    if (isCalendarOpen) {
      if (formData.checkIn) {
        const [y, m, d] = formData.checkIn.split("-").map(Number);
        setTempCheckIn(new Date(y, m - 1, d));
      } else {
        setTempCheckIn(null);
      }
      if (formData.checkOut) {
        const [y, m, d] = formData.checkOut.split("-").map(Number);
        setTempCheckOut(new Date(y, m - 1, d));
      } else {
        setTempCheckOut(null);
      }
    }
  }, [isCalendarOpen, formData.checkIn, formData.checkOut]);

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
    const monthName = new Date(year, month, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const baseToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return (
      <div className="w-full">
        <h4 className="text-xs font-serif font-light text-center text-white mb-3 tracking-widest uppercase">
          {monthName}
        </h4>
        <div className="grid grid-cols-7 gap-0.5 mb-1.5 text-center">
          {daysOfWeek.map((day, idx) => (
            <span key={idx} className="text-[9px] text-sand/40 font-medium font-sans w-full">
              {day}
            </span>
          ))}
        </div>
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
      </div>
    );
  };

  // Amenities Data matching brochure
  const quickAmenities = [
    { icon: <Tent className="w-4 h-4 text-sunset" />, name: "Waterproof Tents", desc: "Premium cozy bedding & blankets" },
    { icon: <Waves className="w-4 h-4 text-sunset" />, name: "Infinity Pool", desc: "Open panoramic mountain views" },
    { icon: <Utensils className="w-4 h-4 text-sunset" />, name: "Separate Kitchens", desc: "Strict Veg & Non-Veg prep (No palm oil)" },
    { icon: <Flame className="w-4 h-4 text-sunset" />, name: "Campfire & BBQ", desc: "Lakeside woodfire setups" },
    { icon: <Compass className="w-4 h-4 text-sunset" />, name: "Adventure Trekking", desc: "Guided trails & local waterfall walk" },
    { icon: <Smile className="w-4 h-4 text-sunset" />, name: "Pet-Friendly Stay", desc: "Open shoreline play area lawns" }
  ];

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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16 relative z-10 text-[#fcfbf7]">
      
      {/* Back button link */}
      <div className="mb-8 flex justify-start">
        <a 
          href="/" 
          className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-widest font-semibold text-sand/60 hover:text-sunset transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back To Home
        </a>
      </div>

      {/* Main Grid: Form on Left, Pricing Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Form & Amenities */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Header Title */}
          <div className="text-left">
            <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-2 block font-medium">
              Start Your Journey
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide uppercase">
              Begin Your <span className="text-glow-sunset italic font-normal text-sunset">Lakeside Escape</span>
            </h1>
            <p className="text-xs text-sand/50 font-sans tracking-wider uppercase mt-2.5">
              Submit details to book your premium experience at Lake N Trails
            </p>
          </div>

          {/* Form Content */}
          <form className="space-y-6 text-left">
            
            {/* Name, Email, Phone Group */}
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
                  className="w-full pl-10 pr-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
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
                  className="w-full pl-10 pr-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
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
                  className="w-full pl-10 pr-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                />
              </div>
            </div>

            {/* Dates & Guests Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Date Input */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="w-full pl-10 pr-4 pt-5 pb-2.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-left text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors relative cursor-pointer"
                >
                  <Calendar className="absolute left-3 top-4.5 w-4 h-4 text-sand/40" />
                  <span className="absolute left-10 top-1.5 text-[9px] uppercase tracking-widest text-sand/40">Dates</span>
                  <span className="text-xs">
                    {formData.checkIn ? formatDateDisplay(formData.checkIn) : "Select date"}
                    {formData.checkOut ? ` — ${formatDateDisplay(formData.checkOut)}` : ""}
                  </span>
                </button>

                {/* Calendar Dropdown Card */}
                <AnimatePresence>
                  {isCalendarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-full md:w-[600px] bg-[#080e1a]/95 backdrop-blur-xl border border-sand/20 rounded-2xl p-5 shadow-2xl z-[99] flex flex-col md:flex-row gap-5"
                    >
                      {/* Left Month */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-4">
                          <button
                            type="button"
                            onClick={() => setCurrentMonthOffset((p) => p - 1)}
                            className="w-7 h-7 rounded-full border border-sand/10 flex items-center justify-center text-white hover:border-sunset cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          {renderMonth(currentMonthOffset)}
                        </div>
                      </div>

                      {/* Right Month */}
                      <div className="flex-1 hidden md:block border-l border-sand/10 pl-5">
                        <div className="flex justify-between items-center mb-4">
                          <span className="w-7 h-7" />
                          {renderMonth(currentMonthOffset + 1)}
                          <button
                            type="button"
                            onClick={() => setCurrentMonthOffset((p) => p + 1)}
                            className="w-7 h-7 rounded-full border border-sand/10 flex items-center justify-center text-white hover:border-sunset cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Calendar Footer Actions */}
                      <div className="w-full md:absolute md:bottom-5 md:left-5 md:right-5 flex justify-between items-center border-t border-sand/10 pt-3 md:mt-2">
                        <button
                          type="button"
                          onClick={handleClearDates}
                          className="text-[10px] uppercase tracking-widest text-sand/40 hover:text-white transition-colors cursor-pointer"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveDates}
                          className="px-4 py-2 bg-sunset text-white text-[10px] uppercase tracking-widest font-semibold rounded-lg hover:bg-[#fd5e53] cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Guest Count Input */}
              <div className="relative" ref={guestSelectorRef}>
                <button
                  type="button"
                  onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                  className="w-full pl-10 pr-10 pt-5 pb-2.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-left text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors relative cursor-pointer"
                >
                  <Users className="absolute left-3 top-4.5 w-4 h-4 text-sand/40" />
                  <span className="absolute left-10 top-1.5 text-[9px] uppercase tracking-widest text-sand/40">Guests</span>
                  <span className="text-xs truncate block pr-2">
                    {getGuestsSummary()}
                  </span>
                  <ChevronDown className="absolute right-3 top-5 w-4 h-4 text-sand/40" />
                </button>

                {/* Guest Selector popover */}
                <AnimatePresence>
                  {isGuestDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 left-0 mt-2 bg-[#080e1a]/95 backdrop-blur-xl border border-sand/20 rounded-xl p-4 shadow-2xl z-[999] space-y-4"
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

                      {/* Children (Ages 5-12) Row */}
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

                      {/* Children (Under 5) Row */}
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

                      {/* Infants Row */}
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

                      {/* Pets Row */}
                      <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                        <div>
                          <h5 className="text-xs font-sans font-medium text-white">Bringing a Pet?</h5>
                          <p className="text-[9px] text-sand/40">
                            {formData.experience.startsWith("stay") || formData.experience === "camping"
                              ? "Pet stay charge applies (+ ₹400)"
                              : "Pet charge applies (+ ₹200)"}
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

                      {/* Dropdown Footer: Large Event & Close Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-sand/10">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="isLargeEventPage"
                            checked={guestCounts.isLargeEvent}
                            onChange={(e) => {
                              setGuestCounts((prev) => ({
                                ...prev,
                                isLargeEvent: e.target.checked,
                              }));
                            }}
                            className="w-4 h-4 accent-sunset rounded border-sand/15 bg-[#030f26] cursor-pointer"
                          />
                          <label htmlFor="isLargeEventPage" className="text-[10px] text-sand/60 cursor-pointer select-none">
                            Large Event (50+)
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsGuestDropdownOpen(false)}
                          className="px-3 py-1.5 bg-sunset hover:bg-[#fd5e53] text-white text-[10px] font-sans uppercase tracking-widest font-semibold rounded-lg transition-all cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Experience Select */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-sand/50 mb-2">Select Your Experience</label>
              <div className="relative">
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full pl-4 pr-10 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors appearance-none cursor-pointer"
                >
                  <option value="day-outing" className="bg-[#030a16]">Day Outing Package</option>
                  <option value="stay-package" className="bg-[#030a16]">Ultimate Stay Package</option>
                </select>
                <ChevronDown className="absolute right-3 top-4.5 w-4 h-4 text-sand/50 pointer-events-none" />
              </div>
              <div className="text-[10px] text-sand/50 font-sans mt-1.5 pl-1 italic">
                {formData.experience === "day-outing"
                  ? "* Tariff: ₹1,300 Weekday / ₹1,600 Weekend per person"
                  : "* Tariff: ₹2,200 Weekday / ₹2,800 Weekend per person"}
              </div>
            </div>

            {/* Notes textarea */}
            <div>
              <textarea
                name="notes"
                placeholder="Tell us about any special requirements, pet stay info, or event details..."
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30 resize-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <button
                type="submit"
                onClick={handleWhatsAppSubmit}
                className="w-full py-4.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm11.951-3.52c1.747 0 3.39-.462 4.81-1.272l.344-.204 3.58.94-.956-3.486.223-.356c.887-1.413 1.355-3.048 1.355-4.726C21.36 6.843 17.17 2.65 12 2.65S2.64 6.843 2.64 12c0 1.678.468 3.313 1.355 4.726l.223.356-.956 3.486 3.58-.94.344.204c1.42.81 3.063 1.272 4.81 1.272zm5.72-6.52c-.272-.136-1.614-.796-1.863-.887-.25-.09-.43-.136-.612.137-.18.272-.7.886-.856 1.068-.158.182-.317.205-.59.07-.272-.136-1.15-.424-2.19-1.355-.81-.72-1.357-1.614-1.516-1.886-.158-.273-.017-.42.12-.556.122-.122.272-.318.408-.477.136-.159.18-.272.272-.454.09-.182.045-.34-.022-.477-.068-.136-.613-1.477-.84-2.023-.22-.53-.443-.455-.612-.464-.16-.008-.34-.01-.52-.01-.18 0-.477.068-.727.34-.25.272-.953.932-.953 2.273s.977 2.636 1.113 2.818c.136.182 1.92 2.932 4.653 4.114.65.28 1.157.447 1.553.573.655.208 1.25.178 1.72.108.523-.078 1.614-.66 1.84-1.295.228-.636.228-1.182.16-1.295-.068-.113-.25-.18-.522-.318z" />
                </svg>
                Send to WhatsApp
              </button>
              <button
                type="submit"
                onClick={handleEmailSubmit}
                className="w-full py-4.5 rounded-xl bg-sunset hover:bg-[#fd5e53] text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sunset/30"
              >
                <Mail className="w-5 h-5" />
                Send via Email
              </button>
            </div>
          </form>

          {/* Amenities Grid integrated inside booking form page */}
          <div className="pt-10 border-t border-sand/10 text-left">
            <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-2 block font-medium">
              Amenities Included
            </span>
            <h3 className="text-2xl font-serif font-light text-white mb-6 uppercase tracking-wider">
              What This Place Offers
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {quickAmenities.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group p-3 rounded-xl hover:bg-[#030f26]/30 border border-transparent hover:border-sand/10 transition-all duration-300">
                  <div className="p-2.5 rounded-lg bg-[#030f26]/60 border border-sand/10 group-hover:border-sunset/40 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-medium text-white mb-0.5 group-hover:text-sunset transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-sand/50 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-start">
              <button
                onClick={() => setIsAmenitiesModalOpen(true)}
                className="px-6 py-3 rounded-xl border border-sand/20 hover:border-sunset text-white hover:text-sunset text-[10px] font-sans uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer bg-white/5 hover:bg-white/10"
              >
                Show All 25+ Amenities
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing Summary Card & Policies */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {(() => {
            const pricing = calculatePricing();
            return (
              <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-8 space-y-6 sticky top-24">
                
                {/* Package Info */}
                <div className="flex gap-4 items-center">
                  <img
                    src={pricing.isStay ? "/images/IMG_8399.jpeg" : "/images/img3.jpeg"}
                    alt={pricing.packageName}
                    loading="lazy"
                    className="w-20 h-20 rounded-xl object-cover border border-sand/10 flex-shrink-0"
                  />
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[9px] font-sans uppercase tracking-wider text-sunset font-semibold mb-0.5">Your Experience</span>
                    <h4 className="text-sm font-serif font-light text-white uppercase tracking-wider leading-snug truncate-2-lines">
                      {pricing.packageName}
                    </h4>
                    <p className="text-[10px] text-sand/40 font-sans mt-0.5">
                      Adoshi Dam Reservoir, Khopoli
                    </p>
                  </div>
                </div>

                {/* Selection Details */}
                <div className="border-t border-b border-sand/10 py-4.5 space-y-3 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-sand/50">Check-in</span>
                    <span className="text-white font-medium">{formData.checkIn ? formatDateDisplay(formData.checkIn) : "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sand/50">Check-out</span>
                    <span className="text-white font-medium">{formData.checkOut ? formatDateDisplay(formData.checkOut) : "Not set"}</span>
                  </div>
                  {pricing.isStay && (
                    <div className="flex justify-between">
                      <span className="text-sand/50">Nights</span>
                      <span className="text-white font-medium">{pricing.nights} night{pricing.nights > 1 ? "s" : ""}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sand/50">Guests</span>
                    <span className="text-white font-medium truncate pl-2 max-w-[200px] text-right">{getGuestsSummary()}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 font-sans text-xs">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-sunset">Price Breakdown</h4>
                  
                  {guestCounts.isLargeEvent ? (
                    <div className="flex justify-between items-center py-2 text-sand/80 italic">
                      <span>Event tariff quote starts at 50+ guests</span>
                      <span>Custom</span>
                    </div>
                  ) : (
                    <>
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
                          <span>Pet Stay Surcharge</span>
                          <span>₹{pricing.petCharge.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sand/70 pt-2 border-t border-sand/5">
                        <span>Subtotal</span>
                        <span>₹{pricing.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sand/70">
                        <span>GST (5%)</span>
                        <span>₹{pricing.taxes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white font-semibold text-sm pt-3 border-t border-sand/10">
                        <span>Total (INR)</span>
                        <span className="text-sunset text-glow-sunset">₹{pricing.total.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Policies Box */}
                <div className="border-t border-sand/15 pt-5 space-y-3 text-left">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-sunset flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Resort Policies
                  </h4>
                  <ul className="text-[10px] text-sand/50 space-y-2 font-sans leading-relaxed list-disc pl-4">
                    <li>Complimentary cancellation up to 7 days before check-in.</li>
                    <li>Early check-in / late check-out is subject to availability.</li>
                    <li>Children aged 5–12 years are charged at half-price.</li>
                    <li>Life jackets are strictly mandatory for all water sports & pool sessions.</li>
                    <li>We split Veg / Non-Veg kitchen spaces for strict dietary separation.</li>
                  </ul>
                </div>

              </div>
            );
          })()}

        </div>

      </div>

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

// Suspense-wrapped Page Export
export default function BookingPage() {
  return (
    <div className="bg-[#030a16] text-[#fcfbf7] min-h-screen relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sunset/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-luxury-teal/5 blur-[150px] pointer-events-none" />

      {/* Simplified Booking Header */}
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
