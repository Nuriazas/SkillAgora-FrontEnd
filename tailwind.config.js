/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./src/components/shared/UI/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class", // Habilitar el modo oscuro basado en clases
	theme: {
		extend: {
			colors: {
				// Colores del modo oscuro (actuales)
				darkBackground: "#23232b",
				darkCard: "#35353f",
				darkText: "#ffffff",
				darkGrayText: "#a0a0a0",
				darkBlue: "#60a5fa",
				darkCyan: "#22d3ee",

				// Colores del modo claro (nuevos)
				lightBackground: "#f3f4f6", // Un gris claro para el fondo
				lightCard: "#ffffff", // Blanco para las tarjetas
				lightText: "#1f2937", // Texto oscuro
				lightGrayText: "#4b5563", // Gris oscuro para texto secundario
				lightBlue: "#3b82f6", // Azul estándar
				lightCyan: "#06b6d4", // Cian estándar
			},
		},
		keyframes: {
			"smooth-pulse": {
				"0%, 100%": { opacity: "0.5" },
				"50%": { opacity: "0.1" },
			},
		},
		animation: {
			"smooth-pulse": "smooth-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			plugins: [],
		},
	},
};
