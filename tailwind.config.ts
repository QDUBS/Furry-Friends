import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      lg: "960px",
      xl: "1200px",
      md: "768px",
      sm: "480px",
    },
    extend: {
      screens: {
        lg: "960px",
        xl: "1200px",
        md: "768px",
        sm: "480px",
      },
      colors: {
        dark: "#1a1b1c",
        lightBlue: "#3498db",
        darkBlue: "#1f78b4",
        gray: "#ecf0f1",
        LightPink: "#fadde1",
        LightPurple: "#d3bde0",
        LightGreeneen: "#2ecc71 ",
        DarkGreen: "#27ae60",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
