import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      // Primary fonts for the website - Lora (Flatory Serif style) as main font
      sans: ['Lora', 'serif'],

      // All serif fonts now use Lora (Flatory Serif style)
      seasons: ['Lora', '"The Seasons Bold"', 'serif'],                    // For main titles/headers
      cmu: ['Lora', 'serif'],                                              // For body content/paragraphs
      catchy: ['Lora', '"Cinzel Decorative"', 'serif'],                    // For special headings/accents
      flatory: ['Lora', 'serif'],                                          // Flatory Serif style

      // Keep existing fonts for compatibility
      serif: ['Lora', 'serif'],
      cookies: ['"Cookies"', 'cursive'],
      daydream: ['"Daydream"', 'cursive'],
      cakes: ['"Cakes"', 'cursive'],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        cursive: ['Dancing Script', 'cursive'],
        serif: ['Playfair Display', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        'cosmic-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'popup-enter': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.5) rotate(-5deg)',
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) rotate(0deg)',
          },
        },
        'title-glow': {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 20px hsl(258 90% 66% / 0.6))',
          },
          '50%': { 
            filter: 'drop-shadow(0 0 40px hsl(258 90% 66% / 1)) drop-shadow(0 0 60px hsl(330 81% 60% / 0.8))',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'heart-float': {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(1)', opacity: '0' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.8))' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'cosmic-shift': 'cosmic-shift 15s ease infinite',
        'popup-enter': 'popup-enter 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'title-glow': 'title-glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 4s ease-in-out infinite',
        'heart-float': 'heart-float 6s linear infinite',
        confetti: 'confetti 3s linear forwards',
        glow: 'glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;