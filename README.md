# Enishi
Enishi is a project for the web frontend of enishi, built using React and TypeScript.

## Table Of Contents:
- [🗄️ Project Structure](docs/project-structure.md)

## Launch for development
### Prerequisites
- [anyenv](https://github.com/anyenv/anyenv)
    - nodenv
- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- VSCode Extensions
    - [code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    - [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [trailing-spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)
    - [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
    - [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [vscode-jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
        - When using anyenv, it may be necessary to add `"jest.jestCommandLine": "~/.anyenv/envs/nodenv/shims/yarn test"` to the VSCode settings.json file in order for Jest to run correctly.

### Setup
The following applications must be running as a prerequisite:
1. The enishi database is running with docker compose and the database migration has been completed.
2. The application-bff is running
3. The authentication-api is running
4. The storage-api is running.

For more details, please refer to the [README Development section](../../README.md#Development) in the repository root.

```bash
# Create a .env file
cp .env.sample .env

# Set the value based on the environment.
EDITOR .env

# Install Node.js with nodenv
nodenv install $(cat .node-version)

# Install yarn
npm install -g yarn

# Install dependencies
yarn
```

### Launch

```bash
# Launch app.enishi.pro
yarn dev
```

## Executing Test
```bash
yarn test

# check snapshots
yarn test --watch
```

## Commands for development
### Generate GraphQL Code
```bash
$ yarn codegen
```

### Check Code Dependency Rules
```bash
$ yarn depcruise
```

### Code Lint
```bash
$ yarn lint

# Auto fix
$ yarn lint --fix
```

### Code format
```bash
$ yarn format

# Auto fix
$ yarn format:fix
```

### Analyze file size
1. Uncomment `// new BundleAnalyzerPlugin()` in `webpack.config.js`
```js
...
    ...(NODE_ENV === "production" ? [
            new ESLintPlugin(),
            // new BundleAnalyzerPlugin(), // <- Uncomment
            new DuplicatePackageCheckerPlugin()
        ]                         : []
...
```

2. Execute build for production
```bash
yarn size-analyze
```

## Contribute Rule
### Before commit
It is recommended that you run `yarn pre-commit` before committing to perform formatting corrections, check lint and test results, and make sure that everything is working properly. However, it is not a requirement.

