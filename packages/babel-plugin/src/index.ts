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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- FIXME
          !parserOpts.plugins.some(
            (p: unknown) => (Array.isArray(p) ? p[0] : p) === pluginName
          )
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- FIXME
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
