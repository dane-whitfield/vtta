import chalk from 'chalk';

import { UserChoices } from './types';
import {
  installVite,
  installDependencies,
  setupTailwind,
  createFolderStructure,
  setupAxios,
  setupShadcn,
} from './utils';

export const setupProject = async (
  projectDir: string,
  userChoices: UserChoices
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

  if (userChoices.shadcn && userChoices.tailwind) {
    await setupShadcn(projectDir);
  } else {
    console.log(
      chalk.red(
        'Shadcn requires Tailwind and cannot be used without it. Please start again and choose to install Tailwind if you wish to use Shadcn.'
      )
    );
  }
};
