import { execSync } from "node:child_process";
import chalk from "chalk";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

type PackageJson = {
	version: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson: PackageJson = JSON.parse(
	await readFile(join(__dirname, "../package.json"), "utf8"),
);

export const checkForUpdates = () => {
	try {
		const latestVersion = execSync("npm show vtta version").toString().trim();
		const currentVersion = packageJson.version;

		if (latestVersion !== currentVersion) {
			console.log(
				chalk.yellow(`A new version (${latestVersion}) of vtta is available.`),
			);
			console.log(chalk.green("Update by running: npm install -g vtta"));
			console.log(chalk.blueBright("Or use npx vtta@latest <project-name>"));
		}
	} catch (err) {
		console.error(chalk.red("Error checking for updates:"), err);
	}
};
