import type { NodePath } from "@babel/core";
import { types as t, types } from "@babel/core";

export function collectImportedStyled(
  path: NodePath<t.Program>,
  t: typeof types
): Record<string, string> {
  const importedStyleFunctions: Record<string, string> = {};

  const importDeclarations = path
    .get("body")
    .filter((node) => t.isImportDeclaration(node.node));

  for (const importDeclaration of importDeclarations) {
    if (
      t.isImportDeclaration(importDeclaration.node) &&
      importDeclaration.node.source.value === "zero-styled/styled"
    ) {
      for (const specifier of importDeclaration.node.specifiers) {
        if (
          t.isImportSpecifier(specifier) &&
          t.isIdentifier(specifier.imported)
        ) {
          importedStyleFunctions[specifier.imported.name] =
            specifier.local.name;
        }
      }
    }
  }

  return importedStyleFunctions;
}
