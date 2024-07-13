/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
          nav:{
            100:"#ad4266",
            200:"#32242E",
            300:"rgba(54, 53, 53, 0.308)"
          }
      },
      backgroundImage: {
        'custom-gradient':'linear-gradient(to right, #4b134f, #c94b4b);',
        'custom-input':'linear-gradient(to right, #a83279, #d38312)',
      },
      fontFamily: {
        title: ["Orbitron", "sans-serif"],
      },
      boxShadow: {
        'custom-shadow': '-1px 0px 19px -3px rgba(0,0,0,0.75)',
        'custom': '0px 8px 56px -2px rgba(0,0,0,0.67)',
      },
    },
  },
  plugins: [],
}

