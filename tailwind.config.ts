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
        gray: {
          50: "#F7F8FA",
          100: "#E6E8EB",
          200: "#AFB2B1",
          500: "#808080",
          800: "#494D4B",
        },
        primary: {
          300: "#9F75FF",
          400: "#9164FA",
          500: "#8257E5",
          800: "#6F48C9",
        },
        secondary: {
          500: "#04D361",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        title: ["var(--font-title)", "sans-serif"],
      },
      transitionProperty: {
        filter: 'filter'
      },
      backgroundImage: {
        'gradient-linear': 'linear-gradient(144deg, rgba(145, 100, 250, 0.80) 0%, rgba(145, 100, 250, 0) 100%)'
      }
    },
  },
  plugins: [],
};
export default config;
