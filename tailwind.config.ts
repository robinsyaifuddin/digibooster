
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", ".dark"],
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
                // DigiCyan - our brand color from the logo
                digicyan: {
                    50: '#e0fcff',
                    100: '#c0f7fd',
                    200: '#91f0fa',
                    300: '#51e4f5',
                    400: '#22d3eb',
                    500: '#0bbcd1',
                    600: '#0295aa',
                    700: '#027686',
                    800: '#05606d',
                    900: '#084f5a',
                    950: '#003540',
                    DEFAULT: '#00D8E8',
                },
                // DigiBlue - for gradients and accents
                digiblue: {
                    50: '#e6f2ff',
                    100: '#cce4ff',
                    200: '#99c9ff',
                    300: '#66adff',
                    400: '#3392ff',
                    500: '#0077ff',
                    600: '#005fcc',
                    700: '#004799',
                    800: '#003066',
                    900: '#001833',
                    DEFAULT: '#0077ff',
                },
                diginavy: {
                    900: '#001941',
                    DEFAULT: '#001941',
                },
                // Dark theme colors
                dark: {
                    DEFAULT: '#030811',
                    100: '#0f1b30',
                    200: '#101c30',
                    300: '#152238',
                    400: '#1d2d4b',
                    500: '#25385f',
                },
                neon: {
                    cyan: '#00D8E8',
                    blue: '#0bbcd1',
                    white: '#FFFFFF',
                    black: '#000000',
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
                    '0%': { textShadow: '0 0 4px rgba(0, 216, 232, 0.6)' },
                    '50%': { textShadow: '0 0 16px rgba(0, 216, 232, 0.8)' },
                    '100%': { textShadow: '0 0 4px rgba(0, 216, 232, 0.6)' }
                },
                'float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' }
                },
                'pulse-light': {
                    '0%': { boxShadow: '0 0 0 0 rgba(0, 216, 232, 0.7)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(0, 216, 232, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(0, 216, 232, 0)' }
                },
                'rotate-3d': {
                    '0%': { transform: 'perspective(1200px) rotateY(0deg)' },
                    '100%': { transform: 'perspective(1200px) rotateY(360deg)' }
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' }
                },
                'flip': {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(180deg)' }
                },
                'cyber-glow': {
                    '0%': { boxShadow: '0 0 5px #00D8E8, 0 0 10px #00D8E8' },
                    '50%': { boxShadow: '0 0 20px #00D8E8, 0 0 30px #00D8E8' },
                    '100%': { boxShadow: '0 0 5px #00D8E8, 0 0 10px #00D8E8' }
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
                'flip': 'flip 0.6s ease-in-out',
                'cyber-glow': 'cyber-glow 2s infinite'
			},
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
