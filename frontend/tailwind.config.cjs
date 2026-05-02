/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        ocean: "#0F4C75",
        sky: "#3282B8",
        sun: "#FFD166",
        nature: "#2D6A4F",
        sand: "#F8F9FA",
        ink: "#0B1721",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(15, 76, 117, 0.2)",
        soft: "0 16px 40px rgba(11, 23, 33, 0.1)",
      },
      backdropBlur: {
        strong: "20px",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        blink: "blink 1.6s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at 20% 20%, rgba(50, 130, 184, 0.35), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255, 209, 102, 0.4), transparent 50%), linear-gradient(135deg, rgba(15, 76, 117, 0.85), rgba(11, 23, 33, 0.75))",
      },
    },
  },
  plugins: [],
};
