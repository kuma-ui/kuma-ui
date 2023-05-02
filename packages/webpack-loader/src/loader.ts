import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import type { RawLoaderDefinitionFunction } from "webpack";
import { sheet } from "@kuma-ui/sheet";
import fs from "fs";

const kumaUiLoader: RawLoaderDefinitionFunction = function (source: Buffer) {
  // tell Webpack this loader is async
  const callback = this.async();
  const id = this.resourcePath;
  if (
    id.includes("/node_modules/") ||
    id.includes("@kuma-ui/core") ||
    !/\.(t|j)(s|sx)?$/.test(id)
  ) {
    callback(null, source);
    return;
  }

  const outputPath = this._compiler?.options.output.path;
  const cssFilenameAbsolute = path.normalize(
    `${id.replace(/\.[jt]sx?$/, "")}.css`
  );
  const cssFilenameRelativeToSrc = path.relative(
    this.rootContext,
    cssFilenameAbsolute
  );
  const cssFilenameRelativeToBuild =
    path.relative(this.rootContext, outputPath || "build") +
    "/" +
    cssFilenameRelativeToSrc;

  transform(source.toString(), id)
    .then(async (result) => {
      if (!result || !result.code) {
        callback(null, source);
        return;
      }
      const codeWithReact = requireReact(result.code, id);
      const codeWithCssImport =
        `import ${JSON.stringify("./" + cssFilenameRelativeToSrc)};\n` +
        codeWithReact;
      const css = sheet.getCSS();
      const codeWithInjectedCSS = injectCSS(css) + codeWithReact;

      this.emitFile(cssFilenameRelativeToBuild, css);
      callback(null, codeWithInjectedCSS);
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
