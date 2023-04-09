import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";
import {
  transform,
  transform as zeroStyledTransform,
} from "../babel-plugin/transform";
import { Plugin } from "vite";
import { sheet } from "../sheet";
import { join } from "path";

export default function zeroStyled(): Plugin {
  return {
    name: "zero-styled",
    enforce: "post",
    async transform(code: string, id: string) {
      if (!/\.(t|j)sx?$/.test(id)) return;
      transform(code, id);
      // if (typeof process !== "undefined" && process.versions.node) {
      //   const { transform } = await import("../babel-plugin/transform");
      //   const result = transform(code, id);
      //   return result.code;
      // }
    },
    async writeBundle() {
      const css = sheet.getCSS();
      const { promises: fs } = await import("fs");
      this.emitFile({
        type: "asset",
        fileName: "zero-styled.css",
        source: css,
      });
    },
    configureServer(server) {
      return () =>
        server.middlewares.use((req, res, next) => {
          if (req.url === "/zero-styled.css") {
            const css = sheet.getCSS();
            console.log(css);
            res.setHeader("Content-Type", "text/css");
            res.end(css);
          } else {
            return next();
          }
        });
    },
  };
}
