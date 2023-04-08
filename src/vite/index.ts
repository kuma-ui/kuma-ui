import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";
import { transform as zeroStyledTransform } from "../babel-plugin/transform";
import { Plugin } from "vite";
import { sheet } from "../sheet";
import { join } from "path";

export default function zeroStyled(): Plugin {
  let mode = "";
  return {
    name: "zero-styled",
    enforce: "pre",
    async transform(code: string, id: string) {
      if (!/\.(t|j)sx?$/.test(id)) return;
      if (mode === "development") return;

      if (typeof process !== "undefined" && process.versions.node) {
        const { transform } = await import("../babel-plugin/transform");
        const result = transform(code, id);
        return result.code;
      }
    },
    async writeBundle() {
      const css = sheet.getCSS();
      if (typeof process !== "undefined" && process.versions.node) {
        const { promises: fs } = await import("fs");
        await fs.writeFile(join(process.cwd(), "zero-styled.css"), css);
      }
    },
    configResolved(config) {
      mode = config.mode;
    },
  };
}
