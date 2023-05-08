import { sheet } from "@kuma-ui/sheet";
import type { NodePath, types, template as Template } from "@babel/core";
import { Program } from "@babel/types";

/**
 * Processes a TaggedTemplateExpression and creates a new React component based on the styled function.
 * This function should be called before processing CallExpressions to ensure that the styles
 * defined within the tagged template literal are overridden by style props.
 *
 * @param {NodePath<Program>} nodePath - The NodePath object representing the Program node.
 * @param {typeof types} t - The Babel types object.
 * @param {typeof Template} template - The Babel template object.
 * @param {Record<string, string>} importedStyleFunctions - An object containing the imported styled functions.
 */
export const processTaggedTemplateExpression = (
  nodePath: NodePath<Program>,
  t: typeof types,
  template: typeof Template,
  importedStyleFunctions: Record<string, string>
) => {
  nodePath.traverse({
    TaggedTemplateExpression(path) {
      // Check if the tag is a CallExpression with the callee named 'styled'
      const { node } = path;

      const hasStyled = Object.keys(importedStyleFunctions).some(
        (key) =>
          t.isCallExpression(node.tag) &&
          t.isIdentifier(node.tag.callee) &&
          importedStyleFunctions[key] === node.tag.callee.name
      );
      if (!(t.isCallExpression(node.tag) && hasStyled)) return;
      const componentArg = node.tag.arguments[0];
      const cssStrings = node.quasi.quasis.map((quasi) => quasi.value.raw);
      // Remove newlines and extra spaces from cssStrings, and concatenate them
      const cssString = cssStrings
        .map((str) => str.replace(/\s+/g, " ").trim())
        .join("");
      const className = !!cssString ? sheet.addRule(cssString) : undefined;

      const component = t.isStringLiteral(componentArg)
        ? componentArg.value
        : t.isJSXElement(componentArg)
        ? componentArg
        : "div";
      const createElementAst = template.expression.ast(
        `
        (props) => {
            const existingClassName = props.className || "";
            const newClassName = "${className || ""}";
            const combinedClassName = [existingClassName, newClassName].filter(Boolean).join(" ");
            return React.${
              typeof component === "string"
                ? `createElement("${component}"`
                : `cloneElement(${component}`
            }, {
            "data-kuma-ui": "${true}",
            ...props,
            className: combinedClassName,
            });
        }`
      );
      path.replaceWith(createElementAst);
    },
  });
};
