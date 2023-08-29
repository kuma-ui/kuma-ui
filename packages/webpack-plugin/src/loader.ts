import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import fs from "fs";
import type { LoaderContext, RawLoaderDefinitionFunction } from "webpack";
import { createHash } from "crypto";
import { theme } from "@kuma-ui/sheet";
import { getUserTheme } from "./getUserTheme";

const virtualLoaderPath = require.resolve("./virtualLoader");

type Options = {
  config?: string;
  virtualLoader: boolean;
  cssOutputDir: string;
};

let prevConfigText: string | undefined;

const kumaUiLoader: RawLoaderDefinitionFunction<Options> = function (
  source: Buffer
) {
  // tell Webpack this loader is async
  const callback = this.async();
  const id = this.resourcePath;
  const { config, virtualLoader, cssOutputDir } = this.getOptions();

  if (config) {
    this.addDependency(config);
    const configText = fs.readFileSync(config, "utf8");
    const isChanged = configText !== prevConfigText;
    prevConfigText = configText;
    if (isChanged) {
      const userTheme = getUserTheme(config);
      if (userTheme) {
        theme.setUserTheme(userTheme);
      }
    }
  }

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
  const result = transform(source.toString(), id);
  if (!result || !result.code) {
    callback(null, source);
    return;
  }

  const css = (result.metadata as unknown as { css: string }).css || "";

  if (css) {
    const codePrefix = fileLoader(css, {
      context: this,
      isVirtualLoader: virtualLoader,
      outputDir: cssOutputDir,
    });

    callback(null, `${result.code}\n${codePrefix};`);
    return;
  }
  callback(null, `${result.code}`);
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
