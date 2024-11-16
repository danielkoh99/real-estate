import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",

  plugins: [nextui({
    themes: {
      light: {
        layout: {
          // Define any light theme layout tokens here if needed
        },
        colors: {
          primary: "#4E9C81",       // Primary color (e.g., teal green)
          primaryLight: "#75b69c",
          primaryDark: "#366b5a",

          secondary: "#FF6F61",     // Secondary color (coral red)
          secondaryLight: "#ff9589",
          secondaryDark: "#b24943",

          background: "#f7f9fc",    // Light background
          text: "#1f2937",          // Dark text color
          border: "#e0e7ff",        // Border color
          cardBackground: "#ffffff" // Background color for cards
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
