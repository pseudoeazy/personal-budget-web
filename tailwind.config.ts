import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        complOpt1: 'var(--compl-opt1)',
        complOpt2: 'var(--compl-opt2)',
        boxColorLight: 'var(--box-color-light)',
        mainDarkBase: 'var(--main-dark-base)',
        mainDarkBase20: 'var(--main-dark-base-20)',
        boardGrey: 'var(--color-grey)',
      },
      fontFamily: {
        openSans: ['"Open Sans"'],
      },
    },
  },
  plugins: [],
} satisfies Config;
