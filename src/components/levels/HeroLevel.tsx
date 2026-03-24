"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ===== Floating petals ===== */
function FloatingPetal({ delay, x, duration, size }: { delay: number; x: number; duration: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: "-30px" }}
      animate={{ y: [0, -900], x: [0, Math.sin(x) * 60], opacity: [0, 0.7, 0.5, 0], rotate: [0, 720] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <div style={{ width: size, height: size * 1.4, background: `radial-gradient(ellipse, rgba(253,184,210,0.7), rgba(253,184,210,0.1))`, borderRadius: "50% 0 50% 0", transform: "rotate(45deg)" }} />
    </motion.div>
  );
}

/* ===== Animated Diya ===== */
function Diya({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.g style={{ transform: `translate(${x}px, ${y}px)` }}>
      <ellipse cx="0" cy="0" rx="8" ry="4" fill="#8B5A2B" />
      <ellipse cx="0" cy="-2" rx="6" ry="3" fill="#DAA520" />
      <motion.path d="M-3,-4 Q-4,-12 0,-16 Q4,-12 3,-4" fill="url(#flameGrad)" initial={{ scaleY: 0.8 }} animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, delay, repeat: Infinity }} style={{ transformOrigin: "0 -4px" }} />
      <motion.circle cx="0" cy="-10" r="8" fill="url(#flameGlow)" initial={{ opacity: 0.3 }} animate={{ opacity: [0.2, 0.5, 0.2], r: [8, 12, 8] }} transition={{ duration: 2, delay, repeat: Infinity }} />
    </motion.g>
  );
}

/* ===== Mandap Structure ===== */
function Mandap() {
  return (
    <g opacity="0.4">
      {/* Pillars */}
      <rect x="-280" y="-120" width="12" height="280" rx="6" fill="#8B4513" opacity="0.6" />
      <rect x="268" y="-120" width="12" height="280" rx="6" fill="#8B4513" opacity="0.6" />
      <rect x="-100" y="-120" width="8" height="280" rx="4" fill="#8B4513" opacity="0.4" />
      <rect x="92" y="-120" width="8" height="280" rx="4" fill="#8B4513" opacity="0.4" />
      {/* Top arch */}
      <path d="M-280,-120 Q-140,-200 0,-210 Q140,-200 280,-120" fill="none" stroke="#DAA520" strokeWidth="4" opacity="0.5" />
      {/* Drape */}
      <path d="M-270,-120 Q-140,-190 0,-200 Q140,-190 270,-120 Q180,-100 120,-140 Q60,-180 0,-190 Q-60,-180 -120,-140 Q-180,-100 -270,-120Z" fill="#800020" opacity="0.2" />
      {/* Marigold garland on arch */}
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13;
        const x = -280 + t * 560;
        const y = -120 + Math.sin(t * Math.PI) * -90 - Math.sin(t * Math.PI) * 10;
        return <circle key={i} cx={x} cy={y} r="5" fill={i % 2 === 0 ? "#FF8C00" : "#FFD700"} opacity="0.5" />;
      })}
    </g>
  );
}

