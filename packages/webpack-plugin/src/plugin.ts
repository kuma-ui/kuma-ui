import { Compiler } from "webpack";
import { theme } from "@kuma-ui/sheet";
import path from "path";
import { readdirSync, writeFileSync, existsSync } from "fs";
import { getUserTheme } from "./getUserTheme";
import { createRequire } from "module";
import { fileURLToPath } from "node:url";

// tsup will replace __ESM__ with true during ESM build and false during CJS build when bundling.
declare const __ESM__: boolean;

const _require = __ESM__ ? createRequire(import.meta.url) : require;

const _filename = __ESM__ ? fileURLToPath(import.meta.url) : __filename;
const _dirname = __ESM__ ? path.dirname(_filename) : __dirname;

export const CSS_PATH = (() => {
  const cssPath = path.join(_dirname, "..", "assets", "kuma.css");
  if (!existsSync(cssPath)) writeFileSync(cssPath, "");
  return cssPath;
})();

type KumaWebpackOptions = {
  /** The destination to emit an actual CSS file. This is a temporary workaround to enable HMR in Client Component @see loader.ts */
  outputDir?: string;
};

class KumaUIWebpackPlugin {
  /* @internal */
  config: string | undefined;
  /* @internal */
  watchMode = false;

  private outputDir: string | undefined;

  constructor(options: KumaWebpackOptions = {}) {
    this.outputDir = options.outputDir;

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

    compiler.hooks.watchRun.tap("@kuma-ui/webpack-plugin:watchRun", () => {
      this.watchMode = true;
    });

    compiler.options.module?.rules?.push(
      {
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: _require.resolve("./loader.js"),
            options: { plugin: this, outputDir: this.outputDir },
          },
        ],
      },
      {
        test: CSS_PATH,
        use: [
          {
            loader: _require.resolve("./cssLoader.js"),
            options: { plugin: this },
          },
        ],
      },
    );
  }
}

export default KumaUIWebpackPlugin;
