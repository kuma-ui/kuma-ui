import { CallExpression, Identifier } from "@babel/types";
import type { NodePath, PluginObj } from "@babel/core";

const plugin = (): PluginObj => {
  return {
    name: "zero-styled-plugin",
    visitor: {
      CallExpression(path: NodePath<CallExpression>) {
        const { node } = path;
        const { callee } = node;

        if (
          callee.type === "Identifier" &&
          (callee as Identifier).name === "styled"
        ) {
          const [templateLiteral] = node.arguments;
          console.log("ここまでは");

          if (templateLiteral.type === "TemplateLiteral") {
            const transformedCSS = transform(
              templateLiteral.quasis[0].value.raw
            );
            templateLiteral.quasis[0].value.raw = transformedCSS;
            templateLiteral.quasis[0].value.cooked = transformedCSS;
          }
        }
      },
    },
  };
};

function transform(css: string): string {
  return css.replace(/\s+/g, "hello");
}

export default plugin;
