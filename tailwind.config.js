// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        width: {
        '6.5': '1.625rem', // ✅ Custom width
      },
      screens: {
        '2xsm': '360px',
        'xsm': '480px',
      },
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },

        // ✅ Add success colors
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },

        // ✅ Add error colors
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        "gray-dark": "#1E1E1E",
        "gray-light": "#F5F5F5",
        theme: {
          xs: "#9CA3AF",
          sm: "#6B7280",
        },
      },
      boxShadow: {
        "theme-sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "theme-md": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "theme-lg": "0 10px 15px rgba(0, 0, 0, 0.15)",
        "theme-xl": "0 20px 25px rgba(0, 0, 0, 0.2)",
        datepicker: "0 0 20px rgba(0,0,0,0.15)",
         "slider-navigation": "0 2px 8px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        "theme-xs": ["0.75rem", { lineHeight: "1rem" }],
        "theme-sm": ["0.875rem", { lineHeight: "1.25rem" }],
      },
      zIndex: {
        1: '1',
        99999: '99999',
      },
    },
  },
  plugins: [],
};
