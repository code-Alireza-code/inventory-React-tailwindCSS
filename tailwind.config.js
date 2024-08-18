/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./src/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
