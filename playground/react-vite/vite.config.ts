import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zeroStyled from "zero-styled/dist/vite/index.mjs";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            resolve(__dirname, "../../dist/babel-plugin/index.js"),
            {
              tagName: "styled",
            },
          ],
        ],
      },
    }),
    zeroStyled(),
  ],
  optimizeDeps: {
    include: ["@babel/core"],
  },
});
