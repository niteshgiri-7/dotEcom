/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        flip:{
          '0%':{transform:'rotateY(0deg)'},
          '12%':{transform:'rotateX(45deg)'},
          '25%':{transform:'rotateX(90deg)'},
          '37%':{transform:'rotateX(135deg)'},
          '50%':{transform:'rotateY(180deg)'},
          '62%':{transform:'rotateX(225deg)'},
          '75%':{transform:'rotateX(270deg)'},
          '87%':{transform:'rotateX(315deg)'},
          '100%':{transform:'rotateY(360deg)'},
        }
      },
      animation:{
        flip:'flip 1s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
