"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", label: "Our first date" },
  { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80", label: "The proposal" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", label: "With families" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", label: "Ring ceremony" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", label: "Pre-wedding shoot" },
  { src: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&q=80", label: "Haldi vibes" },
];

function WaveDividerTop() {
  return (
    <div className="absolute top-0 left-0 w-full z-20 -mt-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,0 L0,40 C300,100 600,0 900,50 C1100,80 1300,20 1440,60 L1440,0 Z" fill="#2d000a" />
      </svg>
    </div>
  );
}

function WaveDividerBottom() {
  return (
    <div className="absolute bottom-0 left-0 w-full z-20 -mb-px">
      <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
        <path d="M0,100 L0,50 C200,0 500,80 800,30 C1000,0 1300,70 1440,40 L1440,100 Z" fill="#2d000a" />
      </svg>
    </div>
  );
}

function PhotoCard({ photo, index }: { photo: typeof PHOTOS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div ref={ref} className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
      style={{ aspectRatio: index % 3 === 0 ? "3/4" : "4/5" }}
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}>
      <motion.img src={photo.src} alt={photo.label} className="w-full h-full object-cover" loading="lazy"
        whileHover={{ scale: 1.15 }} transition={{ duration: 0.6 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0005]/90 via-[#1a0005]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
      <motion.div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-ivory-100 font-serif text-lg drop-shadow-lg">{photo.label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #2d000a 0%, #220008 50%, #2d000a 100%)" }}>
      <WaveDividerTop />
      <div className="blob w-72 h-72 bg-purple-500/8 top-[30%] right-[10%]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <motion.div className="text-center mb-16" initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-gold-400/50 text-xs tracking-[0.5em] uppercase block mb-4">Level 5</span>
          <h2 className="font-display text-5xl sm:text-7xl text-gold-400 mb-4">Memories</h2>
          <div className="w-40 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="text-gold-200/50 text-base sm:text-lg font-light mt-4">Tap a photo to explore.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {PHOTOS.map((photo, i) => <PhotoCard key={photo.label} photo={photo} index={i} />)}
        </div>
      </div>

      <WaveDividerBottom />
    </div>
  );
}
