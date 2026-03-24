"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function RSVPLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [attending, setAttending] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />
      <div className="absolute inset-0 mandala-bg opacity-15" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3">Level 6</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-4">Join Us</h2>
          <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
          <p className="text-gold-200/60 text-sm sm:text-lg font-light">The final quest: Will you be part of our story?</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              className="glass-card p-6 sm:p-8 space-y-5"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Your Name</label>
                <input type="text" required className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-ivory-100 placeholder-ivory-100/30 focus:outline-none focus:border-gold-400/50 focus:shadow-lg focus:shadow-gold-400/10 transition-all" placeholder="Enter your name" />
              </motion.div>

              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Email</label>
                <input type="email" required className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-ivory-100 placeholder-ivory-100/30 focus:outline-none focus:border-gold-400/50 focus:shadow-lg focus:shadow-gold-400/10 transition-all" placeholder="your@email.com" />
              </motion.div>

              <motion.div className="grid grid-cols-2 gap-4" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                <div>
                  <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Guests</label>
                  <select className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold-400/50 transition-all">
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} className="bg-maroon-900">{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Attending?</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setAttending(true)} className={`flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${attending ? "bg-gold-400 text-maroon-900" : "bg-white/5 text-ivory-100/50 border border-gold-400/20"}`}>Yes 🎉</button>
                    <button type="button" onClick={() => setAttending(false)} className={`flex-1 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${!attending ? "bg-gold-400 text-maroon-900" : "bg-white/5 text-ivory-100/50 border border-gold-400/20"}`}>No 😢</button>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Message</label>
                <textarea rows={3} className="w-full bg-white/5 border border-gold-400/20 rounded-xl px-4 py-3 text-sm text-ivory-100 placeholder-ivory-100/30 focus:outline-none focus:border-gold-400/50 transition-all resize-none" placeholder="Share your blessings..." />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-900 font-bold text-lg rounded-xl tracking-wider uppercase cursor-pointer relative overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(212,160,23,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative">✨ Send RSVP ✨</span>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="glass-card p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="text-6xl block mb-4"
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
              >
                🎉
              </motion.span>
              <h3 className="font-display text-3xl text-gold-400 mb-3">Thank You!</h3>
              <p className="text-ivory-100/70">Your RSVP has been received. See you at the celebration!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent mx-auto mb-4" />
          <p className="text-gold-400/40 text-xs">Made with 💖 by Jayesh & Shubhami</p>
          <p className="text-gold-400/20 text-xs mt-1">15th August 2026 • Rambagh Palace, Jaipur</p>
        </motion.div>
      </div>
    </div>
  );
}
