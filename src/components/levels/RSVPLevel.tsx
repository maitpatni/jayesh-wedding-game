"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function RSVPLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />
      <div className="absolute inset-0 mandala-bg opacity-15" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3 sm:mb-4">Level 6</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-3 sm:mb-4">Join Us</h2>
          <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4 sm:mb-6" />
          <p className="text-gold-200/60 text-sm sm:text-lg font-light">The final quest: Will you be part of our story?</p>
        </motion.div>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass-card p-5 sm:p-8 space-y-4 sm:space-y-6"
          >
            <div>
              <label className="text-gold-400 text-xs sm:text-sm tracking-wider uppercase block mb-1.5 sm:mb-2">Your Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-ivory-100 placeholder-ivory-100/30 focus:outline-none focus:border-gold-400/50 transition-all"
                placeholder="Enter your name" />
            </div>

            <div>
              <label className="text-gold-400 text-xs sm:text-sm tracking-wider uppercase block mb-1.5 sm:mb-2">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-ivory-100 placeholder-ivory-100/30 focus:outline-none focus:border-gold-400/50 transition-all"
                placeholder="your@email.com" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-gold-400 text-xs sm:text-sm tracking-wider uppercase block mb-1.5 sm:mb-2">Guests</label>
                <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold-400/50 transition-all">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n} className="bg-maroon-900">{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gold-400 text-xs sm:text-sm tracking-wider uppercase block mb-1.5 sm:mb-2">Attending?</label>
                <div className="flex gap-1.5 sm:gap-2">
                  {["yes", "no"].map((opt) => (
                    <button key={opt} type="button" onClick={() => setForm({ ...form, attending: opt })}
                      className={`flex-1 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer ${
                        form.attending === opt ? "bg-gold-400 text-maroon-900" : "bg-white/5 text-ivory-100/50 border border-gold-400/20"
                      }`}>
                      {opt === "yes" ? "Yes 🎉" : "No 😢"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-gold-400 text-xs sm:text-sm tracking-wider uppercase block mb-1.5 sm:mb-2">Message</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-ivory-100 placeholder-ivory-100/30 focus:outline-none focus:border-gold-400/50 transition-all resize-none"
                placeholder="Share your blessings..." />
            </div>

            <motion.button type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: ["0 0 20px rgba(212,160,23,0.2)", "0 0 40px rgba(212,160,23,0.4)", "0 0 20px rgba(212,160,23,0.2)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-900 font-bold text-base sm:text-lg rounded-xl tracking-wider uppercase cursor-pointer">
              ✨ Send RSVP ✨
            </motion.button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}
            className="glass-card p-8 sm:p-12 text-center">
            <motion.span className="text-5xl sm:text-7xl block mb-4 sm:mb-6" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
              🎊
            </motion.span>
            <h3 className="font-display text-3xl sm:text-4xl text-gold-400 mb-3 sm:mb-4">Thank You!</h3>
            <p className="text-ivory-100/70 text-base sm:text-lg">We&apos;re so excited to celebrate with you!</p>
            <p className="text-gold-400/60 mt-3 sm:mt-4 text-xs sm:text-sm">See you on 15th August 2026 💌</p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
          className="text-center mt-8 sm:mt-12">
          <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mb-3 sm:mb-4" />
          <p className="text-gold-400/40 text-xs sm:text-sm">Made with 💖 by Jayesh & Shubhami</p>
          <p className="text-gold-400/20 text-xs mt-1 sm:mt-2">15th August 2026 • Rambagh Palace, Jaipur</p>
        </motion.div>
      </div>
    </section>
  );
}
