import * as React from "react";

const Sun: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 128 128" role="img" aria-hidden="true" {...props}>
    {/* face */}
    <circle cx="64" cy="64" r="28" fill="#FFD644" />
    {/* rays */}
    <g fill="#FFD644">
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const x1 = 64 + Math.cos(angle) * 42;
        const y1 = 64 + Math.sin(angle) * 42;
        const x2 = 64 + Math.cos(angle) * 58;
        const y2 = 64 + Math.sin(angle) * 58;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD644" strokeWidth={8} strokeLinecap="round" />;
      })}
    </g>
  </svg>
);

export default React.memo(Sun);
