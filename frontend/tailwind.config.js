/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'spoqa': ['Spoqa Han Sans Neo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
