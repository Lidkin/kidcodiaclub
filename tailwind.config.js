/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        dxs: "0.6rem",
        pxs: "0.7rem",
        ldxs: "0.75rem",
        lpxs: "0.9rem",
        dsm: "3vw",
        tsm: "4vw",
        ltsm: "1.5rem",
        ldsm: "1.1rem",
        md: "1.1rem",
      },
      colors: {
        "gray-20": "#F9FCFD",
        "gray-50": "#DADDDD",
        "gray-100": "hsl(185, 37%, 35%)",
        "gray-250": "hsl(185, 37%, 30%)",
        "gray-500": "hsl(186, 37%, 20%)",
        "primary-50": "hsl(189, 93%, 90%)",
        "primary-100": "hsl(189,93%,45%)",
        "primary-300": "hsl(189, 93%, 65%)",
        "primary-500": "hsl(189, 93%, 35%)",
        "secondary-10": "hsl(180, 0%, 100%)",
        "secondary-50": "#FF9D00",
        "secondary-400": "hsl(180, 35%, 45%)",
        "secondary-500": "hsl(180, 35%, 78%)",
      },
      backgroundImage: (theme) => ({
        "javascript": "url(./assets/javascript.gif)",
        "binarycode": "url(./assets/bg-binarycode-md.png)",
        "logic": "url(./assets/logic.gif)",
        "en": "url(./assets/icons/en.png)",
        "ru": "url(./assets/icons/ru.png)"
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        manrope: ["Manrope", "sans-serif"]
      },
      content: {
        kidcodiatext: "url('./assets/bg-kidcodia.png')",
        textkidcodia: "url('./assets/kidcodia-bg.png')",
        smile: "url('./assets/smile.png')",
        tongue: "url('./assets/tongue.png')",
        wonderment: "url(./assets/wonderment.png)",
        enroll: "url('./assets/kidcodia-bg.png')",
        enrollmd: "url('./assets/kidcodia-medium.png')"
      }
    },
    screens: {
      xxxs: "350px",
      xxs: "450px",
      xs: "600px",
      sm: "750px",
      md: "950px",
      mdl: "1200px",
      slg: "1000px",
      mlg: "2000px",
      lg: "1400px",
      xl: "1800px",
      xxl: "2000px"
    }
  },
  plugins: [
  ],
}
