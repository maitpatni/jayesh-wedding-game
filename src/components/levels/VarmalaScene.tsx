/**
 * VarmalaScene — Cinematic animated varmala moment.
 *
 * ╔══════════════════════════════════════════════════════╗
 * ║  VIDEO / ASSET PLACEHOLDERS                         ║
 * ║                                                      ║
 * ║  1. BACKGROUND VIDEO:                                ║
 * ║     Replace the gradient div with a <video> tag.    ║
 * ║     See VIDEO_BG section below.                     ║
 * ║                                                      ║
 * ║  2. CHARACTER ILLUSTRATIONS:                         ║
 * ║     Replace SVG figures with <Image> components.     ║
 * ║     See CHARACTER_PLACEHOLDER comments.              ║
 * ║                                                      ║
 * ║  3. LOTTIE ANIMATIONS:                               ║
 * ║     Drop lottie JSON into /public/lottie/ and       ║
 * ║     use @lottiefiles/react-lottie-player.           ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * All animations use GPU-friendly transforms + opacity only.
 * Prefers-reduced-motion is respected via useReducedMotion().
 */

"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────
   CHANDELIER — hanging candle light
   ───────────────────────────────────────────── */
function Chandelier({ x, delay }: { x: string; delay: number }) {
  return (
    <div className="absolute top-0 pointer-events-none" style={{ left: x }} aria-hidden="true">
      <div className="w-px h-14 mx-auto" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,160,23,0.25))" }} />
      <motion.div className="relative w-16 h-12 mx-auto"
        animate={{ rotate: [0, 1, -1, 0] }}
        transition={{ duration: 7, delay, repeat: Infinity }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = -55 + i * 27.5;
          return (
            <motion.div key={i} className="absolute w-px top-1 left-1/2" style={{
              height: 24, transformOrigin: "top center", transform: `rotate(${angle}deg)`,
              background: "linear-gradient(to bottom, rgba(212,160,23,0.35), rgba(212,160,23,0.08))",
            }}>
              <motion.div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2.5 rounded-full"
                style={{ background: "radial-gradient(ellipse at bottom, #FFD700, #FF8C00 60%, transparent)", boxShadow: "0 0 6px rgba(253,224,71,0.5), 0 0 16px rgba(253,224,71,0.15)" }}
                animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.9, 1.15, 0.9] }}
                transition={{ duration: 1.8, delay: delay + i * 0.2, repeat: Infinity }} />
            </motion.div>
          );
        })}
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(253,224,71,0.06), transparent 65%)", filter: "blur(12px)" }} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SWAYING FLORAL STRING
   ───────────────────────────────────────────── */
function FloralString({ x, count = 10, delay = 0 }: { x: number; count?: number; delay?: number }) {
  return (
    <motion.g animate={{ rotate: [0, 1.5, -1.5, 0] }}
      transition={{ duration: 7, delay, repeat: Infinity }}
      style={{ transformOrigin: `${x}px 0px` }}>
      <line x1={x} y1={0} x2={x} y2={count * 11} stroke="rgba(255,183,100,0.1)" strokeWidth="0.8" />
      {Array.from({ length: count }).map((_, i) => (
        <motion.circle key={i}
          cx={x + Math.sin(i * 0.7) * 3} cy={i * 11 + 5}
          r={1.8 + (i % 3)}
          fill={i % 3 === 0 ? "rgba(255,140,0,0.45)" : i % 3 === 1 ? "rgba(255,215,0,0.35)" : "rgba(253,184,210,0.3)"}
          animate={{ cx: [x + Math.sin(i * 0.7) * 3, x + Math.sin(i * 0.7 + 0.4) * 3, x + Math.sin(i * 0.7) * 3] }}
          transition={{ duration: 4.5, delay: delay + i * 0.08, repeat: Infinity }} />
      ))}
    </motion.g>
  );
}

/* ─────────────────────────────────────────────
   UPWARD PETALS
   ───────────────────────────────────────────── */
function UpwardPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <motion.div key={i} className="absolute" style={{ left: `${12 + i * 12}%`, bottom: "-4%" }}
          animate={{ y: [0, -750], x: [0, Math.sin(i * 1.5) * 25, Math.cos(i) * 15], rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)], opacity: [0, 0.35, 0.15, 0] }}
          transition={{ duration: 13 + i * 2, delay: i * 1.8, repeat: Infinity, ease: "linear" }}>
          <div style={{
            width: 4 + (i % 3) * 2, height: 5 + (i % 3) * 2,
            background: `radial-gradient(ellipse at 30% 30%, ${i % 2 === 0 ? "rgba(253,184,210,0.55)" : "rgba(255,223,186,0.45)"}, transparent)`,
            borderRadius: "50% 0 50% 0", transform: "rotate(45deg)",
          }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG BRIDE — stylized figure
   ───────────────────────────────────────────── */
function BrideFigure() {
  return (
    <motion.g animate={{ y: [0, -1.5, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
      {/* Lehenga */}
      <path d="M200,340 Q180,380 172,420 Q200,425 228,420 Q220,380 200,340Z" fill="#B22222" opacity="0.8" />
      <path d="M200,340 Q185,375 177,412 Q200,415 223,412 Q215,375 200,340Z" fill="#DC143C" opacity="0.25" />
      {[358, 372, 386, 400].map(y => <circle key={y} cx={200} cy={y} r="1.3" fill="#FFD700" opacity="0.35" />)}
      {/* Blouse */}
      <path d="M193,292 Q189,312 187,340 Q200,344 213,340 Q211,312 207,292Z" fill="#B22222" opacity="0.8" />
      {/* Dupatta — animated sway */}
      <motion.path fill="none" stroke="#FFC0CB" strokeWidth="10" strokeLinecap="round" opacity="0.25"
        d="M191,288 Q172,312 167,350 Q163,370 167,380"
        animate={{ d: ["M191,288 Q172,312 167,350 Q163,370 167,380", "M191,288 Q170,316 164,352 Q160,375 164,385", "M191,288 Q172,312 167,350 Q163,370 167,380"] }}
        transition={{ duration: 5.5, repeat: Infinity }} />
      {/* Neck */}
      <rect x="196" y="270" width="8" height="22" rx="4" fill="#C68B59" />
      {/* Head */}
      <circle cx="200" cy="252" r="16" fill="#C68B59" />
      {/* Hair */}
      <path d="M184,252 Q185,236 196,234 Q200,232 204,234 Q215,236 216,252 Q209,246 200,244 Q191,246 184,252Z" fill="#1a1a1a" />
      {/* Braid */}
      <path d="M213,247 Q217,262 216,288 Q214,306 212,314" fill="none" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round" />
      <ellipse cx="212" cy="314" rx="2.5" ry="3.5" fill="#FFD700" opacity="0.6" />
      {/* Maang tikka */}
      <circle cx="200" cy="238" r="2.5" fill="#FFD700" opacity="0.75" />
      {/* Eyes */}
      <ellipse cx="195" cy="252" rx="2.2" ry="1.5" fill="#1a1a1a" />
      <ellipse cx="205" cy="252" rx="2.2" ry="1.5" fill="#1a1a1a" />
      <circle cx="196" cy="252" r="0.6" fill="white" />
      <circle cx="206" cy="252" r="0.6" fill="white" />
      {/* Bindi */}
      <circle cx="200" cy="240" r="1.5" fill="#DC143C" />
      {/* Smile */}
      <path d="M197,258 Q200,261 203,258" fill="none" stroke="#8B4040" strokeWidth="0.7" />
      {/* Arm with varmala */}
      <motion.g animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 3.5, repeat: Infinity }}
        style={{ transformOrigin: "210px 298px" }}>
        <path d="M208,295 Q224,287 242,296 Q238,300 228,298 Q218,300 208,295Z" fill="#C68B59" opacity="0.7" />
        {/* Varmala garland */}
        <motion.path fill="none" stroke="#FF8C00" strokeWidth="3.5" strokeLinecap="round" opacity="0.65"
          d="M238,293 Q256,278 276,282 Q296,286 308,291"
          animate={{ d: ["M238,293 Q256,278 276,282 Q296,286 308,291", "M238,293 Q254,275 274,280 Q294,284 306,289", "M238,293 Q256,278 276,282 Q296,286 308,291"] }}
          transition={{ duration: 3.5, repeat: Infinity }} />
        {[248, 258, 268, 278, 288, 298].map((fx, i) => (
          <motion.circle key={i} cx={fx} cy={291 - Math.sin((fx - 238) * 0.028) * 14}
            r={2.5} fill={i % 2 === 0 ? "#FFD700" : "#FF8C00"} opacity="0.55"
            animate={{ r: [2.5, 3.5, 2.5] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} />
        ))}
      </motion.g>
      {/* Other arm */}
      <path d="M192,295 Q176,300 173,318 Q177,322 182,318 Q185,306 192,295Z" fill="#C68B59" opacity="0.7" />
      {/* Bangles */}
      <ellipse cx="175" cy="316" rx="5.5" ry="2.5" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="175" cy="313" rx="4.5" ry="2" fill="none" stroke="#DC143C" strokeWidth="1" opacity="0.35" />
    </motion.g>
  );
}

/* ─────────────────────────────────────────────
   SVG GROOM — stylized figure
   ───────────────────────────────────────────── */
function GroomFigure() {
  return (
    <motion.g animate={{ y: [0, -1.5, 0] }} transition={{ duration: 4.5, delay: 0.5, repeat: Infinity }}>
      {/* Sherwani */}
      <path d="M400,340 Q386,380 382,420 Q400,425 418,420 Q414,380 400,340Z" fill="#F5F5DC" opacity="0.8" />
      <path d="M393,292 Q389,312 387,340 Q400,344 413,340 Q411,312 407,292Z" fill="#F5F5DC" opacity="0.8" />
      {[308, 318, 328].map(y => <circle key={y} cx={400} cy={y} r="1.8" fill="#DAA520" opacity="0.5" />)}
      {/* Neck */}
      <rect x="396" y="270" width="8" height="22" rx="4" fill="#C68B59" />
      {/* Head */}
      <circle cx="400" cy="252" r="15" fill="#C68B59" />
      {/* Turban */}
      <path d="M385,252 Q386,236 395,234 Q400,232 405,234 Q414,236 415,252 Q409,246 400,244 Q391,246 385,252Z" fill="#800020" />
      <path d="M387,248 Q392,238 400,236 Q408,238 413,248" fill="#800020" opacity="0.65" />
      {/* Turban jewel */}
      <circle cx="400" cy="238" r="2.2" fill="#FFD700" />
      <circle cx="400" cy="238" r="1" fill="#DC143C" />
      {/* Sehra */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (-30 + i * 12) * Math.PI / 180;
        return <motion.line key={i} x1="400" y1="236" x2={400 + Math.sin(a) * 16} y2={236 - Math.cos(a) * 16}
          stroke="#FFD700" strokeWidth="0.6" opacity="0.35"
          animate={{ opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }} />;
      })}
      {/* Eyes */}
      <ellipse cx="395" cy="252" rx="2" ry="1.4" fill="#1a1a1a" />
      <ellipse cx="405" cy="252" rx="2" ry="1.4" fill="#1a1a1a" />
      <circle cx="396" cy="252" r="0.5" fill="white" />
      <circle cx="406" cy="252" r="0.5" fill="white" />
      {/* Mustache */}
      <path d="M397,256 Q393,258 395,259 Q398,257 400,257 Q402,257 405,259 Q407,258 403,256" fill="#2a1a0a" opacity="0.45" />
      {/* Smile */}
      <path d="M398,261 Q400,263 402,261" fill="none" stroke="#8B4040" strokeWidth="0.6" />
      {/* Arm receiving garland */}
      <motion.g animate={{ rotate: [1.5, -1.5, 1.5] }} transition={{ duration: 3.5, delay: 0.3, repeat: Infinity }}
        style={{ transformOrigin: "391px 298px" }}>
        <path d="M393,295 Q379,289 362,298 Q367,304 373,301 Q383,299 393,295Z" fill="#C68B59" opacity="0.7" />
      </motion.g>
      {/* Other arm */}
      <path d="M407,295 Q421,300 424,318 Q420,322 415,318 Q413,306 407,295Z" fill="#C68B59" opacity="0.7" />
    </motion.g>
  );
}

/* ─────────────────────────────────────────────
   MANDAP — floral arch structure
   ───────────────────────────────────────────── */
function MandapArch() {
  return (
    <g opacity="0.3" aria-hidden="true">
      {/* Pillars */}
      <rect x="85" y="45" width="7" height="310" rx="3.5" fill="#8B4513" opacity="0.45" />
      <rect x="508" y="45" width="7" height="310" rx="3.5" fill="#8B4513" opacity="0.45" />
      <rect x="210" y="85" width="4" height="270" rx="2" fill="#8B4513" opacity="0.2" />
      <rect x="386" y="85" width="4" height="270" rx="2" fill="#8B4513" opacity="0.2" />
      {/* Arch */}
      <path d="M85,45 Q200,-10 300,0 Q400,-10 515,45" fill="none" stroke="#DAA520" strokeWidth="2" opacity="0.35" />
      {/* Drape */}
      <path d="M88,45 Q200,5 300,10 Q400,5 512,45 Q430,28 370,12 Q300,2 230,12 Q170,28 88,45Z" fill="#800020" opacity="0.12" />
      {/* Marigold garland on arch */}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13;
        const x = 85 + t * 430;
        const y = 45 + Math.sin(t * Math.PI) * -48 + Math.sin(t * Math.PI * 3) * -4;
        return <motion.circle key={i} cx={x} cy={y} r={3 + (i % 3)}
          fill={i % 3 === 0 ? "rgba(255,140,0,0.45)" : i % 3 === 1 ? "rgba(255,215,0,0.35)" : "rgba(253,184,210,0.3)"}
          animate={{ cy: [y, y + Math.sin(i) * 1.2, y] }}
          transition={{ duration: 4.5, delay: i * 0.12, repeat: Infinity }} />;
      })}
    </g>
  );
}

