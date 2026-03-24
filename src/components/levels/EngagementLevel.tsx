"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function EngagementLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [revealed, setRevealed] = useState(false);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-sm"
            style={{
              left: `${10 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: 24 + i * 4,
              height: 40 + i * 4,
              background: "linear-gradient(to top, rgba(212,160,23,0.15), rgba(212,160,23,0.03))",
            }}
            animate={isInView ? {
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            } : {}}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glow behind ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(253,224,71,0.15), transparent)" }}
        animate={isInView ? { scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.7, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        {/* Level label */}
        <motion.span
          className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Level 3
        </motion.span>

        {/* Ring SVG */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <svg width="100" height="100" viewBox="0 0 120 120" className="mx-auto drop-shadow-2xl">
            <motion.ellipse
              cx="60" cy="65" rx="30" ry="35"
              fill="none" stroke="#d4a017" strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.ellipse
              cx="60" cy="65" rx="22" ry="27"
              fill="none" stroke="#fde047" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.path
              d="M50 40 L60 25 L70 40 L60 55 Z"
              fill="#fde047" stroke="#d4a017" strokeWidth="1"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ transformOrigin: "60px 40px" }}
            />
            <motion.circle
              cx="60" cy="25" r="3" fill="white"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: [0, 1.5, 1] } : {}}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
            {/* Sparkle effects */}
            {isInView && Array.from({ length: 6 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={40 + Math.random() * 40}
                cy={30 + Math.random() * 50}
                r="1.5"
                fill="#fde047"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ delay: 1.5 + i * 0.2, duration: 1, repeat: Infinity, repeatDelay: 2 }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The Proposal
        </motion.h2>

        <motion.div
          className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.7, duration: 1 }}
        />

        {/* Story text */}
        <motion.div
          className="glass-card p-6 sm:p-8 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <p className="text-ivory-100/80 text-base sm:text-lg leading-relaxed font-light">
            On a magical evening under a canopy of fairy lights at the
            <span className="text-gold-400 font-semibold"> Rambagh Palace</span>,
            Jayesh dropped to one knee. With trembling hands and a heart full of love,
            he asked the question that changed both their lives forever.
          </p>

          <AnimatePresence>
            {revealed && (
              <motion.p
                className="text-gold-400/80 mt-4 italic font-serif text-lg sm:text-xl"
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                "Will you marry me?"
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Reveal button */}
        {!revealed && (
          <motion.button
            onClick={() => setRevealed(true)}
            className="px-8 py-4 border-2 border-gold-400/50 rounded-full text-gold-400 font-serif text-sm sm:text-base tracking-wider hover:bg-gold-400/10 transition-all cursor-pointer relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(212,160,23,0.8)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative">✨ Tap to reveal</span>
          </motion.button>
        )}

        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold-400 text-4xl">💍</span>
            <p className="text-gold-400/60 text-sm mt-2 tracking-wider">She said YES!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
