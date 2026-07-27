import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#e6f7f5",
          100: "#c0ebe5",
          200: "#96ded3",
          300: "#6bd0c1",
          400: "#41c2af",
          500: "#00aa8a", // Pantaloons Signature Emerald Teal
          600: "#008b74",
          700: "#006d5c",
          800: "#005044",
          900: "#00352d",
        },
        obsidian: "#0f172a",
        ivory: "#f8fafc",
        "ivory-warm": "#ffffff",
        "ivory-soft": "#f1f5f9",
        gold: {
          400: "#00aa8a",
          300: "#41c2af",
          500: "#008b74",
          600: "#006d5c",
          700: "#005044",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(0, 170, 138, 0.15)",
        card: "0 2px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
