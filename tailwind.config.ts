
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                digiblue: {
                    50: '#f3e6ff',
                    100: '#e4ccff',
                    200: '#d0a3ff',
                    300: '#bb7aff',
                    400: '#a652ff',
                    500: '#9229ff',
                    600: '#7e14e0',
                    700: '#6b0cc4',
                    800: '#5a09a7',
                    900: '#43067a',
                    950: '#2d0452',
                    DEFAULT: '#9229ff',
                },
                diginavy: {
                    DEFAULT: '#161759',
                    50: '#f0f1ff',
                    100: '#e2e5ff',
                    200: '#c9ceff',
                    300: '#a8adff',
                    400: '#8281ff',
                    500: '#6251fc',
                    600: '#5234f5',
                    700: '#4724e4',
                    800: '#3820bc',
                    900: '#1a1b7a',
                    950: '#161759'
                },
                // New dark theme colors based on reference image
                dark: {
                    DEFAULT: '#0E0617',
                    100: '#1A1025',
                    200: '#221833',
                    300: '#2A1E3D',
                    400: '#352650',
                    500: '#52336F',
                },
                neon: {
                    purple: '#A633FF',
                    pink: '#F72585',
                    blue: '#4CC9F0',
                    violet: '#7209B7',
                },
                chess: {
                    light: '#F8F9FA',
                    dark: '#212529',
                }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {height: '0'},
					to: {height: 'var(--radix-accordion-content-height)'}
				},
				'accordion-up': {
					from: {height: 'var(--radix-accordion-content-height)'},
					to: {height: '0'}
				},
                'marquee': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' }
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-out': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(10px)' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'glow': {
                    '0%': { textShadow: '0 0 4px rgba(166, 51, 255, 0.6)' },
                    '50%': { textShadow: '0 0 16px rgba(166, 51, 255, 0.8)' },
                    '100%': { textShadow: '0 0 4px rgba(166, 51, 255, 0.6)' }
                },
                'float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' }
                },
                'pulse-light': {
                    '0%': { boxShadow: '0 0 0 0 rgba(166, 51, 255, 0.7)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(166, 51, 255, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(166, 51, 255, 0)' }
                },
                'rotate-3d': {
                    '0%': { transform: 'perspective(1200px) rotateY(0deg)' },
                    '100%': { transform: 'perspective(1200px) rotateY(360deg)' }
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' }
                },
                'cyber-glow': {
                    '0%': { boxShadow: '0 0 5px #A633FF, 0 0 10px #A633FF' },
                    '50%': { boxShadow: '0 0 20px #A633FF, 0 0 30px #A633FF' },
                    '100%': { boxShadow: '0 0 5px #A633FF, 0 0 10px #A633FF' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'marquee': 'marquee 25s linear infinite',
                'marquee-slow': 'marquee 40s linear infinite',
                'marquee-fast': 'marquee 15s linear infinite',
                'marquee-reverse': 'marquee-reverse 25s linear infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'fade-out': 'fade-out 0.5s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'glow': 'glow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-light': 'pulse-light 2s infinite',
                'rotate-3d': 'rotate-3d 15s linear infinite',
                'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
                'cyber-glow': 'cyber-glow 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
