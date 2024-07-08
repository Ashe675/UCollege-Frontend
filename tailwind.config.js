import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#17C1E8", // Color primario claro
          DEFAULT: "#17C1E8", // Color primario por defecto
          dark: "#17C1E8", // Color primario oscuro
        },
        secondary: {
          light: "#172B4D", // Color secundario claro
          DEFAULT: "#172B4D", // Color secundario por defecto
          dark: "#172B4D", // Color secundario oscuro
        },
        tertiary: {
          light: "#730DD9", // Color terciario claro
          DEFAULT: "#730DD9", // Color terciario por defecto
          dark: "#730DD9", // Color terciario oscuro
        },
      },
      backgroundImage: {
        primary: "linear-gradient(to right, #17C1E8, #1175EF)",
      },
    },
    plugins: [
      flowbite.plugin()
    ],
  },
};
