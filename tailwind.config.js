/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight:   "-0.025em",
        normal:  "0em",
        wide:    "0.025em",
        wider:   "0.075em",
        widest:  "0.15em",
      },
      fontSize: {
        // Fluid, professional type scale
        "2xs": ["0.65rem",  { lineHeight: "1rem" }],
        xs:    ["0.75rem",  { lineHeight: "1.125rem" }],
        sm:    ["0.875rem", { lineHeight: "1.375rem" }],
        base:  ["1rem",     { lineHeight: "1.6rem" }],
        lg:    ["1.125rem", { lineHeight: "1.75rem" }],
        xl:    ["1.25rem",  { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem",   { lineHeight: "2rem",   letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }],
        "4xl": ["2.25rem",  { lineHeight: "2.5rem",  letterSpacing: "-0.03em" }],
        "5xl": ["3rem",     { lineHeight: "1.1",     letterSpacing: "-0.035em" }],
      },
    },
  },
  plugins: [],
};