/* ─────────────────────────────────────────────
   DIYAS — oil lamps
   ───────────────────────────────────────────── */
function Diyas() {
  const diyas = [
    { x: 125, y: 412, d: 0 },
    { x: 165, y: 416, d: 0.3 },
    { x: 435, y: 416, d: 0.6 },
    { x: 475, y: 412, d: 0.9 },
  ];
  return (
    <g aria-hidden="true">
      {diyas.map((diya, i) => (
        <motion.g key={i} style={{ transform: `translate(${diya.x}px, ${diya.y}px)` }}>
          <ellipse cx="0" cy="0" rx="6" ry="3" fill="#8B5A2B" opacity="0.6" />
          <ellipse cx="0" cy="-1.5" rx="4.5" ry="2" fill="#DAA520" opacity="0.5" />
          <motion.path d="M-2,-3 Q-2.5,-9 0,-12 Q2.5,-9 2,-3" fill="url(#flameGrad)" opacity="0.65"
            animate={{ scaleY: [0.85, 1.15, 0.85], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 1.6, delay: diya.d, repeat: Infinity }}
            style={{ transformOrigin: "0 -3px" }} />
          <motion.circle cx="0" cy="-7" r="7" fill="url(#flameGlow)" opacity="0.25"
            animate={{ opacity: [0.15, 0.4, 0.15], r: [7, 10, 7] }}
            transition={{ duration: 2, delay: diya.d, repeat: Infinity }} />
        </motion.g>
      ))}
    </g>
  );
}

