/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F9FCFD",
        "gray-50": "#DADDDD",
        "gray-100": "hsl(185, 37%, 35%)",
        "gray-500": "hsl(186, 37%, 10%)",
        "primary-100": "hsl(189,93%,45%)",
        "primary-300": "hsl(189, 93%, 65%)",
        "primary-500": "hsl(189, 93%, 35%)",
        "secondary-10": "hsl(180, 0%, 100%)",
        "secondary-400": "hsl(180, 35%, 45%)",
        "secondary-500": "hsl(180, 35%, 78%)",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred": "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        "home-page": "url('./assets/25332.jpg')",
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      content: {
        kidcodiatext: "url('./assets/bg-kidcodia.png')",
        smile: "url('./assets/smile.png')",
        tongue: "url('./assets/tongue.png')",
        wonderment: "url(./assets/wonderment.png)",
      }
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "900px",
      lg: "1300px",
   
    }
  },
  plugins: [],
}