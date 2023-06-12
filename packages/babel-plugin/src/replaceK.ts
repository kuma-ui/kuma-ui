import { NodePath, Node, types, template } from "@babel/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import printAST from "ast-pretty-print";

/**
 * Processes the CallExpression nodes in the AST and replaces the 'k' function from '@kuma-ui/core'
 * with the corresponding HTML tag. This allows usage of the 'k' function as a shorthand for creating
 * styled components, e.g. <k.div> instead of <div>.
 *
 * @param {NodePath<types.Program>} node - The NodePath object representing the Program node.
 * @param {typeof types} t - The Babel types object.
 * @param {Record<string, string>} importedStyleFunctions - An object containing the imported styled functions.
 */
export const replaceK = (
  node: NodePath<types.Program>,
  t: typeof types,
  importedStyleFunctions: Record<string, string>
) => {
  node.traverse({
    JSXElement(path) {
      const { openingElement, closingElement } = path.node;

      if (
        t.isJSXMemberExpression(openingElement.name) &&
        t.isJSXIdentifier(openingElement.name.object, {
          name: importedStyleFunctions["k"],
        })
      ) {
        openingElement.name = openingElement.name.property;
      }
      if (
        closingElement &&
        t.isJSXMemberExpression(openingElement.name) &&
        t.isJSXIdentifier(openingElement.name.object, {
          name: importedStyleFunctions["k"],
        })
      ) {
        openingElement.name = openingElement.name.property;
      }
    },
  });
};
