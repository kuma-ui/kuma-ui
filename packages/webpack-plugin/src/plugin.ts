import { Compilation, Compiler, NormalModule } from "webpack";
import { theme, sheet } from "@kuma-ui/sheet";
import { buildSync } from "esbuild";
import eval from "eval";
import fs from "fs";
import { transform } from "@kuma-ui/babel-plugin";
// import { RawSource, Source } from "webpack-sources";
import path from "path";
import { rm, mkdir, existsSync } from "fs";
import { readFileSync, readdirSync } from "fs";

type WebpackPluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
};

export const tmpCSSDir = ".kuma";
export const themeFilename = path.join(__dirname, "./theme.js");

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
        format: typeof require !== 'undefined' ? 'cjs' : 'esm',
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
