"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onOpen: () => void;
}

export default function InvitationSeal({ onOpen }: Props) {
  const [phase, setPhase] = useState<"seal" | "opening" | "opened">("seal");
  const sealRef = useRef<HTMLButtonElement>(null);

  const handleSealClick = () => {
    setPhase("opening");
    setTimeout(() => {
      setPhase("opened");
      setTimeout(() => onOpen(), 1200);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {phase !== "opened" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900" />

          {/* Mandala pattern */}
          <div className="absolute inset-0 mandala-bg opacity-20" />

          {/* Floating particles */}
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Main content */}
          <div className="relative flex flex-col items-center">
            {phase === "seal" ? (
              <SealScreen onClick={handleSealClick} />
            ) : (
              <CardOpening />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================
   SEAL SCREEN — Round gold seal to tap
   ================================================ */
function SealScreen({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center"
    >
      {/* Top decoration */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-8 text-center"
      >
        <span className="text-gold-400/50 text-xs tracking-[0.5em] uppercase block mb-2">You are cordially invited to</span>
        <span className="text-gold-200/70 text-sm tracking-[0.3em] uppercase">the wedding celebration of</span>
      </motion.div>

      {/* Names */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mb-10"
      >
        <h1 className="font-display text-5xl sm:text-7xl text-gold-400 leading-tight">Jayesh</h1>
        <span className="text-gold-400/60 text-2xl my-2 block">&</span>
        <h1 className="font-display text-5xl sm:text-7xl text-gold-400 leading-tight">Shubhami</h1>
      </motion.div>

      {/* Seal button */}
      <motion.button
        ref={useRef<HTMLButtonElement>(null)}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer"
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 30px rgba(212, 160, 23, 0.2)",
              "0 0 60px rgba(212, 160, 23, 0.4)",
              "0 0 30px rgba(212, 160, 23, 0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Seal body */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-2xl border-4 border-gold-300/50 relative overflow-hidden">
          {/* Wax seal texture */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600" />
          <div className="absolute inset-4 rounded-full border-2 border-gold-300/30" />
          <div className="absolute inset-6 rounded-full border border-gold-300/20" />

          {/* Center content */}
          <div className="relative z-10 text-center">
            <span className="text-maroon-900 font-display text-2xl sm:text-3xl block leading-none">J</span>
            <span className="text-maroon-800/60 text-lg">❤</span>
            <span className="text-maroon-900 font-display text-2xl sm:text-3xl block leading-none">S</span>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Label */}
        <motion.p
          className="text-gold-400/60 text-xs tracking-[0.3em] uppercase mt-6 text-center"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to open
        </motion.p>
      </motion.button>

      {/* Date */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-gold-400/30 text-xs tracking-[0.3em] uppercase mt-8"
      >
        15th August 2026 • Rambagh Palace, Jaipur
      </motion.p>
    </motion.div>
  );
}

/* ================================================
   CARD OPENING ANIMATION
   ================================================ */
function CardOpening() {
  return (
    <div className="relative w-80 sm:w-96" style={{ perspective: "1200px" }}>
      {/* Card envelope */}
      <motion.div
        initial={{ rotateX: 0, opacity: 1 }}
        animate={{ rotateX: -180, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
        className="absolute inset-0 bg-gradient-to-b from-maroon-600 to-maroon-800 rounded-2xl border border-gold-400/30 shadow-2xl z-20"
        style={{ transformOrigin: "top center", backfaceVisibility: "hidden" }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <span className="text-gold-400 font-display text-4xl">Invitation</span>
            <div className="w-20 h-px bg-gold-400/30 mx-auto mt-4" />
          </div>
        </div>
      </motion.div>

      {/* Inner card (revealed) */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
        className="relative bg-gradient-to-b from-ivory-50 to-ivory-100 rounded-2xl border border-gold-400/40 shadow-2xl overflow-hidden"
      >
        {/* Mandala watermark */}
        <div className="absolute inset-0 mandala-bg opacity-10" />

        <div className="relative p-8 sm:p-10 text-center">
          {/* Om */}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="text-maroon-500 text-4xl block mb-4"
          >
            ॐ
          </motion.span>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-maroon-500/50 to-transparent mx-auto mb-4"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-maroon-500/60 text-xs tracking-[0.4em] uppercase mb-4"
          >
            Together with their families
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="font-display text-4xl sm:text-5xl text-maroon-600 mb-1"
          >
            Jayesh Jain
          </motion.h2>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="text-maroon-400/60 text-xl block my-2"
          >
            &
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            className="font-display text-4xl sm:text-5xl text-maroon-600 mb-6"
          >
            Shubhami Karnawat
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.3, duration: 0.6 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-maroon-500/50 to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-maroon-500/70 text-sm leading-relaxed mb-2"
          >
            request the pleasure of your company
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="text-maroon-500/70 text-sm leading-relaxed"
          >
            at the celebration of their marriage
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="mt-6 bg-maroon-500/5 rounded-xl p-4 border border-maroon-500/10"
          >
            <p className="text-maroon-600 font-serif text-lg font-semibold">15th August 2026</p>
            <p className="text-maroon-500/60 text-sm mt-1">Rambagh Palace, Jaipur</p>
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
            className="text-maroon-400/40 text-xs mt-6 tracking-wider"
          >
            Entering our story...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
