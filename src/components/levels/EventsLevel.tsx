"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EVENTS = [
  { emoji: "🌼", title: "Haldi Ceremony", date: "13th August", time: "10:00 AM", venue: "Rambagh Palace Gardens", desc: "A splash of turmeric, laughter, and love. Dress code: Yellow & White.", color: "#fbbf24" },
  { emoji: "💃", title: "Mehendi & Sangeet", date: "14th August", time: "5:00 PM", venue: "Sheesh Mahal", desc: "Henna, music, dance battles, and endless chai. Dress code: Indian Festive.", color: "#f472b6" },
  { emoji: "🏛️", title: "Wedding Ceremony", date: "15th August", time: "7:00 PM", venue: "Royal Courtyard", desc: "The pheras, the vows, the forever. Dress code: Indian Traditional.", color: "#d4a017" },
  { emoji: "🥂", title: "Reception", date: "15th August", time: "9:00 PM", venue: "Durbar Hall", desc: "Dinner, dancing, and celebrations under chandeliers. Dress code: Formal.", color: "#a78bfa" },
];

function WaveDividerTop() {
  return (
    <div className="absolute top-0 left-0 w-full z-20 -mt-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,0 L0,60 C180,10 360,80 600,40 C840,0 1080,70 1320,30 C1400,20 1440,50 1440,50 L1440,0 Z" fill="#2d000a" />
      </svg>
    </div>
  );
}

function WaveDividerBottom() {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 -mb-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,100 L0,40 C240,90 480,10 720,60 C960,110 1200,30 1440,50 L1440,100 Z" fill="#2d000a" />
      </svg>
    </div>
  );
}

function EventCard({ event, index }: { event: typeof EVENTS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <motion.div ref={ref} className="glass-card p-7 sm:p-8 relative overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -5 }}>
      {/* Glow border */}
      <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${event.color}40, 0 0 30px ${event.color}15` }} />
      <motion.span className="text-4xl block mb-3"
        animate={isInView ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}>
        {event.emoji}
      </motion.span>
      <h3 className="font-serif text-2xl text-ivory-100 mb-2">{event.title}</h3>
      <div className="flex flex-wrap gap-4 mb-3 text-sm">
        <span style={{ color: event.color }}>📅 {event.date}</span>
        <span style={{ color: event.color }}>🕐 {event.time}</span>
      </div>
      <p className="text-sm mb-2" style={{ color: `${event.color}bb` }}>📍 {event.venue}</p>
      <p className="text-ivory-100/50 text-sm leading-relaxed">{event.desc}</p>
    </motion.div>
  );
}

export default function EventsLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #2d000a 0%, #2a0009 50%, #2d000a 100%)" }}>
      <WaveDividerTop />
      <div className="absolute inset-0 mandala-bg opacity-10" />
      <div className="blob w-80 h-80 bg-orange-500/8 top-[20%] left-[10%]" />
      <div className="blob w-64 h-64 bg-pink-500/8 bottom-[20%] right-[5%]" style={{ animationDelay: "-7s" }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <motion.div className="text-center mb-16" initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-gold-400/50 text-xs tracking-[0.5em] uppercase block mb-4">Level 4</span>
          <h2 className="font-display text-5xl sm:text-7xl text-gold-400 mb-4">Celebrations</h2>
          <div className="w-40 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="text-gold-200/50 text-base sm:text-lg font-light mt-4">Four days of joy, traditions & unforgettable moments.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {EVENTS.map((event, i) => <EventCard key={event.title} event={event} index={i} />)}
        </div>
      </div>

      <WaveDividerBottom />
    </div>
  );
}
