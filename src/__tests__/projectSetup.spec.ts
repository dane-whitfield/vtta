import chalk from "chalk";
import { afterEach, describe, expect, it, vi, vitest } from "vitest";
import { setupProject } from "../projectSetup";
import {
	createFolderStructure,
	installDependencies,
	installVite,
	setupAxios,
	setupBiome,
	setupShadcn,
	setupTailwind,
	setupVitest,
} from "../utils";

vi.mock("../utils", () => ({
	installVite: vi.fn(),
	installDependencies: vi.fn(),
	setupTailwind: vi.fn(),
	createFolderStructure: vi.fn(),
	setupAxios: vi.fn(),
	setupShadcn: vi.fn(),
	setupVitest: vi.fn(),
	setupBiome: vi.fn(),
}));

// Helper to spy on console.log
const spyLog = vi.spyOn(console, "log").mockImplementation(() => {});

describe("setupProject", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should install Vite with TypeScript if selected", async () => {
		const projectDir = "test-project";
		const userChoices = {
			typescript: true,
			tailwind: false,
			axios: false,
			shadcn: false,
			router: false,
			vitest: false,
			biome: false,
		};

		await setupProject(projectDir, userChoices);

		expect(installVite).toHaveBeenCalledWith(true);
		expect(installDependencies).toHaveBeenCalledWith(userChoices);
		expect(createFolderStructure).toHaveBeenCalledWith(projectDir);
		expect(setupTailwind).not.toHaveBeenCalled();
		expect(setupAxios).not.toHaveBeenCalled();
		expect(setupShadcn).not.toHaveBeenCalled();
	});

	it("should set up Tailwind if selected", async () => {
		const projectDir = "test-project";
		const userChoices = {
			typescript: false,
			tailwind: true,
			axios: false,
			shadcn: false,
			router: false,
			vitest: false,
			biome: false,
		};

		await setupProject(projectDir, userChoices);

		expect(installVite).toHaveBeenCalledWith(false);
		expect(installDependencies).toHaveBeenCalledWith(userChoices);
		expect(setupTailwind).toHaveBeenCalledWith(projectDir);
		expect(createFolderStructure).toHaveBeenCalledWith(projectDir);
		expect(setupAxios).not.toHaveBeenCalled();
		expect(setupShadcn).not.toHaveBeenCalled();
	});

	it("should set up Axios if selected", async () => {
		const projectDir = "test-project";
		const userChoices = {
			typescript: false,
			tailwind: false,
			axios: true,
			shadcn: false,
			router: false,
			vitest: false,
			biome: false,
		};

		await setupProject(projectDir, userChoices);

		expect(installVite).toHaveBeenCalledWith(false);
		expect(installDependencies).toHaveBeenCalledWith(userChoices);
		expect(setupAxios).toHaveBeenCalledWith(projectDir);
		expect(setupShadcn).not.toHaveBeenCalled();
		expect(spyLog).not.toHaveBeenCalled();
	});

	describe("shadcn", () => {
		it("should set up Shadcn if both Tailwind and Shadcn are selected", async () => {
			const projectDir = "test-project";
			const userChoices = {
				typescript: false,
				tailwind: true,
				axios: false,
				shadcn: true,
				router: false,
				vitest: false,
				biome: false,
			};

			await setupProject(projectDir, userChoices);

			expect(installVite).toHaveBeenCalledWith(false);
			expect(installDependencies).toHaveBeenCalledWith(userChoices);
			expect(setupTailwind).toHaveBeenCalledWith(projectDir);
			expect(setupShadcn).toHaveBeenCalledWith(projectDir);
			expect(spyLog).not.toHaveBeenCalled();
		});

		it("should not set up Shadcn and log an error if Tailwind is not selected", async () => {
			const projectDir = "test-project";
			const userChoices = {
				typescript: false,
				tailwind: false,
				axios: false,
				shadcn: true,
				router: false,
				vitest: false,
				biome: false,
			};

			await setupProject(projectDir, userChoices);

			expect(installVite).toHaveBeenCalledWith(false);
			expect(installDependencies).toHaveBeenCalledWith(userChoices);
			expect(setupShadcn).not.toHaveBeenCalled();
			expect(spyLog).toHaveBeenCalledWith(
				chalk.red(
					"Shadcn requires Tailwind and cannot be used without it. Please start again and choose to install Tailwind if you wish to use Shadcn.",
				),
			);
		});
	});

	it("should handle a full setup with Tailwind, Axios, and Shadcn", async () => {
		const projectDir = "test-project";
		const userChoices = {
			typescript: true,
			tailwind: true,
			axios: true,
			shadcn: true,
			router: false,
			vitest: false,
			biome: false,
		};

		await setupProject(projectDir, userChoices);

		expect(installVite).toHaveBeenCalledWith(true);
		expect(installDependencies).toHaveBeenCalledWith(userChoices);
		expect(setupTailwind).toHaveBeenCalledWith(projectDir);
		expect(setupAxios).toHaveBeenCalledWith(projectDir);
		expect(setupShadcn).toHaveBeenCalledWith(projectDir);
		expect(spyLog).not.toHaveBeenCalled();
	});

	describe("vitest", () => {
		it("should set up Vitest with JavaScript if TypeScript is not selected", async () => {
			const projectDir = "test-project";
			const userChoices = {
				typescript: false,
				tailwind: false,
				axios: false,
				shadcn: false,
				vitest: true,
				router: false,
				biome: false,
			};

			await setupProject(projectDir, userChoices);

			expect(setupVitest).toHaveBeenCalledWith(projectDir, false);
		});

		it("should set up Vitest with TypeScript if TypeScript is selected", async () => {
			const projectDir = "test-project";
			const userChoices = {
				typescript: true,
				tailwind: false,
				axios: false,
				shadcn: false,
				vitest: true,
				router: false,
				biome: false,
			};

			await setupProject(projectDir, userChoices);

			expect(setupVitest).toHaveBeenCalledWith(projectDir, true);
		});

		it("should handle a full setup including Vitest", async () => {
			const projectDir = "test-project";
			const userChoices = {
				typescript: true,
				tailwind: true,
				axios: true,
				shadcn: true,
				vitest: true,
				router: false,
				biome: false,
			};

			await setupProject(projectDir, userChoices);

			expect(installVite).toHaveBeenCalledWith(true);
			expect(installDependencies).toHaveBeenCalledWith(userChoices);
			expect(setupTailwind).toHaveBeenCalledWith(projectDir);
			expect(setupAxios).toHaveBeenCalledWith(projectDir);
			expect(setupShadcn).toHaveBeenCalledWith(projectDir);
			expect(setupVitest).toHaveBeenCalledWith(projectDir, true);
		});
	});

	describe("biome", () => {
		it("should set up Biome if selected", async () => {
			const projectDir = "test-project";
			const userChoices = {
				typescript: true,
				tailwind: false,
				axios: false,
				shadcn: false,
				router: false,
				vitest: false,
				biome: true,
			};

			await setupProject(projectDir, userChoices);

			expect(installVite).toHaveBeenCalledWith(true);
			expect(installDependencies).toHaveBeenCalledWith(userChoices);
			expect(createFolderStructure).toHaveBeenCalledWith(projectDir);
			expect(setupBiome).toHaveBeenCalledWith(projectDir);
			expect(setupTailwind).not.toHaveBeenCalled();
			expect(setupAxios).not.toHaveBeenCalled();
			expect(setupShadcn).not.toHaveBeenCalled();
			expect(setupVitest).not.toHaveBeenCalled();
		});

		it("should handle a full setup including Biome", async () => {
			const projectDir = "test-project";
			const userChoices = {
				typescript: true,
				tailwind: true,
				axios: true,
				shadcn: true,
				vitest: true,
				router: false,
				biome: true,
			};

			await setupProject(projectDir, userChoices);

			expect(installVite).toHaveBeenCalledWith(true);
			expect(installDependencies).toHaveBeenCalledWith(userChoices);
			expect(setupTailwind).toHaveBeenCalledWith(projectDir);
			expect(setupAxios).toHaveBeenCalledWith(projectDir);
			expect(setupShadcn).toHaveBeenCalledWith(projectDir);
			expect(setupVitest).toHaveBeenCalledWith(projectDir, true);
			expect(setupBiome).toHaveBeenCalledWith(projectDir);
		});
	});
});
