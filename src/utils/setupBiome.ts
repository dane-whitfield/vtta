import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const setupBiome = async (projectDir: string) => {
	console.log("Setting up Biome...");

	// Install Biome
	execSync("npm install --save-dev @biomejs/biome", { stdio: "inherit" });

	// Init Biome
	execSync("npx @biomejs/biome init", { stdio: "inherit", cwd: projectDir });

	// Add Biome scripts to package.json
	const packageJsonPath = path.join(projectDir, "package.json");
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

	packageJson.scripts = {
		...packageJson.scripts,
		"biome:lint": "npx @biomejs/biome lint",
		"biome:format": "npx @biomejs/biome format",
		"biome:check": "npx @biomejs/biome check",
	};

	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

	console.log("Biome has been successfully set up in your project!");
};
