import { defineConfig } from 'tsup';
import external from "rollup-plugin-peer-deps-external";

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  plugins: [external()],
});
