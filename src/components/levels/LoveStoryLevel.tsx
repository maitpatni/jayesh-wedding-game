"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { year: "2020", title: "First Meeting", desc: "A chance encounter at a mutual friend's Diwali party. Eyes met across the room.", icon: "👀" },
  { year: "2021", title: "First Date", desc: "Chai at a quiet café in Connaught Place. Three hours flew by like three minutes.", icon: "☕" },
  { year: "2022", title: "Falling in Love", desc: "Road trips, late-night calls, and the realization that this was something extraordinary.", icon: "💫" },
  { year: "2023", title: "Meeting Families", desc: "Nervous introductions turned into instant bonds. Two families became one.", icon: "👨‍👩‍👦‍👦" },
  { year: "2024", title: "The Proposal", desc: "Under a canopy of fairy lights, Jayesh went down on one knee. She said yes.", icon: "💍" },
  { year: "2026", title: "The Wedding", desc: "The beginning of forever. 15th August — our interdependence day.", icon: "🎊" },
];

export default function LoveStoryLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />
      <div className="absolute inset-0 mandala-bg opacity-20" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3 sm:mb-4">Level 2</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-3 sm:mb-4">Our Love Story</h2>
          <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4 sm:mb-6" />
          <p className="text-gold-200/60 text-base sm:text-lg font-light max-w-xl mx-auto">
            Every great love story has its chapters. Here are ours.
          </p>
        </motion.div>

        {/* Timeline - vertical on mobile, zigzag on desktop */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-400/50 via-gold-400/20 to-transparent origin-top"
          />

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
              className="relative flex items-start mb-8 sm:mb-12"
            >
              {/* Mobile: left-aligned dot */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gold-400 border-2 sm:border-4 border-maroon-900 shadow-lg shadow-gold-400/30 z-10 mt-6" />

              {/* Content card */}
              <div className={`ml-10 sm:ml-0 sm:w-5/12 ${index % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:ml-auto sm:pl-8"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-4 sm:p-6 hover:shadow-gold-400/10 hover:shadow-xl transition-shadow duration-500"
                >
                  <span className="text-gold-400 text-xl sm:text-2xl block mb-1 sm:mb-2">{milestone.icon}</span>
                  <span className="text-gold-400 text-xs sm:text-sm font-bold tracking-wider">{milestone.year}</span>
                  <h3 className="font-serif text-lg sm:text-xl text-ivory-100 mt-1 mb-1 sm:mb-2">{milestone.title}</h3>
                  <p className="text-ivory-100/60 text-xs sm:text-sm leading-relaxed">{milestone.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
