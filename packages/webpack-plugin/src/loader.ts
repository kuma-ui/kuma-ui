import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import type { RawLoaderDefinitionFunction } from "webpack";
import { sheet, styleMap } from "@kuma-ui/sheet";
import { writeFile, mkdtempSync } from "fs";

const virtualLoaderPath = require.resolve("./virtualLoader");

export const DUMMY_CSS_FILE_PATH = require.resolve("../assets/kuma.css");

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
      styleMap.set(id, css);
      sheet.reset();
      let filePrefix = "";
      if (css) {
        const virtualResourceLoader = `${virtualLoaderPath}?${JSON.stringify({
          src: css,
        })}`;

        filePrefix = `import ${JSON.stringify(
          this.utils.contextify(
            this.context || this.rootContext,
            `kuma.css!=!${virtualResourceLoader}!${DUMMY_CSS_FILE_PATH}`
          )
        )};`;
      }

      callback(null, `${filePrefix}\n${codeWithReact}`);
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

const tmp = () => {
  const css = sheet.getCSS();
  const tempDir = "temp";
  const output = path.join(mkdtempSync(tempDir), "kuma.css");
  writeFile(output, css, () => {});
  return output;
};
