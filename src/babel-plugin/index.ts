import { Sheet } from "../utils/sheet";
import { relative, basename, join } from "path";
import { readFileSync } from "fs";
import { Core } from "../babel";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import { type TaggedTemplateExpression } from "@babel/types";

const sheet = new Sheet();

const plugin = ({ types: t, template }: Core): PluginObj => {
  return {
    name: "zero-styled-plugin",
    visitor: {
      TaggedTemplateExpression(
        path: NodePath<TaggedTemplateExpression>,
        state: PluginPass
      ) {
        if (t.isIdentifier(path.node.tag) && path.node.tag.name === "styled") {
          Object.assign(state, { sheet });

          const templateLiteral = path.get("quasi");
          const cssString = templateLiteral.node.quasis[0].value.raw;
          const className = sheet.addRule(cssString);

          path.replaceWith(t.stringLiteral(className));

          const filename = state.file.opts.filename || "";
          const output = relative(
            process.cwd(),
            filename.replace(/\.[^.]+$/, ".static.css")
          );
        }
      },
      Program: {
        exit() {
          // console.log(sheet.getCSS());
        },
      },
    },
  };
};

export default plugin;
