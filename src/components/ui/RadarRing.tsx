import React from 'react';

/**
 * The workbench theme's radar ring (styles in Workbench.css): rings, degree ticks, a sweep that turns once every
 * seven seconds and three marks that light as it passes. Decoration only; it sits behind the hero illustration.
 */

const SECONDS = 7; // one turn of the sweep (wb-turn in Workbench.css)
// Marks: degrees clockwise from the top, distance from the centre. Each lights as the sweep reaches it.
const BLIPS: Array<[number, number]> = [[50, 120], [160, 80], [255, 150]];

const RadarRing: React.FC = () => (
  <svg className="wb-radar" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
    {[186, 124, 62].map((r) => (
      <circle key={r} className="wb-radar-ring" cx="200" cy="200" r={r} />
    ))}
    <path className="wb-radar-ring" d="M14 200H386M200 14V386" />
    {Array.from({ length: 36 }, (_, i) => {
      const a = (i * 10 * Math.PI) / 180;
      const inner = i % 3 === 0 ? 172 : 179;
      return (
        <line
          key={i}
          className="wb-radar-tick"
          x1={200 + Math.sin(a) * inner}
          y1={200 - Math.cos(a) * inner}
          x2={200 + Math.sin(a) * 186}
          y2={200 - Math.cos(a) * 186}
        />
      );
    })}
    <g className="wb-radar-sweep">
      <path d="M200 200L112.7 35.8A186 186 0 0 1 200 14Z" fill="currentColor" opacity="0.13" />
      <line x1="200" y1="200" x2="200" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    </g>
    {BLIPS.map(([degrees, distance]) => {
      const a = (degrees * Math.PI) / 180;
      return (
        <circle
          key={degrees}
          className="wb-radar-blip"
          cx={200 + Math.sin(a) * distance}
          cy={200 - Math.cos(a) * distance}
          r="4"
          style={{ animationDelay: `${((degrees / 360) * SECONDS).toFixed(2)}s` }}
        />
      );
    })}
  </svg>
);

export default RadarRing;
