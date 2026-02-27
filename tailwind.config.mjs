/** @type {import('tailwindcss').Config} */
export default {
  // 🌙 Tailwind usa la clase "dark" en el <html> para activar el modo oscuro
  darkMode: 'class',

  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue}'],

  theme: {
    extend: {
      // ─── COLORES ────────────────────────────────────────────────────────────
      // Todos apuntan a CSS variables definidas en global.css.
      // Esto permite que al cambiar el tema (clase "dark" en <html>)
      // los colores cambien automáticamente sin tocar el HTML.
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        'section-alt': 'hsl(var(--section-alt))',
      },

      // ─── TIPOGRAFÍA ─────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      // ─── BORDER RADIUS ──────────────────────────────────────────────────────
      // Todos los componentes usan rounded-ui como base
      borderRadius: {
        ui: '0.75rem', // 12px — token del sistema
      },

      // ─── GRADIENTE DE TEXTO (acento) ────────────────────────────────────────
      // Úsalo con: bg-gradient-text bg-clip-text text-transparent
      backgroundImage: {
        'gradient-text': 'linear-gradient(135deg, hsl(174, 62%, 40%), hsl(190, 60%, 50%))',
      },
    },
  },

  plugins: [],
};
