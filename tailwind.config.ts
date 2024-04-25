import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "fs-100": "var(--fs-100)",
      "fs-200": "var(--fs-200)",
      "fs-300": "var(--fs-300)",
      "fs-400": "var(--fs-400)",
      "fs-500": "var(--fs-500)",
      "fs-600": "var(--fs-600)",
      "fs-700": "var(--fs-700)",
      "fs-800": "var(--fs-800)",
      "lh-custom": "var(--lh-custom)",
    },
    backgroundImage: {
      gradientBackground: "var(--gradient-background)",
    },
    colors: {
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
      white: "var(--white-color)",
      black: "var(--black-color)",
      textActive: "var(--text-active)",
      cardColor: "var(--card-color)",
      primaryText: "var(--text-primary)",
      secondaryText: "var(--text-secondary)",
      dashboardTile: "var(--dashboard-tile)",
      transparent: "transparent",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
