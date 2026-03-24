"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import InvitationSeal from "./InvitationSeal";
import HeroLevel from "./levels/HeroLevel";
import LoveStoryLevel from "./levels/LoveStoryLevel";
import EngagementLevel from "./levels/EngagementLevel";
import EventsLevel from "./levels/EventsLevel";
import GalleryLevel from "./levels/GalleryLevel";
import RSVPLevel from "./levels/RSVPLevel";

const LEVELS = [
  { id: "hero", name: "The Beginning", icon: "🏛️", color: "#d4a017" },
  { id: "love-story", name: "Our Love Story", icon: "💕", color: "#fb7185" },
  { id: "engagement", name: "The Proposal", icon: "💍", color: "#fde047" },
  { id: "events", name: "Celebrations", icon: "🎉", color: "#f97316" },
  { id: "gallery", name: "Memories", icon: "📸", color: "#a78bfa" },
  { id: "rsvp", name: "Join Us", icon: "💌", color: "#34d399" },
];

function FloatingDiya({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{ left: `${x}%`, bottom: "-20px" }}
      animate={{
        y: [0, -window.innerHeight - 100],
        x: [0, Math.sin(delay) * 50, 0],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.3],
      }}
      transition={{
        duration: 12 + delay * 2,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 opacity-60 blur-[1px]"
        style={{ boxShadow: "0 0 15px rgba(253,224,71,0.6), 0 0 30px rgba(253,224,71,0.3)" }} />
    </motion.div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(253,224,71,0.8), transparent)`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ progress, level }: { progress: number; level: number }) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[999] h-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="h-full bg-maroon-900/50">
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${LEVELS[level]?.color || "#d4a017"}, ${LEVELS[Math.min(level + 1, LEVELS.length - 1)]?.color || "#fde047"})`,
            boxShadow: `0 0 10px ${LEVELS[level]?.color || "#d4a017"}40`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

function LevelNav({ currentLevel, totalLevels, onNavigate }: {
  currentLevel: number;
  totalLevels: number;
  onNavigate: (index: number) => void;
}) {
  return (
    <motion.nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[998] hidden md:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {LEVELS.map((level, i) => (
        <motion.button
          key={level.id}
          onClick={() => onNavigate(i)}
          className="group relative flex items-center gap-3"
          whileHover={{ x: -5 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full border-2 transition-all duration-300"
            style={{
              borderColor: i === currentLevel ? level.color : "rgba(212,160,23,0.3)",
              background: i === currentLevel ? level.color : "transparent",
              boxShadow: i === currentLevel ? `0 0 12px ${level.color}60` : "none",
            }}
            animate={i === currentLevel ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-serif tracking-wider whitespace-nowrap"
            style={{ color: level.color }}>
            {level.icon} {level.name}
          </span>
        </motion.button>
      ))}
    </motion.nav>
  );
}

function LevelTitle({ level, visible }: { level: number; visible: boolean }) {
  const data = LEVELS[level];
  if (!data || !visible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={level}
        className="fixed top-5 left-5 z-[998] flex items-center gap-3"
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-2xl">{data.icon}</span>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase opacity-60" style={{ color: data.color }}>
            Level {level + 1}
          </div>
          <div className="font-serif text-sm" style={{ color: data.color }}>
            {data.name}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GameEngine() {
  const [sealOpened, setSealOpened] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const handleScroll = useCallback(() => {
    if (!sealOpened) return;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    setScrollProgress(progress);

    const vh = window.innerHeight;
    const level = Math.min(Math.floor((scrollY + vh * 0.4) / vh), LEVELS.length - 1);
    setCurrentLevel(level);
  }, [sealOpened]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navigateToLevel = (index: number) => {
    const vh = window.innerHeight;
    window.scrollTo({ top: index * vh, behavior: "smooth" });
  };

  const handleSealOpen = () => {
    setSealOpened(true);
  };

  return (
    <>
      {/* Invitation Seal */}
      <AnimatePresence>
        {!sealOpened && <InvitationSeal onOpen={handleSealOpen} />}
      </AnimatePresence>

      {/* Main Game World */}
      <motion.div
        ref={containerRef}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: sealOpened ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient particles */}
        {sealOpened && <ParticleField />}

        {/* Floating diyas */}
        {sealOpened && (
          <>
            <FloatingDiya delay={0} x={5} />
            <FloatingDiya delay={2} x={15} />
            <FloatingDiya delay={4} x={85} />
            <FloatingDiya delay={6} x={95} />
          </>
        )}

        {/* Progress bar */}
        {sealOpened && <ProgressBar progress={scrollProgress} level={currentLevel} />}

        {/* Level indicator */}
        {sealOpened && <LevelTitle level={currentLevel} visible={sealOpened} />}

        {/* Side navigation */}
        {sealOpened && (
          <LevelNav
            currentLevel={currentLevel}
            totalLevels={LEVELS.length}
            onNavigate={navigateToLevel}
          />
        )}

        {/* Scroll indicator on hero */}
        {sealOpened && currentLevel === 0 && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <span className="text-gold-400/50 text-xs tracking-[0.3em] uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3 L10 17 M4 11 L10 17 L16 11" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {/* Levels - no snap, organic flow */}
        <section className="relative">
          <HeroLevel started={sealOpened} onStart={() => {}} />
        </section>

        <section className="relative">
          <LoveStoryLevel />
        </section>

        <section className="relative">
          <EngagementLevel />
        </section>

        <section className="relative">
          <EventsLevel />
        </section>

        <section className="relative">
          <GalleryLevel />
        </section>

        <section className="relative">
          <RSVPLevel />
        </section>
      </motion.div>
    </>
  );
}
