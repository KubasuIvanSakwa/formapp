import React, { useEffect, useState } from 'react';

export const AnimatedCheckmark = ({ isComplete }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isComplete) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setAnimate(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <div className="relative w-6 h-6 flex items-center justify-center pointer-events-none">
      <svg width="24" height="24" viewBox="0 0 95 95" className="block">
        {/* The Box */}
        <rect 
          x="30" y="20" width="50" height="50" 
          stroke={isComplete ? "#4ade80" : "#475569"} 
          strokeWidth="5" 
          fill="none" 
          className="transition-colors duration-500"
        />
        
        {/* The Checkmark Path */}
        <g transform="translate(0,-952.36222)">
          <path 
            d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" 
            stroke="#4ade80" 
            strokeWidth="6" 
            fill="none" 
            style={{
              strokeDasharray: 400,
              strokeDashoffset: animate ? 0 : 400,
              opacity: animate ? 1 : 0,
              transition: 'stroke-dashoffset 0.5s ease-in-out, opacity 0.3s'
            }}
          />
        </g>
      </svg>
    </div>
  );
};