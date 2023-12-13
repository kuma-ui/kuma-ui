import { Compiler } from "webpack";
import { theme } from "@kuma-ui/sheet";
import path from "path";
import { readdirSync } from "fs";
import { getUserTheme } from "./getUserTheme";
import { createRequire } from "module";

// tsup replaces this with `true` for esm build and `false` for cjs build.
declare const __ESM__: boolean;

const _require = __ESM__ ? createRequire(import.meta.url) : require;

export const CSS_PATH = _require.resolve("../assets/kuma.css");

class KumaUIWebpackPlugin {
  private config: string | undefined;

  constructor() {
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
                  },
                ),
            }
          : undefined),
      }),
    );

    compiler.options.module?.rules?.push(
      {
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: _require.resolve("./loader.js"),
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
            loader: _require.resolve("./cssLoader.js"),
          },
        ],
      },
    );
  }
}

export default KumaUIWebpackPlugin;
