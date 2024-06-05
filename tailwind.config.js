import { nextui } from '@nextui-org/react'
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{html,js,jsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Roboto Mono', 'monospace'],
        nunito:['Nunito Sans','sans-serif']
      },
        rotate: {
        '17': '65deg',
      }
    },
    container: {
   
       padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '1rem',
        xl: '2rem',
        '2xl': '3rem',
         '3xl': '3rem',
      },
     
    },
  },
  darkMode: 'class',
  plugins: [nextui(
    {
      themes: {
        light: {
          layout: {},
          colors: {

          }
        },
        dark: {
          layout: {},
          colors: {
            background: '#18181b',
            foreground: '#ffffff',
          }
        },
      }
    }
  )]
}
