import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  plugins: [
    flowbite.plugin(),
    createThemes(
      {
        charmander: {
          background: "#FAF2F2",
          sidebar: "#CE8A8A",
          text: "#000000",
          header: "#000000",
          form_field: "#EFD8D8",
          mobile_nav: "#CE8A8A",
          plot_drawer: "#EFD8D8",
          button: "#CE8A8A",
          button_text: "#FAF2F2",
        },
        bulbasaur: {
          background: "#F0FAF0",
          sidebar: "#5AB45A",
          text: "#000000",
          header: "#000000",
          form_field: "#D1EFD1",
          mobile_nav: "#5AB45A",
          plot_drawer: "#D1EFD1",
          button: "#74CE74",
          button_text: "#F0FAF0",
        },
        squirtle: {
          background: "#F0F5FF",
          sidebar: "#74A1FB",
          text: "#000000",
          header: "#000000",
          form_field: "#CEDEFD",
          mobile_nav: "#9CBCFC",
          plot_drawer: "#CEDEFD",
          button: "#3979FA",
          button_text: "#F0F5FF",
        },
      },
      {
        strict: true,
      }
    ),
  ],
};

export default config;
