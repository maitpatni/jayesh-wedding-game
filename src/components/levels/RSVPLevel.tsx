"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function WaveDividerTop() {
  return (
    <div className="absolute top-0 left-0 w-full z-20 -mt-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,0 L0,50 C240,10 480,80 720,40 C960,0 1200,60 1440,30 L1440,0 Z" fill="#2d000a" />
      </svg>
    </div>
  );
}

export default function RSVPLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [attending, setAttending] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, #2d000a 0%, #1a0005 50%, #0d0003 100%)" }}>
      <WaveDividerTop />
      <div className="absolute inset-0 mandala-bg opacity-10" />
      <div className="blob w-96 h-96 bg-emerald-500/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Floating petals for celebration feel */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ left: `${15 + i * 14}%`, bottom: "-20px" }}
          animate={{ y: [0, -(typeof window !== 'undefined' ? window.innerHeight : 800) - 50], x: [0, Math.sin(i) * 40], opacity: [0, 0.6, 0], rotate: [0, 360] }}
          transition={{ duration: 10 + i * 2, delay: i * 1.5, repeat: Infinity, ease: "linear" }}>
          <div className="w-2 h-3 rounded-full bg-gold-400/40" />
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-20">
        <motion.div className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-gold-400/50 text-xs tracking-[0.5em] uppercase block mb-4">Level 6</span>
          <h2 className="font-display text-5xl sm:text-7xl text-gold-400 mb-4">Join Us</h2>
          <div className="w-40 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-5" />
          <p className="text-gold-200/50 text-base sm:text-lg font-light">The final quest: Will you be part of our story?</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" className="glass-card p-7 sm:p-8 space-y-5"
              initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.3 }}
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div>
                <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Your Name</label>
                <input type="text" required className="w-full bg-white/5 border border-gold-400/15 rounded-2xl px-4 py-3 text-ivory-100 placeholder-ivory-100/25 focus:outline-none focus:border-gold-400/40 focus:shadow-lg focus:shadow-gold-400/5 transition-all" placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Email</label>
                <input type="email" required className="w-full bg-white/5 border border-gold-400/15 rounded-2xl px-4 py-3 text-ivory-100 placeholder-ivory-100/25 focus:outline-none focus:border-gold-400/40 focus:shadow-lg focus:shadow-gold-400/5 transition-all" placeholder="your@email.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Guests</label>
                  <select className="w-full bg-white/5 border border-gold-400/15 rounded-2xl px-4 py-3 text-sm text-ivory-100 focus:outline-none focus:border-gold-400/40 transition-all">
                    {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-maroon-900">{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Attending?</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setAttending(true)} className={`flex-1 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${attending ? "bg-gold-400 text-maroon-900" : "bg-white/5 text-ivory-100/50 border border-gold-400/15"}`}>Yes 🎉</button>
                    <button type="button" onClick={() => setAttending(false)} className={`flex-1 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${!attending ? "bg-gold-400 text-maroon-900" : "bg-white/5 text-ivory-100/50 border border-gold-400/15"}`}>No 😢</button>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-gold-400 text-xs tracking-wider uppercase block mb-2">Message</label>
                <textarea rows={3} className="w-full bg-white/5 border border-gold-400/15 rounded-2xl px-4 py-3 text-sm text-ivory-100 placeholder-ivory-100/25 focus:outline-none focus:border-gold-400/40 transition-all resize-none" placeholder="Share your blessings..." />
              </div>
              <motion.button type="submit"
                className="w-full py-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-900 font-bold text-lg rounded-2xl tracking-wider uppercase cursor-pointer relative overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(212,160,23,0.3)" }} whileTap={{ scale: 0.98 }}>
                <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity }} />
                <span className="relative">✨ Send RSVP ✨</span>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div key="success" className="glass-card p-10 text-center"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
              <motion.span className="text-6xl block mb-4"
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.8 }}>🎉</motion.span>
              <h3 className="font-display text-4xl text-gold-400 mb-3">Thank You!</h3>
              <p className="text-ivory-100/70">Your RSVP has been received. See you at the celebration!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="text-center mt-12" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
          <div className="w-20 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mb-4" />
          <p className="text-gold-400/30 text-xs">Made with 💖 by Jayesh & Shubhami</p>
          <p className="text-gold-400/15 text-xs mt-1">15th August 2026 • Rambagh Palace, Jaipur</p>
        </motion.div>
      </div>
    </div>
  );
}
