/**
 * GameEngine — Main orchestrator for the wedding game experience.
 *
 * FLOW:
 *   InvitationSeal → HeroBanner → VarmalaScene → LoveStory →
 *   Engagement → Events → Gallery → RSVP
 *
 * PERFORMANCE:
 *   • FloatingDiya uses CSS transforms only
 *   • ParticleField uses 30 particles (reduced from 50)
 *   • prefers-reduced-motion disables particle/diya effects
 *
 * NAV:
 *   • Side dot nav (desktop only)
 *   • Progress bar (top)
 *   • Level title indicator (top-left)
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import InvitationSeal from "./InvitationSeal";
import HeroBanner from "./levels/HeroBanner";
import VarmalaScene from "./levels/VarmalaScene";
import LoveStoryLevel from "./levels/LoveStoryLevel";
import EngagementLevel from "./levels/EngagementLevel";
import EventsLevel from "./levels/EventsLevel";
import GalleryLevel from "./levels/GalleryLevel";
import RSVPLevel from "./levels/RSVPLevel";

/* ── Level registry ── */
const LEVELS = [
  { id: "hero", name: "The Beginning", icon: "🏛️", color: "#d4a017" },
  { id: "varmala", name: "Varmala", icon: "🌸", color: "#fb7185" },
  { id: "love-story", name: "Our Love Story", icon: "💕", color: "#f43f5e" },
  { id: "engagement", name: "The Proposal", icon: "💍", color: "#fde047" },
  { id: "events", name: "Celebrations", icon: "🎉", color: "#f97316" },
  { id: "gallery", name: "Memories", icon: "📸", color: "#a78bfa" },
  { id: "rsvp", name: "Join Us", icon: "💌", color: "#34d399" },
];

/* ─────────────────────────────────────────────
   FLOATING DIYA — rising flame particle
   ───────────────────────────────────────────── */
function FloatingDiya({ delay, x }: { delay: number; x: number }) {
  const [vh, setVh] = useState(800);
  useEffect(() => { setVh(window.innerHeight); }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{ left: `${x}%`, bottom: "-16px" }}
      animate={{ y: [0, -(vh + 80)], x: [0, Math.sin(delay) * 40, 0], opacity: [0, 0.9, 0.9, 0], scale: [0.5, 1, 1, 0.3] }}
      transition={{ duration: 12 + delay * 2, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <div className="w-2.5 h-4 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 opacity-55 blur-[1px]"
        style={{ boxShadow: "0 0 12px rgba(253,224,71,0.5), 0 0 25px rgba(253,224,71,0.2)" }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PARTICLE FIELD — ambient gold dust
   ───────────────────────────────────────────── */
function ParticleField() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 3.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full" style={{
          left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
          background: "radial-gradient(circle, rgba(253,224,71,0.7), transparent)",
        }} animate={{ opacity: [0, 0.7, 0], scale: [0, 1.3, 0], y: [0, -25, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
   ───────────────────────────────────────────── */
function ProgressBar({ progress, level }: { progress: number; level: number }) {
  return (
    <motion.div className="fixed top-0 left-0 right-0 z-[999] h-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
      <div className="h-full bg-maroon-900/40">
        <div className="h-full origin-left" style={{
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${LEVELS[level]?.color || "#d4a017"}, ${LEVELS[Math.min(level + 1, LEVELS.length - 1)]?.color || "#fde047"})`,
          boxShadow: `0 0 8px ${LEVELS[level]?.color || "#d4a017"}30`,
        }} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SIDE NAV — dot navigation (desktop)
   ───────────────────────────────────────────── */
function LevelNav({ currentLevel, onNavigate }: { currentLevel: number; onNavigate: (i: number) => void }) {
  return (
    <motion.nav className="fixed right-4 top-1/2 -translate-y-1/2 z-[998] hidden md:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
      aria-label="Section navigation">
      {LEVELS.map((level, i) => (
        <motion.button key={level.id} onClick={() => onNavigate(i)}
          className="group relative flex items-center gap-3" whileHover={{ x: -5 }}
          aria-label={`Go to ${level.name}`}>
          <div className="w-3 h-3 rounded-full border-2 transition-all duration-300"
            style={{
              borderColor: i === currentLevel ? level.color : "rgba(212,160,23,0.25)",
              background: i === currentLevel ? level.color : "transparent",
              boxShadow: i === currentLevel ? `0 0 10px ${level.color}50` : "none",
            }} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-serif tracking-wider whitespace-nowrap"
            style={{ color: level.color }}>{level.icon} {level.name}</span>
        </motion.button>
      ))}
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   LEVEL TITLE INDICATOR
   ───────────────────────────────────────────── */
function LevelTitle({ level, visible }: { level: number; visible: boolean }) {
  const data = LEVELS[level];
  if (!data || !visible) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.div key={level} className="fixed top-4 left-4 z-[998] flex items-center gap-2.5"
        initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <span className="text-xl">{data.icon}</span>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase opacity-50" style={{ color: data.color }}>Level {level + 1}</div>
          <div className="font-serif text-sm" style={{ color: data.color }}>{data.name}</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN ENGINE
   ───────────────────────────────────────────── */
export default function GameEngine() {
  const [sealOpened, setSealOpened] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const handleScroll = useCallback(() => {
    if (!sealOpened) return;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
    const vh = window.innerHeight;
    setCurrentLevel(Math.min(Math.floor((scrollY + vh * 0.4) / vh), LEVELS.length - 1));
  }, [sealOpened]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navigateToLevel = (index: number) => {
    window.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Invitation Seal overlay ── */}
      <AnimatePresence>
        {!sealOpened && <InvitationSeal onOpen={() => setSealOpened(true)} />}
      </AnimatePresence>

      {/* ── Main content ── */}
      <motion.div ref={containerRef} className="relative"
        initial={{ opacity: 0 }} animate={{ opacity: sealOpened ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>

        {/* Ambient effects (disabled if reduced motion) */}
        {sealOpened && !prefersReducedMotion && <ParticleField />}
        {sealOpened && !prefersReducedMotion && (
          <>
            <FloatingDiya delay={0} x={5} />
            <FloatingDiya delay={2} x={15} />
            <FloatingDiya delay={4} x={85} />
            <FloatingDiya delay={6} x={95} />
          </>
        )}

        {/* UI overlays */}
        {sealOpened && <ProgressBar progress={scrollProgress} level={currentLevel} />}
        {sealOpened && <LevelTitle level={currentLevel} visible={sealOpened} />}
        {sealOpened && <LevelNav currentLevel={currentLevel} onNavigate={navigateToLevel} />}

        {/* Scroll hint on hero */}
        {sealOpened && currentLevel === 0 && (
          <motion.div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
            aria-hidden="true">
            <span className="text-gold-400/45 text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 3 L10 17 M4 11 L10 17 L16 11" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {/* ── Sections (organic flow, no snap) ── */}
        <section className="relative" aria-label="Wedding invitation banner"><HeroBanner /></section>
        <section className="relative" aria-label="Varmala ceremony"><VarmalaScene /></section>
        <section className="relative" aria-label="Our love story"><LoveStoryLevel /></section>
        <section className="relative" aria-label="The proposal"><EngagementLevel /></section>
        <section className="relative" aria-label="Wedding celebrations"><EventsLevel /></section>
        <section className="relative" aria-label="Photo gallery"><GalleryLevel /></section>
        <section className="relative" aria-label="RSVP"><RSVPLevel /></section>
      </motion.div>
    </>
  );
}
