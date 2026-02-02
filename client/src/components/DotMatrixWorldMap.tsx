export default function DotMatrixWorldMap() {
  return (
    <svg
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* White/light gray background */}
      <rect width="1200" height="600" fill="#f5f5f5" />

      {/* Dot matrix world map - simplified representation */}
      {/* North America dots */}
      {[
        { x: 150, y: 120 }, { x: 160, y: 130 }, { x: 170, y: 125 },
        { x: 180, y: 135 }, { x: 190, y: 140 }, { x: 200, y: 130 },
        { x: 210, y: 120 }, { x: 220, y: 125 }, { x: 230, y: 135 },
      ].map((dot, i) => (
        <circle key={`na-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* South America dots */}
      {[
        { x: 200, y: 280 }, { x: 210, y: 290 }, { x: 215, y: 310 },
        { x: 220, y: 330 }, { x: 225, y: 350 }, { x: 215, y: 360 },
      ].map((dot, i) => (
        <circle key={`sa-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* Europe dots */}
      {[
        { x: 480, y: 100 }, { x: 500, y: 110 }, { x: 520, y: 105 },
        { x: 540, y: 115 }, { x: 560, y: 120 }, { x: 580, y: 110 },
        { x: 600, y: 100 }, { x: 620, y: 115 }, { x: 640, y: 125 },
      ].map((dot, i) => (
        <circle key={`eu-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* Africa dots */}
      {[
        { x: 520, y: 240 }, { x: 540, y: 260 }, { x: 560, y: 280 },
        { x: 580, y: 300 }, { x: 600, y: 310 }, { x: 620, y: 300 },
        { x: 640, y: 280 }, { x: 660, y: 260 }, { x: 680, y: 240 },
      ].map((dot, i) => (
        <circle key={`af-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* Middle East dots */}
      {[
        { x: 620, y: 160 }, { x: 640, y: 170 }, { x: 660, y: 165 },
        { x: 680, y: 175 },
      ].map((dot, i) => (
        <circle key={`me-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* Asia dots */}
      {[
        { x: 720, y: 140 }, { x: 740, y: 150 }, { x: 760, y: 145 },
        { x: 780, y: 155 }, { x: 800, y: 160 }, { x: 820, y: 150 },
        { x: 840, y: 140 }, { x: 860, y: 150 }, { x: 880, y: 160 },
        { x: 900, y: 155 }, { x: 920, y: 145 }, { x: 940, y: 150 },
      ].map((dot, i) => (
        <circle key={`as-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* Southeast Asia dots */}
      {[
        { x: 820, y: 220 }, { x: 840, y: 230 }, { x: 860, y: 225 },
        { x: 880, y: 235 }, { x: 900, y: 240 },
      ].map((dot, i) => (
        <circle key={`sea-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* Australia/Oceania dots */}
      {[
        { x: 920, y: 380 }, { x: 940, y: 390 }, { x: 960, y: 385 },
        { x: 980, y: 395 },
      ].map((dot, i) => (
        <circle key={`au-${i}`} cx={dot.x} cy={dot.y} r="3" fill="#2a2a2a" />
      ))}

      {/* Scattered dots for global coverage effect */}
      {[
        { x: 100, y: 200 }, { x: 120, y: 250 }, { x: 280, y: 150 },
        { x: 320, y: 200 }, { x: 380, y: 280 }, { x: 420, y: 320 },
        { x: 700, y: 300 }, { x: 750, y: 350 }, { x: 1000, y: 200 },
        { x: 1050, y: 250 }, { x: 1100, y: 180 },
      ].map((dot, i) => (
        <circle key={`scatter-${i}`} cx={dot.x} cy={dot.y} r="2" fill="#4a4a4a" opacity="0.6" />
      ))}

      {/* Connecting lines for network effect - subtle */}
      <line x1="150" y1="120" x2="200" y2="280" stroke="#999999" strokeWidth="0.5" opacity="0.3" />
      <line x1="230" y1="135" x2="480" y2="100" stroke="#999999" strokeWidth="0.5" opacity="0.3" />
      <line x1="520" y1="240" x2="620" y2="160" stroke="#999999" strokeWidth="0.5" opacity="0.3" />
      <line x1="640" y1="125" x2="720" y2="140" stroke="#999999" strokeWidth="0.5" opacity="0.3" />
      <line x1="900" y1="155" x2="920" y2="380" stroke="#999999" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}
