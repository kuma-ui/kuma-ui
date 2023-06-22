import { NodePath, Node, types, template } from "@babel/core";

/**
 * Processes the JSXElement nodes in the AST and replaces the 'k' syntax from '@kuma-ui/core'
 * with corresponding 'Box' component. This allows usage of the 'k' syntax as a shorthand for creating
 * styled components, e.g. <k.div> is transformed to <Box as="div">.
 *
 * If the 'Box' component is not imported, this function will create a new import statement for the 'Box' component
 * from '@kuma-ui/core' with the local name '__Box'.
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
          importedStyleFunctions["Box"] = localBoxName;
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
