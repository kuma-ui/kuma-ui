import type { Compilation, Compiler, NormalModule } from "webpack";
import { theme, sheet } from "@kuma-ui/sheet";
import { transform } from "@kuma-ui/babel-plugin";
import { RawSource, Source } from "webpack-sources";

type WebpackPluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
};

const pluginName = "KumaUIWebpackPlugin";

class KumaUIWebpackPlugin {
  options: WebpackPluginOption;

  static loader = require.resolve("./loader");

  constructor({ options = {} }) {
    this.options = options;
    if (
      this.options.breakpoints &&
      Object.keys(this.options.breakpoints).length > 0
    ) {
      theme.setBreakpoints(this.options.breakpoints);
    }
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      const kumaUiCss = sheet.getCSS();
      const outputPath = "kuma-ui.css";
      compilation.assets[outputPath] = new compiler.webpack.sources.RawSource(
        kumaUiCss
      );
      callback();
    });

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          Object.entries(assets).forEach(([pathname, source]) => {
            if (pathname.includes(".css")) {
              const css = sheet.getCSS();
              compilation.updateAsset(
                pathname,
                new compiler.webpack.sources.RawSource(css)
              );
            }
          });
        }
      );
    });
  }
}

export default KumaUIWebpackPlugin;
