"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EVENTS = [
  { emoji: "🌼", title: "Haldi Ceremony", date: "13th August", time: "10:00 AM", venue: "Rambagh Palace Gardens", desc: "A splash of turmeric, laughter, and love. Dress code: Yellow & White.", color: "#fbbf24" },
  { emoji: "💃", title: "Mehendi & Sangeet", date: "14th August", time: "5:00 PM", venue: "Sheesh Mahal", desc: "Henna, music, dance battles, and endless chai. Dress code: Indian Festive.", color: "#f472b6" },
  { emoji: "🏛️", title: "Wedding Ceremony", date: "15th August", time: "7:00 PM", venue: "Royal Courtyard", desc: "The pheras, the vows, the forever. Dress code: Indian Traditional.", color: "#d4a017" },
  { emoji: "🥂", title: "Reception", date: "15th August", time: "9:00 PM", venue: "Durbar Hall", desc: "Dinner, dancing, and celebrations under chandeliers. Dress code: Formal.", color: "#a78bfa" },
];

function EventCard({ event, index }: { event: typeof EVENTS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 sm:p-8 cursor-pointer group"
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, boxShadow: `0 0 40px ${event.color}20` }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setExpanded(!expanded)}
      style={{ perspective: 1000 }}
    >
      <motion.span
        className="text-4xl block mb-3"
        animate={isInView ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
      >
        {event.emoji}
      </motion.span>
      <h3 className="font-serif text-2xl text-ivory-100 mb-2">{event.title}</h3>
      <div className="flex flex-wrap gap-4 mb-3 text-sm">
        <span style={{ color: event.color }}>📅 {event.date}</span>
        <span style={{ color: event.color }}>🕐 {event.time}</span>
      </div>
      <p className="text-sm mb-2" style={{ color: `${event.color}bb` }}>📍 {event.venue}</p>
      <p className="text-ivory-100/50 text-sm leading-relaxed">{event.desc}</p>

      {/* Expand reveal */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={expanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
      >
        <div className="mt-4 pt-4 border-t border-gold-400/10">
          <p className="text-ivory-100/40 text-xs">Tap again to collapse</p>
        </div>
      </motion.div>

      {/* Glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        style={{ border: `1px solid ${event.color}`, opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function EventsLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />
      <div className="absolute inset-0 mandala-bg opacity-15" />

      {/* Floating lanterns */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-10 sm:w-8 sm:h-12 rounded-full blur-sm"
          style={{
            left: `${10 + i * 11}%`,
            top: `${30 + (i % 3) * 20}%`,
            background: `linear-gradient(to top, ${EVENTS[i % EVENTS.length].color}30, ${EVENTS[i % EVENTS.length].color}08)`,
          }}
          animate={isInView ? {
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 4 + i, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          className="text-center mb-14"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3">Level 4</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-4">Celebrations</h2>
          <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-5" />
          <p className="text-gold-200/60 text-sm sm:text-lg font-light">Four days of joy, traditions & unforgettable moments.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {EVENTS.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
