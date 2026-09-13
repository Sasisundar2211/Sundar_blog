import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      maxWidth: { reading: '68ch', wide: '76rem' },
    },
  },
  plugins: [],
} satisfies Config;
