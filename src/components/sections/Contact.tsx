"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const emailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:lakentrailsglamping@gmail.com?subject=${emailSubject}&body=${emailBody}`, "_blank");
  };

  const handleWhatsAppChat = () => {
    const text = `Hi Lake N Trails team, I am interested in booking/getting details about your resort. My name is [Your Name].`;
    window.open(`https://wa.me/917058434645?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 bg-[#020612] overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[20%] left-[80%] w-[350px] h-[350px] rounded-full bg-sunset/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-luxury-teal/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Connect With Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Start Your <span className="text-glow-sunset italic font-normal text-sunset">Journey</span>
          </h2>
          <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed">
            Have questions about group stays, bookings, weddings, or dining slots? Reach out via WhatsApp, call, email, or fill out the enquiry form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Instagram Feed */}
          <div className="lg:col-span-5 space-y-8 text-left font-sans">
            
            {/* Quick Contact Box */}
            <div className="p-8 rounded-2xl glass-panel border border-sand/15 space-y-6">
              <h3 className="text-lg font-serif font-light uppercase tracking-wider text-white border-b border-sand/10 pb-4 mb-4">
                Resort Details
              </h3>

              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-sunset mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand/50 mb-1">Location</h4>
                  <a 
                    href="https://maps.google.com/?q=Adoshi+Dam,+Mandad+Atkargaon,+Khopoli+410203"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-sunset transition-colors"
                  >
                    Adoshi Dam, Mandad Atkargaon,<br />Khopoli 410203 India
                  </a>
                </div>
              </div>

              <div className="flex gap-2.5 items-start pl-9 border-l border-sand/10 py-1 flex-col space-y-1">
                <span className="text-xs text-sand/75 font-sans">📍 25 km from Lonavala (~30 mins)</span>
                <span className="text-xs text-sand/75 font-sans">📍 80 km from Mumbai (~1.5 hours)</span>
                <span className="text-xs text-sand/75 font-sans">📍 90 km from Pune (~1.5 hours)</span>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="w-5 h-5 text-sunset mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand/50 mb-1">Phone Number</h4>
                  <div className="space-y-1">
                    <a href="tel:+917058434645" className="text-sm text-white hover:text-sunset transition-colors block">
                      +91 7058434645
                    </a>
                    <a href="tel:+919769040883" className="text-sm text-white hover:text-sunset transition-colors block">
                      +91 97690 40883
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-sunset mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand/50 mb-1">Email Address</h4>
                  <a href="mailto:lakentrailsglamping@gmail.com" className="text-sm text-white hover:text-sunset transition-colors block">
                    lakentrailsglamping@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <svg className="w-5 h-5 text-sunset mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-sand/50 mb-1">Instagram Feed</h4>
                  <a 
                    href="https://www.instagram.com/lakentrails/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-sunset transition-colors block"
                  >
                    @lakentrails
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Connect */}
            <button
              onClick={handleWhatsAppChat}
              className="w-full py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300 tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              Chat on WhatsApp
            </button>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-2xl glass-panel-dark border border-sand/15 relative">
              
              <h3 className="text-xl font-serif font-light uppercase tracking-wider text-white mb-6 border-b border-sand/10 pb-4">
                Enquiry Form
              </h3>

              <form onSubmit={handleSendEmail} className="space-y-6 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-sand/55 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Patil"
                      className="w-full px-4 py-3.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/25"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-sand/55 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full px-4 py-3.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-sand/55 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Camping Booking Inquiry"
                    className="w-full px-4 py-3.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/25"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-sand/55 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write details about your plan..."
                    className="w-full px-4 py-3.5 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/25 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 rounded-lg bg-sunset hover:bg-[#fd5e53] text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-sunset/15 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Custom Night-Mode Map */}
        <motion.div 
          className="mt-16 w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden glass-panel border border-sand/20 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.645353158913!2d73.35123531538356!3d18.735234567845347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7fed70ab7f293%3A0xe21be4a6bf66e999!2sAdoshi%20Dam!5e0!3m2!1sen!2sin!4v1684561234567!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%) opacity(0.85)" }}
            allowFullScreen={false}
            loading="lazy"
            title="Lake N Trails Location Map - Adoshi Dam"
          ></iframe>
          
          {/* Overlay Map Badge */}
          <div className="absolute top-4 right-4 glass-panel p-4 rounded-xl border border-sand/20 text-left pointer-events-none">
            <span className="text-[9px] font-sans font-semibold uppercase tracking-widest text-sunset mb-1.5 block">Resort Coordinates</span>
            <span className="text-xs font-serif font-light text-white block">Adoshi Dam, Mandad Atkargaon</span>
            <span className="text-[10px] text-sand/60 block mt-0.5">Khopoli 410203 India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
