import { mergeConfig, defineConfig } from "vitest/config";
import { configShared } from "../../vitest.shared";

export default mergeConfig(
  configShared,
  defineConfig({
    test: {
      globals: true,
    },
  })
);
