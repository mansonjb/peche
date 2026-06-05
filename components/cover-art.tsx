import { cn } from "@/lib/utils";

/* Visuel de couverture généré, déterministe selon le `seed`.
 * Motif "soleil sur l'eau ridée" — chaque récit a sa propre ambiance.
 * Aucune requête réseau : remplaçable plus tard par une vraie photo. */

const PALETTES = [
  { from: "#11262a", to: "#070f11", sun: "#e7ad57", line: "#3f807a" }, // eau turquoise
  { from: "#16240f", to: "#080f07", sun: "#e0a24e", line: "#6a8a4f" }, // rivière forêt
  { from: "#121a2c", to: "#080b14", sun: "#dd9442", line: "#46618f" }, // crépuscule bleu
  { from: "#211522", to: "#0d0910", sun: "#e6a653", line: "#7e5d8a" }, // nuit prune
  { from: "#23190f", to: "#100b06", sun: "#f1ba66", line: "#94774a" }, // terre ambrée
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function wave(y: number, amp: number, phase: number, w = 800) {
  const k = 6;
  let d = `M0 ${y}`;
  for (let i = 0; i < k; i++) {
    const x1 = (w / k) * (i + 0.5);
    const x2 = (w / k) * (i + 1);
    const dir = i % 2 === 0 ? 1 : -1;
    const cy = y + dir * amp * (1 + 0.25 * Math.sin(phase + i));
    d += ` Q${x1} ${cy} ${x2} ${y}`;
  }
  return d;
}

export function CoverArt({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const h = hash(seed);
  const p = PALETTES[h % PALETTES.length];
  const phase = (h % 360) / 57;
  const sunX = 150 + (h % 500);
  const sunY = 175 + ((h >> 3) % 70);
  const gid = `g-${(h % 100000).toString(36)}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.from} />
          <stop offset="100%" stopColor={p.to} />
        </linearGradient>
        <radialGradient id={`${gid}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.sun} stopOpacity="0.95" />
          <stop offset="45%" stopColor={p.sun} stopOpacity="0.35" />
          <stop offset="100%" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gid}-veil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* ciel + eau */}
      <rect width="800" height="600" fill={`url(#${gid}-sky)`} />

      {/* halo de soleil bas sur l'horizon */}
      <circle cx={sunX} cy={sunY} r="230" fill={`url(#${gid}-sun)`} />
      <circle cx={sunX} cy={sunY} r="46" fill={p.sun} opacity="0.9" />

      {/* reflets / rides de l'eau */}
      <g
        stroke={p.line}
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.5"
      >
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 330 + i * 38;
          const amp = 5 + i * 2.4;
          return (
            <path
              key={i}
              d={wave(y, amp, phase + i * 0.6)}
              strokeWidth={1 + i * 0.18}
              opacity={0.7 - i * 0.07}
            />
          );
        })}
      </g>

      {/* trainée de lumière du soleil sur l'eau */}
      <rect
        x={sunX - 26}
        y="320"
        width="52"
        height="280"
        fill={p.sun}
        opacity="0.10"
      />

      {/* voile sombre en bas pour la lisibilité du texte */}
      <rect width="800" height="600" fill={`url(#${gid}-veil)`} />
    </svg>
  );
}
