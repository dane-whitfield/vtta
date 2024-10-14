import inquirer from "inquirer";

import { UserChoices } from "./types.js";

export const getUserChoices = async (
	skipPrompts: boolean,
): Promise<UserChoices> => {
	if (skipPrompts) {
		return {
			typescript: true,
			tailwind: true,
			router: true,
			axios: true,
			shadcn: true,
			vitest: true,
		};
	}

	return inquirer.prompt([
		{
			type: "confirm",
			name: "typescript",
			message: "Do you want to use TypeScript?",
			default: true,
		},
		{
			type: "confirm",
			name: "tailwind",
			message: "Do you want to use Tailwind CSS?",
			default: true,
		},
		{
			type: "confirm",
			name: "router",
			message: "Do you want to install React Router?",
			default: true,
		},
		{
			type: "confirm",
			name: "axios",
			message: "Do you want to initialise Axios?",
			default: true,
		},
		{
			type: "confirm",
			name: "shadcn",
			message: "Do you want to include shadcn/ui for accessible UI components?",
			default: true,
		},
		{
			type: "confirm",
			name: "vitest",
			message: "Do you want to set up Vitest for testing?",
			default: true,
		},
	]);
};
