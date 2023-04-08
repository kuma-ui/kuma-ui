import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";
import { Plugin } from "vite";
import { sheet } from "../core/sheet";
import { promises as fs } from "fs";
import { join } from "path";

export default function zeroStyled(): Plugin {
  return {
    name: "zero-styled",

    async transform(code: string, id: string) {
      if (!/\.(t|j)sx?$/.test(id)) return;

      const result = await babel.transformAsync(code, {
        plugins: [zeroStyledPlugin],
        filename: id,
      });
      if (!result) return;

      return result.code;
    },
    async writeBundle() {
      const css = sheet.getCSS();
      await fs.writeFile(join(process.cwd(), "zero-styled.css"), css);
    },
  };
}
