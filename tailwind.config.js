import {colorsApp} from "./src/styles/colors"
import {fontFamilyApp} from "./src/styles/fontFamily"


/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./src/**/*.{ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: colorsApp,
        fontFamily: fontFamilyApp
      },
    },
    plugins: [],
  }