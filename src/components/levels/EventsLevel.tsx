"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const events = [
  { name: "Haldi Ceremony", date: "13th August", time: "10:00 AM", venue: "Rambagh Palace Gardens", desc: "A splash of turmeric, laughter, and love. Dress code: Yellow & White.", icon: "🌼" },
  { name: "Mehendi & Sangeet", date: "14th August", time: "5:00 PM", venue: "Sheesh Mahal", desc: "Henna, music, dance battles, and endless chai. Dress code: Indian Festive.", icon: "💃" },
  { name: "Wedding Ceremony", date: "15th August", time: "7:00 PM", venue: "Royal Courtyard", desc: "The pheras, the vows, the forever. Dress code: Indian Traditional.", icon: "🏛️" },
  { name: "Reception", date: "15th August", time: "9:00 PM", venue: "Durbar Hall", desc: "Dinner, dancing, and celebrations under chandeliers. Dress code: Formal.", icon: "🥂" },
];

export default function EventsLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />
      <div className="absolute inset-0 mandala-bg opacity-15" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3 sm:mb-4">Level 4</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-3 sm:mb-4">Celebrations</h2>
          <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4 sm:mb-6" />
          <p className="text-gold-200/60 text-sm sm:text-lg font-light">Four days of joy, traditions & unforgettable moments.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.12 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-5 sm:p-8 cursor-pointer group"
            >
              <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">{event.icon}</span>
              <h3 className="font-serif text-xl sm:text-2xl text-ivory-100 mb-2">{event.name}</h3>

              <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 text-xs sm:text-sm">
                <span className="text-gold-400">📅 {event.date}</span>
                <span className="text-gold-400">🕐 {event.time}</span>
              </div>

              <p className="text-gold-400/70 text-xs sm:text-sm mb-2">📍 {event.venue}</p>
              <p className="text-ivory-100/50 text-xs sm:text-sm leading-relaxed">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
