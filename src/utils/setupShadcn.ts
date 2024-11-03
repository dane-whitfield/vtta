import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

export const setupShadcn = async (
	projectDir: string,
	useTypescript: boolean,
) => {
	console.log(chalk.yellow("Setting up shadcn/ui..."));

	// 1. Update tsconfig files only if TypeScript is enabled
	if (useTypescript) {
		const tsconfigPath = path.join(projectDir, "tsconfig.json");
		const tsconfigAppPath = path.join(projectDir, "tsconfig.app.json");

		const tsconfigContent = `{
			"compilerOptions": {
			  "target": "ES2020",
			  "useDefineForClassFields": true,
			  "lib": ["ES2020", "DOM", "DOM.Iterable"],
			  "module": "ESNext",
			  "skipLibCheck": true,

			  /* Bundler mode */
			  "moduleResolution": "bundler",
			  "allowImportingTsExtensions": true,
			  "resolveJsonModule": true,
			  "isolatedModules": true,
			  "noEmit": true,
			  "jsx": "react-jsx",

			  /* Linting */
			  "strict": true,
			  "noUnusedLocals": true,
			  "noUnusedParameters": true,
			  "noFallthroughCasesInSwitch": true,

			  /* shadcn */
			  "baseUrl": ".",
			  "paths": {
				"@/*": ["./src/*"]
			  }
			},
			"include": ["src"],
			"references": [{ "path": "./tsconfig.node.json" }]
		  }`;

		// Write tsconfig.json
		try {
			fs.writeFileSync(tsconfigPath, tsconfigContent);
			console.log(chalk.green("tsconfig.json updated successfully."));
		} catch (error) {
			console.error(chalk.red("Error updating tsconfig.json:"), error);
			process.exit(1);
		}

		// Write tsconfig.app.json (if needed)
		try {
			fs.writeFileSync(tsconfigAppPath, tsconfigContent);
			console.log(chalk.green("tsconfig.app.json updated successfully."));
		} catch (error) {
			console.error(chalk.red("Error updating tsconfig.app.json:"), error);
			process.exit(1);
		}
	}

	// 2. Set up vite.config with appropriate extension
	const viteConfigExtension = useTypescript ? "ts" : "js";
	const viteConfigPath = path.join(
		projectDir,
		`vite.config.${viteConfigExtension}`,
	);

	// Hardcoded content for vite.config
	const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
});
`;

	try {
		// Write or overwrite vite.config with the correct extension
		fs.writeFileSync(viteConfigPath, viteConfigContent);
		console.log(
			chalk.green(
				`vite.config.${viteConfigExtension} file created/updated successfully.`,
			),
		);
	} catch (error) {
		console.error(
			chalk.red(`Error creating/updating vite.config.${viteConfigExtension}:`),
			error,
		);
		process.exit(1);
	}

	// 3. Install the shadcn/ui dependencies.
	try {
		console.log(chalk.yellow("Installing shadcn/ui dependencies..."));

		// Install shadcn-ui package
		execSync("npm install shadcn-ui", { stdio: "inherit" });
		console.log(chalk.green("shadcn/ui dependencies installed successfully!"));

		// 4. Write the `components.json` file with default settings.
		execSync("npx shadcn@latest init -y -d -f", { stdio: "inherit" });

		// 5. Add basic starter button component after everything is in place
		execSync("npx shadcn@latest add button", { stdio: "inherit" });
		console.log(chalk.green("Button component installed successfully."));
	} catch (error) {
		console.error(
			chalk.red("An error occurred during shadcn/ui installation:"),
			error,
		);
		process.exit(1);
	}

	console.log(chalk.green("ShadCN setup completed successfully."));
};
