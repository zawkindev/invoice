/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "var(--brand-primary)",
        secondary: "var(--brand-secondary)",

        // Neutral Colors
        dark1: "var(--neutral-dark-1)",
        dark2: "var(--neutral-dark-2)",
        dark3: "var(--neutral-dark-3)",
        light0: "var(--neutral-light-0)",
        light1: "var(--neutral-light-1)",
        light2: "var(--neutral-light-2)",
        light3: "var(--neutral-light-3)",
        light4: "var(--neutral-light-4)",

        // Accent Colors
        danger1: "var(--accent-danger-1)",
        danger2: "var(--accent-danger-2)",

        // Background Colors
        bgLight: "var(--bg-light)",
        bgDark: "var(--bg-dark)",
      },
    },
  },
  plugins: [],
};
