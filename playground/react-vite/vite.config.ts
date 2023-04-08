import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zeroStyled from "zero-styled/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), zeroStyled()],
});
