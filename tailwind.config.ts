import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['primaryFont', 'sans-serif']
      },
      colors: {
        primary: '#F3EEE7',
        text: '#313131',
        button: '#D8D4CF40',
        buttonBorder: '#AAA6A3',
        buttonBgHover: '#BBBBBB'
      },
      screens: {
        '2xl': {'max': '1535px'},
        'xl': {'min': '1279px'},
        'lg': {'max': '1023px'},
        'lgo': {'min': '1023px'},
        'md': {'max': '767px'},
        'sm': {'max': '639px'},
      }
    },
  },
  plugins: [],
};
export default config;
