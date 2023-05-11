import { Compilation, Compiler, NormalModule } from "webpack";
import { theme, sheet } from "@kuma-ui/sheet";
import { transform } from "@kuma-ui/babel-plugin";
import { RawSource, Source } from "webpack-sources";
import path from "path";
import { rm, mkdir, existsSync } from "fs";

type Framework = "react" | "next-pageDir" | "next-appDir";

type WebpackPluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
  framework?: Framework;
};

export const tmpCSSDir = ".kuma";

const pluginName = "KumaUIWebpackPlugin";

class KumaUIWebpackPlugin {
  options: WebpackPluginOption;

  static loader = require.resolve("./loader");

  public tmpDir: string[] = [];

  constructor(options: WebpackPluginOption = { framework: "react" }) {
    this.options = options;
    if (
      this.options.breakpoints &&
      Object.keys(this.options.breakpoints).length > 0
    ) {
      theme.setBreakpoints(this.options.breakpoints);
    }
  }

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapAsync(pluginName, (_, callback) => {
      if (!existsSync(tmpCSSDir)) mkdir(tmpCSSDir, callback);
      else callback();
    });
    compiler.hooks.done.tapAsync(pluginName, (_, callback) => {
      if (existsSync(tmpCSSDir)) {
        // rm(tmpCSSDir, { recursive: true, force: true }, callback);
        callback();
      } else callback();
    });

    // compiler.hooks.compilation.tap(pluginName, (compilation) => {
    //   compilation.hooks.processAssets.tap(
    //     {
    //       name: pluginName,
    //       stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
    //     },
    //     (assets) => {
    //       Object.entries(assets).forEach(([pathname, source]) => {
    //         if (pathname.includes(".css")) {
    //           const css = sheet.getCSS();
    //           compilation.updateAsset(
    //             pathname,
    //             new compiler.webpack.sources.RawSource(css)
    //           );
    //         }
    //       });
    //     }
    //   );
    // });
  }
}

export default KumaUIWebpackPlugin;
