"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ===== Layer 1: Parallax background ===== */
function ParallaxBackground({ scrollY }: { scrollY: any }) {
  const layer1Y = useTransform(scrollY, [0, 1], ["0%", "15%"]);
  const layer2Y = useTransform(scrollY, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollY, [0, 0.3], [0.85, 0.95]);

  return (
    <>
      {/* Deep background — warm gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 120% 80% at 50% 30%, #3d0012 0%, #1a0005 60%, #0d0003 100%)",
          y: layer1Y,
        }}
      />
      {/* Secondary layer — golden radial glow center */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(212,160,23,0.08) 0%, transparent 60%)",
          y: layer2Y,
        }}
      />
      {/* Vignette overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(13,0,3,0.9) 100%)",
          opacity: overlayOpacity,
        }}
      />
      {/* Mandala texture */}
      <div className="absolute inset-0 mandala-bg opacity-[0.07]" />
    </>
  );
}

/* ===== Layer 2: Fairy lights ===== */
function FairyLights() {
  const lights = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: 3 + (i / 27) * 94,
    y: 2 + Math.sin(i * 0.8) * 3 + (i % 3) * 1.5,
    size: 2 + (i % 3),
    delay: i * 0.15,
    color: i % 4 === 0 ? "253,224,71" : i % 4 === 1 ? "255,183,197" : i % 4 === 2 ? "255,223,186" : "212,160,23",
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Wire */}
      <svg className="absolute w-full" style={{ top: "1%" }} viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path d="M0,20 Q360,35 720,18 Q1080,0 1440,20" fill="none" stroke="rgba(212,160,23,0.12)" strokeWidth="1" />
      </svg>
      {/* Lights */}
      {lights.map((l) => (
        <motion.div
          key={l.id}
          className="absolute rounded-full"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            width: l.size,
            height: l.size,
            background: `radial-gradient(circle, rgba(${l.color},1), rgba(${l.color},0.3) 60%, transparent)`,
            boxShadow: `0 0 ${l.size * 4}px rgba(${l.color},0.5), 0 0 ${l.size * 8}px rgba(${l.color},0.2)`,
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2.5 + Math.random(),
            delay: l.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ===== Layer 3: Floating garlands ===== */
function FloralGarlands() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Left garland — draping from top-left */}
      <svg className="absolute" style={{ top: 0, left: 0, width: "45%", height: "35%" }} viewBox="0 0 500 200" preserveAspectRatio="none">
        <motion.path
          d="M0,20 Q100,120 200,60 Q300,0 400,80 Q450,120 500,50"
          fill="none"
          stroke="rgba(255,183,100,0.15)"
          strokeWidth="3"
          animate={{ d: [
            "M0,20 Q100,120 200,60 Q300,0 400,80 Q450,120 500,50",
            "M0,25 Q100,115 200,65 Q295,5 400,75 Q450,115 500,55",
            "M0,20 Q100,120 200,60 Q300,0 400,80 Q450,120 500,50",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Marigold flowers along the garland */}
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17;
          const cx = t * 480 + 10;
          const cy = 20 + Math.sin(t * Math.PI * 2.5) * 60 + 20;
          return (
            <motion.circle key={`lg${i}`} cx={cx} cy={cy}
              r={3 + (i % 3)}
              fill={i % 3 === 0 ? "rgba(255,140,0,0.6)" : i % 3 === 1 ? "rgba(255,215,0,0.5)" : "rgba(255,99,71,0.4)"}
              animate={{ cy: [cy, cy + Math.sin(i) * 3, cy], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4 + i * 0.3, delay: i * 0.1, repeat: Infinity }}
            />
          );
        })}
      </svg>

      {/* Right garland */}
      <svg className="absolute" style={{ top: 0, right: 0, width: "40%", height: "30%" }} viewBox="0 0 400 160" preserveAspectRatio="none">
        <motion.path
          d="M400,15 Q300,100 200,40 Q100,-10 0,60"
          fill="none"
          stroke="rgba(255,183,100,0.12)"
          strokeWidth="2.5"
          animate={{ d: [
            "M400,15 Q300,100 200,40 Q100,-10 0,60",
            "M400,20 Q300,95 200,45 Q95,-5 0,55",
            "M400,15 Q300,100 200,40 Q100,-10 0,60",
          ]}}
          transition={{ duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const cx = 400 - t * 380;
          const cy = 15 + Math.sin(t * Math.PI * 2) * 50 + 20;
          return (
            <motion.circle key={`rg${i}`} cx={cx} cy={cy}
              r={2.5 + (i % 3)}
              fill={i % 2 === 0 ? "rgba(255,140,0,0.5)" : "rgba(255,215,0,0.4)"}
              animate={{ cy: [cy, cy + Math.cos(i) * 2, cy] }}
              transition={{ duration: 5 + i * 0.2, delay: i * 0.15, repeat: Infinity }}
            />
          );
        })}
      </svg>

      {/* Bottom center garland */}
      <svg className="absolute" style={{ bottom: "15%", left: "15%", width: "70%", height: "12%" }} viewBox="0 0 700 80" preserveAspectRatio="none">
        <motion.path
          d="M0,10 Q175,50 350,15 Q525,-10 700,20"
          fill="none"
          stroke="rgba(255,183,100,0.08)"
          strokeWidth="2"
          animate={{ d: [
            "M0,10 Q175,50 350,15 Q525,-10 700,20",
            "M0,15 Q175,45 350,20 Q525,-5 700,15",
            "M0,10 Q175,50 350,15 Q525,-10 700,20",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ===== Layer 4: Gold dust particles ===== */
function GoldDust() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 2,
    delay: Math.random() * 6,
    dur: 4 + Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(253,224,71,${0.4 + Math.random() * 0.4})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(253,224,71,0.3)`,
          }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -20 - Math.random() * 30, 0],
            x: [0, Math.sin(p.id) * 10, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ===== Layer 5: Petals ===== */
function FallingPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${8 + i * 9.5}%`, top: "-5%" }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(i * 1.3) * 40, 0, Math.cos(i * 0.7) * 30],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.5, 0.3, 0],
          }}
          transition={{ duration: 10 + i * 1.5, delay: i * 1.2, repeat: Infinity, ease: "linear" }}
        >
          <div style={{
            width: 5 + (i % 3) * 2,
            height: 7 + (i % 3) * 2,
            background: `radial-gradient(ellipse at 30% 30%, ${i % 2 === 0 ? "rgba(253,184,210,0.7)" : "rgba(255,183,100,0.6)"}, transparent)`,
            borderRadius: "50% 0 50% 0",
            transform: "rotate(45deg)",
          }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ===== HERO BANNER ===== */
export default function HeroBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* All layers */}
      <ParallaxBackground scrollY={scrollYProgress} />
      <FairyLights />
      <FloralGarlands />
      <GoldDust />
      <FallingPetals />

      {/* Center glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          scale: sceneScale,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Om symbol */}
        <motion.div
          className="mb-5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="text-gold-400/80 text-4xl sm:text-5xl block"
            style={{ filter: "drop-shadow(0 0 20px rgba(212,160,23,0.4))" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ॐ
          </motion.span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-28 h-px mx-auto mb-7"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.5), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Names */}
        <motion.h1
          initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display text-6xl sm:text-8xl md:text-9xl text-gold-400 block leading-none"
            style={{ textShadow: "0 0 60px rgba(212,160,23,0.2), 0 4px 20px rgba(0,0,0,0.5)" }}>
            Jayesh
          </span>
        </motion.h1>

        <motion.div
          className="my-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <motion.span
            className="font-display text-3xl sm:text-5xl text-blush-400 block"
            style={{ filter: "drop-shadow(0 0 15px rgba(251,113,133,0.3))" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            &amp;
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display text-6xl sm:text-8xl md:text-9xl text-gold-400 block leading-none"
            style={{ textShadow: "0 0 60px rgba(212,160,23,0.2), 0 4px 20px rgba(0,0,0,0.5)" }}>
            Shubhami
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-36 h-px mx-auto mt-8 mb-6"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.5), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />

        {/* Date */}
        <motion.p
          className="text-gold-200/40 text-xs sm:text-sm tracking-[0.35em] uppercase font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          15th August 2026 • Rambagh Palace, Jaipur
        </motion.p>
      </motion.div>

      {/* Bottom organic wave — merges into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 140" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "100px" }}>
          <path d="M0,50 C180,100 360,20 540,60 C720,100 900,30 1080,70 C1260,110 1440,40 1440,50 L1440,140 L0,140Z" fill="#2d000a" />
          <path d="M0,70 C240,110 480,50 720,80 C960,110 1200,60 1440,70 L1440,140 L0,140Z" fill="#3d0010" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
