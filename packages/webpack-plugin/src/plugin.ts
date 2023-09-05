import { Compiler } from "webpack";
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
    const { virtualLoader = true, cssOutputDir = ".kuma" } = this.options;
    const { config } = this;

    compiler.options.plugins.push(
      new compiler.webpack.DefinePlugin({
        ...(config
          ? {
              "globalThis.__KUMA_USER_THEME__":
                compiler.webpack.DefinePlugin.runtimeValue(
                  () => {
                    const userTheme = getUserTheme(config);
                    if (userTheme) {
                      theme.setUserTheme(userTheme);
                    }
                    return JSON.stringify(userTheme);
                  },
                  {
                    fileDependencies: [config],
                  }
                ),
            }
          : undefined),
      })
    );

    compiler.options.module?.rules?.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: KumaUIWebpackPlugin.loader,
          options: {
            virtualLoader,
            cssOutputDir,
            config,
          },
        },
      ],
    });
  }
}

export default KumaUIWebpackPlugin;
