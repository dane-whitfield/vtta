# Changelog

## [1.0.0] - 2024-09-16

- Initial release of the vtta CLI.
- Added commands to bootstrap a new Vite project with customisable options.
- Included installation of Tailwind CSS and React Router based on user choices.
- Automatically creates project structure with folders for components, pages, utils, and hooks.

## [1.0.1] - 2024-09-17

- Added option for initialising ShadCN.
- Abstracted project setup into a separate file for better readability and maintainability.
- Abstracted utils into a separate file for better readability and maintainability.
- Changed the default options for TypeScript, Tailwind CSS, and React Router.
- Added a check for ShadCN before initialising it.

## [1.1.0] - 2024-09-18

- Made repo public
- Added GH actions for:
  - Auto publishing to npm repository
  - Biome linting
  - Running CI checks

## [1.1.1] - 2024-09-18

- Link npm package to repo

## [1.1.2] - 2024-09-22

- Fixes:
  - https://github.com/dane-whitfield/vtta/issues/1
  - https://github.com/dane-whitfield/vtta/issues/2

## [1.2.0] - 2024-09-22

- Adds util function to check users current version against the latest package version
- Advises the user of any newer versions available

## [1.2.1] - 2024-09-24

- Fixes `/dist/src` entry path error for builds
