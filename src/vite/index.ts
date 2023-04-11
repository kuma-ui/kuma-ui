import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";
import { transform } from "../babel-plugin/transform";
import { Plugin } from "vite";
import { sheet } from "../sheet";
import path from "path";
import { theme } from "../theme";

export type VitePluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
};

export default function zeroStyled(options?: VitePluginOption): Plugin {
  if (options?.breakpoints && Object.keys(options.breakpoints).length > 0) {
    theme.setBreakpoints(options.breakpoints);
  }

  return {
    name: "zero-styled",
    enforce: "post",
    async transform(code: string, id: string) {
      requireReact(code, id);
      if (id.includes("zero-styled/dist")) return;
      if (!/\.(t|j)sx?$/.test(id)) return;
      const result = await transform(code, id);
      if (!result?.code) return;
      return importCSS(result?.code, id);
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

const importCSS = (code: string, id: string) => {
  if (id.endsWith(".jsx") || id.endsWith(".tsx")) {
    const rootDir = process.cwd(); // the CSS file is in the root directory of the project (check writeCSSfile.ts)
    const currentFileDir = path.dirname(id);
    const relativePathToRoot = path.relative(currentFileDir, rootDir);
    const cssImportPath = path
      .join(relativePathToRoot, "zero-styled.css")
      .replace(/\\/g, "/");
    return `import '${cssImportPath}';\n${code}`;
  }
};
