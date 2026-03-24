"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const STORY = [
  { year: "2020", emoji: "👀", title: "First Meeting", desc: "A chance encounter at a mutual friend's Diwali party. Eyes met across the room.", side: "left" },
  { year: "2021", emoji: "☕", title: "First Date", desc: "Chai at a quiet café in Connaught Place. Three hours flew by like three minutes.", side: "right" },
  { year: "2022", emoji: "💫", title: "Falling in Love", desc: "Road trips, late-night calls, and the realization that this was something extraordinary.", side: "left" },
  { year: "2023", emoji: "👨‍👩‍👧‍👦", title: "Meeting Families", desc: "Nervous introductions turned into instant bonds. Two families became one.", side: "right" },
  { year: "2024", emoji: "💍", title: "The Proposal", desc: "Under a canopy of fairy lights, Jayesh went down on one knee. She said yes.", side: "left" },
  { year: "2026", emoji: "🎊", title: "The Wedding", desc: "The beginning of forever. 15th August — our interdependence day.", side: "right" },
];

function WaveDividerTop({ color = "#2d000a" }: { color?: string }) {
  return (
    <div className="absolute top-0 left-0 w-full z-20 -mt-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,0 L0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,0 Z" fill={color} />
      </svg>
    </div>
  );
}

function WaveDividerBottom({ color = "#3d0010" }: { color?: string }) {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 -mb-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,100 L0,60 C360,0 600,80 900,30 C1100,0 1300,60 1440,40 L1440,100 Z" fill={color} />
      </svg>
    </div>
  );
}

function TimelineItem({ item, index }: { item: typeof STORY[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const isLeft = item.side === "left";

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start mb-14 sm:mb-20 ${isLeft ? "" : "flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -80 : 80, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline dot with pulse */}
      <div className={`absolute top-8 ${isLeft ? "left-4 sm:left-1/2 sm:-translate-x-1/2" : "left-4 sm:left-1/2 sm:-translate-x-1/2"}`}>
        <motion.div className="w-5 h-5 rounded-full bg-gold-400 relative z-10 shadow-lg"
          animate={isInView ? { scale: [1, 1.3, 1], boxShadow: ["0 0 10px #d4a01740", "0 0 25px #d4a01780", "0 0 10px #d4a01740"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Pulse ring */}
        <motion.div className="absolute inset-0 rounded-full border-2 border-gold-400/30"
          animate={isInView ? { scale: [1, 2.5], opacity: [0.5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Card */}
      <div className={`ml-14 sm:ml-0 sm:w-5/12 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"}`}>
        <motion.div
          className="glass-card p-6 sm:p-8 cursor-default relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          {/* Shimmer on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/5 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8 }}
          />
          <motion.span className="text-4xl block mb-3"
            animate={isInView ? { rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}>
            {item.emoji}
          </motion.span>
          <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase block mb-2">{item.year}</span>
          <h3 className="font-serif text-xl sm:text-2xl text-ivory-100 mb-2">{item.title}</h3>
          <p className="text-ivory-100/60 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LoveStoryLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #2d000a 0%, #3d0010 30%, #2d000a 100%)" }}>
      <WaveDividerTop color="#2d000a" />
      <div className="absolute inset-0 mandala-bg opacity-15" />

      {/* Organic blobs */}
      <div className="blob w-72 h-72 bg-blush-500/10 top-[10%] right-[5%]" />
      <div className="blob w-56 h-56 bg-gold-400/8 bottom-[15%] left-[3%]" style={{ animationDelay: "-5s" }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <motion.div className="text-center mb-16 sm:mb-24"
          initial={{ y: 40, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1 }}>
          <span className="text-gold-400/60 text-xs tracking-[0.5em] uppercase block mb-4">Level 2</span>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-gold-400 mb-5">Our Love Story</h2>
          <motion.div className="w-40 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent"
            initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 0.3 }} />
          <p className="text-gold-200/50 text-base sm:text-lg font-light mt-5 max-w-md mx-auto">Every great love story has its chapters. Here are ours.</p>
        </motion.div>

        {/* Timeline line with animated draw */}
        <div className="relative">
          <motion.div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, #d4a01780, #d4a01720, transparent)" }}
            initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {STORY.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>

      <WaveDividerBottom color="#2d000a" />
    </div>
  );
}
