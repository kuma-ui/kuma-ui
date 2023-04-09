import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";
import {
  transform,
  transform as zeroStyledTransform,
} from "../babel-plugin/transform";
import { Plugin } from "vite";
import { sheet } from "../sheet";
import { join } from "path";
import react from "@vitejs/plugin-react";

export default function zeroStyled(): Plugin {
  return {
    name: "zero-styled",
    enforce: "post",
    async transform(code: string, id: string) {
      requireReact(code, id);
      if (id.includes("zero-styled/dist")) return;
      if (!/\.(t|j)sx?$/.test(id)) return;
      const result = await transform(code, id);
      return result?.code;
    },
    async writeBundle() {
      const css = sheet.getCSS();
      this.emitFile({
        type: "asset",
        fileName: "zero-styled.css",
        source: css,
      });
    },
  };
}

const requireReact = (code: string, id: string) => {
  if (id.endsWith(".jsx") || id.endsWith(".tsx")) {
    if (!/^\s*import\s+React\s+from\s+['"]react['"]/.test(code)) {
      return {
        code: "import React from 'react';\n" + code,
        map: { mappings: "" },
      };
    }
  }
};
