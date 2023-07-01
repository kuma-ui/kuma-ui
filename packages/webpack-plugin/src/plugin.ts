import { Compilation, Compiler, NormalModule } from "webpack";
import { theme, sheet } from "@kuma-ui/sheet";
import { buildSync } from "esbuild";
import eval from "eval";
import { createHash } from "crypto";
import fs from "fs";
import { transform } from "@kuma-ui/babel-plugin";
// import { RawSource, Source } from "webpack-sources";
import path from "path";
import { rm, mkdir, existsSync } from "fs";
import { readFileSync, readdirSync } from "fs";

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

  userTheme: any;

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
    if (
      this.options.breakpoints &&
      Object.keys(this.options.breakpoints).length > 0
    ) {
      theme.setBreakpoints(this.options.breakpoints);
    }
  }

  apply(compiler: Compiler) {
    compiler.options.plugins.push(
      new compiler.webpack.DefinePlugin({
        "globalThis.USER_THEME": JSON.stringify(theme.getUserTheme()),
      })
    );

    const css = "";
    const outDir = this.options.cssOutputDir ?? ".kuma";
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const hash = createHash("md5").update(css).digest("hex");
    const cssPath = path.posix.join(outDir, `${hash}.css`);
    fs.writeFileSync(cssPath, css);

    compiler.options.module?.rules?.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: KumaUIWebpackPlugin.loader,
          options: {
            virtualLoader: this.options.virtualLoader ?? true,
            cssOutputDir: path.posix.join(process.cwd(), outDir),
            cssPath: path.posix.join(process.cwd(), cssPath),
          },
        },
      ],
    });
  }
}

export default KumaUIWebpackPlugin;
