"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvitationSeal({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setRipple(true);
    setTimeout(() => onOpen(), 1800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900" />
      <div className="absolute inset-0 mandala-bg opacity-20" />

      {/* Floating sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold-400/30"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Invitation text */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mb-8 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-gold-400/50 text-xs tracking-[0.5em] uppercase block mb-2">
              You are cordially invited to
            </span>
            <span className="text-gold-200/70 text-sm tracking-[0.3em] uppercase">
              the wedding celebration of
            </span>
          </motion.div>

          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h1 className="font-display text-5xl sm:text-7xl text-gold-400 leading-tight">Jayesh</h1>
            <motion.span
              className="text-gold-400/60 text-2xl my-2 block"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              &
            </motion.span>
            <h1 className="font-display text-5xl sm:text-7xl text-gold-400 leading-tight">Shubhami</h1>
          </motion.div>

          {/* Seal button */}
          <motion.button
            onClick={handleOpen}
            className="relative group cursor-pointer"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isOpening}
          >
            {/* Ripple effect */}
            <AnimatePresence>
              {ripple && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold-400/30"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* Seal */}
            <motion.div
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-2xl border-4 border-gold-300/50 relative overflow-hidden"
              animate={isOpening ? {
                rotate: [0, -10, 10, -5, 5, 0],
                scale: [1, 1.1, 0.9, 1.05, 0],
              } : {
                boxShadow: [
                  "0 0 20px rgba(212,160,23,0.3)",
                  "0 0 40px rgba(212,160,23,0.5)",
                  "0 0 20px rgba(212,160,23,0.3)",
                ],
              }}
              transition={isOpening ? { duration: 1.5, ease: "easeOut" } : { duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600" />
              <div className="absolute inset-4 rounded-full border-2 border-gold-300/30" />
              <div className="absolute inset-6 rounded-full border border-gold-300/20" />
              <div className="relative z-10 text-center">
                <span className="text-maroon-900 font-display text-2xl sm:text-3xl block leading-none">J</span>
                <span className="text-maroon-800/60 text-lg">❤</span>
                <span className="text-maroon-900 font-display text-2xl sm:text-3xl block leading-none">S</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full" />
            </motion.div>

            <motion.p
              className="text-gold-400/60 text-xs tracking-[0.3em] uppercase mt-6 text-center"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isOpening ? "Opening..." : "Tap to open"}
            </motion.p>
          </motion.button>

          <motion.p
            className="text-gold-400/30 text-xs tracking-[0.3em] uppercase mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            15th August 2026 • Rambagh Palace, Jaipur
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
