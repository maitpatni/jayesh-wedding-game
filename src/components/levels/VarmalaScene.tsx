"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ===== Chandelier ===== */
function Chandelier({ x, delay }: { x: string; delay: number }) {
  return (
    <div className="absolute top-0 pointer-events-none" style={{ left: x }}>
      {/* Chain */}
      <div className="w-px h-16 mx-auto" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,160,23,0.3))" }} />
      {/* Body */}
      <motion.div className="relative w-20 h-14 mx-auto"
        animate={{ rotate: [0, 1, -1, 0] }}
        transition={{ duration: 6, delay, repeat: Infinity }}>
        {/* Arms */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = -60 + i * 30;
          return (
            <motion.div key={i} className="absolute w-px top-1 left-1/2"
              style={{
                height: 28,
                transformOrigin: "top center",
                transform: `rotate(${angle}deg)`,
                background: "linear-gradient(to bottom, rgba(212,160,23,0.4), rgba(212,160,23,0.1))",
              }}>
              {/* Candle flame */}
              <motion.div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-3 rounded-full"
                style={{ background: "radial-gradient(ellipse at bottom, #FFD700, #FF8C00 60%, transparent)", boxShadow: "0 0 8px rgba(253,224,71,0.6), 0 0 20px rgba(253,224,71,0.2)" }}
                animate={{ opacity: [0.6, 1, 0.6], scaleY: [0.9, 1.2, 0.9] }}
                transition={{ duration: 1.5, delay: delay + i * 0.2, repeat: Infinity }}
              />
            </motion.div>
          );
        })}
        {/* Glow */}
        <motion.div className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,224,71,0.08), transparent 70%)", filter: "blur(15px)" }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, delay, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

/* ===== Swaying floral string ===== */
function FloralString({ x, count = 12, delay = 0 }: { x: number; count?: number; delay?: number }) {
  return (
    <motion.g
      animate={{ rotate: [0, 2, -2, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity }}
      style={{ transformOrigin: `${x}px 0px` }}
    >
      <line x1={x} y1={0} x2={x} y2={count * 12} stroke="rgba(255,183,100,0.12)" strokeWidth="1" />
      {Array.from({ length: count }).map((_, i) => (
        <motion.circle key={i}
          cx={x + Math.sin(i * 0.8) * 4}
          cy={i * 12 + 6}
          r={2 + (i % 3)}
          fill={i % 3 === 0 ? "rgba(255,140,0,0.5)" : i % 3 === 1 ? "rgba(255,215,0,0.4)" : "rgba(253,184,210,0.35)"}
          animate={{ cx: [x + Math.sin(i * 0.8) * 4, x + Math.sin(i * 0.8 + 0.5) * 4, x + Math.sin(i * 0.8) * 4] }}
          transition={{ duration: 4, delay: delay + i * 0.1, repeat: Infinity }}
        />
      ))}
    </motion.g>
  );
}

/* ===== Petals floating up ===== */
function UpwardPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div key={i} className="absolute" style={{ left: `${10 + i * 11}%`, bottom: "-5%" }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(i * 1.5) * 30, Math.cos(i) * 20],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.4, 0.2, 0],
          }}
          transition={{ duration: 12 + i * 2, delay: i * 1.5, repeat: Infinity, ease: "linear" }}>
          <div style={{
            width: 4 + (i % 3) * 2,
            height: 6 + (i % 3) * 2,
            background: `radial-gradient(ellipse at 30% 30%, ${i % 2 === 0 ? "rgba(253,184,210,0.6)" : "rgba(255,223,186,0.5)"}, transparent)`,
            borderRadius: "50% 0 50% 0",
            transform: "rotate(45deg)",
          }} />
        </motion.div>
      ))}
    </div>
  );
}

