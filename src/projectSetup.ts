import chalk from 'chalk';
import { UserChoices } from './types';
import { createFolderStructure, installVite, installDependencies, setupTailwind, setupAxios, setupShadcn } from './utils';

export async function setupProject(projectDir: string, userChoices: UserChoices) {
  await installVite(userChoices.typescript);
  await installDependencies(userChoices);
  
  if (userChoices.tailwind) {
    await setupTailwind(projectDir);
  }

  createFolderStructure(projectDir);

  if (userChoices.axios) {
    await setupAxios(projectDir);
  }

  if (userChoices.shadcn && userChoices.tailwind) {
    await setupShadcn(projectDir);
  } else {
    console.log(chalk.red('Shadcn requires Tailwind and cannot be used without it. Please start again and choose to install Tailwind if you wish to use Shadcn.'));
  }
}