/* ─────────────────────────────────────────────
   MAIN VARMALA SCENE COMPONENT
   ───────────────────────────────────────────── */
export default function VarmalaScene() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax1 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 1.01]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(180deg, #3d0010 0%, #2a0009 35%, #1f0007 65%, #2d000a 100%)" }}>

      {/* ── Top wave from previous section ── */}
      <div className="absolute top-0 left-0 right-0 z-30 -mt-px">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "45px" }}>
          <path d="M0,0 L0,35 C240,0 480,55 720,25 C960,0 1200,45 1440,18 L1440,0 Z" fill="#3d0010" />
        </svg>
      </div>

      {/* ╔═══════════════════════════════════════╗
          ║  VIDEO_BG PLACEHOLDER                 ║
          ║  Replace the parallax divs below      ║
          ║  with a <video> element for looping   ║
          ║  cinematic background footage.        ║
          ╚═══════════════════════════════════════╝ */}
      {/* <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        poster="/images/varmala-poster.jpg"
      >
        <source src="/videos/varmala-bg.webm" type="video/webm" />
        <source src="/videos/varmala-bg.mp4" type="video/mp4" />
      </video> */}

      {/* ── Parallax depth layers ── */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: parallax1 }}>
        <div className="absolute inset-0 mandala-bg opacity-[0.04]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.05), transparent 65%)", filter: "blur(50px)" }} />
      </motion.div>

      {/* ── Chandeliers ── */}
      {!prefersReducedMotion && (
        <>
          <Chandelier x="22%" delay={0} />
          <Chandelier x="50%" delay={1.5} />
          <Chandelier x="78%" delay={0.8} />
        </>
      )}

      {/* ── Petals ── */}
      {!prefersReducedMotion && <UpwardPetals />}

      {/* ── Main SVG scene ── */}
      <motion.div className="relative z-20 w-full max-w-3xl mx-auto px-4"
        style={prefersReducedMotion ? {} : { scale: sceneScale }}>
        {/*
          ╔═══════════════════════════════════════╗
          ║  CHARACTER_PLACEHOLDER                 ║
          ║  To use real illustrations, replace   ║
          ║  <BrideFigure> and <GroomFigure> with ║
          ║  <image> SVG elements or <Image> tags ║
          ╚═══════════════════════════════════════╝
        */}
        <svg viewBox="0 0 600 500" className="w-full" preserveAspectRatio="xMidYMid meet"
          style={{ filter: "drop-shadow(0 0 50px rgba(212,160,23,0.06))" }}
          role="img" aria-label="Bride and groom exchanging garlands at the varmala ceremony">
          <defs>
            <radialGradient id="flameGrad" cx="50%" cy="100%" r="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="vGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d0010" />
              <stop offset="100%" stopColor="#2d000a" />
            </linearGradient>
          </defs>

          {/* Floral strings */}
          {!prefersReducedMotion && (
            <>
              <FloralString x={130} count={9} delay={0} />
              <FloralString x={210} count={11} delay={0.5} />
              <FloralString x={390} count={11} delay={1} />
              <FloralString x={470} count={9} delay={0.3} />
            </>
          )}

          {/* Mandap arch */}
          <MandapArch />

          {/* Ground */}
          <ellipse cx="300" cy="420" rx="240" ry="22" fill="url(#vGround)" opacity="0.45" />

          {/* Bride (left) */}
          {/* CHARACTER_PLACEHOLDER: Replace with <image href="/images/bride.png" x="160" y="240" width="80" height="180" /> */}
          <BrideFigure />

          {/* Groom (right) */}
          {/* CHARACTER_PLACEHOLDER: Replace with <image href="/images/groom.png" x="370" y="240" width="70" height="180" /> */}
          <GroomFigure />

          {/* Diyas */}
          <Diyas />

          {/* Lotus petals on ground */}
          {Array.from({ length: 7 }).map((_, i) => {
            const x = 170 + i * 40;
            const y = 420 + Math.sin(i * 1.2) * 4;
            return (
              <motion.path key={i}
                d={`M${x},${y} Q${x - 2.5},${y - 5} ${x},${y - 9} Q${x + 2.5},${y - 5} ${x},${y}`}
                fill={i % 2 === 0 ? "rgba(253,184,210,0.25)" : "rgba(255,183,100,0.2)"}
                animate={prefersReducedMotion ? {} : { opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }} />
            );
          })}

          {/* Incense smoke */}
          <motion.path fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1.2"
            d="M300,420 Q298,400 302,380 Q298,360 300,340"
            animate={prefersReducedMotion ? {} : { d: ["M300,420 Q298,400 302,380 Q298,360 300,340", "M300,420 Q302,398 298,378 Q302,358 300,338", "M300,420 Q298,400 302,380 Q298,360 300,340"] }}
            transition={{ duration: 4, repeat: Infinity }} />
        </svg>
      </motion.div>

      {/* ── Section heading ── */}
      <motion.div className="absolute bottom-[14%] left-0 right-0 text-center z-30 px-4"
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}>
        <span className="text-gold-400/35 text-[10px] sm:text-xs tracking-[0.5em] uppercase block mb-2">The Sacred Moment</span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400 mb-3"
          style={{ textShadow: "0 0 30px rgba(212,160,23,0.1)" }}>Varmala</h2>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400/35 to-transparent" />
        <p className="text-gold-200/25 text-xs sm:text-sm mt-3 max-w-sm mx-auto font-light">
          Where two hearts became one under a canopy of flowers and blessings.
        </p>
      </motion.div>

      {/* ── Bottom wave to next section ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "45px" }}>
          <path d="M0,35 C300,0 600,55 900,18 C1100,0 1300,45 1440,25 L1440,70 L0,70Z" fill="#2d000a" />
        </svg>
      </div>
    </div>
  );
}
