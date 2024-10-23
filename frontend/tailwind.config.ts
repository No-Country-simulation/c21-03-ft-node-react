import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans],
        "encode-sans": ["Encode Sans", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        "1.5xl": "0px 4px 4px 0px #00000040",
      },
    },
  },
  plugins: [],
}
export default config
