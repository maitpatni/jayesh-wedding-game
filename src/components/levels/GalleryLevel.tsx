"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const photos = [
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", caption: "Our first date" },
  { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80", caption: "The proposal" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", caption: "With families" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", caption: "Ring ceremony" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", caption: "Pre-wedding shoot" },
  { src: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=600&q=80", caption: "Haldi vibes" },
];

export default function GalleryLevel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900 via-maroon-800 to-maroon-900" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-gold-400/60 text-xs sm:text-sm tracking-[0.4em] uppercase block mb-3 sm:mb-4">Level 5</span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-400 mb-3 sm:mb-4">Memories</h2>
          <div className="w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
          <p className="text-gold-200/60 text-sm sm:text-lg font-light">Tap a photo to explore.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + index * 0.08 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelected(index)}
              className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-ivory-100 font-serif text-sm sm:text-lg">{photo.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-w-2xl w-full"
          >
            <img src={photos[selected].src} alt={photos[selected].caption} className="w-full rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <p className="text-white font-serif text-lg sm:text-2xl">{photos[selected].caption}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white text-sm hover:bg-white/20 cursor-pointer">✕</button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
