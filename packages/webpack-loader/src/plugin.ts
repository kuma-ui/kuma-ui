import type { Compilation, Compiler, NormalModule } from "webpack";
import { theme, sheet } from "@kuma-ui/sheet";
import { transform } from "@kuma-ui/babel-plugin";
import path from "path";
import { RawSource } from "webpack-sources";
import kumaUiLoader from "./loader";

type WebpackPluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
};

const pluginName = "KumaUIWebpackPlugin";

class KumaUIWebpackPlugin {
  options: WebpackPluginOption;

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
    compiler.hooks.afterCompile.tap(pluginName, (compilation: Compilation) => {
      const cssLookup: { [key: string]: string } = {};
      compilation.hooks.succeedModule.tap(pluginName, async (module) => {
        if ("resource" in module && typeof module.resource === "string") {
          const id = module.resource;
          if (
            id.includes("/node_modules/") ||
            id.includes("@kuma-ui/core") ||
            !/\.(t|j)(s|sx)?$/.test(id)
          ) {
            return;
          }
          if ("_source" in module) {
            const originalCode: string = (module._source as any).source();
            const result = await transform(originalCode, id);
            if (!result || !result.code) return;
            const cssFilename = path.normalize(
              `${id.replace(/\.[jt]sx?$/, "")}.css`
            );
            const cssRelativePath = path
              .relative(process.cwd(), cssFilename)
              .replace(/\\/g, path.posix.sep);
            const cssId = `/${cssRelativePath}`;
            const css = sheet.getCSS();
            cssLookup[cssFilename] = css;
            cssLookup[cssId] = css;
            console.log(cssLookup);
            console.log(result.code);
            module._source = new RawSource(result.code);
          }
        }
      });
    });
  }
}

export default KumaUIWebpackPlugin;
