/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{vue,ts,js}"],
  theme: {
    extend: {
      colors: {
        "ourYellow": "#F2B807",
        "ourRed": "#D91828",
        "ourGrey": "#F2F2F2",
        "ourBlue": "#2678BF"
      }
    },
    screens: {
      'xs': '460px',
      // => @media (min-width: 460px) { ... }

      'sm5': '550px',
      // => @media (min-width: 600px) { ... }

      'sm-600': '600px',
      // => @media (min-width: 600px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
  

}
