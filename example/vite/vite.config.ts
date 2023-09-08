import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import kumaUI from "@kuma-ui/vite";
import Inspect from "vite-plugin-inspect";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    kumaUI(),
    Inspect({
      build: true,
      outputDir: ".inspect",
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer(),
      ],
    },
  },
});
