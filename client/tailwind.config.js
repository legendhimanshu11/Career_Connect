

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#3B82F6",     // Tailwind blue-500
        brandGreen: "#22C55E",    // Tailwind green-500
        parrotGreen: "#14f195",   // Custom green
        skyLight: "#a6c1ee",      // light blue for gradient
        pinkSoft: "#fbc2eb",      // soft pink for gradient
        violetMix: "#c084fc",     // violet for vibe
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
}