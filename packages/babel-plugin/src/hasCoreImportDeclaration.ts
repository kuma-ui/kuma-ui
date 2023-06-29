import { type NodePath, types as t } from "@babel/core";

/**
 * Checks if the given AST program has an import declaration for "@kuma-ui/core".
 *
 * @param {NodePath<types.Program>} path - The current node in the AST being traversed.
 * @returns {boolean} - Returns true if a core import declaration exists, otherwise false.
 */
export function hasCoreImportDeclaration(path: NodePath<t.Program>) {
  const importDeclarations = path
    .get("body")
    .filter((node) => t.isImportDeclaration(node.node));
  return importDeclarations.some(
    (importDeclaration) =>
      t.isImportDeclaration(importDeclaration.node) &&
      importDeclaration.node.source.value === "@kuma-ui/core"
  );
}
