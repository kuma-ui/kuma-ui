import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import fs from "fs";
import type { LoaderContext, RawLoaderDefinitionFunction } from "webpack";
import { createHash } from "crypto";
import { theme } from "@kuma-ui/sheet";
import { getUserTheme } from "./getUserTheme";
import KumaUIWebpackPlugin, { CSS_PATH } from "./plugin";

export const CSS_PARAM_NAME = "css";

type Options = {
  config?: string;
  plugin: KumaUIWebpackPlugin;
};

const kumaUiLoader: RawLoaderDefinitionFunction<Options> = function (
  source: Buffer,
) {
  // tell Webpack this loader is async
  const callback = this.async();
  const id = this.resourcePath;
  const { plugin } = this.getOptions();

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
    const params = new URLSearchParams({ [CSS_PARAM_NAME]: css });

    const importCSS = `import ${JSON.stringify(
      `${this.utils.contextify(this.context, CSS_PATH)}?${params.toString()}`,
    )};`;

    if (plugin.watchMode) {
      fs.writeFileSync(CSS_PATH, `/* ${Date.now()} */`);
    }

    callback(null, `${result.code}\n${importCSS};`);
    return;
  }
  callback(null, `${result.code}`);
};

export default kumaUiLoader;
