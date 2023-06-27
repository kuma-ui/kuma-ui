import { transform } from "@kuma-ui/babel-plugin";
import { Plugin } from "vite";
import path from "path";
import { buildSync } from "esbuild";
import _eval from "eval";
import { theme, sheet } from "@kuma-ui/sheet";
import { readdirSync } from "fs";

export default function kumaUI(options: unknown): Plugin {
  let mode: "build" | "serve";

  const dir = readdirSync(".");
  let configPath: string | undefined;
  dir.forEach((filePath) => {
    if (filePath.startsWith("kuma.config.")) configPath = filePath;
  });

  if (configPath) {
    const filename = path.join(process.cwd(), configPath);
    const result = buildSync({
      bundle: true,
      target: "es2017",
      write: false,
      platform: "node",
      format: typeof require !== "undefined" ? "cjs" : "esm",
      absWorkingDir: process.cwd(),
      outfile: filename + ".out",
      entryPoints: [filename],
      logLevel: "silent",
    });

    const config = _eval(result.outputFiles[0].text, configPath) as {
      default: unknown;
    };

    if (config.default) {
      theme.setUserTheme(config.default as any);
    }
  }

  const cssLookup: { [key: string]: string } = {};

  return {
    name: "kuma-ui",
    enforce: "pre",
    async transform(code: string, id: string) {
      if (id.includes("@kuma-ui")) return;
      if (!/\.(t|j)(s|sx)?$/.test(id)) return;
      if (/node_modules/.test(id)) return;
      if (!code.includes("@kuma-ui/core")) return;

      requireReact(code, id);
      const result = await transform(code, id);
      if (!result?.code) return;
      const cssFilename = path.normalize(`${id.replace(/\.[jt]sx?$/, "")}.css`);
      const cssRelativePath = path
        .relative(process.cwd(), cssFilename)
        .replace(/\\/g, path.posix.sep);
      const cssId = `/${cssRelativePath}`;
      // const css = sheet.getCSS();
      const css =
        ((result.metadata as unknown as { css: string }).css as string) || "";
      cssLookup[cssFilename] = css;
      cssLookup[cssId] = css;
      sheet.reset();
      if (mode === "serve") return injectCSS(css, cssId) + result.code;
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

const injectCSS = (cssContent: string, fileId: string) => {
  return `
  (function() {
    if (typeof window === 'undefined') {
      return;
    }
    const css = ${JSON.stringify(cssContent)};
    const kumaStyleId = 'kuma-ui-styles-' + ${JSON.stringify(fileId)};
    let style = document.getElementById(kumaStyleId);
    const head = document.head || document.getElementsByTagName('head')[0];

    if (!style) {
      style = document.createElement('style');
      style.type = 'text/css';
      style.id = kumaStyleId;
      head.appendChild(style);
    }
    style.textContent = css;
  })();
  `;
};
