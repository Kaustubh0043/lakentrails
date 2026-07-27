"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Phone, Mail, User, ShieldCheck, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultExperience?: string;
}

export default function BookingModal({ isOpen, onClose, defaultExperience = "day-outing" }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    experience: defaultExperience,
    notes: "",
  });

  const [bookingStep, setBookingStep] = useState(1);
  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    childrenAbove5: 0,
    childrenBelow5: 0,
    infants: 0,
    pets: 0,
    isLargeEvent: false,
  });
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const guestSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setBookingStep(1);
      setGuestCounts({
        adults: 2,
        childrenAbove5: 0,
        childrenBelow5: 0,
        infants: 0,
        pets: 0,
        isLargeEvent: false,
      });
      setIsGuestDropdownOpen(false);
      document.body.style.overflow = "hidden";
      // Map general experiences to the two actual package options
      let mappedExp = defaultExperience;
      if (["camping", "stay-package", "stay-glamp", "stay-tent", "pool-party", "wedding", "corporate"].includes(defaultExperience)) {
        mappedExp = "stay-package";
      } else {
        mappedExp = "day-outing";
      }
      setFormData((prev) => ({ ...prev, experience: mappedExp }));
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [defaultExperience, isOpen]);

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

  // Sync total guests to formData (only count adults and children > 5y as paying guests)
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
      
      // Validation limits
      if (type === "adults" && newVal < 1) return prev;
      if (type !== "adults" && newVal < 0) return prev;
      
      return {
        ...prev,
        [type]: newVal,
        isLargeEvent: false, // Turn off large event mode if they start manual adjustments
      };
    });
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempCheckIn, setTempCheckIn] = useState<Date | null>(null);
  const [tempCheckOut, setTempCheckOut] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const today = new Date();

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

  const renderMonth = (monthOffset: number) => {
    const { month, year } = getMonthYear(monthOffset);
    
    // Month Name
    const monthName = new Date(year, month, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });

    // Days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Starting day of the week (0 = Sunday, 1 = Monday, etc.)
    const startDay = new Date(year, month, 1).getDay();

    // Create array of days
    const days: (Date | null)[] = [];
    
    // Pad out start days
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add calendar days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const baseToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return (
      <div className="w-full">
        {/* Month Label */}
        <h4 className="text-xs font-serif font-light text-center text-white mb-3 tracking-widest uppercase">
          {monthName}
        </h4>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-0.5 mb-1.5 text-center">
          {daysOfWeek.map((day, idx) => (
            <span key={idx} className="text-[9px] text-sand/40 font-medium font-sans w-full">
              {day}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-1 gap-x-0">
          {days.map((date, idx) => {
            if (!date) {
              return <div key={`empty-${idx}`} className="aspect-square w-full h-full" />;
            }

            const isSelectedStart = tempCheckIn && isSameDay(date, tempCheckIn);
            const isSelectedEnd = tempCheckOut && isSameDay(date, tempCheckOut);
            const isBetween = tempCheckIn && tempCheckOut && isDateBetween(date, tempCheckIn, tempCheckOut);
            
            const isPast = date < baseToday;
            
            // Hover highlighting preview
            const isHoveredEnd = tempCheckIn && !tempCheckOut && hoveredDate && isDateBetween(date, tempCheckIn, hoveredDate);
            const isSameAsHovered = tempCheckIn && !tempCheckOut && hoveredDate && isSameDay(date, hoveredDate);

            let cellBgClass = "";
            let btnClass = "text-sand/80 hover:bg-sand/10 hover:text-white cursor-pointer";

            if (isPast) {
              btnClass = "text-sand/20 cursor-not-allowed";
            } else if (isSelectedStart) {
              btnClass = "bg-sunset text-white font-semibold shadow-md z-10 scale-105";
              if (tempCheckOut) {
                cellBgClass = "bg-gradient-to-r from-transparent to-sunset/15 rounded-l-full";
              } else if (hoveredDate && hoveredDate > tempCheckIn) {
                cellBgClass = "bg-gradient-to-r from-transparent to-sunset/10 rounded-l-full";
              }
            } else if (isSelectedEnd) {
              btnClass = "bg-sunset text-white font-semibold shadow-md z-10 scale-105";
              cellBgClass = "bg-gradient-to-r from-sunset/15 to-transparent rounded-r-full";
            } else if (isBetween) {
              btnClass = "text-white font-medium";
              cellBgClass = "bg-sunset/15";
            } else if (isHoveredEnd) {
              btnClass = "text-white font-medium";
              cellBgClass = "bg-sunset/10";
            } else if (isSameAsHovered) {
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

  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

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
    
    let isWeekendDay = true; // Default to weekend
    if (formData.checkIn) {
      const date = new Date(formData.checkIn);
      const day = date.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
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
      // Day Outing Package
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
    const petCharge = guestCounts.pets > 0 ? 400 : 0;
    const subtotal = (adultRate * adults + childRate * children) * nights + petCharge;
    const taxes = Math.round(subtotal * 0.05); // 5% GST
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
        parts.push(`Pet Stay Charge: ₹${pricing.petCharge}`);
      }
      rateDetailsText = `• Rates (${pricing.isWeekend ? "Weekend" : "Weekday"}):\n  ${parts.join("\n  ")}`;
    }

    const text = `*New Booking Enquiry for LakeNtrails*
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
        parts.push(`Pet Stay Charge: Rs. ${pricing.petCharge}`);
      }
      rateDetailsText = `• Rates (${pricing.isWeekend ? "Weekend" : "Weekday"}):\n  ${parts.join("\n  ")}`;
    }

    const subject = `Booking Inquiry: ${formData.name} - ${pricing.packageName}`;
    const body = `Hi LakeNtrails Team,

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            className="absolute inset-0 bg-[#030a16]/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="w-full max-w-2xl lg:max-w-4xl glass-panel-dark rounded-2xl relative z-10 border border-sand/20 max-h-[92vh] flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header Glowing Accent */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-light via-sunset to-luxury-teal z-20" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-sand/60 hover:text-sunset transition-colors duration-300 p-2 z-30"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Fixed Header */}
            <div className="p-6 pb-2 md:p-8 md:pb-4 flex-shrink-0">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-[#fcfbf7] mb-2 tracking-wide uppercase">
                Begin Your <span className="text-sunset">Lakeside Escape</span>
              </h2>
              <p className="text-xs text-sand/60 font-sans tracking-wider uppercase border-b border-sand/10 pb-4">
                Reserve your custom luxury experience at LakeNtrails
              </p>
            </div>

            {/* Scrollable Body Container */}
            <div data-lenis-prevent className="p-4 pt-0 md:p-8 md:pt-0 overflow-y-auto flex-1 pr-2 md:pr-4">
              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-12 gap-3 sm:gap-6 md:gap-8 font-sans items-start text-left">
                {/* Left Column: Input Fields & Submit buttons */}
                <div className={`col-span-12 lg:col-span-7 space-y-4 ${bookingStep === 1 ? "block" : "hidden lg:block"}`}>
                  {/* Name, Email, Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 w-4 h-4 text-sand/40" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 w-4 h-4 text-sand/40" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-sand/40" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>
                  </div>

                  {/* Dates & Guests Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <span className="absolute left-3 top-1 text-[9px] text-sand/40 uppercase tracking-widest animate-pulse">Check-In</span>
                      <Calendar className="absolute left-3 top-5.5 w-4 h-4 text-sand/40 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(true)}
                        className="w-full pl-10 pr-4 pt-5 pb-2.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all text-left min-h-[48px] cursor-pointer hover:border-sunset/50"
                      >
                        {formData.checkIn ? formatDateDisplay(formData.checkIn) : <span className="text-sand/20">Select date</span>}
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1 text-[9px] text-sand/40 uppercase tracking-widest animate-pulse">Check-Out</span>
                      <Calendar className="absolute left-3 top-5.5 w-4 h-4 text-sand/40 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(true)}
                        className="w-full pl-10 pr-4 pt-5 pb-2.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all text-left min-h-[48px] cursor-pointer hover:border-sunset/50"
                      >
                        {formData.checkOut ? formatDateDisplay(formData.checkOut) : <span className="text-sand/20">Select date</span>}
                      </button>
                    </div>
                    <div className="relative" ref={guestSelectorRef}>
                      <span className="absolute left-3 top-1 text-[9px] text-sand/40 uppercase tracking-widest">Guests</span>
                      <Users className="absolute left-3 top-5.5 w-4 h-4 text-sand/40 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                        className="w-full pl-10 pr-10 pt-5 pb-2.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all text-left min-h-[48px] cursor-pointer hover:border-sunset/50 flex items-center justify-between"
                      >
                        <span className="truncate">{getGuestsSummary()}</span>
                      </button>
                      <ChevronDown className="absolute right-3 top-5.5 w-4 h-4 text-sand/50 pointer-events-none" />

                      {/* Guest Selector Popover (Airbnb style) */}
                      <AnimatePresence>
                        {isGuestDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 left-0 sm:left-auto mt-2 sm:w-[300px] bg-[#080e1a]/95 backdrop-blur-xl border border-sand/20 rounded-xl p-4 shadow-2xl z-[999] space-y-4 text-left"
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
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Children (Under 5) Row */}
                            <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                              <div>
                                <h5 className="text-xs font-sans font-medium text-white">Children</h5>
                                <p className="text-[9px] text-sand/40">Under 5 (Free)</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => updateGuestCount("childrenBelow5", -1)}
                                  disabled={guestCounts.childrenBelow5 <= 0 || guestCounts.isLargeEvent}
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
                                  className="w-6 h-6 rounded-full border border-sand/20 flex items-center justify-center text-white hover:border-sunset disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Pets Row */}
                            <div className="flex items-center justify-between pb-3 border-b border-sand/5">
                              <div>
                                <h5 className="text-xs font-sans font-medium text-white">Bringing a Pet?</h5>
                                <p className="text-[9px] text-sand/40">Pet stay charge applies (+ ₹400)</p>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="pet-checkbox"
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
                                  id="isLargeEvent"
                                  checked={guestCounts.isLargeEvent}
                                  onChange={(e) => {
                                    setGuestCounts((prev) => ({
                                      ...prev,
                                      isLargeEvent: e.target.checked,
                                    }));
                                  }}
                                  className="w-4 h-4 accent-sunset rounded border-sand/15 bg-[#030f26] cursor-pointer"
                                />
                                <label htmlFor="isLargeEvent" className="text-[10px] text-sand/60 cursor-pointer select-none">
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
                        className="w-full pl-4 pr-10 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors appearance-none cursor-pointer"
                      >
                        <option value="day-outing" className="bg-[#030a16]">Day Outing Package</option>
                        <option value="stay-package" className="bg-[#030a16]">Ultimate Stay Package</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-sand/50 pointer-events-none" />
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
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30 resize-none"
                    />
                  </div>

                  {/* Submit Buttons (Desktop Only) */}
                  <div className="hidden lg:grid grid-cols-2 gap-4 pt-2">
                    <button
                      type="submit"
                      onClick={handleWhatsAppSubmit}
                      className="w-full py-4 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm11.951-3.52c1.747 0 3.39-.462 4.81-1.272l.344-.204 3.58.94-.956-3.486.223-.356c.887-1.413 1.355-3.048 1.355-4.726C21.36 6.843 17.17 2.65 12 2.65S2.64 6.843 2.64 12c0 1.678.468 3.313 1.355 4.726l.223.356-.956 3.486 3.58-.94.344.204c1.42.81 3.063 1.272 4.81 1.272zm5.72-6.52c-.272-.136-1.614-.796-1.863-.887-.25-.09-.43-.136-.612.137-.18.272-.7.886-.856 1.068-.158.182-.317.205-.59.07-.272-.136-1.15-.424-2.19-1.355-.81-.72-1.357-1.614-1.516-1.886-.158-.273-.017-.42.12-.556.122-.122.272-.318.408-.477.136-.159.18-.272.272-.454.09-.182.045-.34-.022-.477-.068-.136-.613-1.477-.84-2.023-.22-.53-.443-.455-.612-.464-.16-.008-.34-.01-.52-.01-.18 0-.477.068-.727.34-.25.272-.953.932-.953 2.273s.977 2.636 1.113 2.818c.136.182 1.92 2.932 4.653 4.114.65.28 1.157.447 1.553.573.655.208 1.25.178 1.72.108.523-.078 1.614-.66 1.84-1.295.228-.636.228-1.182.16-1.295-.068-.113-.25-.18-.522-.318z" />
                      </svg>
                      Send to WhatsApp
                    </button>

                    <button
                      type="submit"
                      onClick={handleEmailSubmit}
                      className="w-full py-4 rounded-lg bg-sunset hover:bg-[#fd5e53] text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sunset/30"
                    >
                      <Mail className="w-5 h-5" />
                      Send via Email
                    </button>
                  </div>

                  {/* Continue Button (Mobile Only) */}
                  <div className="lg:hidden pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const nameInput = document.getElementsByName("name")[0] as HTMLInputElement;
                        const emailInput = document.getElementsByName("email")[0] as HTMLInputElement;
                        const phoneInput = document.getElementsByName("phone")[0] as HTMLInputElement;

                        if (!formData.name || !formData.email || !formData.phone || !formData.checkIn) {
                          if (nameInput && !formData.name) nameInput.reportValidity();
                          else if (emailInput && !formData.email) emailInput.reportValidity();
                          else if (phoneInput && !formData.phone) phoneInput.reportValidity();
                          else alert("Please select Check-in and Check-out dates.");
                          return;
                        }
                        setBookingStep(2);
                      }}
                      className="w-full py-4 rounded-lg bg-sunset hover:bg-[#fd5e53] text-white font-semibold text-sm transition-all duration-300 tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sunset/30 uppercase"
                    >
                      Continue to Review
                    </button>
                  </div>

                  <div className="hidden lg:flex items-center gap-2 justify-center text-[10px] text-sand/40 pt-2 border-t border-sand/10">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Direct booking links secure direct contact with resort management.</span>
                  </div>
                </div>

                {/* Right Column: Pricing Summary Card & Policy */}
                <div className={`col-span-12 lg:col-span-5 space-y-4 ${bookingStep === 2 ? "block" : "hidden lg:block"}`}>
                  {/* Back Button (Mobile Only) */}
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="flex items-center gap-1.5 text-xs text-sand/65 hover:text-sunset transition-colors lg:hidden mb-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Details
                  </button>

                  {(() => {
                    const pricing = calculatePricing();
                    return (
                      <div className="bg-[#030f26]/40 border border-sand/15 rounded-xl p-5 space-y-4 text-left">
                        {/* Package Info */}
                        <div className="flex gap-4">
                          <img
                            src={pricing.isStay ? "/images/IMG_8399.jpeg" : "/images/img3.jpeg"}
                            alt={pricing.packageName}
                            loading="lazy"
                            className="w-16 h-16 rounded-lg object-cover border border-sand/10 flex-shrink-0"
                          />
                          <div className="flex flex-col justify-center min-w-0">
                            <h4 className="text-xs font-serif font-light text-white uppercase tracking-wider leading-snug truncate-2-lines">
                              {pricing.packageName}
                            </h4>
                            <span className="text-[9px] text-sand/40 font-sans mt-0.5">
                              Adoshi Dam Reservoir, Khopoli
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-[10px] text-sunset font-semibold">★ 4.88</span>
                              <span className="text-[9px] text-sand/45 font-sans">(48 reviews)</span>
                            </div>
                          </div>
                        </div>

                        <hr className="border-sand/10" />

                        {/* Dates & Guests */}
                        <div className="space-y-1.5 text-[11px] font-sans">
                          <div className="flex justify-between">
                            <span className="text-sand/50">Dates</span>
                            <span className="text-white font-medium">
                              {formData.checkIn 
                                ? `${formatDateDisplay(formData.checkIn)}${pricing.isStay && formData.checkOut ? ` - ${formatDateDisplay(formData.checkOut)}` : ""}`
                                : "Dates not set"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sand/50">Guests</span>
                            <span className="text-white font-medium">
                              {formData.guests === "event" ? "Large Event (50+)" : `${formData.guests} Guest${parseInt(formData.guests) > 1 ? "s" : ""}`}
                            </span>
                          </div>
                        </div>

                        <hr className="border-sand/10" />

                        {/* Price Details */}
                        <div className="space-y-2 text-[11px] font-sans">
                          <h5 className="text-[9px] uppercase tracking-wider text-sunset font-semibold">
                            Price Breakdown ({pricing.isWeekend ? "Weekend Rates" : "Weekday Rates"})
                          </h5>
                          
                          {guestCounts.adults > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sand/50">
                                Adults: ₹{pricing.adultRate.toLocaleString()} x {guestCounts.adults}
                                {pricing.isStay ? ` x ${pricing.nights} Night${pricing.nights > 1 ? "s" : ""}` : ""}
                              </span>
                              <span className="text-white font-medium">
                                ₹{(pricing.adultRate * guestCounts.adults * pricing.nights).toLocaleString()}
                              </span>
                            </div>
                          )}

                          {guestCounts.childrenAbove5 > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sand/50">
                                Kids (5-12y): ₹{pricing.childRate.toLocaleString()} x {guestCounts.childrenAbove5}
                                {pricing.isStay ? ` x ${pricing.nights} Night${pricing.nights > 1 ? "s" : ""}` : ""}
                              </span>
                              <span className="text-white font-medium">
                                ₹{(pricing.childRate * guestCounts.childrenAbove5 * pricing.nights).toLocaleString()}
                              </span>
                            </div>
                          )}

                          {(guestCounts.childrenBelow5 > 0 || guestCounts.infants > 0) && (
                            <div className="flex justify-between">
                              <span className="text-sand/50">
                                Free Guests ({guestCounts.childrenBelow5 > 0 ? `${guestCounts.childrenBelow5} Kids <5y` : ""}{guestCounts.childrenBelow5 > 0 && guestCounts.infants > 0 ? ", " : ""}{guestCounts.infants > 0 ? `${guestCounts.infants} Infants` : ""})
                              </span>
                              <span className="text-emerald-400 font-medium">Free</span>
                            </div>
                          )}

                          {pricing.petCharge > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sand/50">Pet Stay Charge</span>
                              <span className="text-white font-medium">₹{pricing.petCharge.toLocaleString()}</span>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span className="text-sand/50">Taxes (5% GST)</span>
                            <span className="text-white font-medium">₹{pricing.taxes.toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between border-t border-sand/10 pt-2 text-xs">
                            <span className="text-white font-medium">Total (INR)</span>
                            <span className="text-sunset font-semibold">₹{pricing.total.toLocaleString()}</span>
                          </div>
                        </div>

                        <hr className="border-sand/10" />

                        {/* Policy Brief */}
                        <div className="space-y-1.5 text-[10px] font-sans leading-relaxed">
                          <h5 className="text-[9px] uppercase tracking-wider text-sunset font-semibold">Resort Policies</h5>
                          <p className="text-sand/50">• Free cancellation up to 7 days before check-in.</p>
                          <p className="text-sand/50">• Early check-in / late check-out is subject to availability.</p>
                          <p className="text-sand/50">• Children aged 5–12 years are charged at child rates (approx half-price).</p>
                          <p className="text-sand/50">• Charges are different during long weekends & holidays.</p>
                          <button
                            type="button"
                            onClick={() => setIsPolicyOpen(true)}
                            className="text-[9px] text-sunset hover:underline font-semibold uppercase tracking-widest mt-1 block"
                          >
                            Read Full Policies
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Submit Buttons (Mobile Only) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 lg:hidden">
                    <button
                      type="submit"
                      onClick={handleWhatsAppSubmit}
                      className="w-full py-4 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm11.951-3.52c1.747 0 3.39-.462 4.81-1.272l.344-.204 3.58.94-.956-3.486.223-.356c.887-1.413 1.355-3.048 1.355-4.726C21.36 6.843 17.17 2.65 12 2.65S2.64 6.843 2.64 12c0 1.678.468 3.313 1.355 4.726l.223.356-.956 3.486 3.58-.94.344.204c1.42.81 3.063 1.272 4.81 1.272zm5.72-6.52c-.272-.136-1.614-.796-1.863-.887-.25-.09-.43-.136-.612.137-.18.272-.7.886-.856 1.068-.158.182-.317.205-.59.07-.272-.136-1.15-.424-2.19-1.355-.81-.72-1.357-1.614-1.516-1.886-.158-.273-.017-.42.12-.556.122-.122.272-.318.408-.477.136-.159.18-.272.272-.454.09-.182.045-.34-.022-.477-.068-.136-.613-1.477-.84-2.023-.22-.53-.443-.455-.612-.464-.16-.008-.34-.01-.52-.01-.18 0-.477.068-.727.34-.25.272-.953.932-.953 2.273s.977 2.636 1.113 2.818c.136.182 1.92 2.932 4.653 4.114.65.28 1.157.447 1.553.573.655.208 1.25.178 1.72.108.523-.078 1.614-.66 1.84-1.295.228-.636.228-1.182.16-1.295-.068-.113-.25-.18-.522-.318z" />
                      </svg>
                      Send to WhatsApp
                    </button>

                    <button
                      type="submit"
                      onClick={handleEmailSubmit}
                      className="w-full py-4 rounded-lg bg-sunset hover:bg-[#fd5e53] text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sunset/30"
                    >
                      <Mail className="w-5 h-5" />
                      Send via Email
                    </button>
                  </div>

                  <div className="flex items-center gap-2 justify-center text-[10px] text-sand/40 pt-2 border-t border-sand/10 lg:hidden">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Direct booking links secure direct contact with resort management.</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Calendar Overlay Sheet */}
            <AnimatePresence>
              {isCalendarOpen && (
                <motion.div
                  className="absolute inset-0 bg-[#030a16]/98 backdrop-blur-xl z-20 flex flex-col justify-between p-6 md:p-8 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between border-b border-sand/10 pb-4 mb-4">
                    <div>
                      <h3 className="text-base md:text-lg font-serif font-light text-white uppercase tracking-wider">
                        Select Stay Dates
                      </h3>
                      <p className="text-[9px] md:text-[10px] text-sand/40 uppercase tracking-widest font-sans mt-0.5">
                        {tempCheckIn && tempCheckOut 
                          ? `${formatDateDisplay(formatDate(tempCheckIn))} - ${formatDateDisplay(formatDate(tempCheckOut))}`
                          : tempCheckIn 
                            ? "Select departure date" 
                            : "Select arrival date"}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentMonthOffset(prev => prev - 1)}
                        disabled={currentMonthOffset <= 0}
                        className="w-8 h-8 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset disabled:opacity-30 disabled:hover:border-sand/15 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentMonthOffset(prev => prev + 1)}
                        className="w-8 h-8 rounded-full border border-sand/15 flex items-center justify-center text-white hover:border-sunset transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Scrollable Month container */}
                  <div className="flex-1 overflow-y-auto flex flex-col justify-center my-auto min-h-[300px]">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-start py-2">
                      {/* First Month */}
                      <div className="w-full md:w-[260px]">
                        {renderMonth(currentMonthOffset)}
                      </div>
                      
                      {/* Second Month (Desktop Only) */}
                      <div className="hidden md:block w-full md:w-[260px]">
                        {renderMonth(currentMonthOffset + 1)}
                      </div>
                    </div>
                  </div>

                  {/* Calendar Footer */}
                  <div className="flex items-center justify-between border-t border-sand/10 pt-4 mt-4">
                    <button
                      type="button"
                      onClick={handleClearDates}
                      className="text-[10px] uppercase tracking-widest text-sand/45 hover:text-white transition-colors cursor-pointer"
                    >
                      Clear dates
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(false)}
                        className="px-4 py-2 border border-sand/15 rounded-lg text-[10px] uppercase tracking-widest text-sand/65 hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveDates}
                        disabled={!tempCheckIn}
                        className="px-5 py-2.5 bg-sunset hover:bg-[#fd5e53] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-[10px] uppercase tracking-widest font-semibold text-white transition-all cursor-pointer shadow-lg shadow-sunset/15"
                      >
                        Save Dates
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Policy Overlay Sheet */}
            <AnimatePresence>
              {isPolicyOpen && (
                <motion.div
                  className="absolute inset-0 bg-[#030a16]/98 backdrop-blur-xl z-30 flex flex-col justify-between p-6 md:p-8 rounded-2xl text-left"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center justify-between border-b border-sand/10 pb-4 mb-4">
                    <h3 className="text-base md:text-lg font-serif font-light text-white uppercase tracking-wider">
                      Resort Policy & Terms
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsPolicyOpen(false)}
                      className="p-1 hover:text-sunset transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs text-sand/85 font-sans leading-relaxed my-auto py-2">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-sunset font-semibold mb-1">Check-in / Check-out Times</h4>
                      <p>Check-In: 4:00 PM | Check-Out: 11:00 AM. Early check-in or late check-out is subject to availability and prior confirmation.</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-sunset font-semibold mb-1">Cancellation & Refunds</h4>
                      <p>• 100% refund for cancellations made 7 days or more prior to the scheduled check-in date.</p>
                      <p>• 50% refund for cancellations made between 7 days and 48 hours prior to arrival.</p>
                      <p>• No refund or credit will be issued for cancellations made within 48 hours of check-in, or in case of a no-show.</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-sunset font-semibold mb-1">Pet Policy</h4>
                      <p>LakeNtrails is pet-friendly! Please inform us in advance if you are traveling with pets. Guests are responsible for cleaning up after their pets and ensuring they do not disturb other guests.</p>
                    </div>
                     <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-sunset font-semibold mb-1">Child Policy & Holidays</h4>
                      <p>• Children aged 5 to 12 years old will be charged at child rates (₹1400 on weekends / ₹1100 on weekdays for stay; ₹800 on weekends / ₹700 on weekdays for day out).</p>
                      <p>• Children under 5 years old stay free.</p>
                      <p>• Charges are different during long weekends & gazetted holidays.</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-sunset font-semibold mb-1">General Rules</h4>
                      <p>• Quiet hours are observed from 11:00 PM to 7:00 AM to preserve the peaceful lakeside ambiance.</p>
                      <p>• Swimming is permitted only in designated areas. No swimming in Adoshi Dam reservoir without life jackets.</p>
                      <p>• Guests are expected to maintain resort cleanliness and dispose of trash responsibly.</p>
                    </div>
                  </div>

                  <div className="border-t border-sand/10 pt-4 mt-4 text-right">
                    <button
                      type="button"
                      onClick={() => setIsPolicyOpen(false)}
                      className="px-6 py-2.5 bg-sunset hover:bg-[#fd5e53] rounded-lg text-[10px] uppercase tracking-widest font-semibold text-white transition-all cursor-pointer shadow-lg shadow-sunset/15"
                    >
                      Acknowledge & Close
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
