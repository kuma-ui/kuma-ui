import { Sheet } from "../utils/sheet";
import { relative, basename, join } from "path";
import { readFileSync } from "fs";
import { Core } from "../babel";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import { type TaggedTemplateExpression } from "@babel/types";

const plugin = ({ types: t, template }: Core): PluginObj => {
  return {
    name: "zero-styled-plugin",
    visitor: {
      TaggedTemplateExpression(
        path: NodePath<TaggedTemplateExpression>,
        state: PluginPass
      ) {
        if (t.isIdentifier(path.node.tag) && path.node.tag.name === "styled") {
          const sheet = new Sheet();
          Object.assign(state, { sheet });
          console.log("hello");

          const templateLiteral = path.get("quasi");
          const cssString = templateLiteral.node.quasis[0].value.raw;
          // const className = sheet.addRule(cssString);

          // path.replaceWith(t.stringLiteral(className));

          // const filename = state.file.opts.filename || "";
          // const output = relative(
          //   process.cwd(),
          //   filename.replace(/\.[^.]+$/, ".static.css")
          // );
        }
      },
      ImportDeclaration(path) {
        console.log(path.node.source.value);
        if (path.node.source.value !== "styled") return;

        path.node.specifiers.forEach((specifier) => {
          if (!t.isImportDefaultSpecifier(specifier)) return;

          const bindingName = specifier.local.name;
          const binding = path.scope.getBinding(bindingName);

          binding?.referencePaths.forEach((referencePath) => {
            if (
              t.isTaggedTemplateExpression(referencePath.parentPath?.node) &&
              t.isTemplateLiteral(referencePath.parentPath?.node.quasi)
            ) {
              const templateLiteral = referencePath.parentPath?.node.quasi;
              const css = templateLiteral?.quasis[0].value.raw;
              if (css) {
                // const id = sheet.addRule(css);
                console.log("hello", css);
                // referencePath.parentPath?.replaceWith(t.stringLiteral(id));
              }
            }
          });
        });
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
