"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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
  ShieldAlert,
  Star,
  Sun,
  Moon
} from "lucide-react";

// Booking Form & Logic
function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawExperience = searchParams.get("experience") || "camping";
  
  let defaultExp = "stay-package";
  if (!["camping", "stay-package", "stay-glamp", "stay-tent", "pool-party", "wedding", "corporate"].includes(rawExperience)) {
    defaultExp = "day-outing";
  }

  // Steps: "form" (original layout) or "confirm" (confirm and pay layout)
  const [step, setStep] = useState<"form" | "confirm">("form");

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
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);
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
        adultRate = 1800;
        childRate = 900;
      } else {
        adultRate = 1500;
        childRate = 750;
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

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your Name, Email, and Phone number.");
      return;
    }
    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select Check-in and Check-out dates.");
      return;
    }
    setStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    return (
      <div className="w-full animate-fade-in space-y-2">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-0.5 text-center border-b border-sand/5 pb-1">
          {daysOfWeek.map((day, idx) => (
            <span key={idx} className="text-[10px] text-sand/40 font-medium font-sans w-full">
              {day}
            </span>
          ))}
        </div>
        
        {/* Days Grid */}
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

  const detailedPolicies = [
    {
      category: "Check-in & Stay Policies",
      items: [
        "Standard check-in time is 3:00 PM, and check-out is 11:00 AM next day.",
        "Early check-in or late check-out is strictly subject to slot availability and prior authorization.",
        "Guests are requested to submit valid Government ID proof (Aadhaar, Passport, or Driving License) upon arrival.",
        "The glamping dome or tent allocation is decided based on reservations; custom rearrangements require prior notice."
      ]
    },
    {
      category: "Cancellation & Refund Terms",
      items: [
        "100% refund for cancellations made at least 7 days before the scheduled check-in date.",
        "No refunds or date modifications are allowed for cancellations made within 7 days of scheduled arrival.",
        "Peak holiday seasons, long weekends, and festival bookings are non-refundable and non-transferable.",
        "In case of extreme weather alerts or natural lockdowns, bookings may be rescheduled to future open dates."
      ]
    },
    {
      category: "Kitchen & Dining Guidelines",
      items: [
        "Lake N Trails features strictly separate Vegetarian and Non-Vegetarian kitchens, utensils, and cooktops.",
        "Absolutely NO Palm Oil is used in any kitchen preparations; we use premium high-grade sunflower/coconut oils.",
        "High Tea and snacks are served between 4:30 PM - 5:30 PM, and morning breakfast is served from 8:30 AM - 10:00 AM.",
        "Dinner ordering timings: à la carte dinner choices must be submitted to the service desk by 8:00 PM."
      ]
    },
    {
      category: "Lake Activities & Pool Safety",
      items: [
        "Wearing life jackets is 100% mandatory for kayaking, boating, or any shoreline water sports, regardless of swimming ability.",
        "Infinity pool hours are strictly 4:00 PM - 9:00 PM. No swimming is allowed outside these hours for safety reasons.",
        "Strictly no glassware, drinks, or food items are allowed inside or on the edge of the infinity pool.",
        "Children must be accompanied by an adult guardian at all times in the pool area and lakefront zones."
      ]
    },
    {
      category: "Pet Guidelines (Pet-Friendly Oasis)",
      items: [
        "Pets are welcome at our dedicated Pet-Friendly Oasis lawns and glamping tents.",
        "Pet stay surcharge applies: ₹400 for overnight stays, ₹200 for day outing package guests.",
        "Pet owners are solely responsible for clean-up and safety. Pets must be supervised near common dining zones.",
        "Special fresh pet meals (unseasoned boiled chicken/veg broth) can be prepared by our kitchens upon prior request."
      ]
    },
    {
      category: "House Rules & Code of Conduct",
      items: [
        "As Lake N Trails is located in an eco-sensitive lakeside valley, loud music is restricted after 10:00 PM.",
        "Eco-friendly waste management rules apply. Littering the lake or forest floor is strictly prohibited.",
        "Lakeside campfires are lit and managed exclusively by our staff between 7:30 PM - 10:30 PM (weather permitting).",
        "Smoking is permitted only in designated outdoor sitout spaces, and is strictly banned inside the glamping tents/domes."
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16 relative z-10 text-[#fcfbf7]">
      
      {/* Back button */}
      {step === "form" && (
        <div className="mb-8 flex justify-start">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-widest font-semibold text-sand/60 hover:text-sunset transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back To Home
          </button>
        </div>
      )}

      {/* STEP 1: ORIGINAL SPACIOUS FORM LAYOUT */}
      {step === "form" && (
        <div className="space-y-12 max-w-4xl mx-auto">
          
          {/* Header Title */}
          <div className="text-left">
            <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-2 block font-medium">
              Start Your Journey
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide uppercase">
              Begin Your <span className="text-glow-sunset italic font-normal text-sunset">Lakeside Escape</span>
            </h1>
            <p className="text-xs text-sand/50 font-sans tracking-wider uppercase mt-2.5">
              Submit details to proceed to booking review & confirmation
            </p>
          </div>

          {/* Form Card Container */}
          <form onSubmit={handleProceed} className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-10 space-y-6 text-left shadow-2xl">
            
            {/* Name, Email, Phone Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/40" />
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
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/40" />
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
              <div className="relative md:col-span-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/40" />
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
            </div>

            {/* Dates & Guests Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Date Input */}
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-widest text-sand/50 font-bold pl-0.5">Select Dates</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="w-full pl-10 pr-4 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-left text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all cursor-pointer flex items-center h-14"
                  >
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/40" />
                    <span className="text-xs">
                      {formData.checkIn ? (
                        <>
                          <span className="text-white font-medium">{formatDateDisplay(formData.checkIn)}</span>
                          {formData.checkOut && <> to <span className="text-white font-medium">{formatDateDisplay(formData.checkOut)}</span></>}
                        </>
                      ) : (
                        <span className="text-sand/30">Check-in — Check-out</span>
                      )}
                    </span>
                  </button>
 
                  {/* Calendar Dropdown Card */}
                  <AnimatePresence>
                    {isCalendarOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-full md:w-[600px] bg-[#080e1a]/95 backdrop-blur-xl border border-sand/20 rounded-2xl p-5 shadow-2xl z-[99] flex flex-col gap-5"
                      >
                        {/* Unified calendar navigation header - VISIBLE and complete on mobile */}
                        <div className="flex justify-between items-center px-1 border-b border-sand/5 pb-3 w-full">
                          <button
                            type="button"
                            onClick={() => setCurrentMonthOffset((p) => p - 1)}
                            className="w-7 h-7 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
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
                            className="w-7 h-7 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
 
                        {/* Month blocks */}
                        <div className="flex flex-col md:flex-row gap-5">
                          <div className="flex-1">
                            {renderMonth(currentMonthOffset)}
                          </div>
                          <div className="flex-1 hidden md:block border-l border-sand/10 pl-5">
                            {renderMonth(currentMonthOffset + 1)}
                          </div>
                        </div>
 
                        {/* Calendar Footer Actions */}
                        <div className="flex justify-between items-center border-t border-sand/10 pt-3 mt-2">
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
              </div>
 
              {/* Guest Count Input */}
              <div className="space-y-1" ref={guestSelectorRef}>
                <label className="block text-[10px] uppercase tracking-widest text-sand/50 font-bold pl-0.5">Number of Guests</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                    className="w-full pl-10 pr-10 py-4 bg-[#030f26]/30 border border-sand/15 rounded-lg text-left text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all cursor-pointer flex items-center justify-between h-14"
                  >
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/40" />
                    <span className="text-xs text-white">
                      {getGuestsSummary()}
                    </span>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand/40" />
                  </button>
                </div>

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

            {/* Rates Highlight Box */}
            <div className="space-y-2">
              <span className="block text-[10px] uppercase tracking-widest text-sunset font-bold pl-0.5">Rates & Tariffs</span>
              <div className="bg-sunset/10 border border-sunset/35 rounded-xl p-4.5 flex flex-wrap justify-between items-center gap-4 shadow-md shadow-sunset/5">
                <div className="flex-1 min-w-[120px]">
                  <span className="block text-[8px] uppercase tracking-widest text-sand/40 font-bold mb-1">Weekday Rate</span>
                  <span className="text-xl font-serif text-white font-bold">
                    {formData.experience === "day-outing" ? "₹1,500" : "₹2,200"}
                  </span>
                  <span className="text-[10px] text-sand/50"> / {formData.experience === "day-outing" ? "person" : "night"}</span>
                </div>
                <div className="hidden sm:block h-8 border-l border-sand/10" />
                <div className="flex-1 min-w-[120px]">
                  <span className="block text-[8px] uppercase tracking-widest text-sand/40 font-bold mb-1">Weekend Rate</span>
                  <span className="text-xl font-serif text-white font-bold">
                    {formData.experience === "day-outing" ? "₹1,800" : "₹2,800"}
                  </span>
                  <span className="text-[10px] text-sand/50"> / {formData.experience === "day-outing" ? "person" : "night"}</span>
                </div>
                <div className="hidden sm:block h-8 border-l border-sand/10" />
                <div className="flex-1 min-w-[120px]">
                  <span className="block text-[8px] uppercase tracking-widest text-sunset font-bold mb-1">Kids (5-12y)</span>
                  <span className="text-xs font-semibold text-white block">Half Price Tariff</span>
                  <span className="text-[9px] text-sand/40">(Under 5y is complimentary)</span>
                </div>
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
            </div>

            {/* Quick Amenities Grid inside the form card to guarantee visibility */}
            <div className="pt-4 border-t border-sand/10 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-sans tracking-[0.25em] text-sunset uppercase font-bold block">
                    Amenities Included
                  </span>
                  <h4 className="text-sm font-serif font-light text-white uppercase tracking-wider mt-0.5">
                    What's Included in your escape
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAmenitiesModalOpen(true)}
                  className="text-[9px] uppercase tracking-widest text-sunset hover:text-white underline transition-colors cursor-pointer font-bold font-sans"
                >
                  Show All 25+
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {quickAmenities.map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start group p-3 rounded-xl bg-white/5 border border-sand/5 hover:border-sunset/30 transition-all duration-300">
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

            {/* Proceed CTA button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4.5 rounded-xl bg-[#ff385c] hover:bg-[#e61e4d] text-white font-sans uppercase tracking-[0.2em] font-bold text-xs transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg shadow-[#ff385c]/20"
              >
                Proceed to Confirm & Pay
              </button>
            </div>

          </form>

        </div>
      )}

      {/* STEP 2: CONFIRM AND PAY DETAILS CHECKOUT */}
      {step === "confirm" && (
        <div className="space-y-10 text-left max-w-5xl mx-auto animate-fade-in">
          
          {/* Header Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setStep("form")}
              className="p-2 hover:bg-white/5 border border-sand/10 hover:border-sand/20 rounded-full text-white cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-serif font-light text-white uppercase tracking-wider">
              Confirm and pay
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Checkout Inputs & Price Summary */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trip Selection Details */}
              <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl">
                <h3 className="text-lg font-serif font-light text-white uppercase tracking-wider border-b border-sand/10 pb-3">Your Trip Details</h3>
                
                <div className="space-y-4 text-xs font-sans">
                  
                  {/* Selected Dates */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">Dates</h4>
                      <p className="text-sand/50 mt-0.5">
                        {formatDateDisplay(formData.checkIn)} – {formatDateDisplay(formData.checkOut)} ({getNumberOfNights()} night{getNumberOfNights() > 1 ? "s" : ""})
                      </p>
                    </div>
                    <button 
                      onClick={() => setStep("form")}
                      className="text-xs text-white underline font-semibold cursor-pointer hover:text-sunset"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Selected Guests */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">Guests</h4>
                      <p className="text-sand/50 mt-0.5">{getDetailedGuestBreakdown()}</p>
                    </div>
                    <button 
                      onClick={() => setStep("form")}
                      className="text-xs text-white underline font-semibold cursor-pointer hover:text-sunset"
                    >
                      Edit
                    </button>
                  </div>

                </div>
              </div>

              {/* Personal Info summary */}
              <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl font-sans text-xs">
                <h3 className="text-lg font-serif font-light text-white uppercase tracking-wider border-b border-sand/10 pb-3">Contact Information</h3>
                <div className="space-y-3.5 text-sand/60">
                  <div className="flex flex-wrap justify-between items-center py-2 border-b border-sand/5">
                    <span className="text-[9px] uppercase tracking-widest text-sand/40 font-bold">Guest Name</span>
                    <span className="text-white font-semibold text-sm">{formData.name}</span>
                  </div>
                  <div className="flex flex-wrap justify-between items-center py-2 border-b border-sand/5">
                    <span className="text-[9px] uppercase tracking-widest text-sand/40 font-bold">Email Address</span>
                    <span className="text-white font-semibold text-sm break-all">{formData.email}</span>
                  </div>
                  <div className="flex flex-wrap justify-between items-center py-2 border-b border-sand/5">
                    <span className="text-[9px] uppercase tracking-widest text-sand/40 font-bold">Phone Number</span>
                    <span className="text-white font-semibold text-sm">{formData.phone}</span>
                  </div>
                </div>
                {formData.notes && (
                  <div className="pt-2">
                    <span className="block text-[8px] uppercase tracking-wider text-sand/40 font-bold">Special Requests</span>
                    <p className="text-white mt-1 italic text-xs">"{formData.notes}"</p>
                  </div>
                )}
              </div>

              {/* STAY INFO AND PRICING DETAILS CARD (MOVED HERE TO SHOW FIRST!) */}
              {(() => {
                const pricing = calculatePricing();
                return (
                  <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl text-xs font-sans text-left">
                    
                    {/* Stay Info Card */}
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

                    {/* Price Details */}
                    <div className="space-y-4">
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

            {/* Right Column: Resort Policies & Consent Action (MODIFIED TO BE AT THE BOTTOM!) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated Resort Policies Card */}
              <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl">
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-sunset flex items-center gap-1.5 border-b border-sand/10 pb-3">
                  <ShieldAlert className="w-4 h-4" /> Resort Policies
                </h4>
                <ul className="text-[10px] text-sand/50 space-y-2.5 font-sans leading-relaxed list-disc pl-4">
                  <li>Complimentary cancellation up to 7 days before check-in.</li>
                  <li>Cancellation is non-refundable within 7 days of stay.</li>
                  <li>Refund terms are different during long weekends & holiday periods.</li>
                  <li>Check-in: 3:00 PM | Check-out: 11:00 AM next day (overnight stays).</li>
                  <li>Strict segregation of Veg & Non-Veg kitchens.</li>
                  <li>NO Palm Oil used in any meals prepared.</li>
                  <li>Mandatory life jacket rules for kayaking & lake sports.</li>
                  <li>Infinity pool access hours: 4:00 PM - 9:00 PM.</li>
                  <li>Safe, secured parking space inside premises.</li>
                </ul>
              </div>

              {/* Agreement & Submit Actions */}
              <div className="bg-[#030f26]/40 border border-sand/15 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl font-sans text-xs">
                
                {/* Booking Process info note */}
                <div className="space-y-2.5 border-b border-sand/10 pb-5">
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] font-serif">Booking Process</h4>
                  <p className="text-sand/65 leading-relaxed text-[11px]">
                    Your enquiry will be sent directly to our reservation desk. Once dates are verified, our booking team will contact you via WhatsApp/Email to confirm slot availability and assist with the booking confirmation.
                  </p>
                </div>

                {/* Policy Consent Agreement Checkbox */}
                <div className="flex items-start gap-3 text-sand/65 leading-relaxed">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={isAgreedToTerms}
                    onChange={(e) => setIsAgreedToTerms(e.target.checked)}
                    className="w-4.5 h-4.5 text-sunset focus:ring-sunset border-sand/20 rounded bg-[#030f26] cursor-pointer accent-sunset mt-0.5"
                  />
                  <label htmlFor="agreeTerms" className="cursor-pointer select-none">
                    By checking this box, I agree to the{" "}
                    <span 
                      onClick={() => setIsPoliciesModalOpen(true)}
                      className="text-white underline font-semibold cursor-pointer hover:text-sunset transition-colors"
                    >
                      booking terms & policies
                    </span>
                    , veg/non-veg kitchen split rules, and mandatory safety guidelines (wearing life jackets during lake sports).
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    onClick={handleWhatsAppSubmit}
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans uppercase tracking-widest font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25 h-12"
                  >
                    Confirm & Pay (WhatsApp)
                  </button>
                  <button
                    type="submit"
                    onClick={handleEmailSubmit}
                    className="w-full py-4 rounded-xl bg-sunset hover:bg-[#fd5e53] text-[#fcfbf7] font-sans uppercase tracking-widest font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sunset/20 h-12"
                  >
                    Confirm & Pay (Email)
                  </button>
                </div>
                
                <p className="text-[9px] text-sand/40 text-center">
                  * Note: Your slot is locked instantly upon submission of this payment request.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Full Detailed Amenities Modal */}
      <div 
        className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300 ${
          isAmenitiesModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setIsAmenitiesModalOpen(false)}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />
        <div
          className={`w-full max-w-3xl bg-[#030a16] border border-sand/20 rounded-2xl relative z-10 max-h-[92vh] md:max-h-[85vh] flex flex-col overflow-hidden text-left transition-all duration-300 transform ${
            isAmenitiesModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
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
          <div className="p-6 overflow-y-auto flex-1 space-y-8 pr-4 scrollbar-thin scrollbar-thumb-sand/20">
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
        </div>
      </div>

      {/* Full Detailed Policies Modal */}
      <div 
        className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300 ${
          isPoliciesModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setIsPoliciesModalOpen(false)}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />
        <div
          className={`w-full max-w-3xl bg-[#030a16] border border-sand/20 rounded-2xl relative z-10 max-h-[92vh] md:max-h-[85vh] flex flex-col overflow-hidden text-left transition-all duration-300 transform ${
            isPoliciesModalOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sunset via-orange-500 to-amber-500" />
          <button
            onClick={() => setIsPoliciesModalOpen(false)}
            className="absolute top-4 right-4 text-sand/65 hover:text-sunset transition-colors p-2 cursor-pointer z-30"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-6 pb-4 border-b border-sand/10 flex-shrink-0">
            <h3 className="text-xl md:text-2xl font-serif font-light text-white uppercase tracking-wider">
              Resort Terms & <span className="text-sunset italic font-normal">Policies</span>
            </h3>
            <p className="text-[10px] text-sand/40 font-sans uppercase tracking-widest mt-1">
              Full rules, safety mandates & cancellation guidelines
            </p>
          </div>
          <div className="p-6 overflow-y-auto flex-1 space-y-8 pr-4 scrollbar-thin scrollbar-thumb-sand/20">
            {detailedPolicies.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-3.5">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-sunset border-b border-sand/5 pb-1">
                  {group.category}
                </h4>
                <div className="space-y-2.5">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex gap-2.5 items-start">
                      <Check className="w-4 h-4 text-sunset flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-sand/80 font-sans leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// Suspense-wrapped Page Export
export default function BookingPage() {
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

  return (
    <div className="bg-[#030a16] text-[#fcfbf7] min-h-screen relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sunset/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-luxury-teal/5 blur-[150px] pointer-events-none" />

      {/* Booking Header */}
      <header className="relative z-10 w-full border-b border-sand/5 bg-[#030a16]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              className="w-7 h-7 object-contain group-hover:scale-105 transition-transform duration-500" 
              alt="Lake N Trails Logo" 
            />
            <span className="text-sm font-serif uppercase tracking-[0.35em] text-[#fcfbf7] font-semibold">
              Lake N Trails
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-sand/15 text-sand hover:text-sunset hover:border-sunset/50 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-sand/40">
              Booking Portal
            </span>
          </div>
        </div>
      </header>

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-sm font-sans tracking-widest uppercase text-sand/40">
          Loading Booking Portal...
        </div>
      }>
        <BookingContent />
      </Suspense>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-sand/5 bg-[#030a16] text-center text-[10px] font-sans text-sand/30 tracking-widest uppercase">
        © {new Date().getFullYear()} Lake N Trails Exotic Glamping. All Rights Reserved.
      </footer>

    </div>
  );
}
