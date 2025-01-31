import { heroui } from '@heroui/react'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",

  plugins: [heroui({
    themes: {
      light: {
        layout: {
          // Define any additional layout settings if needed
        },
        colors: {
          primary: "#3A7DFF",        // Modern blue (main brand color)
          primaryLight: "#72A1FF",   // Softer blue for hover effects
          primaryDark: "#295ECF",    // Darker blue for contrast
          secondary: "#FFB400",      // Warm golden accent
          secondaryLight: "#FFD166", // Lighter gold for highlights
          secondaryDark: "#CC8C00",  // Richer gold for depth
          background: "#F9FAFB",     // Soft off-white background
          text: "#1F2937",           // Dark gray for readability
          border: "#E5E7EB",         // Subtle light gray borders
          cardBackground: "#FFFFFF" // Crisp white card background
        }
      },
      dark: {
        layout: {
          // Define any dark theme layout tokens here if needed
        },
        colors: {
          primary: "#73C2FB",       // Primary color for dark mode
          primaryLight: "#9fd4fb",
          primaryDark: "#518db7",

          secondary: "#FFB347",     // Secondary color (orange for contrast)
          secondaryLight: "#ffcc76",
          secondaryDark: "#b27b33",

          background: "#18181b",    // Dark background
          text: "#f1f5f9",          // Light text color
          border: "#4b5563",        // Border color
          cardBackground: "#1e293b" // Card background color
        }
      },
      // You can add additional custom themes here if needed
    },
  })],
}
