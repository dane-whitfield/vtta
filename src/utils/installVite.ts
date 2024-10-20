import { execSync } from "node:child_process";
import chalk from "chalk";

export const installVite = async (useTypescript: boolean) => {
	console.log(chalk.yellow("Initialising Vite project..."));
	const template = useTypescript ? "react-ts" : "react";
	execSync(`npm init vite@latest . -- --template ${template}`, {
		stdio: "inherit",
	});
};
