import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import fs from "fs";
import eval from "eval";
import type { LoaderContext, RawLoaderDefinitionFunction } from "webpack";
import { sheet, styleMap } from "@kuma-ui/sheet";
import { writeFile, mkdtempSync } from "fs";
import { createHash } from "crypto";
import { tmpCSSDir } from "./plugin";

const virtualLoaderPath = require.resolve("./virtualLoader");

type Options = {
  virtualLoader?: boolean;
  cssOutputDir?: string;
  cssSrc: string;
};

const kumaUiLoader: RawLoaderDefinitionFunction<Options> = function (
  source: Buffer
) {
  // tell Webpack this loader is async
  const callback = this.async();
  const id = this.resourcePath;

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

      const css =
        ((result.metadata as unknown as { css: string }).css as string) || "";

      if (css) {
        const codePrefix = fileLoader(css, {
          context: this,
          isVirtualLoader: isVirtualLoader,
          outputDir: options.cssOutputDir || "kuma",
        });

        const codePrefixTheme = fileLoader(options.cssSrc, {
          context: this,
          isVirtualLoader: isVirtualLoader,
          outputDir: options.cssOutputDir || "kuma",
        });

        callback(
          null,
          `${result.code}\n${codePrefix};${codePrefixTheme}`
        );
        return
      }
      callback(null, `${result.code}`);
    })
    .catch((error) => {
      callback(error);
    });
};

export default kumaUiLoader;

export const DUMMY_CSS_FILE_PATH = require.resolve("../assets/kuma.css");

export function fileLoader(
  src: string,
  options: {
    context: LoaderContext<unknown>;
    isVirtualLoader: boolean;
    outputDir: string;
  }
) {
  if (options.isVirtualLoader) {
    const virtualResourceLoader = `${virtualLoaderPath}?${JSON.stringify({
      src: src,
    })}`;
    return `import ${JSON.stringify(
      options.context.utils.contextify(
        options.context.context || options.context.rootContext,
        `kuma.css!=!${virtualResourceLoader}!${DUMMY_CSS_FILE_PATH}`
      )
    )};`;
  } else {
    const outDir = options.outputDir;
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const hash = createHash("md5").update(src).digest("hex");
    const srcPath = path.posix.join(outDir, `${hash}.css`);
    fs.writeFileSync(srcPath, src);
    return `import "${srcPath}";`;
  }
}
