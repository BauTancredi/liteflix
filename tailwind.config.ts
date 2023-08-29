import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    letterSpacing: {
      widest: ".18em",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
