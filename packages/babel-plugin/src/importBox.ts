import { NodePath, Node, types as t, template } from "@babel/core";

/**
 * If the 'Box' component is not imported, this function will create a new import statement for the 'Box' component
 * from '@kuma-ui/core' with the local name '__Box'.
 *
 * @param {NodePath<types.Program>} node - The NodePath object representing the Program node.
 * @param {Record<string, string>} importedStyleFunctions - An object containing the imported styled functions.
 */
export function importBox(
  node: NodePath<t.Program>,
  importedStyleFunctions: Record<string, string>,
) {
  let boxName: string = importedStyleFunctions["Box"];
  if (!boxName) {
    const localBoxName = "__Box";
    const reactImportDeclaration = t.importDeclaration(
      [t.importSpecifier(t.identifier(localBoxName), t.identifier("Box"))],
      t.stringLiteral("@kuma-ui/core"),
    );
    node.unshiftContainer("body", reactImportDeclaration);
    boxName = localBoxName;
  }
  importedStyleFunctions["Box"] = boxName;
}
