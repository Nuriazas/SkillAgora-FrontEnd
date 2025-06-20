/* @type {import('tailwindcss').Config} */
export default {
    content: [
         "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/components/shared/UI/**/*.{js,ts,jsx,tsx}",

    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                darkBackground: "#23232b",
                darkCard: "#35353f",
                darkText: "#ffffff",
                darkGrayText: "#a0a0a0",
                darkBlue: "#60a5fa",
                darkCyan: "#22d3ee",
                lightBackground: "#f3f4f6",
                lightCard: "#ffffff",
                lightText: "#1f2937",
                lightGrayText: "#4b5563",
                lightBlue: "#3b82f6",
                lightCyan: "#06b6d4",
                
            },
            keyframes: {
                "smooth-pulse": {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "0.1" },
                },
            },
            animation: {
                "smooth-pulse": "smooth-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};