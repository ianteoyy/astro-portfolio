/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      primary: "hsl(var(--color-primary) / <alpha-value>)",
      accent: "hsl(var(--color-accent) / <alpha-value>)",
      text: "hsl(var(--color-text) / <alpha-value>)",
      background: "hsl(var(--color-background) / <alpha-value>)",
      gray: colors.gray,
      black: colors.black,
    },
    fontFamily: {
      sans: ["Lexend", ...defaultTheme.fontFamily.sans],
    },
    boxShadow: {
      sharp: "rgb(207, 245, 189) 3px 3px 0px -1px",
    },
  },
  plugins: [],
};
