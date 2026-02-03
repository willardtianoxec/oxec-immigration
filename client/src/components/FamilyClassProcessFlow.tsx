import React from 'react';

export const FamilyClassProcessFlow: React.FC<{ isEnglish?: boolean }> = ({ isEnglish = false }) => {
  const steps = isEnglish
    ? [
        { title: 'Assessment', subtitle: '评估与签约' },
        { title: 'Documentation', subtitle: '材料收集' },
        { title: 'Submission', subtitle: '递交申请' },
        { title: 'Security Check', subtitle: '体检与背景' },
        { title: 'Arrival', subtitle: '获得身份' },
      ]
    : [
        { title: '评估与签约', subtitle: 'Assessment' },
        { title: '材料收集与公证', subtitle: 'Documentation' },
        { title: '递交申请至 IRCC', subtitle: 'Submission' },
        { title: '体检与背景调查', subtitle: 'Security Check' },
        { title: '获得身份/团聚', subtitle: 'Arrival' },
      ];

  return (
    <div className="w-full py-12 bg-white">
      <svg
        viewBox="0 0 1200 300"
        className="w-full h-auto max-w-4xl mx-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="1200" height="300" fill="none" />

        {/* Steps and Arrows */}
        {steps.map((step, index) => {
          const xPos = 120 + index * 220;
          const yPos = 150;

          return (
            <g key={index}>
              {/* Circle background */}
              <circle cx={xPos} cy={yPos} r="45" fill="#00437f" opacity="0.9" />

              {/* Step number */}
              <text
                x={xPos}
                y={yPos}
                textAnchor="middle"
                dy="0.3em"
                fontSize="24"
                fontWeight="bold"
                fill="white"
              >
                {index + 1}
              </text>

              {/* Step title */}
              <text
                x={xPos}
                y={yPos + 70}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1f3d7f"
              >
                {step.title}
              </text>

              {/* Step subtitle */}
              <text
                x={xPos}
                y={yPos + 90}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {step.subtitle}
              </text>

              {/* Arrow to next step */}
              {index < steps.length - 1 && (
                <>
                  <line
                    x1={xPos + 50}
                    y1={yPos}
                    x2={xPos + 170}
                    y2={yPos}
                    stroke="#00437f"
                    strokeWidth="3"
                  />
                  <polygon
                    points={`${xPos + 170},${yPos} ${xPos + 180},${yPos - 6} ${xPos + 180},${yPos + 6}`}
                    fill="#00437f"
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
