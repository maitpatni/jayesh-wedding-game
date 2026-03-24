"use client";

import { motion } from "framer-motion";

interface CharacterProps {
  type: "groom" | "bride";
  x?: number;
  y?: number;
  scale?: number;
  walking?: boolean;
}

export default function Character({ type, x = 50, y = 70, scale = 1, walking = false }: CharacterProps) {
  const isGroom = type === "groom";

  return (
    <motion.div
      className="character-container"
      style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) scale(${scale})` }}
      animate={{
        x: walking ? [0, 5, -5, 0] : 0,
        y: walking ? [0, -8, -4, 0] : [0, -3, 0],
      }}
      transition={{
        duration: walking ? 0.6 : 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width="120"
        height="180"
        viewBox="0 0 120 180"
        className="character-body drop-shadow-2xl"
      >
        {isGroom ? <GroomSVG /> : <BrideSVG />}
      </svg>
    </motion.div>
  );
}

function GroomSVG() {
  return (
    <>
      {/* Sherwani body */}
      <rect x="30" y="80" width="60" height="70" rx="8" fill="#800020" />
      <rect x="35" y="85" width="50" height="60" rx="6" fill="#6b001a" />
      {/* Gold embroidery */}
      <line x1="60" y1="85" x2="60" y2="145" stroke="#d4a017" strokeWidth="2" />
      <circle cx="60" cy="95" r="4" fill="#d4a017" />
      <circle cx="60" cy="110" r="3" fill="#d4a017" />
      <circle cx="60" cy="125" r="3" fill="#d4a017" />
      {/* Collar */}
      <path d="M40 80 L60 90 L80 80" fill="none" stroke="#d4a017" strokeWidth="2" />

      {/* Head */}
      <circle cx="60" cy="55" r="25" fill="#d4a574" />
      {/* Turban */}
      <ellipse cx="60" cy="38" rx="28" ry="15" fill="#800020" />
      <ellipse cx="60" cy="35" rx="25" ry="12" fill="#6b001a" />
      <path d="M35 38 Q60 25 85 38" fill="none" stroke="#d4a017" strokeWidth="2" />
      {/* Turban ornament */}
      <circle cx="60" cy="28" r="5" fill="#d4a017" />
      <circle cx="60" cy="28" r="3" fill="#fde047" />

      {/* Eyes */}
      <g className="character-blink">
        <ellipse cx="50" cy="55" rx="4" ry="3" fill="#2d000a" />
        <ellipse cx="70" cy="55" rx="4" ry="3" fill="#2d000a" />
        <circle cx="51" cy="54" r="1" fill="white" />
        <circle cx="71" cy="54" r="1" fill="white" />
      </g>

      {/* Smile */}
      <path d="M52 65 Q60 72 68 65" fill="none" stroke="#560015" strokeWidth="2" strokeLinecap="round" />

      {/* Mustache */}
      <path d="M50 62 Q55 58 60 62 Q65 58 70 62" fill="#3d2000" />

      {/* Arms */}
      <rect x="15" y="85" width="15" height="45" rx="7" fill="#800020" />
      <rect x="90" y="85" width="15" height="45" rx="7" fill="#800020" />
      {/* Hands */}
      <circle cx="22" cy="130" r="8" fill="#d4a574" />
      <circle cx="98" cy="130" r="8" fill="#d4a574" />

      {/* Legs */}
      <rect x="35" y="150" width="18" height="25" rx="4" fill="#420010" />
      <rect x="67" y="150" width="18" height="25" rx="4" fill="#420010" />
      {/* Shoes */}
      <ellipse cx="44" cy="177" rx="12" ry="5" fill="#d4a017" />
      <ellipse cx="76" cy="177" rx="12" ry="5" fill="#d4a017" />

      {/* Safa string */}
      <path d="M85 38 Q95 45 90 55" fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <circle cx="90" cy="57" r="3" fill="#d4a017" />
    </>
  );
}

function BrideSVG() {
  return (
    <>
      {/* Lehenga */}
      <path d="M25 90 Q60 85 95 90 L100 175 Q60 180 20 175 Z" fill="#f43f5e" />
      <path d="M30 95 Q60 90 90 95 L95 170 Q60 175 25 170 Z" fill="#e11d48" />
      {/* Lehenga embroidery */}
      <path d="M30 120 Q60 115 90 120" fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d="M28 140 Q60 135 92 140" fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d="M26 160 Q60 155 94 160" fill="none" stroke="#d4a017" strokeWidth="1.5" />

      {/* Choli (blouse) */}
      <path d="M35 70 Q60 65 85 70 L90 95 Q60 90 30 95 Z" fill="#f43f5e" />
      <path d="M40 72 Q60 68 80 72 L83 92 Q60 88 37 92 Z" fill="#e11d48" />

      {/* Dupatta */}
      <path d="M20 75 Q10 100 15 130 Q20 125 25 95 Z" fill="rgba(253, 164, 175, 0.7)" />
      <path d="M100 75 Q110 100 105 130 Q100 125 95 95 Z" fill="rgba(253, 164, 175, 0.7)" />

      {/* Head */}
      <circle cx="60" cy="45" r="22" fill="#d4a574" />

      {/* Hair */}
      <path d="M38 35 Q60 20 82 35 Q85 50 82 60 L38 60 Q35 50 38 35" fill="#1a0a00" />

      {/* Maang tikka */}
      <circle cx="60" cy="28" r="6" fill="#d4a017" />
      <circle cx="60" cy="28" r="4" fill="#fde047" />
      <line x1="60" y1="34" x2="60" y2="42" stroke="#d4a017" strokeWidth="1.5" />

      {/* Eyes */}
      <g className="character-blink">
        <ellipse cx="50" cy="45" rx="4" ry="3" fill="#2d000a" />
        <ellipse cx="70" cy="45" rx="4" ry="3" fill="#2d000a" />
        <circle cx="51" cy="44" r="1" fill="white" />
        <circle cx="71" cy="44" r="1" fill="white" />
      </g>

      {/* Bindi */}
      <circle cx="60" cy="38" r="2.5" fill="#d4a017" />

      {/* Smile */}
      <path d="M52 55 Q60 60 68 55" fill="none" stroke="#560015" strokeWidth="2" strokeLinecap="round" />

      {/* Nose ring */}
      <circle cx="60" cy="50" r="2" fill="none" stroke="#d4a017" strokeWidth="1" />
      <circle cx="58" cy="52" r="1.5" fill="#d4a017" />

      {/* Earrings */}
      <circle cx="37" cy="48" r="4" fill="#d4a017" />
      <circle cx="83" cy="48" r="4" fill="#d4a017" />

      {/* Arms */}
      <path d="M25 75 Q15 95 20 120" fill="none" stroke="#d4a574" strokeWidth="12" strokeLinecap="round" />
      <path d="M95 75 Q105 95 100 120" fill="none" stroke="#d4a574" strokeWidth="12" strokeLinecap="round" />

      {/* Bangles */}
      <circle cx="20" cy="118" r="6" fill="none" stroke="#d4a017" strokeWidth="2" />
      <circle cx="20" cy="118" r="8" fill="none" stroke="#fde047" strokeWidth="1.5" />
      <circle cx="100" cy="118" r="6" fill="none" stroke="#d4a017" strokeWidth="2" />
      <circle cx="100" cy="118" r="8" fill="none" stroke="#fde047" strokeWidth="1.5" />

      {/* Hands */}
      <circle cx="20" cy="122" r="7" fill="#d4a574" />
      <circle cx="100" cy="122" r="7" fill="#d4a574" />

      {/* Mehendi on hands */}
      <circle cx="20" cy="120" r="3" fill="none" stroke="#3d2000" strokeWidth="0.5" />
      <circle cx="100" cy="120" r="3" fill="none" stroke="#3d2000" strokeWidth="0.5" />
    </>
  );
}
