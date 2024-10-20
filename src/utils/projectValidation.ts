import chalk from "chalk";
import fs from "fs-extra";

export const validateProjectName = (
	projectName: string,
	projectDir: string,
) => {
	if (fs.existsSync(projectDir)) {
		console.error(chalk.red(`Error: Directory ${projectName} already exists.`));
		process.exit(1);
	}
};
