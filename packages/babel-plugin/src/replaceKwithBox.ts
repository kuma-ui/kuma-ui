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
export const replaceKwithBox = (
  node: NodePath<types.Program>,
  t: typeof types,
  importedStyleFunctions: Record<string, string>
) => {
  let boxName: string = importedStyleFunctions["Box"];

  node.traverse({
    JSXElement(path) {
      const { openingElement, closingElement } = path.node;
      importedStyleFunctions["Box"];
      if (
        t.isJSXMemberExpression(openingElement.name) &&
        t.isJSXIdentifier(openingElement.name.object, {
          name: importedStyleFunctions["k"],
        })
      ) {
        if (!boxName) {
          const localBoxName = "__Box";
          const reactImportDeclaration = t.importDeclaration(
            [
              t.importSpecifier(
                t.identifier(localBoxName),
                t.identifier("Box")
              ),
            ],
            t.stringLiteral("@kuma-ui/core")
          );
          node.unshiftContainer("body", reactImportDeclaration);
          boxName = localBoxName;
        }
        if (
          closingElement &&
          t.isJSXMemberExpression(closingElement.name) &&
          t.isJSXIdentifier(closingElement.name.object, {
            name: importedStyleFunctions["k"],
          })
        ) {
          closingElement.name = t.jsxIdentifier(boxName);
        }
        openingElement.attributes = [
          t.jsxAttribute(
            t.jsxIdentifier("as"),
            t.stringLiteral(openingElement.name.property.name)
          ),
          ...openingElement.attributes,
        ];
        openingElement.name = t.jsxIdentifier(boxName);
      }
    },
  });
};
