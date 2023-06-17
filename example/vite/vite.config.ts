import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import kumaUI from "@kuma-ui/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    kumaUI({
      breakpoints: { sm: "400px", md: "700px" },
    }),
  ],
});
