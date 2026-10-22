import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { purple: "#8B32E8", magenta: "#D63384", navy: "#15152B", surface: "#FAF8FD", grey: "#687386" }
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg,#FF5E7E 0%,#D63384 45%,#8B32E8 100%)",
        "brand-gradient-soft": "linear-gradient(135deg,#FFE8EE 0%,#F3E8FF 100%)"
      },
      borderRadius: { card: "1.25rem" },
      boxShadow: { card: "0 10px 30px -12px rgba(139,50,232,.25)" },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"], display: ["var(--font-outfit)", "var(--font-inter)", "system-ui", "sans-serif"] },
      keyframes: { marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } } },
      animation: { marquee: "marquee 40s linear infinite" }
    }
  },
  plugins: []
};
export default config;
