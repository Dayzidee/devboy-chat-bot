// File: /frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // THIS IS THE CORRECTED SECTION
      colors: {
        // We are now telling Tailwind to use the CSS variables we defined in index.css
        // This makes the theme toggle work.
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          // The primary accent color remains static, as it's the same in both themes.
          DEFAULT: "hsl(150 100% 50%)", // #00ff88
          foreground: "hsl(0 0% 5%)", // Text on top of the primary color
          darker: "hsl(150 100% 40%)", // #00cc66 for hover
        },
        // You can add other semantic colors here if needed
        // destructive: { ... },
        // secondary: { ... },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-in": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "slide-in": "slide-in 0.5s ease-out forwards",
      },
    },
  },
  // We need to add a plugin for CSS variable support in some cases, but Vite is smart.
  // We'll add it if necessary. For now, this should work.
  plugins: [],
};
