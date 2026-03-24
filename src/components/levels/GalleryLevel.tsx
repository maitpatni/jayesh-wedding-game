"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", label: "Our first date" },
  { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80", label: "The proposal" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", label: "With families" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", label: "Ring ceremony" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", label: "Pre-wedding shoot" },
  { src: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&q=80", label: "Haldi vibes" },
];

function PhotoCard({ photo, index }: { photo: typeof PHOTOS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
      initial={{ opacity: 0, scale: 0.8, rotate: (index % 2 === 0 ? -3 : 3) }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.img
        src={photo.src}
        alt={photo.label}
        className="w-full h-full object-cover"
        loading="lazy"
        animate={hovered ? { scale: 1.15 } : { scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-maroon-900/90 via-transparent to-transparent"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <span className="text-ivory-100 font-serif text-lg drop-shadow-lg">{photo.label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function GalleryLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          className="text-center mb-14"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3">Level 5</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-4">Memories</h2>
          <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
          <p className="text-gold-200/60 text-sm sm:text-lg font-light">Tap a photo to explore.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.label} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
