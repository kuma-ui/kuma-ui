import type { PluginObj } from "@babel/core";
import { visitor } from "./visitor";
import type { Core } from "./core";
import { transform } from "./transform";

const plugin = (core: Core): PluginObj => {
  return {
    name: "kuma-ui-plugin",
    manipulateOptions(opts, parserOpts) {
      const addPluginIfNotExists = (pluginName: string) => {
        if (
          !parserOpts.plugins.some(
            (p: unknown) => (Array.isArray(p) ? p[0] : p) === pluginName
          )
        ) {
          parserOpts.plugins.push(pluginName);
        }
      };
      addPluginIfNotExists("jsx");
      addPluginIfNotExists("typescript");
    },
    visitor: visitor(core),
  };
};
export { transform };
export default plugin;
