import { Compiler } from "webpack";
import { buildSync } from "esbuild";
import eval from "eval";
import { StyleGenerator } from "@kuma-ui/system";
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

    let css = "";

    const runtimeTheme = {
      components: {},
      tokens: userTheme.colors || {},
      breakpoints: userTheme.breakpoints || {}
    };

    for (const componentKey in userTheme.components) {
      const component = userTheme.components[componentKey as keyof typeof userTheme.components];
      const componentVariants = {};
      let componentBaseStyle = undefined;
      const style = new StyleGenerator(component?.baseStyle);
        css += style.getCSS();
        componentBaseStyle = style.getClassName()

      for (const variantKey in component?.variants) {
        const variant = component?.variants[variantKey];
        const style = new StyleGenerator(variant);
        css += style.getCSS();

        Object.assign(componentVariants, {
          [variantKey]: style.getClassName(),
        });
      }

      Object.assign(runtimeTheme.components, {
        [componentKey]: {
          baseStyle: componentBaseStyle,
          variants: componentVariants,
        },
      });
    }

    theme.setRuntimeUserTheme(runtimeTheme);

    compiler.options.plugins.push(
      new compiler.webpack.DefinePlugin({
        "globalThis.__KUMA_USER_THEME__": JSON.stringify(userTheme),
        "globalThis.__KUMA_RUNTIME_USER_THEME__": JSON.stringify(runtimeTheme),
      })
    );

    const outDir = this.options.cssOutputDir ?? ".kuma";

    compiler.options.module?.rules?.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: KumaUIWebpackPlugin.loader,
          options: {
            virtualLoader: this.options.virtualLoader ?? true,
            cssOutputDir: path.posix.join(process.cwd(), outDir),
            cssSrc: css,
          },
        },
      ],
    });
  }
}

export default KumaUIWebpackPlugin;
