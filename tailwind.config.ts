
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
        // Cyberpunk theme colors
        cyber: {
          primary: "#9b87f5", // Vibrant purple
          secondary: "#7E69AB", // Muted purple
          accent: "#FF2A6D", // Neon pink
          highlight: "#4BFFD1", // Neon cyan
          dark: "#1A1F2C", // Dark background
          darker: "#13141C", // Darker shade
          light: "#F0F2FA", // Light text color
          muted: "#7E8193", // Muted text
        },
        digiblue: {
          DEFAULT: "#4361EE",
          '50': '#E9EDFD',
          '100': '#D3DCFB',
          '200': '#A7B8F8',
          '300': '#7B95F4',
          '400': '#4F72F1',
          '500': '#4361EE',
          '600': '#3A57D6',
          '700': "#3047B3",
          '800': "#233690",
          '900': "#19296D",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        cyber: ['Rajdhani', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.cyber.accent"), 0 0 20px theme("colors.cyber.accent")',
        'neon-cyan': '0 0 5px theme("colors.cyber.highlight"), 0 0 20px theme("colors.cyber.highlight")',
        'neon-purple': '0 0 5px theme("colors.cyber.primary"), 0 0 20px theme("colors.cyber.primary")',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        "cyber-glitch": {
          '0%': { 
            textShadow: '0.05em 0 0 #ff00c1, -0.05em -0.025em 0 #4bffd1, 0.025em 0.05em 0 #2dbeff' 
          },
          '14%': { 
            textShadow: '0.05em 0 0 #ff00c1, -0.05em -0.025em 0 #4bffd1, 0.025em 0.05em 0 #2dbeff' 
          },
          '15%': { 
            textShadow: '-0.05em -0.025em 0 #ff00c1, 0.025em 0.025em 0 #4bffd1, -0.05em -0.05em 0 #2dbeff' 
          },
          '49%': { 
            textShadow: '-0.05em -0.025em 0 #ff00c1, 0.025em 0.025em 0 #4bffd1, -0.05em -0.05em 0 #2dbeff' 
          },
          '50%': { 
            textShadow: '0.025em 0.05em 0 #ff00c1, 0.05em 0 0 #4bffd1, 0 -0.05em 0 #2dbeff' 
          },
          '99%': { 
            textShadow: '0.025em 0.05em 0 #ff00c1, 0.05em 0 0 #4bffd1, 0 -0.05em 0 #2dbeff' 
          },
          '100%': { 
            textShadow: '-0.025em 0 0 #ff00c1, -0.025em -0.025em 0 #4bffd1, -0.025em -0.05em 0 #2dbeff' 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "cyber-glitch": "cyber-glitch 3s infinite alternate",
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(#2f3b5910 1px, transparent 1px), linear-gradient(90deg, #2f3b5910 1px, transparent 1px)",
        'cyber-gradient': "linear-gradient(135deg, #1A1F2C 0%, #2A3040 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
