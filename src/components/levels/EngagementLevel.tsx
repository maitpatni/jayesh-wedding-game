"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function WaveDividerTop() {
  return (
    <div className="absolute top-0 left-0 w-full z-20 -mt-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,0 L0,50 C200,90 400,10 650,60 C900,110 1100,20 1440,70 L1440,0 Z" fill="#2d000a" />
      </svg>
    </div>
  );
}

function WaveDividerBottom() {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 -mb-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,100 L0,30 C300,90 500,10 750,50 C1000,90 1250,20 1440,60 L1440,100 Z" fill="#2d000a" />
      </svg>
    </div>
  );
}

export default function EngagementLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [revealed, setRevealed] = useState(false);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(180deg, #2d000a 0%, #1f0007 50%, #2d000a 100%)" }}>
      <WaveDividerTop />

      {/* Organic glow */}
      <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(253,224,71,0.12), transparent 70%)" }}
        animate={{ scale: [0.8, 1.2, 0.8], borderRadius: ["50% 40% 60% 50%", "40% 60% 50% 50%", "60% 50% 40% 60%", "50% 40% 60% 50%"] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating diyas around ring */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="absolute w-2 h-3 rounded-full"
          style={{
            background: "linear-gradient(to top, #f59e0b, #fde047)",
            left: `${50 + 20 * Math.cos((i / 8) * Math.PI * 2)}%`,
            top: `${45 + 20 * Math.sin((i / 8) * Math.PI * 2)}%`,
            boxShadow: "0 0 10px rgba(253,224,71,0.5)",
          }}
          animate={isInView ? {
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [0, -5, 0],
          } : {}}
          transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
        />
      ))}

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center py-20">
        <motion.span className="text-gold-400/50 text-xs tracking-[0.5em] uppercase block mb-5"
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>Level 3</motion.span>

        {/* Ring */}
        <motion.div className="mb-10"
          initial={{ scale: 0, rotate: -180 }} animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
          <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto drop-shadow-2xl">
            <motion.ellipse cx="60" cy="65" rx="35" ry="40" fill="none" stroke="#d4a017" strokeWidth="3"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2.5 }} />
            <motion.ellipse cx="60" cy="65" rx="26" ry="31" fill="none" stroke="#fde047" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 2.5, delay: 0.5 }} />
            <motion.path d="M48 42 L60 22 L72 42 L60 60 Z" fill="#fde047" stroke="#d4a017" strokeWidth="1"
              initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 1, duration: 0.6 }} style={{ transformOrigin: "60px 40px" }} />
            <motion.circle cx="60" cy="22" r="4" fill="white" initial={{ scale: 0 }}
              animate={isInView ? { scale: [0, 1.8, 1] } : {}} transition={{ delay: 1.5, duration: 0.6 }} />
          </svg>
        </motion.div>

        <motion.h2 className="font-display text-5xl sm:text-7xl text-gold-400 mb-6"
          initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.4 }}>The Proposal</motion.h2>

        <motion.div className="w-40 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
          initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ delay: 0.6, duration: 1.2 }} />

        <motion.div className="glass-card p-8 mb-8" initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <p className="text-ivory-100/80 text-lg leading-relaxed font-light">
            On a magical evening under a canopy of fairy lights at the
            <span className="text-gold-400 font-semibold"> Rambagh Palace</span>,
            Jayesh dropped to one knee.
          </p>
          <AnimatePresence>
            {revealed && (
              <motion.p className="text-gold-400/80 mt-5 italic font-serif text-xl"
                initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2 }}>
                "Will you marry me?"
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {!revealed ? (
          <motion.button onClick={() => setRevealed(true)}
            className="px-10 py-4 border-2 border-gold-400/40 rounded-full text-gold-400 font-serif tracking-wider hover:bg-gold-400/10 cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.05, borderColor: "rgba(212,160,23,0.7)" }} whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
            <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity }} />
            <span className="relative">✨ Tap to reveal</span>
          </motion.button>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <span className="text-5xl">💍</span>
            <p className="text-gold-400/60 mt-2 tracking-wider">She said YES!</p>
          </motion.div>
        )}
      </div>

      <WaveDividerBottom />
    </div>
  );
}
