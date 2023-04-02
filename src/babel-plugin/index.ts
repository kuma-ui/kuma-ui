// import { Sheet } from "../utils/sheet";
// import { relative, basename, join } from "path";
// import { readFileSync } from "fs";
// import { Core } from "../babel";
// import type { NodePath, PluginPass } from "@babel/core";
// import { type TaggedTemplateExpression } from "@babel/types";

// export default function zeroStyledPlugin({ types: t, template }: Core) {
//   return {
//     visitor: {
//       TaggedTemplateExpression(
//         path: NodePath<TaggedTemplateExpression>,
//         state: PluginPass
//       ) {
//         if (t.isIdentifier(path.node.tag) && path.node.tag.name === "styled") {
//           const styleSheet = new Sheet();
//           Object.assign(state, { styleSheet });

//           const templateLiteral = path.get("quasi");
//           const cssString = templateLiteral.node.quasis[0].value.raw;
//           const className = styleSheet.addRule(cssString);

//           path.replaceWith(t.stringLiteral(className));

//           const filename = state.file.opts.filename || "";
//           const output = relative(
//             process.cwd(),
//             filename.replace(/\.[^.]+$/, ".static.css")
//           );
//         }
//       },
//     },
//   };
// }

import { CallExpression, Identifier } from "@babel/types";
import type { NodePath, PluginObj } from "@babel/core";

const plugin = (): PluginObj => {
  return {
    name: "zero-styled-plugin",
    visitor: {
      CallExpression(path: NodePath<CallExpression>) {
        console.log("hello");
        const { node } = path;
        const { callee } = node;

        if (
          callee.type === "Identifier" &&
          (callee as Identifier).name === "styled"
        ) {
          const [templateLiteral] = node.arguments;
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
  return css.replace(/\s+/g, "");
}

export default plugin;
