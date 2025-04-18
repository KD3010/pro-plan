import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      zoom_in: {
        '0%': { transform: 'scale(0)' },
        '100%': { transform: 'scale(1)' },
      },
      pulse: {
        '0%, 100%': {opacity: "0.5"},
        '50%': { opacity: "1" },
      }
    },
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        zoom_in: 'zoom_in 300ms ease-in-out',
        pulse: "pulse 2s ease-in-out infinite"
      },
      colors: {
        white: "#ffffff",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          500: "#6b7280",
          700: "#374151",
          800: "#1f2937",
        },
        blue: {
          200: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f21",
        "dark-tertiary": "#3b3d40",
        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135",
      },
    },
  },
  plugins: [],
};
export default config;
