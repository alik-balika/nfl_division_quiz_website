/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        shake: "shake 300ms",
      },
      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-8px)" },
          "50%": { transform: "translateX(8px)" },
          "75%": { transform: "translateX(-4px)" },
          "100%": { transform: "translateX(4px)" },
        },
      },
    },
  },
  plugins: [],
};
