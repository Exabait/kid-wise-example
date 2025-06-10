import React from 'react';

const EmptyState: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center mt-8 text-center">
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className="mb-2"
    >
      <ellipse cx="40" cy="60" rx="28" ry="8" fill="#A8E6CF" />
      <rect x="22" y="24" width="36" height="28" rx="8" fill="#FFD97D" />
      <rect x="26" y="28" width="28" height="20" rx="4" fill="#FFF" />
      <rect
        x="22"
        y="24"
        width="36"
        height="28"
        rx="8"
        stroke="#6EC1E4"
        strokeWidth="2"
      />
    </svg>
    <div className="text-kidwise-muted text-lg bg-white rounded-xl py-1 px-2">
      {message ||
        'Type a word above to get a kid-friendly explanation, a rhyme, and a game idea!'}
    </div>
  </div>
);

export default EmptyState;
