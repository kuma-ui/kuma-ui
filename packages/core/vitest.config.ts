import { mergeConfig, defineConfig } from "vitest/config";
import { configShared } from "../../vitest.shared";

export default mergeConfig(
  configShared,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: "src/tests/vitest.setup.ts",
    },
  }),
);
