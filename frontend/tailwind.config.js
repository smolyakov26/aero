import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "1px", 
        disabledOpacity: 0.45, 
        fontSize: {
          tiny: "0.75rem",   // 12px
          small: "0.875rem", // 14px
          medium: "0.9375rem", // 15px
          large: "1.125rem", // 18px
        },
        lineHeight: {
          tiny: "1rem", 
          small: "1.25rem", 
          medium: "1.5rem", 
          large: "1.75rem", 
        },
        radius: {
          small: "6px", 
          medium: "8px", 
          large: "12px", 
        },
        borderWidth: {
          small: "1px", 
          medium: "1px", 
          large: "2px", 
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#00b4ff", // Sky blue from original site
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#00b4ff",
              foreground: "#fff"
            },
            secondary: {
              50: "#f2eafa",
              100: "#e4d4f4",
              200: "#c9a9e9",
              300: "#ae7ede",
              400: "#9353d3",
              500: "#7828c8",
              600: "#6020a0",
              700: "#481878",
              800: "#301050",
              900: "#180828",
              DEFAULT: "#002b5c", // Deep blue from original site
              foreground: "#fff"
            },
            warning: {
              50: "#fefce8",
              100: "#fdedd3",
              200: "#fbdba7",
              300: "#f9c97c",
              400: "#f7b750",
              500: "#f5a524",
              600: "#ff5a1f", // Accent orange from original site
              700: "#936316",
              800: "#62420e",
              900: "#312107",
              DEFAULT: "#ff5a1f",
              foreground: "#fff"
            }
          }
        }
      }
    })
  ]
}
