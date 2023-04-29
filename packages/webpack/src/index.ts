import type { Compiler } from "webpack";
import { theme } from "@kuma-ui/sheet";

type WebpackPluginOption = {
  breakpoints?: Record<string, string>; // {sm: '400px', md: '700px'}
};

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
    compiler.hooks.normalModuleFactory;
  }
}

export default KumaUI;
