---
title: Contributing to Kuma UI
description: Kuma UI - zero-runtime CSS-in-JS with type-safe utility props
---

First of all, thank you for considering contributing to Kuma UI 💕 Whether you're looking to fix bugs, add new features, or improve documentation, all contributions are greatly appreciated. Here are a few guidelines that should help you as you prepare your contribution.

## Getting Started

Setting up the project for local development is easy. Follow these steps:

1 - Fork the repository ([click the Fork button at the top of this page](https://github.com/poteboy/kuma-ui))

2 - Clone your forked repository locally:

```bash
git clone https://github.com/<your_github_username>/kuma-ui.git
cd kuma-ui
```

3 - Install the dependencies using pnpm:

```bash
pnpm install
```

## Development Process

Kuma UI is organized as a monorepo using [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/). Each component is treated as an independent package that can be consumed in isolation. The project uses [tsup](https://tsup.egoist.dev/) for bundling, [Changesets](https://github.com/changesets/changesets) for release management, and [Husky](https://typicode.github.io/husky/) for commit hooks to lint changes. Tests are run using GitHub Actions for continuous integration.


## Development Scripts

The `package.json` in the root directory contains several scripts for development:

- `pnpm install`: Installs the dependencies for the project.
- `pnpm run build`: Runs the build process for all packages.
- `pnpm test`: Runs the test suite for all packages.

## Contributing Code

Before you begin writing code, make sure your environment is set up by running `pnpm install` and `pnpm run build`. While you're developing, run `pnpm test` to make sure your changes don't break any existing functionality.

When you're ready to contribute, create a new branch from main, make your changes, and then open a pull request.

Please make sure all tests are passing and the changes work as expected in the `example` directory before you submit your pull request.

## Reporting Issues

If you discover a bug in Kuma UI, please provide a clear list of steps to reproduce the issue and any relevant code examples. Open an issue in the GitHub repository and fill out all the relevant sections in the issue template.

## Writing Blog Posts or Technical Articles

Writing about Kuma UI is another fantastic way to contribute! If you're interested in writing a blog post or technical article about Kuma UI, please feel free to reach out to the project author on Twitter at [@poteboy](https://twitter.com/_poteboy_). He would be more than happy to provide support and help you with your writing.


## Updating Documentation

Improving the project's documentation is always appreciated. Whether it's updating docstrings, writing tutorials, or improving the README, all contributions are welcome.

## License
By contributing your code to the Kuma UI GitHub repository, you agree to license your contribution under the MIT license.

Thank you for contributing to Kuma UI!