import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zeroStyled from "zero-styled/vite";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    zeroStyled(),
  ],
  optimizeDeps: {
    include: ["@babel/core"],
  },
});
