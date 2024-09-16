# vtta

A CLI tool to bootstrap a new Vite project with customisable options.

## Features

- Easily create a new Vite project with TypeScript, Tailwind CSS, and React Router options.
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

## Project Structure

The generated project will have the following structure:

```
my-vite-project/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ |  ├── api.ts
│ ├── hooks/
│ └── index.css
├── tailwind.config.js
└── package.json
```

## Development

### To build the project locally, run:

`npm run build`

### To link the package for local development:

`npm link`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Vite - The project bootstrapping tool.
- Chalk - For colourful terminal output.
- Commander - For building command-line interfaces.
- Inquirer - For user-friendly command-line prompts.
