import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import type { RawLoaderDefinitionFunction } from "webpack";
import { sheet } from "@kuma-ui/sheet";
import { writeFile, mkdtempSync } from "fs";
import { tmpCSSDir } from "./plugin";

const kumaUiLoader: RawLoaderDefinitionFunction = function (source: Buffer) {
  // tell Webpack this loader is async
  const callback = this.async();
  const id = this.resourcePath;
  const tmpDir = "";

  if (
    id.includes("/node_modules/") ||
    id.includes("@kuma-ui/core") ||
    !/\.(t|j)(s|sx)?$/.test(id)
  ) {
    callback(null, source);
    return;
  }

  const outputPath = this._compiler?.options.output.path;
  if (!outputPath) throw Error("output path is not correctly set");
  transform(source.toString(), id)
    .then(async (result) => {
      if (!result || !result.code) {
        callback(null, source);
        return;
      }
      const codeWithReact = requireReact(result.code, id);
      const css = sheet.getCSS();
      const codeWithInjectedCSS = injectCSS(css) + codeWithReact;
      const output = path.join(tmpCSSDir, "kuma.css");
      writeFile(output, css, () => {});

      const relativePathToRoot = path.relative(
        path.dirname(id),
        this.rootContext
      );
      const outputPath = path.join(relativePathToRoot, output);
      const adjustedPath =
        outputPath[0] !== "." ? `./${outputPath}` : outputPath;

      const codeWithDynamicCssImport = `${codeWithReact}\n\nrequire("${adjustedPath}");`;

      if (this._compiler?.options.mode === "production") {
        callback(null, codeWithDynamicCssImport);
      } else {
        // testing nextjs v13.4
        callback(null, codeWithDynamicCssImport);
        // callback(null, codeWithInjectedCSS);
      }
    })
    .catch((error) => {
      callback(error);
    });
};

export default kumaUiLoader;

const requireReact = (code: string, id: string) => {
  if (id.endsWith(".jsx") || id.endsWith(".tsx")) {
    if (!/^\s*import\s+React\s+from\s+['"]react['"]/.test(code)) {
      return "import React from 'react';\n" + code;
    }
  }
  return code;
};

const injectCSS = (cssContent: string) => {
  return `
  (function() {
    if (typeof window === 'undefined') {
      return;
    }
    const css = ${JSON.stringify(cssContent)};
    const kumaStyleId = 'kuma-ui-styles';
    let style = document.getElementById(kumaStyleId);
    const head = document.head || document.getElementsByTagName('head')[0];
    
    if (!style) {
      style = document.createElement('style');
      style.type = 'text/css';
      style.id = kumaStyleId;
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  })();
  `;
};

const tmp = () => {
  const css = sheet.getCSS();
  const tempDir = "temp";
  const output = path.join(mkdtempSync(tempDir), "kuma.css");
  writeFile(output, css, () => {});
  return output;
};
