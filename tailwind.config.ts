import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    createThemes({
      charmander: {
        background: '#FAF2F2',
        sidebar: '#CE8A8A',
        text: '#000000',
        header: '#CE8A8A',
        form_field: '#EFD8D8',
        mobile_nav: '#CE8A8A',
        plot_drawer: '#EFD8D8',
        button: '#CE8A8A',
      },
      bulbasaur: {
        background: '#F0FAF0',
        sidebar: '#5AB45A',
        text: '#000000',
        header: '#5AB54A',
        form_field: '#D1EFD1',
        mobile_nav: '#5AB45A',
        plot_drawer: '#D1EFD1',
        button: '#74CE74',
      }, 
      squirtle: {
        background: '#F0F5FF',
        sidebar: '#74A1FB',
        text: '#000000',
        header: '#9CBCFC',
        form_field: '#CEDEFD',
        mobile_nav: '#9CBCFC',
        plot_drawer: '#CEDEFD',
        button: '#3979FA',
      },
    },
    {
      strict: true
    },
    ),
  ],
};

export default config;
