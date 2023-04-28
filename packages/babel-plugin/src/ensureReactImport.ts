import {NodePath} from "@babel/core";
import {types} from "@babel/core";

/**
 * Ensures that a React import declaration exists in the given program.
 * If not, it adds the import declaration at the beginning of the program.
 *
 * @param {NodePath<t.Program>} programPath - The path to the Program node in the AST.
 * @param {typeof t} t - The Babel types.
 */
export function ensureReactImport(
  programPath: NodePath<types.Program>,
  t: typeof types
) {
  let hasReactImport = false;

  programPath.node.body.forEach((node) => {
    if (t.isImportDeclaration(node) && node.source.value === "react") {
      hasReactImport = true;
    }
  });

  if (!hasReactImport) {
    const reactImportDeclaration = t.importDeclaration(
      [t.importDefaultSpecifier(t.identifier("React"))],
      t.stringLiteral("react")
    );
    programPath.unshiftContainer("body", reactImportDeclaration);
  }
}
