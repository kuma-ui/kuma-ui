import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zeroStyled from "zero-styled/dist/vite/index.js";
import { resolve } from "path";

// - Rename vite.config.js to vite.config.cjs to ensure the use of CommonJS module format.
// - Update import statement to import the .js file instead of .mjs, ensuring the correct module format is used in Vite configuration.
// - This change ensures consistent module formats and better compatibility with the Node.js environment used by Vite.

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
