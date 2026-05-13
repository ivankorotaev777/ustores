import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "fade-in-up":
          "fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-up-slow":
          "fade-in-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.55s ease-out forwards",
        blob: "blob 22s ease-in-out infinite",
        "scale-in":
          "scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(1.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(4%, -3%) scale(1.04)" },
          "66%": { transform: "translate(-3%, 4%) scale(0.97)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
