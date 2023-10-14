import { NodePath } from "@babel/core";
import { types } from "@babel/core";

/**
 * Ensures that a React import declaration exists in the given program.
 * If not, it adds the import declaration at the beginning of the program.
 *
 * @param {NodePath<t.Program>} programPath - The path to the Program node in the AST.
 * @param {typeof t} t - The Babel types.
 */
export function ensureReactImport(
  programPath: NodePath<types.Program>,
  t: typeof types,
) {
  const reactImportDeclaration = t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier("__React_Kuma_"))],
    t.stringLiteral("react"),
  );
  programPath.unshiftContainer("body", reactImportDeclaration);
}
