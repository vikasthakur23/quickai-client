/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14131A",
        panel: "#1C1B24",
        line: "#2C2A38",
        paper: "#F5F3EE",
        muted: "#9C99AD",
        signal: "#F5A623",
        circuit: "#2DD4BF",
        pro: "#8B7CF6",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
