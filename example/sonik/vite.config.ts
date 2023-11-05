import sonik from "sonik/vite";
import { defineConfig } from "vite";
import pages from "@sonikjs/cloudflare-pages";
import kumaUI from "@kuma-ui/vite";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [sonik(), pages(), kumaUI()],
});
