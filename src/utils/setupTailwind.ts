import fs from "node:fs";
import path from "node:path";

export const setupTailwind = async (projectDir: string) => {
	const tailwindConfig = `
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
  `;
	fs.writeFileSync(path.join(projectDir, "tailwind.config.js"), tailwindConfig);

	const indexCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `;
	fs.writeFileSync(path.join(projectDir, "src/index.css"), indexCSS);
};
