import { Compiler } from "webpack";
import { buildSync } from "esbuild";
import eval from "eval";
import { theme } from "@kuma-ui/sheet";
import path from "path";
import { readdirSync } from "fs";

type WebpackPluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
  cssOutputDir?: string;
  virtualLoader?: boolean;
};

export const tmpCSSDir = ".kuma";

const pluginName = "KumaUIWebpackPlugin";

class KumaUIWebpackPlugin {
  options: WebpackPluginOption;

  static loader = require.resolve("./loader");

  public tmpDir: string[] = [];

  constructor(options: WebpackPluginOption = {}) {
    const dir = readdirSync(".");
    let configPath: string | undefined;
    dir.forEach((filePath) => {
      if (filePath.startsWith("kuma.config.")) {
        configPath = filePath;
      }
    });

    if (configPath) {
      const filename = path.join(process.cwd(), configPath);
      const result = buildSync({
        bundle: true,
        target: "es2017",
        write: false,
        platform: "node",
        format: typeof require !== "undefined" ? "cjs" : "esm",
        absWorkingDir: process.cwd(),
        outfile: filename + ".out",
        entryPoints: [filename],
        logLevel: "silent",
      });

      const config = eval(result.outputFiles[0].text, configPath) as {
        default: unknown;
      };

      if (config.default) {
        theme.setUserTheme(config.default as any);
      }
    }

    this.options = options;
  }

  apply(compiler: Compiler) {
    const userTheme = theme.getUserTheme();
    compiler.options.plugins.push(
      new compiler.webpack.DefinePlugin({
        "globalThis.__KUMA_USER_THEME__": JSON.stringify(userTheme),
      })
    );

    const outDir = this.options.cssOutputDir ?? "./.kuma";

    compiler.options.module?.rules?.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: KumaUIWebpackPlugin.loader,
          options: {
            virtualLoader: this.options.virtualLoader ?? true,
            cssOutputDir: outDir,
          },
        },
      ],
    });
  }
}

export default KumaUIWebpackPlugin;
