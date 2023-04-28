import type { PluginObj } from "@babel/core";
import { visitor } from "./visitor";
import type { Core } from "./core";
import { transform } from "./transform";

const plugin = (core: Core): PluginObj => {
  return {
    name: "kuma-ui-plugin",
    visitor: visitor(core),
  };
};
export { transform };
export default plugin;
