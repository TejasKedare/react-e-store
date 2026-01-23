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
          DEFAULT: "#2563EB", // blue-600
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#F97316", // orange-500
          light: "#FB923C",
          dark: "#C2410C",
        },
        accent: "#22C55E", // green-500
        danger: "#EF4444",
        muted: "#6B7280",
        surface: "#F9FAFB",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
        soft: "0 2px 8px rgba(0,0,0,0.06)",
      },

      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
