const esModules = ["short-uuid"].join("|");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest/presets/js-with-ts",
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/**/*.spec.ts?(x)"],
    transform: {
        "^.+\\.[tj]sx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.test.json",
                useESM: true
            }
        ]
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    setupFiles: ["./test/jest.setup.js"],
    setupFilesAfterEnv: ["./test/setupFilesAfterEnv.ts"],
    transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`]
};
