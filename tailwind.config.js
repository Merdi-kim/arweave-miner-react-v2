/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          black:"var(--black)",
          borderColor:"var(--border-default)",
          },
        },
        fontFamily: {
          times: ['Times New Roman"', "serif"],
        }
      },
    }