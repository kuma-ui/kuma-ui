import type { PluginObj } from "@babel/core";
import { visitor } from "./visitor";
import type { Core } from "./core";

const plugin = (core: Core): PluginObj => {
  return {
    name: "zero-styled-plugin",
    visitor: visitor(core),
  };
};

export default plugin;
