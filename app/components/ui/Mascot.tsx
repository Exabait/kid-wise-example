import React from 'react';

const Mascot: React.FC = () => (
  <div className="flex justify-center mb-2 animate-bounce-slow">
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <rect x="8" y="12" width="48" height="40" rx="8" fill="#6EC1E4" />
      <rect x="12" y="16" width="40" height="32" rx="6" fill="#FFD97D" />
      <ellipse cx="24" cy="36" rx="2.5" ry="3" fill="#22223B" />
      <ellipse cx="40" cy="36" rx="2.5" ry="3" fill="#22223B" />
      <path
        d="M28 44c2 1.5 6 1.5 8 0"
        stroke="#22223B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="8"
        y="12"
        width="48"
        height="40"
        rx="8"
        stroke="#FFB085"
        strokeWidth="2"
      />
    </svg>
  </div>
);

export default Mascot;
