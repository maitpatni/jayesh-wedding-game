"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function HeroLevel({ started }: { started: boolean; onStart: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers for parallax depth */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80')" }}
        animate={isInView ? { scale: 1.05 } : { scale: 1.15 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/85 via-maroon-900/60 to-maroon-900/90" />
      <div className="absolute inset-0 mandala-bg opacity-30" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 tile-grid">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="tile"
            animate={isInView ? {
              opacity: [0.1, Math.random() > 0.7 ? 0.4 : 0.1, 0.1],
              borderColor: [
                "rgba(212,160,23,0.1)",
                `rgba(212,160,23,${Math.random() * 0.3 + 0.1})`,
                "rgba(212,160,23,0.1)",
              ],
            } : {}}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.15), transparent)" }}
        animate={isInView ? { opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] } : { opacity: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Om symbol */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="text-gold-400 text-4xl sm:text-6xl drop-shadow-lg block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ॐ
          </motion.span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6 sm:mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Names */}
        <motion.h1
          className="mb-2 sm:mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="font-display text-5xl sm:text-7xl md:text-9xl text-gold-400 block leading-tight drop-shadow-2xl">
            Jayesh
          </span>
        </motion.h1>

        <motion.div
          className="my-2 sm:my-4"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.span
            className="font-display text-3xl sm:text-5xl text-blush-400 block"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤
          </motion.span>
        </motion.div>

        <motion.h1
          className="mb-6 sm:mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span className="font-display text-5xl sm:text-7xl md:text-9xl text-gold-400 block leading-tight drop-shadow-2xl">
            Shubhami
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-32 sm:w-56 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6 sm:mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Date & Venue */}
        <motion.p
          className="text-gold-200/70 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.3 }}
        >
          15th August 2026
        </motion.p>
        <motion.p
          className="text-gold-200/50 text-xs tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5 }}
        >
          Rambagh Palace, Jaipur
        </motion.p>
      </div>

      {/* Sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="sparkle hidden sm:block"
          style={{
            left: `${10 + i * 10}%`,
            top: `${15 + (i * 13) % 65}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
