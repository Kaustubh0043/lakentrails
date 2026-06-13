"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Phone, Mail, User, ShieldCheck, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    if (isOpen) {
      // Map general experiences to the three actual package options
      let mappedExp = defaultExperience;
      if (["camping", "stay-package", "pool-party", "wedding", "corporate"].includes(defaultExperience)) {
        mappedExp = "stay-glamp";
      } else if (defaultExperience === "stay-tent") {
        mappedExp = "stay-tent";
      } else {
        mappedExp = "day-outing";
      }
      setFormData((prev) => ({ ...prev, experience: mappedExp }));
    }
  }, [defaultExperience, isOpen]);

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
    const guestsNum = formData.guests === "event" ? 50 : (parseInt(formData.guests) || 1);
    let rate = 1600;
    let packageName = "Day Outing Package";
    let isStay = false;

    if (formData.experience === "stay-glamp") {
      rate = 2800;
      packageName = "Ultimate Stay Package (Glamping Dome)";
      isStay = true;
    } else if (formData.experience === "stay-tent") {
      rate = 2200;
      packageName = "Ultimate Stay Package (Luxury Tent)";
      isStay = true;
    }

    const nights = isStay ? getNumberOfNights() : 1;
    const subtotal = rate * guestsNum * nights;
    const taxes = Math.round(subtotal * 0.05); // 5% GST
    const total = subtotal + taxes;

    return {
      packageName,
      rate,
      guestsNum,
      nights,
      subtotal,
      taxes,
      total,
      isStay
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pricing = calculatePricing();
    const text = `*New Booking Enquiry for LakeNtrails*
-------------------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Check-in:* ${formData.checkIn ? formatDateDisplay(formData.checkIn) : "N/A"}
*Check-out:* ${formData.checkOut ? formatDateDisplay(formData.checkOut) : "N/A"}
*Nights:* ${pricing.isStay ? pricing.nights : "1 (Day Trip)"}
*Guests:* ${formData.guests === "event" ? "Event (50+)" : formData.guests}
*Experience:* ${pricing.packageName}
-------------------------------
*Price Breakdown:*
• Rate: ₹${pricing.rate.toLocaleString()} / person / night
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
    const subject = `Booking Inquiry: ${formData.name} - ${pricing.packageName}`;
    const body = `Hi LakeNtrails Team,

I would like to inquire about a booking:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Check-in Date: ${formData.checkIn ? formatDateDisplay(formData.checkIn) : "N/A"}
Check-out Date: ${formData.checkOut ? formatDateDisplay(formData.checkOut) : "N/A"}
Number of Guests: ${formData.guests === "event" ? "Event (50+)" : formData.guests}
Preferred Experience: ${pricing.packageName}

Price Details:
• Rate: Rs. ${pricing.rate.toLocaleString()} / person / night
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
            className="w-full max-w-2xl lg:max-w-4xl glass-panel-dark rounded-2xl overflow-hidden relative z-10 border border-sand/20"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header Glowing Accent */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-light via-sunset to-luxury-teal" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-sand/60 hover:text-sunset transition-colors duration-300 p-2 z-10"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-serif font-light text-[#fcfbf7] mb-2 tracking-wide uppercase">
                Begin Your <span className="text-sunset">Lakeside Escape</span>
              </h2>
              <p className="text-xs text-sand/60 font-sans tracking-wider uppercase mb-6 border-b border-sand/5 pb-2">
                Reserve your custom luxury experience at LakeNtrails
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 font-sans items-start text-left">
                {/* Left Column: Input Fields & Submit buttons */}
                <div className="lg:col-span-7 space-y-4">
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
                    <div className="relative">
                      <span className="absolute left-3 top-1 text-[9px] text-sand/40 uppercase tracking-widest">Guests</span>
                      <Users className="absolute left-3 top-5 w-4 h-4 text-sand/40" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 pt-5 pb-2 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors appearance-none cursor-pointer"
                      >
                        <option value="1" className="bg-[#030a16]">1 Guest</option>
                        <option value="2" className="bg-[#030a16]">2 Guests</option>
                        <option value="4" className="bg-[#030a16]">4 Guests</option>
                        <option value="6" className="bg-[#030a16]">6+ Guests</option>
                        <option value="event" className="bg-[#030a16]">Large Event (50+)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-5.5 w-4 h-4 text-sand/50 pointer-events-none" />
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
                        <option value="day-outing" className="bg-[#030a16]">Day Outing Package (₹1,600 / Person)</option>
                        <option value="stay-glamp" className="bg-[#030a16]">Ultimate Stay Package - Glamping Dome (₹2,800 / Person)</option>
                        <option value="stay-tent" className="bg-[#030a16]">Ultimate Stay Package - Luxury Tent (₹2,200 / Person)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-sand/50 pointer-events-none" />
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

                  {/* Submit Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      type="submit"
                      onClick={handleWhatsAppSubmit}
                      className="w-full py-4 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.022-.08-.117-.146-.217-.196-.051-.026-.704-.347-.813-.388-.11-.039-.189-.059-.267.06-.079.117-.308.388-.378.47-.07.08-.139.09-.258.04-.12-.06-.505-.185-.96-.59-.355-.316-.595-.706-.665-.826-.07-.12-.008-.184.053-.244.054-.054.12-.139.18-.208.058-.07.079-.117.118-.198.04-.08.02-.149-.01-.208-.03-.06-.266-.639-.364-.877-.1-.237-.201-.205-.276-.205l-.235-.004c-.08 0-.211.03-.321.149-.11.12-.421.412-.421.1006 0 .594.432 1.168.492 1.25.06.08 2.062 3.148 4.99 4.417.697.302 1.24.482 1.66.617.7.224 1.338.193 1.843.118.563-.084 1.733-.708 1.977-1.393.243-.684.243-1.27.17-1.393-.07-.12-.19-.19-.31-.25zM12.01 20c-1.63 0-3.17-.46-4.51-1.33l-.32-.21-3.35.88.9-3.27-.22-.36C3.65 14.38 3.17 12.73 3.17 11c0-4.88 3.97-8.83 8.84-8.83 2.37 0 4.6 1.92 6.27 3.59A8.77 8.77 0 0 1 20.85 11c0 4.88-3.97 8.83-8.84 8.83zm0-18C6.48 2 2 6.48 2 12c0 2.08.64 4.02 1.75 5.64L2 22l4.52-1.19A9.94 9.94 0 0 0 12.01 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.93-7.07A9.9 9.9 0 0 0 12.01 2z" />
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

                  <div className="flex items-center gap-2 justify-center text-[10px] text-sand/40 pt-2 border-t border-sand/10">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Direct booking links secure direct contact with resort management.</span>
                  </div>
                </div>

                {/* Right Column: Pricing Summary Card & Policy */}
                <div className="lg:col-span-5 space-y-4">
                  {(() => {
                    const pricing = calculatePricing();
                    return (
                      <div className="bg-[#030f26]/40 border border-sand/15 rounded-xl p-5 space-y-4 text-left">
                        {/* Package Info */}
                        <div className="flex gap-4">
                          <img
                            src={pricing.isStay ? "/images/IMG_8399.jpeg" : "/images/img3.jpeg"}
                            alt={pricing.packageName}
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
                          <h5 className="text-[9px] uppercase tracking-wider text-sunset font-semibold">Price Breakdown</h5>
                          
                          <div className="flex justify-between">
                            <span className="text-sand/50">
                              ₹{pricing.rate.toLocaleString()} x {pricing.guestsNum} Guest{pricing.guestsNum > 1 ? "s" : ""}
                              {pricing.isStay ? ` x ${pricing.nights} Night${pricing.nights > 1 ? "s" : ""}` : ""}
                            </span>
                            <span className="text-white font-medium">₹{pricing.subtotal.toLocaleString()}</span>
                          </div>

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
