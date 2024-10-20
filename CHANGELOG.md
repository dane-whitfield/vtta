# Changelog

## 1.5.3

### Patch Changes

- 89240c2: Update import paths to .js

## 1.5.2

### Patch Changes

- 229cd37: Fix missing imports for prod

## 1.5.1

### Patch Changes

- 92a8ff2: Abstract utils out into their own files

## 1.5.0

### Minor Changes

- f63fb09: Added np auto release action

## 1.4.1

### Patch Changes

- 7911ccb: Add GH_PAT to secrets for release action
- 7f15d8b: Add PR perms to release action
- 9e40edb: Update lefthook pre-push cmd and release action
- 6b5ef6e: Fix pre-push hook
- a105ec6: Update push tag script for release action

## 1.4.0

### Minor Changes

- Use changeset actions

## 1.3.4

### Patch Changes

- amend release action

## 1.3.3

### Patch Changes

- Debug release CI action

## 1.3.2

### Patch Changes

- Update Build, Biome and Release CI's

## 1.3.1

### Patch Changes

- Adds changesets, commit linting and release action

## 1.3.0

- Implements feature request:
  - https://github.com/dane-whitfield/vtta/issues/9
  - adds new vitest option for both JavaScript and TypeScript setups.

## 1.2.1

- Fixes `/dist/src` entry path error for builds

## 1.2.0

- Adds util function to check users current version against the latest package version
- Advises the user of any newer versions available

## 1.1.2

- Fixes:
  - https://github.com/dane-whitfield/vtta/issues/1
  - https://github.com/dane-whitfield/vtta/issues/2

## 1.1.1

- Link npm package to repo

## 1.1.0

- Made repo public
- Added GH actions for:
  - Auto publishing to npm repository
  - Biome linting
  - Running CI checks

## 1.0.1

- Added option for initialising ShadCN.
- Abstracted project setup into a separate file for better readability and maintainability.
- Abstracted utils into a separate file for better readability and maintainability.
- Changed the default options for TypeScript, Tailwind CSS, and React Router.
- Added a check for ShadCN before initialising it.

## 1.0.0

- Initial release of the vtta CLI.
- Added commands to bootstrap a new Vite project with customisable options.
- Included installation of Tailwind CSS and React Router based on user choices.
- Automatically creates project structure with folders for components, pages, utils, and hooks.
