import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

export const createFolderStructure = (projectDir: string) => {
	console.log(chalk.yellow("Creating folder structure..."));
	["src/components", "src/pages", "src/utils", "src/hooks"].reduce(
		(acc, dir) => {
			fs.mkdirSync(path.join(projectDir, dir), { recursive: true });
			return acc;
		},
		{},
	);
};
