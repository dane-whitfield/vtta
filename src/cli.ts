#!/usr/bin/env node
import path from "node:path";
import chalk from "chalk";
import { program } from "commander";
import fs from "fs-extra";

import packageJson from "../package.json" assert { type: "json" };
import { setupProject } from "./projectSetup.js";
import { getUserChoices } from "./userPrompts.js";
import { checkForUpdates, validateProjectName } from "./utils/index.js";

// Run the version check asynchronously to prevent blocking CLI execution
setTimeout(checkForUpdates, 1000);

program
	.version(packageJson.version)
	.description(
		"A CLI to bootstrap a new Vite project with customisable options",
	)
	.argument("<project-name>", "Name of the project")
	.option("-y, --yes", "Skip prompts and use default options")
	.action(async (projectName, options) => {
		console.log(chalk.blue(`Creating a new Vite project: ${projectName}`));

		const currentDir = process.cwd();
		const projectDir = path.join(currentDir, projectName);

		validateProjectName(projectName, projectDir);

		const userChoices = await getUserChoices(options.yes);

		// Create project directory
		fs.mkdirSync(projectDir);

		// Change to project directory
		process.chdir(projectDir);

		try {
			await setupProject(projectDir, userChoices);

			console.log(chalk.green("Project created successfully!"));
			console.log(chalk.yellow("To get started:"));
			console.log(chalk.white(`  cd ${projectName}`));
			console.log(chalk.white("  npm install"));
			console.log(chalk.white("  npm run dev"));
		} catch (error) {
			console.error(chalk.red("An error occurred:"), error);
			process.exit(1);
		}
	});

program.parse(process.argv);
