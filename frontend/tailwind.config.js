const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

// tailwind.config.js
module.exports = {
  // 1. Añade las rutas de Flowbite al content array
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      fontFamily: {
        gnr: ['gnr', 'serif'], 
      },
    },
  },
  // 2. Añade el plugin de Flowbite aquí
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
    flowbiteReact
  ],
}