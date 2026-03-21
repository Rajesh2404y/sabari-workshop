/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E53E3E",
          yellow: "#F6C90E",
          dark: "#111111",
          gray: "#1E1E1E",
          light: "#F8F8F8",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.7s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(circle at 20% 50%, rgba(229,62,62,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(246,201,14,0.08) 0%, transparent 40%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      },
      boxShadow: {
        "glow-red": "0 0 20px rgba(229,62,62,0.3)",
        "glow-yellow": "0 0 20px rgba(246,201,14,0.3)",
        "card": "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
