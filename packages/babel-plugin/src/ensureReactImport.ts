import { NodePath } from "@babel/core";
import { types } from "@babel/core";

/**
 * Ensures that React is imported in the given program to satisfy JSX's Classic runtime requirement.
 * This function adds a React import declaration at the beginning of the program with a unique alias to avoid potential naming conflicts.
 *
 * Note: The unique alias "__React_Kuma_" is utilized in Kuma's compiler to safely refer to React (e.g., when using React.forwardRef to wrap styled components) without interfering with user-defined variable names.
 *
 * @param {NodePath<types.Program>} programPath - The path to the Program node in the AST.
 * @param {typeof types} t - The Babel types.
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
