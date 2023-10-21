import { NodePath } from "@babel/core";
import { types } from "@babel/core";

/**
 * Ensures React is imported in the given program to satisfy JSX's Classic runtime requirement.
 * While React might already be imported, we can't determine the specifier name if a default import exists.
 * Thus, this function adds a separate React import declaration at the beginning of the program with a unique alias "__KUMA_REACT__".
 * This unique alias allows Kuma's compiler to safely refer to React (e.g., when using React.forwardRef to wrap styled components) without interfering with user-defined variable names.
 *
 * @param {NodePath<types.Program>} programPath - The path to the Program node in the AST.
 * @param {typeof types} t - The Babel types.
 */
export function ensureReactImport(
  programPath: NodePath<types.Program>,
  t: typeof types,
) {
  const reactImportDeclaration = t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier("__KUMA_REACT__"))],
    t.stringLiteral("react"),
  );
  programPath.unshiftContainer("body", reactImportDeclaration);
}
