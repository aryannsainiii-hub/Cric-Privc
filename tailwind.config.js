/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07080D',
          900: '#0B0E17',
          800: '#111421',
          700: '#171B2B',
          600: '#1F2438',
        },
        navy: {
          900: '#0D1224',
          800: '#141B33',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E4C878',
          dim: '#8A7132',
        },
        royal: {
          DEFAULT: '#6B4EFF',
          dim: '#4B3699',
        },
        electric: {
          DEFAULT: '#3EA6FF',
        },
        emerald: {
          DEFAULT: '#34C77B',
        },
        warn: {
          DEFAULT: '#E2604F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(201, 162, 75, 0.35)',
        'glow-blue': '0 0 40px -10px rgba(62, 166, 255, 0.35)',
        card: '0 8px 30px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 50% 0%, rgba(107,78,255,0.18), transparent 60%)',
      },
    },
  },
  plugins: [],
};
