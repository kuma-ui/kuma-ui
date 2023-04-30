import { Compiler, NormalModule } from "webpack";
import { theme } from "@kuma-ui/sheet";

type WebpackPluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
};

const pluginName = "KumaUIWebpackPlugin";

class KumaUI {
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
    compiler.hooks.normalModuleFactory.tap(pluginName, (nmf) => {
      nmf.hooks.parser.for("javascript/auto").tap(pluginName, (_) => {
        console.log("normalModuleFactory", _);
      });
    });

    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      const cssLookup: { [key: string]: string } = {};
      compilation.hooks.succeedModule.tap(pluginName, (module) => {
        if (module instanceof NormalModule) {
          console.log(module.resource);
        }
      });
    });
  }
}

export default KumaUI;
