import type { PluginObj } from "@babel/core";
import { visitor } from "./visitor";
import type { Core } from "./core";
import { sheet } from "../sheet";
import { writeCSSFile } from "./writeCSSfile";
import path from "path";

const plugin = (core: Core): PluginObj => {
  return {
    name: "zero-styled-plugin",
    visitor: visitor(core),
    post(state) {
      const css = sheet.getCSS();
      writeCSSFile(css);
    },
  };
};

export default plugin;
