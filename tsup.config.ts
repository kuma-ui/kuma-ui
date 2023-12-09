import { defineConfig } from "tsup";

const entries = ["src", "!src/**/*.test.*", "!src/**__test__/**"];

export default defineConfig([
  {
    target: "esnext",
    clean: true,
    dts: true,
    format: "cjs",
    entry: entries,
    define: { __ESM__: "false" },
  },
  {
    target: "esnext",
    clean: true,
    dts: true,
    format: "esm",
    entry: entries,
    define: { __ESM__: "true" },
  },
]);
