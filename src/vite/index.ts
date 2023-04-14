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
  let mode: "build" | "serve";
  if (options?.breakpoints && Object.keys(options.breakpoints).length > 0) {
    theme.setBreakpoints(options.breakpoints);
  }
  const cssLookup: { [key: string]: string } = {};

  function filter(file: string) {
    return /\.(t|j)(s|sx)?$/.test(file);
  }

  return {
    name: "zero-styled",
    enforce: "post",
    async transform(code: string, id: string) {
      requireReact(code, id);
      if (id.includes("zero-styled/dist")) return;
      if (!filter(id)) return;
      const result = await transform(code, id);
      if (!result?.code) return;
      const cssFilename = path.normalize(`${id.replace(/\.[jt]sx?$/, "")}.css`);
      const cssRelativePath = path
        .relative(process.cwd(), cssFilename)
        .replace(/\\/g, path.posix.sep);
      const cssId = `/${cssRelativePath}`;
      const css = sheet.getCSS();
      cssLookup[cssFilename] = css;
      cssLookup[cssId] = css;
      if (mode === "serve") return injectCSS(css) + result.code;
      return `import ${JSON.stringify(cssFilename)};\n` + result.code;
    },
    load(url: string) {
      const [id] = url.split("?");
      return cssLookup[id];
    },
    resolveId(importeeUrl: string) {
      const [id, qsRaw] = importeeUrl.split("?");
      if (id in cssLookup) {
        if (qsRaw?.length) return importeeUrl;
        return id;
      }
    },
    handleHotUpdate({ server, file }) {
      sheet.reset();
      server.ws.send({ type: "full-reload" });
    },
    configResolved(config) {
      mode = config.command;
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

const injectCSS = (cssContent: string) => {
  return `
  (function() {
    const css = ${JSON.stringify(cssContent)};
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  })();
  `;
};
