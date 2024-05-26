/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontSize: {
      xs: ["0.75rem", "1rem"], // [fontSize, lineHeight]
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.25rem", "1.875rem"],
      xl: ["1.5rem", "2.5rem"],
      "2xl": ["2rem", "3rem"],
      "3xl": ["2.5rem", "4rem"],
      "4xl": ["3rem", "4.5rem"],
    },
    boxShadow: {
      card: "0px 1px 2px rgba(0, 0, 0, 0.16)",
      button: "0px 2px 4px rgba(0, 0, 0, 0.16)",
      menu: "0px 4px 8px rgba(0, 0, 0, 0.16)",
      "card-raised": "0px 8px 16px rgba(0, 0, 0, 0.16)",
      picker: "0px 12px 24px rgba(0, 0, 0, 0.16)",
      modal: "0px 16px 32px rgba(0, 0, 0, 0.16)",
    },
    colors: {
      primary: {
        lighter: "#B3D1E8",
        light: "#3385C1",
        DEFAULT: "#0066B2",
        dark: "#015899",
        darker: "#004382",
      },
      secondary: {
        lighter: "#CBE8F3",
        light: "#75C1DF",
        DEFAULT: "#53B1D7",
        dark: "#339AC3",
        darker: "#0081B5",
      },
      terciary: {
        lighter: "#CFEBEB",
        light: "#80C9CA",
        DEFAULT: "#60BBBD",
        dark: "#3DA1A3",
        darker: "#0D898C",
      },
      black: "#191E23",
      white: "#FFFFFF",
      gray: {
        5: "#F3F3F3",
        30: "#D9D9D9",
        50: "#838688",
        80: "#44484C",
      },
      error: {
        light: "#FCD3DC",
        DEFAULT: "#BA0C2F",
        dark: "#890000",
      },
      success: {
        light: "#B3EAD9",
        DEFAULT: "#00B881",
      },
      orange: {
        light: "#FCCDB3",
        DEFAULT: "#F45800",
      },
      yellow: {
        light: "#FFEAB6",
        DEFAULT: "#FFB80C",
      },
      golden: "#795808",
      transparent: "transparent",
    },
    extend: {
      borderWidth: {
        3: "3px",
      },
      animation: {
        "fade-in": "fadeIn 300ms ease-out",
        "fade-out": "fadeOut 150ms ease-in",
        "slide-from-right": "slideFromRight 300ms ease-out",
        "slide-to-right": "slideToRight 300ms ease-in",
        "grow-n-swrink": "growAndSwrink 3000ms ease-in-out infinite",
        "collapse-up": "collapseUp 300ms ease-in",
        "collapse-down": "collapseDown 300ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideToRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        growAndSwrink: {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.3)" },
          "50%": { transform: "scale(0.7)" },
          "75%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        collapseUp: {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        collapseDown: {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
      },
    },
  },
  plugins: [],
};
