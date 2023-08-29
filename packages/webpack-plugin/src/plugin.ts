import { Compiler } from "webpack";
import { buildSync } from "esbuild";
import eval from "eval";
import { theme } from "@kuma-ui/sheet";
import path from "path";
import { readdirSync } from "fs";
import { getUserTheme } from "./getUserTheme";

type WebpackPluginOption = {
  cssOutputDir?: string;
  virtualLoader?: boolean;
};

class KumaUIWebpackPlugin {
  private options: WebpackPluginOption;
  private config: string | undefined;

  static loader = require.resolve("./loader");

  constructor(options: WebpackPluginOption = {}) {
    this.options = options;

    const dir = readdirSync(".");
    dir.forEach((filePath) => {
      if (filePath.startsWith("kuma.config.")) {
        this.config = path.join(process.cwd(), filePath);
      }
    });

    if (this.config) {
      const userTheme = getUserTheme(this.config);
      if (userTheme) {
        theme.setUserTheme(userTheme);
      }
    }
  }

  apply(compiler: Compiler) {
    const userTheme = theme.getUserTheme();
    compiler.options.plugins.push(
      new compiler.webpack.DefinePlugin({
        "globalThis.__KUMA_USER_THEME__": JSON.stringify(userTheme),
      })
    );

    const { virtualLoader = true, cssOutputDir = ".kuma" } = this.options;

    compiler.options.module?.rules?.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: KumaUIWebpackPlugin.loader,
          options: {
            virtualLoader,
            cssOutputDir,
            config: this.config,
          },
        },
      ],
    });
  }
}

export default KumaUIWebpackPlugin;
