import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

export const setupVitest = async (
	projectDir: string,
	useTypescript: boolean,
) => {
	console.log(chalk.yellow("Setting up Vitest..."));

	// Install Vitest and related packages
	execSync(
		"npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom",
		{ stdio: "inherit" },
	);

	const fileExtension = useTypescript ? "ts" : "js";
	const testFileExtension = useTypescript ? "tsx" : "jsx";

	// Create a basic Vitest config file
	const vitestConfigContent = `
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.${fileExtension}',
  },
})
`;
	fs.writeFileSync(
		path.join(projectDir, `vitest.config.${fileExtension}`),
		vitestConfigContent,
	);

	// Create a setup file for tests
	const setupFileContent = `
import '@testing-library/jest-dom'
`;
	fs.mkdirSync(path.join(projectDir, "src", "test"), { recursive: true });
	fs.writeFileSync(
		path.join(projectDir, "src", "test", `setup.${fileExtension}`),
		setupFileContent,
	);

	// Create an example test file
	const exampleTestContent = `
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders hello world', () => {
    render(<App />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
`;
	fs.writeFileSync(
		path.join(projectDir, `src/App.test.${testFileExtension}`),
		exampleTestContent,
	);

	// Add test script to package.json
	const packageJsonPath = path.join(projectDir, "package.json");
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
	packageJson.scripts.test = "vitest";
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

	console.log(chalk.green("Vitest setup completed successfully."));
};
