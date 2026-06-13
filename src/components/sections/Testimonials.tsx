"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, X } from "lucide-react";

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  delay?: number;
  floatDuration?: number;
}

export default function Testimonials() {
  const defaultReviews: Review[] = [
    {
      name: "Rahul Krshirsagar",
      role: "Weekend Traveler",
      text: "LakeNtrails is an absolute gem. The lakeside camping under the stars combined with the neon pool party in the evening is unmatched. It feels like a high-end luxury resort in Bali, but it's right near Khopoli!",
      rating: 5,
      delay: 0,
      floatDuration: 5,
    },
    {
      name: "Kaustubh Jadhav",
      role: "Resort Visitor",
      text: "We hosted our family gathering and photoshoots here. The sunset backdrop is breathtaking, and the team accommodated our every request. Our guests loved the pet-friendly vibe!",
      rating: 5,
      delay: 0.2,
      floatDuration: 6,
    },
    {
      name: "Mukesh Ghime",
      role: "Event Organizer",
      text: "Excellent venue for corporate team building. The combination of water sports (kayaking and boating) and the rain dance night made it memorable for the entire department. Highly recommended!",
      rating: 5,
      delay: 0.4,
      floatDuration: 5.5,
    },
  ];

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Load reviews from local storage on load
  useEffect(() => {
    const stored = localStorage.getItem("lakentrails_reviews");
    if (stored) {
      setReviews([...defaultReviews, ...JSON.parse(stored)]);
    } else {
      setReviews(defaultReviews);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const submittedReview: Review = {
      name: newReview.name,
      role: newReview.role || "Resort Guest",
      text: newReview.text,
      rating: newReview.rating,
      delay: 0.1,
      floatDuration: 4.8 + Math.random() * 1.5,
    };

    const stored = localStorage.getItem("lakentrails_reviews");
    const customList = stored ? JSON.parse(stored) : [];
    const updatedCustom = [submittedReview, ...customList];
    localStorage.setItem("lakentrails_reviews", JSON.stringify(updatedCustom));

    setReviews([submittedReview, ...reviews]);
    setNewReview({ name: "", role: "", text: "", rating: 5 });
    setIsFormOpen(false);
  };

  const handleRatingClick = (rate: number) => {
    setNewReview((prev) => ({ ...prev, rating: rate }));
  };

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 bg-[#020612] overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-[30%] left-[60%] w-[450px] h-[450px] rounded-full bg-sunset/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#0ea5e9]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-sunset uppercase mb-3 block font-medium">
            Guest Reflections
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 uppercase tracking-wider">
            Voices of the <span className="text-glow-sunset italic font-normal text-sunset">Escape</span>
          </h2>
          <p className="text-sand/80 text-sm md:text-base font-sans leading-relaxed">
            Read stories from individuals and groups who embarked on their lakeside journey with us, or share your own escape experience.
          </p>
        </div>

        {/* Action Button: Write a Review */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-8 py-3.5 rounded-full border border-sunset/40 text-sunset hover:bg-sunset hover:text-white text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-sunset/10"
          >
            <Plus className="w-4 h-4" />
            Share Your Experience
          </button>
        </div>

        {/* Review Submission Form Drawer Overlay */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#020612]/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-lg glass-panel-dark border border-sand/20 rounded-2xl overflow-hidden relative p-6 md:p-8"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {/* Glowing Header Line */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-sunset via-orange-400 to-yellow-500" />
                
                {/* Close Button */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 text-sand/50 hover:text-sunset transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-left space-y-5">
                  <div>
                    <h3 className="text-xl font-serif text-white uppercase tracking-wider">Write a Guest Review</h3>
                    <p className="text-[10px] text-sand/40 uppercase tracking-widest font-sans mt-0.5">Let us know how your lakeside escape went</p>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-4 font-sans">
                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-widest text-sand/40">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>

                    {/* Role / Tag input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-widest text-sand/40">Stay Tag (e.g. Glamping Guest, Family outing)</label>
                      <input
                        type="text"
                        value={newReview.role}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, role: e.target.value }))}
                        placeholder="Family Vacationer"
                        className="w-full px-4 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30"
                      />
                    </div>

                    {/* Interactive Star Picker */}
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-widest text-sand/40">Star Rating</label>
                      <div className="flex gap-2 py-1 items-center">
                        {[1, 2, 3, 4, 5].map((rate) => {
                          const isLit = hoverRating !== null ? rate <= hoverRating : rate <= newReview.rating;
                          return (
                            <button
                              key={rate}
                              type="button"
                              onClick={() => handleRatingClick(rate)}
                              onMouseEnter={() => setHoverRating(rate)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="focus:outline-none transition-transform active:scale-90"
                            >
                              <Star
                                className={`w-6 h-6 cursor-pointer transition-all ${
                                  isLit 
                                    ? "fill-sunset text-sunset drop-shadow-[0_0_5px_rgba(255,107,53,0.3)]" 
                                    : "text-sand/20"
                                }`}
                              />
                            </button>
                          );
                        })}
                        <span className="text-xs text-sand/50 font-medium ml-2 uppercase tracking-widest">
                          {newReview.rating} Star{newReview.rating > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Review content */}
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-widest text-sand/40">Your Review</label>
                      <textarea
                        required
                        rows={3}
                        value={newReview.text}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, text: e.target.value }))}
                        placeholder="Detail your experience, food, stay, pool vibe, or service..."
                        className="w-full px-4 py-3 bg-[#030f26]/30 border border-sand/15 rounded-lg text-sm text-white focus:outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-colors placeholder:text-sand/30 resize-none"
                      />
                    </div>

                    {/* Submit buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="w-1/3 py-3.5 border border-sand/15 hover:border-white text-sand/70 hover:text-white rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3.5 bg-sunset hover:bg-[#fd5e53] text-white font-medium text-xs uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-sunset/15 cursor-pointer"
                      >
                        Post Review
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {reviews.map((item, idx) => (
              <motion.div
                key={`${item.name}-${idx}`}
                layout
                className="p-8 rounded-2xl glass-panel border border-sand/15 relative hover:border-sunset/40 transition-all duration-500 flex flex-col justify-between group h-full shadow-xl bg-[#030f26]/10"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* Top Section */}
                <div>
                  {/* Quote Icon */}
                  <div className="text-sunset/20 mb-6 group-hover:text-sunset/40 transition-colors duration-300">
                    <Quote className="w-8 h-8 fill-current" />
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-sand/85 font-sans leading-relaxed mb-6 italic">
                    “{item.text}”
                  </p>
                </div>

                {/* Bottom Info Section */}
                <div className="border-t border-sand/10 pt-4 flex justify-between items-center mt-auto font-sans">
                  <div>
                    <h4 className="text-sm font-serif font-medium text-white group-hover:text-sunset transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-sand/55 uppercase tracking-wider block mt-0.5">
                      {item.role}
                    </span>
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-sunset text-sunset" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
