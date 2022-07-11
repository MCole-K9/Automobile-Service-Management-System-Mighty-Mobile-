/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{vue,ts,js}"],
  theme: {
    extend: {
      colors: {
        "ourYellow": "#F2B807",
        "ourRed": "#D91828",
        "ourGrey": "F2F2F2",
        "ourBlue": "#2678BF"
      }
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
  

}
