import chalk from "chalk";

import type { UserChoices } from "./types.js";
import {
	createFolderStructure,
	installDependencies,
	installVite,
	setupAxios,
	setupShadcn,
	setupTailwind,
	setupVitest,
} from "./utils.js";

export const setupProject = async (
	projectDir: string,
	userChoices: UserChoices,
) => {
	await installVite(userChoices.typescript);
	await installDependencies(userChoices);

	if (userChoices.tailwind) {
		await setupTailwind(projectDir);
	}

	createFolderStructure(projectDir);

	if (userChoices.axios) {
		await setupAxios(projectDir);
	}

	if (userChoices.shadcn) {
		if (userChoices.tailwind) {
			await setupShadcn(projectDir);
		} else {
			console.log(
				chalk.red(
					"Shadcn requires Tailwind and cannot be used without it. Please start again and choose to install Tailwind if you wish to use Shadcn.",
				),
			);
		}
	}

	if (userChoices.vitest) {
		await setupVitest(projectDir, userChoices.typescript);
	}
};
