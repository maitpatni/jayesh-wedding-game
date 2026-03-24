"use client";

import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
  started: boolean;
}

export default function HeroLevel({ onStart, started }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated palace background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/80 via-maroon-900/60 to-maroon-900/90" />

      {/* Mandala overlay */}
      <div className="absolute inset-0 mandala-bg opacity-30" />

      {/* Tile grid background */}
      <div className="absolute inset-0 tile-grid">
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i} className={`tile ${i % 7 === 0 ? "active" : ""}`} />
        ))}
      </div>

      {/* Light rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-radial from-gold-400/10 to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Om */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="mb-4 sm:mb-6"
        >
          <span className="text-gold-400 text-4xl sm:text-6xl drop-shadow-lg">ॐ</span>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6 sm:mb-8"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-2 sm:mb-4"
        >
          <span className="font-display text-5xl sm:text-7xl md:text-9xl text-gold-400 block leading-tight drop-shadow-2xl">
            Jayesh
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3, type: "spring" }}
          className="my-2 sm:my-4"
        >
          <span className="font-display text-3xl sm:text-5xl text-blush-400">❤</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mb-6 sm:mb-8"
        >
          <span className="font-display text-5xl sm:text-7xl md:text-9xl text-gold-400 block leading-tight drop-shadow-2xl">
            Shubhami
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="w-32 sm:w-56 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6 sm:mb-8"
        />

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-gold-200/70 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2"
        >
          15th August 2026
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
          className="text-gold-200/50 text-xs tracking-[0.2em] uppercase"
        >
          Rambagh Palace, Jaipur
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-10 sm:mt-14"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gold-400/40 text-sm"
          >
            ↓ Scroll to explore ↓
          </motion.div>
        </motion.div>
      </div>

      {/* Sparkles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="sparkle hidden sm:block"
          style={{
            left: `${10 + (i * 10) % 80}%`,
            top: `${15 + (i * 13) % 70}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </section>
  );
}
