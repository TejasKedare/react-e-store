/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C2D12", // deep rust
          light: "#9A3412",
          dark: "#431407",
        },

        secondary: {
          DEFAULT: "#365314", // olive green
          light: "#4D7C0F",
          dark: "#1A2E05",
        },

        accent: "#CA8A04", // muted gold
        surface: "#FBF5EF", // warm parchment
        background: "#F3ECDC",
        textPrimary: "#2A1E17", // espresso brown
        textMuted: "#6B5C4D",
        danger: "#B91C1C",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Playfair Display", "serif"],
      },

      boxShadow: {
        card: "0 8px 24px rgba(42,30,23,0.12)",
        soft: "0 4px 12px rgba(42,30,23,0.08)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
