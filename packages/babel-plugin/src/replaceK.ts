import { NodePath, Node, types, template } from "@babel/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import printAST from 'ast-pretty-print';

/**
 * Processes the CallExpression nodes in the AST and replaces the 'k' function from '@kuma-ui/core'
 * with the corresponding HTML tag. This allows usage of the 'k' function as a shorthand for creating
 * styled components, e.g. <k.div> instead of <div>.
 *
 * @param {NodePath<types.Program>} node - The NodePath object representing the Program node.
 * @param {typeof types} t - The Babel types object.
 * @param {Record<string, string>} importedStyleFunctions - An object containing the imported styled functions.
 */
export const replaceK = (
  node: NodePath<types.Program>,
  t: typeof types,
  importedStyleFunctions: Record<string, string>
) => {
  node.traverse({
    CallExpression(path) {
      const { node } = path;

      if (
        node.callee.type === "MemberExpression" &&
        t.isIdentifier(node.callee.object) &&
        node.callee.object.name === "React" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "createElement" ||
          node.callee.property.name === "cloneElement")
      ) {
        const firstArg = path.get("arguments")[0];

        if (
          t.isMemberExpression(firstArg.node) &&
          t.isIdentifier(firstArg.node.object) &&
          firstArg.node.object.name === importedStyleFunctions["k"]
        ) {
          let htmlTag = t.isIdentifier(firstArg.node.property)
            ? firstArg.node.property.name
            : undefined;
          htmlTag ||= "div";
          firstArg.replaceWith(t.stringLiteral(htmlTag));
        }
      }

      if (node.callee.type === "Identifier" && node.callee.name === "_jsx") {
        const firstArg = path.get("arguments")[0];

        if (
          t.isMemberExpression(firstArg.node) &&
          t.isIdentifier(firstArg.node.object) &&
          firstArg.node.object.name === importedStyleFunctions["k"]
        ) {
          let htmlTag = t.isIdentifier(firstArg.node.property)
            ? firstArg.node.property.name
            : undefined;
          htmlTag ||= "div";
          firstArg.replaceWith(t.stringLiteral(htmlTag));
        }
      }
    },
  });
};
