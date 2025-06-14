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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Windows XP color scheme
        xp: {
          blue: {
            50: "#e6f2ff",
            100: "#b3d9ff",
            200: "#80bfff",
            300: "#4da6ff",
            400: "#1a8cff",
            500: "#0066cc", // Main XP blue
            600: "#0052a3",
            700: "#003d7a",
            800: "#002952",
            900: "#001429",
          },
          gray: {
            50: "#f8f8f8",
            100: "#ece9d8", // Classic XP window background
            200: "#d4d0c8", // XP button face
            300: "#bfbfbf",
            400: "#808080",
            500: "#404040",
            600: "#323232",
            700: "#242424",
            800: "#161616",
            900: "#080808",
          },
          green: {
            400: "#39d353", // XP start button green
            500: "#2eb043",
          },
          silver: {
            100: "#f0f0f0",
            200: "#e8e8e8",
            300: "#d0d0d0",
            400: "#c0c0c0", // Classic silver
            500: "#a0a0a0",
          },
        },
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
        none: "0",
      },
      fontFamily: {
        "ms-sans-serif": ["Tahoma", "MS Sans Serif", "sans-serif"],
      },
      boxShadow: {
        "xp-inset":
          "inset 1px 1px 0px 0px #ffffff, inset -1px -1px 0px 0px #808080",
        "xp-outset": "1px 1px 0px 0px #ffffff, -1px -1px 0px 0px #808080",
        "xp-pressed":
          "inset -1px -1px 0px 0px #ffffff, inset 1px 1px 0px 0px #808080",
        "xp-window": "1px 1px 0px 1px #0a246a, 2px 2px 0px 1px #dadada",
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
        "xp-startup": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "xp-startup": "xp-startup 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
