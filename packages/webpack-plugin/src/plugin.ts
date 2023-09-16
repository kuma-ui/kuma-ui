import { Compiler } from "webpack";
import { theme } from "@kuma-ui/sheet";
import path from "path";
import { readdirSync } from "fs";
import { getUserTheme } from "./getUserTheme";

// type WebpackPluginOption = {};

export const CSS_PATH = require.resolve("../assets/kuma.css");
export const cssLoader = require.resolve("./cssLoader");

class KumaUIWebpackPlugin {
  // private options: WebpackPluginOption;
  private config: string | undefined;

  static loader = require.resolve("./loader");

  constructor() {
    // options: WebpackPluginOption = {}
    // this.options = options;

    const dir = readdirSync(".");
    dir.forEach((filePath) => {
      if (filePath.startsWith("kuma.config.")) {
        this.config = path.join(process.cwd(), filePath);
      }
    });
  }

  apply(compiler: Compiler) {
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
                    // enable automatic rebuild for dynamic theme props
                    // <Box color={(() => "colors.red.100"))()} />
                    fileDependencies: [config],
                  }
                ),
            }
          : undefined),
      })
    );

    compiler.options.module?.rules?.push(
      {
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: KumaUIWebpackPlugin.loader,
            options: {
              config,
            },
          },
        ],
      },
      {
        test: CSS_PATH,
        use: [
          {
            loader: cssLoader,
          },
        ],
      }
    );
  }
}

export default KumaUIWebpackPlugin;
