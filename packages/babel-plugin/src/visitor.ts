import { sheet } from "@kuma-ui/sheet";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import {
  JSXElement,
  JSXExpressionContainer,
  ObjectExpression,
} from "@babel/types";
import { ensureReactImport } from "./ensureReactImport";
import type { Core } from "./core";
import { processHTMLTag } from "./processHTMLTag";
import { Node } from "@babel/core";
import { collectImportedStyled } from "./collectImportedStyled";
import { processK } from "./processK";
import { processTaggedTemplateExpression } from "./processTaggedTemplateExpression";

export const styledFunctionsMap = new Map<string, Node[]>();

export const visitor = ({ types: t, template }: Core) => {
  // Keep track of the local name for the imported 'styled' function from '@kuma-ui/core'
  // This is necessary to handle cases where the 'styled' function is imported with a different name
  let importedStyleFunctions: Record<string, string> = {};

  const visitor: PluginObj<PluginPass>["visitor"] = {
    // JSXElement(path: NodePath<JSXElement>) {
    //   const openingElement = path.get("openingElement");

    //   if (t.isJSXOpeningElement(openingElement.node)) {
    //     processHTMLTag(openingElement);
    //   }
    // },
    CallExpression(path) {
      const { node } = path;
      if (
        node.callee.type === "MemberExpression" &&
        t.isIdentifier(node.callee.object) &&
        node.callee.object.name === "React" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "createElement" ||
          node.callee.property.name === "cloneElement")
      ) {
        processHTMLTag(path.get("arguments.1") as NodePath<ObjectExpression>);
      }
    },
    Program: {
      enter(path) {
        // Ensure that 'React' is imported in the file
        ensureReactImport(path, t);
        // Reset the importedStyleFunctions
        importedStyleFunctions = collectImportedStyled(path, t);
        // Replace the 'k' function from '@kuma-ui/core' with the corresponding HTML tag
        processK(path, t, importedStyleFunctions);
        // Process TaggedTemplateExpressions with styled components and generate the hashed classNames
        processTaggedTemplateExpression(
          path,
          t,
          template,
          importedStyleFunctions
        );
      },
    },
  };
  return visitor;
};
