module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './prompts/**/*.{js,ts,jsx,tsx,md}'],
  theme: {
    extend: {
      colors: {
        kidwise: {
          blue: '#6EC1E4', // Soft sky blue
          green: '#A8E6CF', // Pastel green
          yellow: '#FFD97D', // Warm yellow
          orange: '#FFB085', // Soft orange
          pink: '#FFB7B2', // Gentle pink
          purple: '#B5A7F7', // Light purple
          background: '#F9FAFB', // Very light gray background
          surface: '#FFFFFF', // Card/foreground
          accent: '#FF8C42', // Accent orange
          text: '#22223B', // Main text
          muted: '#9A8C98', // Muted text
        },
      },
    },
  },
  plugins: [],
};
