import { defineConfig } from "vitest/config";

export const configShared = defineConfig({
  test: {
    environment: "node",
    coverage: {
      enabled: true,
      reporter: ["clover", "json", "lcov"],
    },
    typecheck: {
      checker: 'tsc',
      include: ['./**/*.test.*'],
    }
  },
});
