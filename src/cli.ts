#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

interface UserChoices {
  typescript: boolean;
  tailwind: boolean;
  router: boolean;
}

program
  .version('1.0.0')
  .description(
    'A CLI to bootstrap a new Vite project with customisable options'
  )
  .argument('<project-name>', 'Name of the project')
  .option('-y, --yes', 'Skip prompts and use default options')
  .action(async (projectName, options) => {
    console.log(chalk.blue(`Creating a new Vite project: ${projectName}`));

    const currentDir = process.cwd();
    const projectDir = path.join(currentDir, projectName);

    if (fs.existsSync(projectDir)) {
      console.error(
        chalk.red(`Error: Directory ${projectName} already exists.`)
      );
      process.exit(1);
    }

    let userChoices: UserChoices & { axios: boolean };

    if (options.yes) {
      userChoices = {
        typescript: true,
        tailwind: true,
        router: true,
        axios: true,
      };
    } else {
      userChoices = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'typescript',
          message: 'Do you want to use TypeScript?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'tailwind',
          message: 'Do you want to use Tailwind CSS?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'router',
          message: 'Do you want to install React Router?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'axios',
          message: 'Do you want to initialise Axios?',
          default: true,
        },
      ]);
    }

    // Create project directory
    fs.mkdirSync(projectDir);

    // Change to project directory
    process.chdir(projectDir);

    try {
      // Initialise Vite project
      console.log(chalk.yellow('Initialising Vite project...'));
      const template = userChoices.typescript ? 'react-ts' : 'react';
      execSync(`npm init vite@latest . -- --template ${template}`, {
        stdio: 'inherit',
      });

      // Install additional dependencies
      if (userChoices.axios) {
        console.log(chalk.yellow('Installing axios...'));
        execSync('npm install axios', { stdio: 'inherit' });
      }

      if (userChoices.tailwind) {
        console.log(chalk.yellow('Installing Tailwind CSS...'));
        execSync('npm install -D tailwindcss postcss autoprefixer', {
          stdio: 'inherit',
        });
        execSync('npx tailwindcss init -p', { stdio: 'inherit' });

        // Update tailwind.config.js
        const tailwindConfig = `
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
            `;
        fs.writeFileSync('tailwind.config.js', tailwindConfig);

        // Update src/index.css
        const indexCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;
            `;
        fs.writeFileSync('src/index.css', indexCSS);
      }

      if (userChoices.router) {
        console.log(chalk.yellow('Installing React Router...'));
        execSync('npm install react-router-dom', { stdio: 'inherit' });
      }

      // Create folder structure
      console.log(chalk.yellow('Creating folder structure...'));
      ['src/components', 'src/pages', 'src/utils', 'src/hooks'].forEach(
        (dir) => {
          fs.mkdirSync(dir, { recursive: true });
        }
      );

      // Create api.ts file if Axios is initialised
      if (userChoices.axios) {
        const apiContent = `
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// EXAMPLE AXIOS REQUEST
export const getSomething = async () => {
	const res = await api.get('/something');
	const { data } = res;
	return data;
};
            `;
        fs.writeFileSync(path.join(projectDir, 'src/utils/api.ts'), apiContent);

        // Create .env.example file
        const envExampleContent = `
# VITE_API_URL=your_api_url_here
VITE_API_URL=
            `;
        fs.writeFileSync(
          path.join(projectDir, '.env.example'),
          envExampleContent
        );
      }

      console.log(chalk.green('Project created successfully!'));
      console.log(chalk.yellow('To get started:'));
      console.log(chalk.white(`  cd ${projectName}`));
      console.log(chalk.white('  npm install'));
      console.log(chalk.white('  npm run dev'));
    } catch (error) {
      console.error(chalk.red('An error occurred:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
