import { execSync } from "node:child_process";
import chalk from "chalk";

import packageJson from "../../package.json" assert { type: "json" };

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
