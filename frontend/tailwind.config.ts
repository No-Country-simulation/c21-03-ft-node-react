import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        "1.5xl": "0px 4px 4px 0px #00000040",
      },
    },
  },
  plugins: [],
}
export default config
