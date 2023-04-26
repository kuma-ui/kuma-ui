import { Sheet, sheet } from "../sheet";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import {
  JSXElement,
  JSXExpressionContainer,
  ObjectExpression,
} from "@babel/types";
import { ensureReactImport } from "./ensureReactImport";
import type { Core } from "./core";
import { processHTMLTag } from "./processHTMLTag";
import { generateHash } from "../utils/hash";
import { Node } from "@babel/core";
import { collectImportedStyled } from "./collectImportedStyled";
import { processZ } from "./processZ";

export const styledFunctionsMap = new Map<string, Node[]>();

export const visitor = ({ types: t, template }: Core) => {
  // Keep track of the local name for the imported 'styled' function from 'zero-styled'
  // This is necessary to handle cases where the 'styled' function is imported with a different name
  let importedStyleFunctions: Record<string, string> = {};

  const visitor: PluginObj<PluginPass>["visitor"] = {
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
      const styleFunctions = node.quasi.expressions;
      const key = generateHash(JSON.stringify(styleFunctions));
      styledFunctionsMap.set(key, styleFunctions);

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
                  "data-zero-styled": "${key}",
                  ...props,
                  className: combinedClassName,
                });
              }`
      );
      path.replaceWith(createElementAst);
    },
    // JSXElement(path: NodePath<JSXElement>) {
    //   const openingElement = path.get("openingElement");

    //   if (t.isJSXOpeningElement(openingElement.node)) {
    //     processHTMLTag(openingElement);
    //   }
    // },
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
        processHTMLTag(path.get("arguments.1") as NodePath<ObjectExpression>);
      }
    },
    Program: {
      enter(path) {
        ensureReactImport(path, t);
        // Reset the importedStyleFunctions
        importedStyleFunctions = collectImportedStyled(path, t);
        processZ(path, t, importedStyleFunctions);
      },
    },
  };
  return visitor;
};
