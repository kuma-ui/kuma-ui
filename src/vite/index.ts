import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";
import { Plugin } from "vite";
import { sheet } from "../core/sheet";
import { join } from "path";
const { transform } = require("@babel/standalone");

export default function zeroStyled(): Plugin {
  return {
    name: "zero-styled",
    enforce: "pre",
    async transform(code: string, id: string) {
      if (!/\.(t|j)sx?$/.test(id)) return;

      // const result = await babel.transformSync(code, {
      //   plugins: [zeroStyledPlugin],
      //   filename: id,
      // });
      // if (!result) return;

      // return result.code;
    },
    async writeBundle() {
      const css = sheet.getCSS();
      if (typeof process !== "undefined" && process.versions.node) {
        const { promises: fs } = await import("fs");
        await fs.writeFile(join(process.cwd(), "zero-styled.css"), css);
      }
    },
  };
}
