import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "progress-bar": {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        "progress-bar": "progress-bar 5s linear forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ["hover", "focus", "motion-safe"],
      translate: ["responsive", "motion-safe"],
    },
  },
  plugins: [],
  safelist: [
    "-translate-x-full",
    "translate-x-0",
    "translate-y-20",
    "opacity-0",
    "opacity-100",
  ],
};

export default config satisfies Config;
