import { transform } from "packages/compiler/dist";
import path from "path";
import fs from "fs";
import type { RawLoaderDefinitionFunction } from "webpack";
import { sheet, styleMap } from "@kuma-ui/sheet";
import { writeFile, mkdtempSync } from "fs";
import { createHash } from "crypto";
import { tmpCSSDir } from "./plugin";

const virtualLoaderPath = require.resolve("./virtualLoader");

export const DUMMY_CSS_FILE_PATH = require.resolve("../assets/kuma.css");

type Options = {
  virtualLoader?: boolean;
  cssOutputDir?: string;
};

const kumaUiLoader: RawLoaderDefinitionFunction<Options> = function (
  source: Buffer
) {
  // tell Webpack this loader is async
  const callback = this.async();
  const id = this.resourcePath;
  const tmpDir = "";

  const options = this.getOptions();
  const isVirtualLoader = options.virtualLoader ?? true;

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
      // const css = sheet.getCSS();
      // styleMap.set(id, css);
      // sheet.reset();

      const css =
        ((result.metadata as unknown as { css: string }).css as string) || "";
      let filePrefix = "";
      if (css) {
        if (isVirtualLoader) {
          const virtualResourceLoader = `${virtualLoaderPath}?${JSON.stringify({
            src: css,
          })}`;
          filePrefix = `import ${JSON.stringify(
            this.utils.contextify(
              this.context || this.rootContext,
              `kuma.css!=!${virtualResourceLoader}!${DUMMY_CSS_FILE_PATH}`
            )
          )};`;
          callback(null, `${codeWithReact}${filePrefix}`);
          return;
        } else {
          const outDir = options.cssOutputDir ?? ".kuma";
          if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
          const hash = createHash("md5").update(css).digest("hex");
          const cssPath = path.posix.join(outDir, `${hash}.css`);
          fs.writeFileSync(cssPath, css);
          const filePrefix = `import "${cssPath}";`;
          callback(null, `${codeWithReact}\n${filePrefix}`);
          return;
        }
      }
      callback(null, `${codeWithReact}`);
    })
    .catch((error) => {
      callback(error);
    });
};

export default kumaUiLoader;

const requireReact = (code: string, id: string) => {
  if (id.endsWith(".jsx") || id.endsWith(".tsx")) {
    if (!/^\s*import\s+React\s+from\s+['"]react['"]/.test(code)) {
      // return "import React from 'react';\n" + code;
      return code;
    }
  }
  return code;
};
