import { execSync } from "node:child_process";
import chalk from "chalk";
import type { UserChoices } from "../types";

export const installDependencies = async (userChoices: UserChoices) => {
	if (userChoices.axios) {
		console.log(chalk.yellow("Installing axios..."));
		execSync("npm install axios", { stdio: "inherit" });
	}

	if (userChoices.tailwind) {
		console.log(chalk.yellow("Installing Tailwind CSS..."));
		execSync("npm install -D tailwindcss postcss autoprefixer", {
			stdio: "inherit",
		});
		execSync("npx tailwindcss init -p", { stdio: "inherit" });
	}

	if (userChoices.router) {
		console.log(chalk.yellow("Installing React Router..."));
		execSync("npm install react-router-dom", { stdio: "inherit" });
	}
};
