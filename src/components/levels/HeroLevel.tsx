"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function WaveDivider({ color = "#420010", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className={`absolute left-0 w-full z-20 ${flip ? "bottom-0" : "top-0"}`} style={{ transform: flip ? "rotate(180deg)" : "none", marginBottom: flip ? "-2px" : "0", marginTop: flip ? "0" : "-2px" }}>
      <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
        <path d="M0,60 C180,120 360,0 540,60 C720,120 900,0 1080,60 C1260,120 1440,30 1440,60 L1440,120 L0,120 Z" fill={color} />
      </svg>
    </div>
  );
}

function OrganicBlob({ color, size, top, left, delay = 0 }: { color: string; size: number; top: string; left: string; delay?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, ${color}20, transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={{
        scale: [1, 1.2, 0.9, 1.1, 1],
        rotate: [0, 10, -5, 8, 0],
        borderRadius: [
          "50% 40% 60% 50% / 60% 50% 40% 50%",
          "40% 60% 50% 50% / 50% 40% 60% 50%",
          "60% 50% 40% 60% / 40% 60% 50% 50%",
          "50% 40% 60% 50% / 60% 50% 40% 50%",
        ],
      }}
      transition={{ duration: 12 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function HeroLevel({ started }: { started: boolean; onStart: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80')",
          y: bgY,
          scale: 1.1,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0005]/80 via-maroon-900/50 to-maroon-900/90" />
      <div className="absolute inset-0 mandala-bg opacity-25" />

      {/* Organic blobs */}
      <OrganicBlob color="#d4a017" size={400} top="-10%" left="-10%" delay={0} />
      <OrganicBlob color="#fb7185" size={300} top="60%" left="70%" delay={3} />
      <OrganicBlob color="#fde047" size={200} top="30%" left="80%" delay={6} />

      {/* Animated grid */}
      <div className="absolute inset-0 tile-grid">
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.div
            key={i}
            className="tile"
            animate={isInView ? {
              opacity: [0.05, Math.random() > 0.7 ? 0.3 : 0.05, 0.05],
            } : {}}
            transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4 max-w-4xl mx-auto" style={{ y: textY, opacity }}>
        <motion.div className="mb-6" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <motion.span className="text-gold-400 text-5xl sm:text-7xl block drop-shadow-lg"
            animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            ॐ
          </motion.span>
        </motion.div>

        <motion.div className="w-32 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
          initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 0.3 }} />

        <motion.h1 initial={{ y: 40, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.5, duration: 1 }}>
          <span className="font-display text-6xl sm:text-8xl md:text-[10rem] text-gold-400 block leading-none drop-shadow-2xl">Jayesh</span>
        </motion.h1>

        <motion.div className="my-4" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: 0.8 }}>
          <motion.span className="font-display text-4xl sm:text-6xl text-blush-400 block"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
            ❤
          </motion.span>
        </motion.div>

        <motion.h1 initial={{ y: 40, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ delay: 1, duration: 1 }}>
          <span className="font-display text-6xl sm:text-8xl md:text-[10rem] text-gold-400 block leading-none drop-shadow-2xl">Shubhami</span>
        </motion.h1>

        <motion.div className="w-40 h-px mx-auto mt-8 mb-6 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
          initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 1.3 }} />

        <motion.p className="text-gold-200/60 text-sm tracking-[0.3em] uppercase" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}>
          15th August 2026 • Rambagh Palace, Jaipur
        </motion.p>
      </motion.div>

      {/* Bottom wave - flows into next section */}
      <WaveDivider color="#2d000a" />
    </div>
  );
}
