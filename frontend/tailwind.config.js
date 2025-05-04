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
      "light": {
        "colors": {
          "default": {
            "50": "#f9fafb",
            "100": "#f3f4f6",
            "200": "#e5e7eb",
            "300": "#d1d5db",
            "400": "#9ca3af",
            "500": "#6b7280",
            "600": "#4b5563",
            "700": "#374151",
            "800": "#1f2937",
            "900": "#111827",
            "foreground": "#111827",
            "DEFAULT": "#6b7280"
          },
          "primary": {
            "50": "#eff6ff",
            "100": "#dbeafe",
            "200": "#bfdbfe",
            "300": "#93c5fd",
            "400": "#60a5fa",
            "500": "#3b82f6",
            "600": "#2563eb",
            "700": "#1d4ed8",
            "800": "#1e40af",
            "900": "#1e3a8a",
            "foreground": "#ffffff",
            "DEFAULT": "#3b82f6"
          },
          "secondary": {
            "50": "#fff7ed",
            "100": "#ffedd5",
            "200": "#fed7aa",
            "300": "#fdba74",
            "400": "#fb923c",
            "500": "#f97316",
            "600": "#ea580c",
            "700": "#c2410c",
            "800": "#9a3412",
            "900": "#7c2d12",
            "foreground": "#ffffff",
            "DEFAULT": "#f97316"
          },
          "success": {
            "50": "#ecfdf5",
            "100": "#d1fae5",
            "200": "#a7f3d0",
            "300": "#6ee7b7",
            "400": "#34d399",
            "500": "#10b981",
            "600": "#059669",
            "700": "#047857",
            "800": "#065f46",
            "900": "#064e3b",
            "foreground": "#ffffff",
            "DEFAULT": "#10b981"
          },
          "warning": {
            "50": "#fffbeb",
            "100": "#fef3c7",
            "200": "#fde68a",
            "300": "#fcd34d",
            "400": "#fbbf24",
            "500": "#f59e0b",
            "600": "#d97706",
            "700": "#b45309",
            "800": "#92400e",
            "900": "#78350f",
            "foreground": "#111827",
            "DEFAULT": "#f59e0b"
          },
          "danger": {
            "50": "#fef2f2",
            "100": "#fee2e2",
            "200": "#fecaca",
            "300": "#fca5a5",
            "400": "#f87171",
            "500": "#ef4444",
            "600": "#dc2626",
            "700": "#b91c1c",
            "800": "#991b1b",
            "900": "#7f1d1d",
            "foreground": "#ffffff",
            "DEFAULT": "#ef4444"
          },
          "foreground": "#111827",
          "focus": "#2563eb",
          "overlay": "#00000080"
        }
      },
      "dark": {
        "colors": {
          "default": {
            "50": "#111827",
            "100": "#1f2937",
            "200": "#374151",
            "300": "#4b5563",
            "400": "#6b7280",
            "500": "#9ca3af",
            "600": "#d1d5db",
            "700": "#e5e7eb",
            "800": "#f3f4f6",
            "900": "#ffffff",
            "foreground": "#f8fafc",
            "DEFAULT": "#1f2937"
          },
          "primary": {
            "50": "#1e3a8a",
            "100": "#1e40af",
            "200": "#1d4ed8",
            "300": "#2563eb",
            "400": "#3b82f6",
            "500": "#60a5fa",
            "600": "#93c5fd",
            "700": "#bfdbfe",
            "800": "#dbeafe",
            "900": "#eff6ff",
            "foreground": "#ffffff",
            "DEFAULT": "#3b82f6"
          },
          "secondary": {
            "50": "#7c2d12",
            "100": "#9a3412",
            "200": "#c2410c",
            "300": "#ea580c",
            "400": "#f97316",
            "500": "#fb923c",
            "600": "#fdba74",
            "700": "#fed7aa",
            "800": "#ffedd5",
            "900": "#fff7ed",
            "foreground": "#111827",
            "DEFAULT": "#f97316"
          },
          "success": {
            "50": "#064e3b",
            "100": "#065f46",
            "200": "#047857",
            "300": "#059669",
            "400": "#10b981",
            "500": "#34d399",
            "600": "#6ee7b7",
            "700": "#a7f3d0",
            "800": "#d1fae5",
            "900": "#ecfdf5",
            "foreground": "#ffffff",
            "DEFAULT": "#10b981"
          },
          "warning": {
            "50": "#78350f",
            "100": "#92400e",
            "200": "#b45309",
            "300": "#d97706",
            "400": "#f59e0b",
            "500": "#fbbf24",
            "600": "#fcd34d",
            "700": "#fde68a",
            "800": "#fef3c7",
            "900": "#fffbeb",
            "foreground": "#111827",
            "DEFAULT": "#f59e0b"
          },
          "danger": {
            "50": "#7f1d1d",
            "100": "#991b1b",
            "200": "#b91c1c",
            "300": "#dc2626",
            "400": "#ef4444",
            "500": "#f87171",
            "600": "#fca5a5",
            "700": "#fecaca",
            "800": "#fee2e2",
            "900": "#fef2f2",
            "foreground": "#ffffff",
            "DEFAULT": "#ef4444"
          },
          "foreground": "#f8fafc",
          "content1": {
            "DEFAULT": "#1e293b",
            "foreground": "#e5e7eb"
          },
          "content2": {
            "DEFAULT": "#334155",
            "foreground": "#e5e7eb"
          },
          "content3": {
            "DEFAULT": "#475569",
            "foreground": "#e5e7eb"
          },
          "content4": {
            "DEFAULT": "#64748b",
            "foreground": "#e5e7eb"
          },
          "focus": "#3b82f6",
          "overlay": "#000000cc"
        }
      }
    },
    "layout": {
      "disabledOpacity": "0.4"
    }

  })],
}
