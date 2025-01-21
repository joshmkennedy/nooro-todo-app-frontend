import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
			fontWeight:{
				"bold":"900",	
				"regular":"700"
			},
			fontSize:{
				btn:"14px",
			},
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
				['theme-blue']:{
					light:"#4EA8DE",
					base:"#1F6F9F",
				},
				['theme-purp']:{
					light:"#8284FA",
					base:"#5E60CE"
				},

				['theme-gray']:{
					"100":"#808080",
					"200":"#333333",
					"300": "#262626",
					"400":"#1a1a1a",
				},
				'danger':'#E65959',

      },
    },
  },
  plugins: [],
} satisfies Config;
