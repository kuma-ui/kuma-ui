import { NodePath, Node, types, template } from "@babel/core";

/**
 * Processes the JSXElement nodes in the AST and replaces the 'k' syntax from '@kuma-ui/core'
 * with corresponding 'Box' component. This allows usage of the 'k' syntax as a shorthand for creating
 * styled components, e.g. <k.div> is transformed to <Box as="div">.
 *
 * @param {NodePath<types.Program>} node - The NodePath object representing the Program node.
 * @param {typeof types} t - The Babel types object.
 * @param {Record<string, string>} importedStyleFunctions - An object containing the imported styled functions.
 */
export const replaceKwithBox = (
  node: NodePath<types.Program>,
  t: typeof types,
  importedStyleFunctions: Record<string, string>,
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
        if (
          closingElement &&
          t.isJSXMemberExpression(closingElement.name) &&
          t.isJSXIdentifier(closingElement.name.object, {
            name: importedStyleFunctions["k"],
          })
        ) {
          closingElement.name = t.jsxIdentifier(importedStyleFunctions["Box"]);
        }
        openingElement.attributes = [
          t.jsxAttribute(
            t.jsxIdentifier("as"),
            t.stringLiteral(openingElement.name.property.name),
          ),
          t.jsxAttribute(
            t.jsxIdentifier("IS_KUMA_DEFAULT"),
            t.jsxExpressionContainer(t.booleanLiteral(true)),
          ),
          ...openingElement.attributes,
        ];
        openingElement.name = t.jsxIdentifier(importedStyleFunctions["Box"]);
      }
    },
  });
};
