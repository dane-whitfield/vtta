# vtta

A CLI tool to bootstrap a new Vite project with customisable options.

## Features

- Easily create a new Vite project with options for:
  -  TypeScript
  -  Tailwind CSS
  -  React Router
  -  ShadCN
  -  Vitest
  -  Biome
  -  And more...
- Interactive prompts or defaults for quick setup.
- Automatically installs dependencies and configures the project structure.


## Installation

You can install the package globally using npm:

```
npm install -g vtta
```

or use without installing with:

```
npx vtta <project-name>
```

## Usage

To create a new Vite project, run:
`vtta <project-name>`
Options
`-y`, `--yes`: Skip prompts and use default options (TypeScript, Tailwind CSS, and React Router will be enabled).

### Example

To create a new Vite project with the default options:

```
vtta your-project-name -y
```

Or, for a customized setup:

```
vtta your-project-name
```

_You will be prompted to select options for TypeScript, Tailwind CSS, and React Router._

### ShadCN Option
When the ShadCN option is selected, the setup will include:

- ShadCN UI components (including a basic starter button).
- Configurations for `tsconfig.json`, `tsconfig.app.json` and `vite.config.ts` to include path aliases for ShadCN components.
- Preconfigured `components.json` with ShadCN settings which you can further customise.

## Project Structure

The generated project will have the following structure:

```
my-vite-project/
├── public/
├── src/
│ ├── components/
│ |  ├── ui/
│ |  |  ├── button.tsx
│ ├── pages/
│ ├── utils/
│ |  ├── api.ts
│ ├── hooks/
│ └── index.css
├── tailwind.config.js
└── package.json
```
If ShadCN is enabled, the `src/components` folder will include ShadCN UI components.

## Development

### To build the project locally, run:

`npm run build`

### To link the package for local development:

`npm link`

# Contribution Guide

Welcome to the vtta project! We're excited to have you contribute. To ensure a smooth workflow, please follow the steps below when creating new branches, making changes, and preparing for a release.

## Workflow Overview

1. **Create a New Branch**
   - Start by creating a new branch from the main branch. Use a descriptive name for your branch related to the changes you're making.
   ```bash
   git checkout main
   git pull origin main
   git checkout -b your-feature-branch-name
   ```

2. **Make Your Changes**
   - Make the necessary changes to the codebase. Be sure to run tests and linting to ensure your changes work as expected. These will also be run during the pre-commit phase for you.

3. **Create a Changeset**
   - Once your changes are ready, run the following command to create a changeset:
   ```bash
   npx changeset
   ```
   - Follow the prompts in the CLI to specify what has changed and the type of version bump (patch, minor, or major). Please stick to using patch for bug fixes and minor for new features unless they are large features then feel free to use major.

5. **Commit Your Changes**
   - Stage and commit your changes, including the new changeset file and any updates to your code:
   ```bash
   git add .
   git commit -m "fix: describe your changes and the changeset"
   ```

6. **Push Your Branch**
   - Push your changes to the remote repository:
   ```bash
   git push origin your-feature-branch-name
   ```

   _If at this point you haven't ran the `npx changeset` command, then you will be unable to push your changes until this has been done._

7. **Open a Pull Request**
   - Go to GitHub and open a pull request (PR) from your branch into `main`. Ensure to describe your changes and mention any relevant issues.

## Note on Changeset Enforcement

- Before you can push your branch, you will encounter a pre-push hook that checks for changesets. If you forget to run `npx changeset` before pushing, you'll receive a warning. Please ensure that you run this command to avoid any issues.

## Merging PRs

- Once your PR is approved and merged into `main` by a `CODEOWNER`, a GitHub Action will automatically handle the release process. This will:
  - Create a temporary PR called `Version Packages` in a new branch `changeset-release/main`. Which does the following:
    - Version the package.
    - Update the `CHANGELOG.md`.
  - Once this temporary PR is merged to main by a CODEOWNER it will:
    - Put your changes and the version bump officially onto `main`.
    - Allow us to run `npm publish` to release the newest version to `npm`.

Thank you for contributing to vtta! If you have any questions or need assistance, feel free to ask.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Vite - The project bootstrapping tool.
- Chalk - For colorful terminal output.
- Commander - For building command-line interfaces.
- Inquirer - For user-friendly command-line prompts.
- ShadCN - For pre-built components in the project.
