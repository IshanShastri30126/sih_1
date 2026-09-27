/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#060913',
          surface: '#0b1120',
          card: '#0f172a',
          hover: '#1e293b',
          border: '#1e293b',
          'border-light': '#334155',
          text: '#f8fafc',
          muted: '#94a3b8',
          subtle: '#64748b',
        },
        risk: {
          normal: '#10b981',
          watch: '#eab308',
          warning: '#f97316',
          extreme: '#ef4444',
          catastrophic: '#b91c1c',
        },
        brand: {
          cyan: '#06b6d4',
          sky: '#38bdf8',
          blue: '#2563eb',
          violet: '#8b5cf6',
          indigo: '#6366f1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.25)',
        'glow-red': '0 0 20px -3px rgba(239, 68, 68, 0.35)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.3)',
        'command-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar 4s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
