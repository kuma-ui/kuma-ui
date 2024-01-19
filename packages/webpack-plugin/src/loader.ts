import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import fs from "fs";
import type { LoaderContext, RawLoaderDefinitionFunction } from "webpack";
import { createHash } from "crypto";
import { theme } from "@kuma-ui/sheet";
import { getUserTheme } from "./getUserTheme";
import KumaUIWebpackPlugin, { CSS_PATH } from "./plugin";
import { createRequire } from "module";

export const CSS_PARAM_NAME = "css";

// tsup will replace __ESM__ with true during ESM build and false during CJS build when bundling.
declare const __ESM__: boolean;
const _require = __ESM__ ? createRequire(import.meta.url) : require;
const emptyCssExtractionFile = _require.resolve("../assets/kuma.css");

type Options = {
  config?: string;
  plugin: KumaUIWebpackPlugin;
  outputDir?: string;
};

const kumaUiLoader: RawLoaderDefinitionFunction<Options> = function (
  source: Buffer,
) {
  // tell Webpack this loader is async
  const callback = this.async();
  const id = this.resourcePath;
  const { plugin, outputDir } = this.getOptions();

  if (plugin.config) {
    // enable automatic rebuild for static theme props
    // <Box color={"colors.red.100"} />
    this.addDependency(plugin.config);
    const userTheme = getUserTheme(plugin.config);
    if (userTheme) {
      theme.setUserTheme(userTheme);
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
    /**
     * This is a temporary workaround to enable HMR (Hot Module Replacement) in Next.js client components.
     * Currently, Client Component doesn't account for virtual files, so we need to emit an actual CSS file.
     * TODO: Address and fix this issue.
     */
    if (outputDir) {
      const codePrefix = fileLoader(css, {
        context: this,
        outputDir: outputDir,
      });
      callback(null, `${result.code}\n${codePrefix};`);
      return;
    }

    const params = new URLSearchParams({ [CSS_PARAM_NAME]: css });

    const importCSS = `import ${JSON.stringify(
      `${this.utils.contextify(
        this.context,
        emptyCssExtractionFile,
      )}?${params.toString()}`,
    )};`;

    /**
     * n Next.js version 13.5 and later, changes made in virtual files are no longer recognized by Next.js. Therefore, we need to emit random changes in the entry CSS file to ensure they are taken into account.
     * @see {@link|https://github.com/vercel/next.js/discussions/59212}
     */
    fs.writeFileSync(emptyCssExtractionFile, `/* ${Date.now()} */`);

    callback(null, `${result.code}\n${importCSS};`);
    return;
  }
  callback(null, `${result.code}`);
};

export default kumaUiLoader;

export function fileLoader(
  src: string,
  options: {
    context: LoaderContext<unknown>;
    outputDir: string;
  },
) {
  const outDir = options.outputDir;
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const hash = createHash("md5").update(src).digest("hex");
  const srcPath = path.posix.join(outDir, `${hash}.css`);
  fs.writeFileSync(srcPath, src);

  // Compute the relative path from the current file location to the output directory
  const currentDir = options.context.context;
  const relativeSrcPath = path.relative(currentDir, srcPath);

  return `import "${relativeSrcPath}";`;
}