/* ===== 2D Bride ===== */
function Bride({ scrollY }: { scrollY: number }) {
  return (
    <motion.g>
      {/* Body — anarkali */}
      <path d="M-15,30 Q-20,80 -25,160 Q-10,165 0,165 Q10,165 25,160 Q20,80 15,30Z" fill="#E63946" stroke="#DAA520" strokeWidth="1" opacity="0.9" />
      {/* Dupatta */}
      <path d="M-18,25 Q-40,60 -50,100 Q-45,110 -35,100 Q-30,70 -15,30Z" fill="#FFC0CB" opacity="0.4" />
      <path d="M18,25 Q35,55 40,90 Q32,95 25,85 Q20,60 15,30Z" fill="#FFC0CB" opacity="0.4" />
      {/* Neck */}
      <rect x="-5" y="10" width="10" height="22" rx="5" fill="#C68B59" />
      {/* Head */}
      <circle cx="0" cy="-5" r="18" fill="#C68B59" />
      {/* Hair */}
      <path d="M-18,-5 Q-20,-25 -5,-28 Q0,-32 5,-28 Q20,-25 18,-5 Q10,-10 0,-12 Q-10,-10 -18,-5Z" fill="#1a1a1a" />
      {/* Braid */}
      <path d="M15,-8 Q22,0 20,30 Q18,60 15,80" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
      <path d="M15,80 Q12,85 8,80" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      {/* Maang tikka */}
      <circle cx="0" cy="-15" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
      <line x1="0" y1="-12" x2="0" y2="-8" stroke="#DAA520" strokeWidth="1" />
      {/* Eyes */}
      <ellipse cx="-6" cy="-7" rx="3" ry="2" fill="#1a1a1a" />
      <ellipse cx="6" cy="-7" rx="3" ry="2" fill="#1a1a1a" />
      <circle cx="-5" cy="-7" r="0.8" fill="white" />
      <circle cx="7" cy="-7" r="0.8" fill="white" />
      {/* Bindi */}
      <circle cx="0" cy="-12" r="2" fill="#E63946" />
      {/* Nose ring */}
      <circle cx="3" cy="-2" r="1.5" fill="#FFD700" />
      <circle cx="4" cy="1" r="2.5" fill="none" stroke="#FFD700" strokeWidth="0.8" />
      {/* Smile */}
      <path d="M-4,1 Q0,5 4,1" fill="none" stroke="#8B4040" strokeWidth="1" />
      {/* Nose */}
      <path d="M1,-5 Q2,-2 0,0" fill="none" stroke="#C68B59" strokeWidth="1.2" />

      {/* Extended arm for varmala - will animate */}
      <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}>
        <path d="M15,30 Q35,25 50,45 Q45,55 30,50 Q20,45 15,30Z" fill="#C68B59" opacity="0.8" />
        {/* Varmala in hand */}
        <motion.path d="M45,40 Q55,30 60,25" fill="none" stroke="#FF8C00" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <circle cx="47" cy="36" r="3" fill="#FFD700" opacity="0.8" />
        <circle cx="55" cy="30" r="3" fill="#FF8C00" opacity="0.8" />
        <circle cx="59" cy="26" r="3" fill="#FFD700" opacity="0.8" />
      </motion.g>

      {/* Other arm */}
      <path d="M-15,30 Q-35,35 -30,60 Q-25,65 -15,55Z" fill="#C68B59" opacity="0.8" />

      {/* Jewelry on hand */}
      <circle cx="-28" cy="55" r="4" fill="none" stroke="#FFD700" strokeWidth="1.5" />
    </motion.g>
  );
}

/* ===== 2D Groom ===== */
function Groom() {
  return (
    <motion.g>
      {/* Sherwani */}
      <path d="M-12,30 Q-18,80 -20,160 Q-8,165 0,165 Q8,165 20,160 Q18,80 12,30Z" fill="#F5F5DC" stroke="#DAA520" strokeWidth="1" opacity="0.9" />
      {/* Sherwani buttons */}
      {[50, 70, 90, 110].map(y => <circle key={y} cx="0" cy={y} r="2.5" fill="#DAA520" />)}
      {/* Neck */}
      <rect x="-4" y="12" width="8" height="18" rx="4" fill="#C68B59" />
      {/* Head */}
      <circle cx="0" cy="-5" r="17" fill="#C68B59" />
      {/* Turban */}
      <path d="M-18,-5 Q-22,-22 -5,-26 Q0,-30 5,-26 Q22,-22 18,-5 Q10,-10 0,-12 Q-10,-10 -18,-5Z" fill="#800020" />
      <path d="M-16,-8 Q-12,-20 0,-22 Q12,-20 16,-8" fill="#800020" opacity="0.8" />
      {/* Turban jewel */}
      <circle cx="0" cy="-18" r="3" fill="#FFD700" />
      <circle cx="0" cy="-18" r="1.5" fill="#E63946" />
      {/* Sehra */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = -40 + i * 13;
        const rad = (angle * Math.PI) / 180;
        const x = Math.sin(rad) * 20;
        const y = Math.cos(rad) * 20 - 8;
        return <line key={i} x1="0" y1="-16" x2={x} y2={y} stroke="#FFD700" strokeWidth="0.8" opacity="0.6" />;
      })}
      {/* Eyes */}
      <ellipse cx="-5" cy="-7" rx="2.5" ry="2" fill="#1a1a1a" />
      <ellipse cx="5" cy="-7" rx="2.5" ry="2" fill="#1a1a1a" />
      <circle cx="-4" cy="-7" r="0.8" fill="white" />
      <circle cx="6" cy="-7" r="0.8" fill="white" />
      {/* Mustache */}
      <path d="M-4,-1 Q-8,1 -6,2 Q-3,0 0,0 Q3,0 6,2 Q8,1 4,-1" fill="#2a1a0a" opacity="0.7" />
      {/* Smile */}
      <path d="M-3,1 Q0,4 3,1" fill="none" stroke="#8B4040" strokeWidth="1" />
      {/* Nose */}
      <path d="M0,-5 Q1,-2 0,0" fill="none" stroke="#C68B59" strokeWidth="1.2" />

      {/* Extended arm for receiving varmala */}
      <motion.g animate={{ rotate: [3, -3, 3] }} transition={{ duration: 4, repeat: Infinity }}>
        <path d="M12,30 Q30,28 45,42 Q40,52 28,48 Q20,42 12,30Z" fill="#C68B59" opacity="0.8" />
      </motion.g>

      {/* Other arm */}
      <path d="M-12,30 Q-30,32 -28,55 Q-23,58 -15,50Z" fill="#C68B59" opacity="0.8" />

      {/* Kalgi on turban */}
      <motion.g animate={{ y: [-1, 1, -1] }} transition={{ duration: 3, repeat: Infinity }}>
        <path d="M0,-25 L-3,-32 L0,-35 L3,-32Z" fill="#FFD700" opacity="0.7" />
      </motion.g>
    </motion.g>
  );
}