/* ===== Main Varmala Scene ===== */
export default function VarmalaScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(180deg, #3d0010 0%, #2a0009 30%, #1f0007 60%, #2d000a 100%)" }}>

      {/* Top wave from previous section */}
      <div className="absolute top-0 left-0 right-0 z-30 -mt-px">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "50px" }}>
          <path d="M0,0 L0,40 C240,0 480,60 720,30 C960,0 1200,50 1440,20 L1440,0 Z" fill="#3d0010" />
        </svg>
      </div>

      {/* Parallax depth layers */}
      <motion.div className="absolute inset-0" style={{ y: parallax1 }}>
        <div className="absolute inset-0 mandala-bg opacity-[0.05]" />
        {/* Warm ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(212,160,23,0.06), transparent 70%)", filter: "blur(60px)" }} />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: parallax2 }}>
        {/* Side warm glows */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,224,71,0.04), transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,184,210,0.04), transparent 70%)", filter: "blur(40px)" }} />
      </motion.div>

      {/* Chandeliers */}
      <Chandelier x="20%" delay={0} />
      <Chandelier x="50%" delay={1.5} />
      <Chandelier x="80%" delay={0.8} />

      {/* Petals */}
      <UpwardPetals />

      {/* ===== SVG SCENE ===== */}
      <motion.div className="relative z-20 w-full max-w-3xl mx-auto px-4" style={{ scale: sceneScale }}>
        <svg viewBox="0 0 600 500" className="w-full" preserveAspectRatio="xMidYMid meet"
          style={{ filter: "drop-shadow(0 0 60px rgba(212,160,23,0.08))" }}>
          <defs>
            <radialGradient id="vFlame" cx="50%" cy="100%" r="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="vGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="vGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d0010" />
              <stop offset="100%" stopColor="#2d000a" />
            </linearGradient>
          </defs>

          {/* Floral strings hanging from top */}
          <FloralString x={120} count={10} delay={0} />
          <FloralString x={200} count={12} delay={0.5} />
          <FloralString x={400} count={12} delay={1} />
          <FloralString x={480} count={10} delay={0.3} />

          {/* Mandap structure — elegant arch */}
          <g opacity="0.35">
            {/* Pillars */}
            <rect x="80" y="40" width="8" height="320" rx="4" fill="#8B4513" opacity="0.5" />
            <rect x="512" y="40" width="8" height="320" rx="4" fill="#8B4513" opacity="0.5" />
            {/* Inner pillars */}
            <rect x="200" y="80" width="5" height="280" rx="2.5" fill="#8B4513" opacity="0.25" />
            <rect x="395" y="80" width="5" height="280" rx="2.5" fill="#8B4513" opacity="0.25" />
            {/* Arch */}
            <path d="M80,40 Q200,-15 300,-5 Q400,-15 520,40" fill="none" stroke="#DAA520" strokeWidth="2.5" opacity="0.4" />
            {/* Drape */}
            <path d="M84,40 Q200,0 300,5 Q400,0 516,40 Q430,25 370,10 Q300,0 230,10 Q170,25 84,40Z"
              fill="#800020" opacity="0.15" />
            {/* Marigold garland on arch */}
            {Array.from({ length: 16 }).map((_, i) => {
              const t = i / 15;
              const x = 80 + t * 440;
              const y = 40 + Math.sin(t * Math.PI) * -50 + Math.sin(t * Math.PI * 3) * -5;
              return (
                <motion.circle key={`ag${i}`} cx={x} cy={y} r={3.5 + (i % 3)}
                  fill={i % 3 === 0 ? "rgba(255,140,0,0.5)" : i % 3 === 1 ? "rgba(255,215,0,0.4)" : "rgba(253,184,210,0.35)"}
                  animate={{ cy: [y, y + Math.sin(i) * 1.5, y] }}
                  transition={{ duration: 4, delay: i * 0.15, repeat: Infinity }}
                />
              );
            })}
          </g>

          {/* Ground / stage */}
          <ellipse cx="300" cy="420" rx="250" ry="25" fill="url(#vGround)" opacity="0.5" />

          {/* ===== BRIDE ===== */}
          <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            {/* Lehenga skirt */}
            <path d="M200,340 Q180,380 170,420 Q200,425 230,420 Q220,380 200,340Z"
              fill="#B22222" opacity="0.85" />
            <path d="M200,340 Q185,375 175,410 Q200,415 225,410 Q215,375 200,340Z"
              fill="#DC143C" opacity="0.3" />
            {/* Lehenga embroidery dots */}
            {[360, 375, 390, 405].map(y => (
              <circle key={`be${y}`} cx={200} cy={y} r="1.5" fill="#FFD700" opacity="0.4" />
            ))}
            {/* Blouse/choli */}
            <path d="M192,290 Q188,310 186,340 Q200,345 214,340 Q212,310 208,290Z"
              fill="#B22222" opacity="0.85" />
            {/* Dupatta */}
            <motion.path
              d="M190,285 Q170,310 165,350 Q160,370 165,380"
              fill="none" stroke="#FFC0CB" strokeWidth="12" strokeLinecap="round" opacity="0.3"
              animate={{ d: [
                "M190,285 Q170,310 165,350 Q160,370 165,380",
                "M190,285 Q168,315 162,350 Q158,375 162,385",
                "M190,285 Q170,310 165,350 Q160,370 165,380",
              ]}}
              transition={{ duration: 5, repeat: Infinity }}
            />
            {/* Neck */}
            <rect x="195" y="268" width="10" height="24" rx="5" fill="#C68B59" />
            {/* Head */}
            <circle cx="200" cy="250" r="18" fill="#C68B59" />
            {/* Hair */}
            <path d="M182,250 Q183,232 195,230 Q200,228 205,230 Q217,232 218,250 Q210,243 200,241 Q190,243 182,250Z"
              fill="#1a1a1a" />
            {/* Braid */}
            <path d="M215,245 Q220,260 218,290 Q216,310 214,320"
              fill="none" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="214" cy="320" rx="3" ry="4" fill="#FFD700" opacity="0.7" />
            {/* Maang tikka */}
            <circle cx="200" cy="235" r="3" fill="#FFD700" opacity="0.8" />
            <line x1="200" y1="238" x2="200" y2="243" stroke="#DAA520" strokeWidth="0.8" />
            {/* Eyes */}
            <ellipse cx="194" cy="250" rx="2.5" ry="1.8" fill="#1a1a1a" />
            <ellipse cx="206" cy="250" rx="2.5" ry="1.8" fill="#1a1a1a" />
            <circle cx="195" cy="250" r="0.7" fill="white" />
            <circle cx="207" cy="250" r="0.7" fill="white" />
            {/* Bindi */}
            <circle cx="200" cy="238" r="1.8" fill="#DC143C" />
            {/* Nose ring */}
            <circle cx="203" cy="254" r="1.2" fill="#FFD700" opacity="0.8" />
            {/* Smile */}
            <path d="M196,257 Q200,260 204,257" fill="none" stroke="#8B4040" strokeWidth="0.8" />
            {/* Extended arm with varmala */}
            <motion.g
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              style={{ transformOrigin: "210px 300px" }}
            >
              <path d="M208,295 Q225,285 245,295 Q240,300 230,298 Q218,300 208,295Z"
                fill="#C68B59" opacity="0.75" />
              {/* Varmala garland */}
              <motion.path
                d="M240,292 Q260,275 280,280 Q300,285 310,290"
                fill="none" stroke="#FF8C00" strokeWidth="4" strokeLinecap="round" opacity="0.7"
                animate={{ d: [
                  "M240,292 Q260,275 280,280 Q300,285 310,290",
                  "M240,292 Q258,272 278,278 Q298,283 308,288",
                  "M240,292 Q260,275 280,280 Q300,285 310,290",
                ]}}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {[250, 260, 270, 280, 290, 300].map((fx, i) => (
                <motion.circle key={`fl${i}`} cx={fx} cy={290 - Math.sin((fx - 240) * 0.03) * 15}
                  r={3} fill={i % 2 === 0 ? "#FFD700" : "#FF8C00"} opacity="0.6"
                  animate={{ r: [3, 4, 3] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.g>
            {/* Other arm */}
            <path d="M192,295 Q175,300 172,320 Q176,325 182,320 Q185,305 192,295Z"
              fill="#C68B59" opacity="0.75" />
            {/* Bangles */}
            <ellipse cx="174" cy="318" rx="6" ry="3" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" />
            <ellipse cx="174" cy="315" rx="5" ry="2.5" fill="none" stroke="#DC143C" strokeWidth="1.2" opacity="0.4" />
          </motion.g>

          {/* ===== GROOM ===== */}
          <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 4, delay: 0.5, repeat: Infinity }}>
            {/* Sherwani bottom */}
            <path d="M400,340 Q385,380 380,420 Q400,425 420,420 Q415,380 400,340Z"
              fill="#F5F5DC" opacity="0.85" />
            {/* Sherwani top */}
            <path d="M392,290 Q388,310 386,340 Q400,345 414,340 Q412,310 408,290Z"
              fill="#F5F5DC" opacity="0.85" />
            {/* Buttons */}
            {[305, 315, 325, 335].map(y => (
              <circle key={`sb${y}`} cx={400} cy={y} r="2" fill="#DAA520" opacity="0.6" />
            ))}
            {/* Neck */}
            <rect x="395" y="268" width="10" height="24" rx="5" fill="#C68B59" />
            {/* Head */}
            <circle cx="400" cy="250" r="17" fill="#C68B59" />
            {/* Turban */}
            <path d="M383,250 Q384,233 394,230 Q400,228 406,230 Q416,233 417,250 Q410,244 400,242 Q390,244 383,250Z"
              fill="#800020" />
            <path d="M385,246 Q390,235 400,233 Q410,235 415,246"
              fill="#800020" opacity="0.7" />
            {/* Turban jewel */}
            <circle cx="400" cy="235" r="2.5" fill="#FFD700" />
            <circle cx="400" cy="235" r="1.2" fill="#DC143C" />
            {/* Sehra */}
            {Array.from({ length: 7 }).map((_, i) => {
              const angle = -35 + i * 11.5;
              const rad = (angle * Math.PI) / 180;
              const ex = 400 + Math.sin(rad) * 18;
              const ey = 235 - Math.cos(rad) * 18;
              return (
                <motion.line key={`sh${i}`} x1="400" y1="233" x2={ex} y2={ey}
                  stroke="#FFD700" strokeWidth="0.7" opacity="0.4"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                />
              );
            })}
            {/* Eyes */}
            <ellipse cx="394" cy="250" rx="2.2" ry="1.6" fill="#1a1a1a" />
            <ellipse cx="406" cy="250" rx="2.2" ry="1.6" fill="#1a1a1a" />
            <circle cx="395" cy="250" r="0.6" fill="white" />
            <circle cx="407" cy="250" r="0.6" fill="white" />
            {/* Mustache */}
            <path d="M396,255 Q392,257 394,258 Q397,256 400,256 Q403,256 406,258 Q408,257 404,255"
              fill="#2a1a0a" opacity="0.5" />
            {/* Smile */}
            <path d="M397,260 Q400,262 403,260" fill="none" stroke="#8B4040" strokeWidth="0.7" />
            {/* Extended arm */}
            <motion.g
              animate={{ rotate: [2, -2, 2] }}
              transition={{ duration: 3.5, delay: 0.3, repeat: Infinity }}
              style={{ transformOrigin: "390px 300px" }}
            >
              <path d="M392,295 Q378,288 360,298 Q365,305 372,302 Q382,300 392,295Z"
                fill="#C68B59" opacity="0.75" />
            </motion.g>
            {/* Other arm */}
            <path d="M408,295 Q422,300 425,320 Q421,325 416,320 Q414,305 408,295Z"
              fill="#C68B59" opacity="0.75" />
          </motion.g>

          {/* ===== DIYAS ON STAGE ===== */}
          {[
            { x: 120, y: 410, d: 0 },
            { x: 160, y: 415, d: 0.3 },
            { x: 440, y: 415, d: 0.6 },
            { x: 480, y: 410, d: 0.9 },
          ].map((diya, i) => (
            <motion.g key={`dy${i}`} style={{ transform: `translate(${diya.x}px, ${diya.y}px)` }}>
              <ellipse cx="0" cy="0" rx="7" ry="3.5" fill="#8B5A2B" opacity="0.7" />
              <ellipse cx="0" cy="-1.5" rx="5" ry="2.5" fill="#DAA520" opacity="0.6" />
              <motion.path d="M-2,-3 Q-3,-10 0,-13 Q3,-10 2,-3"
                fill="url(#vFlame)" opacity="0.7"
                animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, delay: diya.d, repeat: Infinity }}
                style={{ transformOrigin: "0 -3px" }}
              />
              <motion.circle cx="0" cy="-8" r="8"
                fill="url(#vGlow)" opacity="0.3"
                animate={{ opacity: [0.2, 0.5, 0.2], r: [8, 12, 8] }}
                transition={{ duration: 2, delay: diya.d, repeat: Infinity }}
              />
            </motion.g>
          ))}

          {/* Lotus petals on ground */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 160 + i * 38;
            const y = 420 + Math.sin(i * 1.2) * 5;
            return (
              <motion.path key={`lp${i}`}
                d={`M${x},${y} Q${x - 3},${y - 6} ${x},${y - 10} Q${x + 3},${y - 6} ${x},${y}`}
                fill={i % 2 === 0 ? "rgba(253,184,210,0.3)" : "rgba(255,183,100,0.25)"}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
              />
            );
          })}

          {/* Incense smoke */}
          <motion.path fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"
            animate={{ d: [
              "M300,420 Q298,400 302,380 Q298,360 300,340",
              "M300,420 Q302,398 298,378 Q302,358 300,338",
              "M300,420 Q298,400 302,380 Q298,360 300,340",
            ]}}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* ===== SECTION HEADING ===== */}
      <motion.div
        className="absolute bottom-[15%] left-0 right-0 text-center z-30 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="text-gold-400/40 text-[10px] sm:text-xs tracking-[0.5em] uppercase block mb-2">The Sacred Moment</span>
        <h2 className="font-display text-4xl sm:text-6xl text-gold-400 mb-3"
          style={{ textShadow: "0 0 40px rgba(212,160,23,0.15)" }}>
          Varmala
        </h2>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <p className="text-gold-200/30 text-xs sm:text-sm mt-3 max-w-md mx-auto font-light">
          Where two hearts became one under a canopy of flowers and blessings.
        </p>
      </motion.div>

      {/* Bottom wave to next section */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "50px" }}>
          <path d="M0,40 C300,0 600,60 900,20 C1100,0 1300,50 1440,30 L1440,80 L0,80Z" fill="#2d000a" />
        </svg>
      </div>
    </div>
  );
}
