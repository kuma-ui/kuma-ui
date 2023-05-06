import { defineConfig } from 'tsup';

export default defineConfig({
  format: 'cjs',
  entry: ['src/jest-preset.ts'],
  outDir: './',
});
