import type { PluginObj } from "@babel/core";
import { visitor } from "./visitor";
import type { Core } from "./core";
import { transform } from "./transform";

const plugin = (core: Core): PluginObj => {
  return {
    name: "kuma-ui-plugin",
    manipulateOptions(opts, parserOpts) {
      if (!process.env.BABEL_8_BREAKING) {
        // If the Typescript plugin already ran, it will have decided whether
        // or not this is a TSX file.
        if (
          parserOpts.plugins.some(
            (p: unknown) => (Array.isArray(p) ? p[0] : p) === "typescript"
          )
        ) {
          return;
        }
      }
      parserOpts.plugins.push("jsx");
    },
    visitor: visitor(core),
  };
};
export { transform };
export default plugin;
