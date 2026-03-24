"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InvitationSeal from "./InvitationSeal";
import Character from "./Character";
import HeroLevel from "./levels/HeroLevel";
import LoveStoryLevel from "./levels/LoveStoryLevel";
import EngagementLevel from "./levels/EngagementLevel";
import EventsLevel from "./levels/EventsLevel";
import GalleryLevel from "./levels/GalleryLevel";
import RSVPLevel from "./levels/RSVPLevel";

const LEVELS = [
  { id: "hero", name: "The Beginning", icon: "🏛️" },
  { id: "love-story", name: "How We Met", icon: "💕" },
  { id: "engagement", name: "The Proposal", icon: "💍" },
  { id: "events", name: "Celebrations", icon: "🎉" },
  { id: "gallery", name: "Memories", icon: "📸" },
  { id: "rsvp", name: "Join Us", icon: "💌" },
];

export default function GameEngine() {
  const [sealOpened, setSealOpened] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [characterPos, setCharacterPos] = useState({ x: 50, y: 75 });
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  // Generate petals
  useEffect(() => {
    const p = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 8 + Math.random() * 8,
      size: 6 + Math.random() * 10,
    }));
    setPetals(p);
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (!sealOpened) return;
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    setScrollProgress(progress);

    const levelHeight = window.innerHeight;
    const level = Math.min(Math.floor(scrollY / levelHeight), LEVELS.length - 1);
    setCurrentLevel(level);

    const levelProgress = (scrollY % levelHeight) / levelHeight;
    setCharacterPos({
      x: 30 + levelProgress * 40,
      y: 70 + Math.sin(levelProgress * Math.PI) * -5,
    });
  }, [sealOpened]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const levelComponents = [
    <HeroLevel key="hero" started={true} onStart={() => {}} />,
    <LoveStoryLevel key="love" />,
    <EngagementLevel key="engage" />,
    <EventsLevel key="events" />,
    <GalleryLevel key="gallery" />,
    <RSVPLevel key="rsvp" />,
  ];

  return (
    <>
      {/* Invitation seal overlay */}
      {!sealOpened && <InvitationSeal onOpen={() => setSealOpened(true)} />}

      {/* Main game world */}
      <div className={`game-world relative transition-opacity duration-1000 ${sealOpened ? "opacity-100" : "opacity-0"}`}>
        {/* Scroll progress bar */}
        {sealOpened && (
          <div className="scroll-progress" style={{ width: `${scrollProgress * 100}%` }} />
        )}

        {/* Level indicator - hidden on small screens */}
        {sealOpened && (
          <motion.div
            className="level-indicator hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={currentLevel}
          >
            {LEVELS[currentLevel].icon} {LEVELS[currentLevel].name}
          </motion.div>
        )}

        {/* Floating petals - fewer on mobile */}
        {sealOpened && petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              "--delay": `${petal.delay}s`,
              "--duration": `${petal.duration}s`,
              width: petal.size,
              height: petal.size,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 20 20" fill="none">
              <ellipse cx="10" cy="10" rx="8" ry="5" fill={petal.id % 2 === 0 ? "#fda4af" : "#fde047"} opacity="0.6" transform={`rotate(${petal.id * 30})`} />
            </svg>
          </div>
        ))}

        {/* Characters - hidden on mobile for performance */}
        <AnimatePresence>
          {sealOpened && (
            <div className="hidden md:block">
              <Character type="groom" x={characterPos.x - 8} y={characterPos.y} scale={0.7} />
              <Character type="bride" x={characterPos.x + 8} y={characterPos.y} scale={0.7} />
            </div>
          )}
        </AnimatePresence>

        {/* Levels */}
        {levelComponents.map((component, index) => (
          <div key={index} className="game-level">
            {component}

            {/* Arrow indicator */}
            {sealOpened && index < LEVELS.length - 1 && index === currentLevel && (
              <div className="game-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4 L12 20 M6 14 L12 20 L18 14" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
