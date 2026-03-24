"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STORY = [
  { year: "2020", emoji: "👀", title: "First Meeting", desc: "A chance encounter at a mutual friend's Diwali party. Eyes met across the room.", side: "left" },
  { year: "2021", emoji: "☕", title: "First Date", desc: "Chai at a quiet café in Connaught Place. Three hours flew by like three minutes.", side: "right" },
  { year: "2022", emoji: "💫", title: "Falling in Love", desc: "Road trips, late-night calls, and the realization that this was something extraordinary.", side: "left" },
  { year: "2023", emoji: "👨‍👩‍👧‍👦", title: "Meeting Families", desc: "Nervous introductions turned into instant bonds. Two families became one.", side: "right" },
  { year: "2024", emoji: "💍", title: "The Proposal", desc: "Under a canopy of fairy lights, Jayesh went down on one knee. She said yes.", side: "left" },
  { year: "2026", emoji: "🎊", title: "The Wedding", desc: "The beginning of forever. 15th August — our interdependence day.", side: "right" },
];

function TimelineItem({ item, index }: { item: typeof STORY[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const isLeft = item.side === "left";

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start mb-12 sm:mb-16 ${isLeft ? "" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: isLeft ? -60 : 60, filter: "blur(8px)" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot */}
      <motion.div
        className={`absolute top-6 w-4 h-4 rounded-full bg-gold-400 border-4 border-maroon-900 shadow-lg z-10 ${isLeft ? "left-4 sm:left-1/2 sm:-translate-x-1/2" : "left-4 sm:left-1/2 sm:-translate-x-1/2"}`}
        animate={isInView ? { scale: [1, 1.4, 1], boxShadow: ["0 0 10px rgba(212,160,23,0.3)", "0 0 25px rgba(212,160,23,0.6)", "0 0 10px rgba(212,160,23,0.3)"] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Content card */}
      <div className={`ml-12 sm:ml-0 sm:w-5/12 ${isLeft ? "sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"}`}>
        <motion.div
          className="glass-card p-5 sm:p-7 group cursor-default"
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(212,160,23,0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-3xl block mb-2"
            animate={isInView ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {item.emoji}
          </motion.span>
          <motion.span
            className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase block mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {item.year}
          </motion.span>
          <h3 className="font-serif text-xl text-ivory-100 mb-2">{item.title}</h3>
          <p className="text-ivory-100/60 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LoveStoryLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.1 });

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />
      <div className="absolute inset-0 mandala-bg opacity-20" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl bg-blush-500/5"
        style={{ top: "10%", right: "10%" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full blur-3xl bg-gold-400/5"
        style={{ bottom: "20%", left: "5%" }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Level 2
          </motion.span>
          <motion.h2
            className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our Love Story
          </motion.h2>
          <motion.div
            className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-5"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.p
            className="text-gold-200/60 text-base sm:text-lg font-light max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Every great love story has its chapters. Here are ours.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{ background: "linear-gradient(to bottom, rgba(212,160,23,0.5), rgba(212,160,23,0.1), transparent)" }}
            initial={{ scaleY: 0 }}
            animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />

          {STORY.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