/* ===== Varmala Garlands ===== */
function Varmala({ varmalaY }: { varmalaY: number }) {
  return (
    <motion.g>
      {/* Bride's garland moving toward groom */}
      <motion.path
        d={`M${180 + varmalaY * 0.3},${280 + Math.sin(varmalaY * 0.02) * 5} Q${240 + varmalaY * 0.15},${260 + Math.sin(varmalaY * 0.03) * 8} ${280},${290 + Math.sin(varmalaY * 0.02) * 5}`}
        fill="none"
        stroke="#FF8C00"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Marigold flowers on garland */}
      {Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8;
        const cx = 180 + varmalaY * 0.3 + t * (120 - varmalaY * 0.3);
        const cy = 280 + Math.sin(t * Math.PI) * (-20 + varmalaY * 0.05);
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={4 + Math.sin(i) * 1}
            fill={i % 2 === 0 ? "#FF8C00" : "#FFD700"}
            opacity="0.8"
            animate={{ r: [4, 5.5, 4] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        );
      })}

      {/* Groom's garland moving toward bride */}
      <motion.path
        d={`M${320 - varmalaY * 0.3},${280 + Math.sin(varmalaY * 0.02) * 5} Q${260 - varmalaY * 0.15},${260 + Math.sin(varmalaY * 0.03) * 8} ${220},${290 + Math.sin(varmalaY * 0.02) * 5}`}
        fill="none"
        stroke="#FFD700"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />
      {Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8;
        const cx = 320 - varmalaY * 0.3 - t * (120 - varmalaY * 0.3);
        const cy = 280 + Math.sin(t * Math.PI) * (-20 + varmalaY * 0.05);
        return (
          <motion.circle
            key={`g${i}`}
            cx={cx}
            cy={cy}
            r={4 + Math.sin(i) * 1}
            fill={i % 2 === 0 ? "#FFD700" : "#FF8C00"}
            opacity="0.8"
            animate={{ r: [4, 5.5, 4] }}
            transition={{ duration: 2, delay: i * 0.2 + 0.5, repeat: Infinity }}
          />
        );
      })}
    </motion.g>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function HeroLevel({ started, onStart }: { started: boolean; onStart: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #1a0005 0%, #2d000a 40%, #3d0010 100%)" }}>
      {/* Gradient overlay for organic merge */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-30" style={{ background: "linear-gradient(to bottom, transparent, #3d0010)" }} />

      {/* Mandala background */}
      <div className="absolute inset-0 mandala-bg opacity-20" />

      {/* Floating petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingPetal key={i} delay={i * 0.8 + Math.random() * 2} x={5 + i * 8} duration={8 + Math.random() * 4} size={4 + Math.random() * 4} />
      ))}

      {/* Stars / sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold-400/60"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%` }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
          transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 5, repeat: Infinity }}
        />
      ))}

      {/* ===== ANIMATED SVG SCENE ===== */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ scale: sceneScale }}>
        <svg viewBox="0 0 500 500" className="w-full h-full max-w-3xl" preserveAspectRatio="xMidYMid meet" style={{ filter: "drop-shadow(0 0 40px rgba(212,160,23,0.15))" }}>
          <defs>
            <radialGradient id="flameGrad" cx="50%" cy="100%" r="100%">
              <stop offset="0%" stopColor="#FFF8DC" />
              <stop offset="40%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a0012" />
              <stop offset="100%" stopColor="#2d000a" />
            </linearGradient>
          </defs>

          {/* Ground */}
          <ellipse cx="250" cy="440" rx="220" ry="30" fill="url(#groundGrad)" opacity="0.6" />

          {/* Mandap */}
          <Mandap />

          {/* Bride (left) */}
          <motion.g style={{ transform: "translate(140px, 280px)" }} animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Bride scrollY={0} />
          </motion.g>

          {/* Groom (right) */}
          <motion.g style={{ transform: "translate(360px, 280px)" }} animate={{ y: [0, -3, 0] }} transition={{ duration: 4, delay: 0.5, repeat: Infinity }}>
            <Groom />
          </motion.g>

          {/* Varmala exchange */}
          <Varmala varmalaY={100} />

          {/* Diyas */}
          <Diya x={80} y={420} delay={0} />
          <Diya x={140} y={425} delay={0.3} />
          <Diya x={360} y={425} delay={0.6} />
          <Diya x={420} y={420} delay={0.9} />

          {/* Lotus petals on ground */}
          {Array.from({ length: 6 }).map((_, i) => {
            const x = 120 + i * 50;
            const y = 440 + Math.sin(i * 1.2) * 8;
            return (
              <motion.path
                key={i}
                d={`M${x},${y} Q${x - 4},${y - 8} ${x},${y - 12} Q${x + 4},${y - 8} ${x},${y}`}
                fill={i % 2 === 0 ? "#FF69B4" : "#FFD700"}
                opacity="0.4"
                animate={{ opacity: [0.3, 0.6, 0.3], y: [y, y - 3, y] }}
                transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
              />
            );
          })}

          {/* Incense smoke */}
          <motion.path
            d="M250,420 Q248,400 252,380 Q248,360 250,340"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
            animate={{ d: ["M250,420 Q248,400 252,380 Q248,360 250,340", "M250,420 Q252,398 248,378 Q252,358 250,338", "M250,420 Q248,400 252,380 Q248,360 250,340"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* ===== TEXT OVERLAY ===== */}
      <motion.div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none" style={{ opacity: textOpacity }}>
        <motion.div className="mb-3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <motion.span className="text-gold-400 text-4xl sm:text-5xl block drop-shadow-lg" animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            ॐ
          </motion.span>
        </motion.div>

        <motion.div className="w-24 h-px mx-auto mb-6 bg-gradient-to-r from-transparent via-gold-400 to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />

        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          <span className="font-display text-5xl sm:text-7xl md:text-8xl text-gold-400 block leading-none drop-shadow-2xl">Jayesh</span>
        </motion.h1>

        <motion.div className="my-3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}>
          <motion.span className="font-display text-3xl sm:text-4xl text-blush-400 block" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
            ❤
          </motion.span>
        </motion.div>

        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}>
          <span className="font-display text-5xl sm:text-7xl md:text-8xl text-gold-400 block leading-none drop-shadow-2xl">Shubhami</span>
        </motion.h1>

        <motion.div className="w-32 h-px mx-auto mt-6 mb-4 bg-gradient-to-r from-transparent via-gold-400 to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 1.1 }} />

        <motion.p className="text-gold-200/50 text-xs sm:text-sm tracking-[0.3em] uppercase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          15th August 2026 • Rambagh Palace, Jaipur
        </motion.p>
      </motion.div>

      {/* Bottom organic merge - transitions into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,40 C120,80 240,20 400,50 C560,80 700,30 900,60 C1100,90 1300,40 1440,50 L1440,120 L0,120Z" fill="#2d000a" />
          <path d="M0,60 C180,100 360,40 540,70 C720,100 900,50 1080,80 C1260,110 1440,60 1440,60 L1440,120 L0,120Z" fill="#3d0010" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
