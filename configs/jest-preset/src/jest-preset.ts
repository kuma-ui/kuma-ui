import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["<rootDir>/**/*.test.ts"],
  testEnvironment: "node",
  collectCoverage: true,
  errorOnDeprecated: true,
};

export default config;
