import React from 'react';

const Spinner: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <div className="flex justify-center my-6">
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 36 36"
    >
      <circle
        cx="18"
        cy="18"
        r="16"
        stroke="#6EC1E4"
        strokeWidth="4"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M34 18a16 16 0 0 1-16 16"
        stroke="#FF8C42"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default Spinner;
