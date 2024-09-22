import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

import packageJson from '../package.json' assert { type: 'json' };
import { UserChoices } from './types.js';

export const validateProjectName = (
  projectName: string,
  projectDir: string
) => {
  if (fs.existsSync(projectDir)) {
    console.error(chalk.red(`Error: Directory ${projectName} already exists.`));
    process.exit(1);
  }
};

export const createFolderStructure = (projectDir: string) => {
  console.log(chalk.yellow('Creating folder structure...'));
  ['src/components', 'src/pages', 'src/utils', 'src/hooks'].forEach((dir) => {
    fs.mkdirSync(path.join(projectDir, dir), { recursive: true });
  });
};

export const installVite = async (useTypescript: boolean) => {
  console.log(chalk.yellow('Initialising Vite project...'));
  const template = useTypescript ? 'react-ts' : 'react';
  execSync(`npm init vite@latest . -- --template ${template}`, {
    stdio: 'inherit',
  });
};

export const installDependencies = async (userChoices: UserChoices) => {
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
  }

  if (userChoices.router) {
    console.log(chalk.yellow('Installing React Router...'));
    execSync('npm install react-router-dom', { stdio: 'inherit' });
  }
};

export const setupTailwind = async (projectDir: string) => {
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
  fs.writeFileSync(path.join(projectDir, 'tailwind.config.js'), tailwindConfig);

  const indexCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `;
  fs.writeFileSync(path.join(projectDir, 'src/index.css'), indexCSS);
};

export const setupAxios = async (projectDir: string) => {
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

  const envExampleContent = `VITE_API_URL=your_api_url_here`;
  fs.writeFileSync(path.join(projectDir, '.env.example'), envExampleContent);
};

export const setupShadcn = async (projectDir: string) => {
  console.log(chalk.yellow('Setting up shadcn/ui...'));

  // 1. Update tsconfig.json and tsconfig.app.json with hardcoded content first
  const tsconfigPath = path.join(projectDir, 'tsconfig.json');
  const tsconfigAppPath = path.join(projectDir, 'tsconfig.app.json');

  const tsconfigContent = `{
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,

      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",

      /* Linting */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,

      /* shadcn */
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }`;

  // Write tsconfig.json
  try {
    fs.writeFileSync(tsconfigPath, tsconfigContent);
    console.log(chalk.green('tsconfig.json updated successfully.'));
  } catch (error) {
    console.error(chalk.red('Error updating tsconfig.json:'), error);
    process.exit(1);
  }

  // Write tsconfig.app.json (if needed)
  try {
    fs.writeFileSync(tsconfigAppPath, tsconfigContent);
    console.log(chalk.green('tsconfig.app.json updated successfully.'));
  } catch (error) {
    console.error(chalk.red('Error updating tsconfig.app.json:'), error);
    process.exit(1);
  }

  // 2. Overwrite vite.config.ts with hardcoded content
  const viteConfigPath = path.join(projectDir, 'vite.config.ts');

  // Hardcoded content for vite.config.ts
  const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
});
`;

  try {
    // Write or overwrite vite.config.ts with hardcoded content
    fs.writeFileSync(viteConfigPath, viteConfigContent);
    console.log(
      chalk.green('vite.config.ts file created/updated successfully.')
    );
  } catch (error) {
    console.error(chalk.red('Error creating/updating vite.config.ts:'), error);
    process.exit(1);
  }

  // 3. Write the `components.json` file with default settings.
  const componentsJsonPath = path.join(projectDir, 'components.json');
  const componentsJsonContent = `{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "tailwind.config.js",
      "css": "src/index.css",
      "baseColor": "slate",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/utils"
    }
  }`;

  try {
    fs.writeFileSync(componentsJsonPath, componentsJsonContent);
    console.log(
      chalk.green(
        `components.json file created successfully at: ${componentsJsonPath}`
      )
    );
  } catch (error) {
    console.error(chalk.red('Error creating components.json file:'), error);
    process.exit(1);
  }

  // 4. Install the shadcn/ui dependencies.
  try {
    console.log(chalk.yellow('Installing shadcn/ui dependencies...'));

    // Install shadcn-ui package
    execSync('npm install shadcn-ui', { stdio: 'inherit' });

    console.log(chalk.green('shadcn/ui dependencies installed successfully!'));

    // 5. Add basic starter button component after everything is in place
    execSync('npx shadcn@latest add button', { stdio: 'inherit' });
    console.log(chalk.green('Button component installed successfully.'));
  } catch (error) {
    console.error(
      chalk.red('An error occurred during shadcn/ui installation:'),
      error
    );
    process.exit(1);
  }

  console.log(chalk.green('ShadCN setup completed successfully.'));
};

export const checkForUpdates = () => {
  try {
    const latestVersion = execSync('npm show vtta version').toString().trim(); // Replace 'vtta' with your actual package name
    const currentVersion = packageJson.version;

    if (latestVersion !== currentVersion) {
      console.log(
        chalk.yellow(`A new version (${latestVersion}) of vtta is available.`)
      );
      console.log(chalk.green(`Update by running: npm install -g vtta`));
      console.log(chalk.blueBright(`Or use npx vtta@latest <project-name>`));
    }
  } catch (err) {
    console.error(chalk.red('Error checking for updates:'), err);
  }
};
