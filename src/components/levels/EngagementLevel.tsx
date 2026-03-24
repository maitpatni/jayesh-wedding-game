"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function EngagementLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [revealed, setRevealed] = useState(false);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />

      {/* Floating lanterns */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-10 sm:w-8 sm:h-12 bg-gradient-to-t from-gold-400/20 to-gold-400/5 rounded-full blur-sm"
            style={{ left: `${10 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3 sm:mb-4"
        >
          Level 3
        </motion.span>

        {/* Ring */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, type: "spring" }}
          className="mb-6 sm:mb-8"
        >
          <svg width="80" height="80" viewBox="0 0 120 120" className="mx-auto sm:w-[120px] sm:h-[120px] drop-shadow-2xl">
            <ellipse cx="60" cy="65" rx="30" ry="35" fill="none" stroke="#d4a017" strokeWidth="4" />
            <ellipse cx="60" cy="65" rx="22" ry="27" fill="none" stroke="#fde047" strokeWidth="2" />
            <path d="M50 40 L60 25 L70 40 L60 55 Z" fill="#fde047" stroke="#d4a017" strokeWidth="1" />
            <motion.circle cx="60" cy="25" r="3" fill="white" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-4 sm:mb-6"
        >
          The Proposal
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6 sm:mb-8"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="glass-card p-5 sm:p-8 mb-6 sm:mb-8"
        >
          <p className="text-ivory-100/80 text-base sm:text-lg leading-relaxed font-light">
            On a magical evening under a canopy of fairy lights at the
            <span className="text-gold-400 font-semibold"> Rambagh Palace</span>,
            Jayesh dropped to one knee. With trembling hands and a heart full of love,
            he asked the question that changed both their lives forever.
          </p>
          <p className="text-gold-400/80 mt-4 italic font-serif text-lg sm:text-xl">
            &quot;Will you marry me?&quot;
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setRevealed(!revealed)}
          className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gold-400/50 rounded-full text-gold-400 font-serif text-sm sm:text-base tracking-wider hover:bg-gold-400/10 transition-colors cursor-pointer"
        >
          {revealed ? "💖 She said YES!" : "✨ Tap to reveal"}
        </motion.button>

        {revealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="mt-6 sm:mt-8"
          >
            <span className="font-display text-4xl sm:text-5xl text-blush-400">She said YES!</span>
            <div className="flex justify-center gap-1 sm:gap-2 mt-3 sm:mt-4 flex-wrap">
              {Array.from({ length: 12 }, (_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -40 - Math.random() * 60 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className="text-xl sm:text-2xl"
                >
                  {["💖", "✨", "🎊", "💕", "🎉"][i % 5]}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
