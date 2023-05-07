import { NodePath, Node, types, template } from "@babel/core";
import { Program } from "@babel/types";

export const processK = (
  node: NodePath<Program>,
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
    },
  });
};
