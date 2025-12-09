// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	experimental: {
		fonts: [
			{
				provider: "local",
				cssVariable: "--font-kyrios",
				name: "AT Kyrios",
				fallbacks: ["serif"],
				variants: [
					{
						weight: 400,
						style: "normal",
						src: ["./src/assets/fonts/at-kyrios-variable.woff2"],
					},
				],
			},
			{
				provider: "local",
				cssVariable: "--font-davinci",
				name: "Da Vinci",
				fallbacks: ["serif"],
				variants: [
					{
						style: "normal",
						weight: 300,
						src: ["./src/assets/fonts/TRJNDaVinci-Light.woff"],
					},
				],
			},
		],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});

