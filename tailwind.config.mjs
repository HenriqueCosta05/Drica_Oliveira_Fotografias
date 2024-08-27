/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  jit: true,
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-out",
        fadeInLeft: "fadeInLeft 1s ease-out",
        fadeInRight: "fadeInRight 1s ease-out",
        zoomIn: "zoomIn 1s ease-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-border-image')
  ],
};
