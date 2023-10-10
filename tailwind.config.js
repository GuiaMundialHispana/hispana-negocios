/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      neutral: {
        white: 'white',
        black: 'black',
        transparent: 'transparent',
        20: '#D2D2D2',
        10: '#E9E9E9'
      },
      gray: {
        300: '#d9d9d9',
        100: '#ECECEC',
        20: '#ADADAD',
        10: '#d9d9d9'
      },
      primary: {
        100: '#293451',
        90: '#00DBF2',
        50: '#97FAFF'
      },
      secondary: {
        100: '#8994AF',
      }
    },
  },
  plugins: [],
}
