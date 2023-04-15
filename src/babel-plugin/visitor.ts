import { Sheet, sheet } from "../sheet";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import { extractStylePropsFromAST } from "./extractStyleFromAST";
import {
  JSXElement,
  JSXExpressionContainer,
  ObjectExpression,
} from "@babel/types";
import { ensureReactImport } from "./ensureReactImport";
import type { Core } from "./core";
import { processHTMLTag } from "./processHTMLTag";
import { combineClassNames } from "./combineClassNames";
import { generateHash } from "../utils/hash";
import { Node } from "@babel/core";

export const styledFunctionsMap = new Map<string, Node[]>();

export const visitor = ({ types: t, template }: Core) => {
  const visitor: PluginObj<PluginPass>["visitor"] = {
    TaggedTemplateExpression(path) {
      // Check if the tag is a CallExpression with the callee named 'styled'
      const { node } = path;
      if (
        t.isCallExpression(node.tag) &&
        t.isIdentifier(node.tag.callee, { name: "styled" })
      ) {
        const componentArg = node.tag.arguments[0];
        const cssStrings = node.quasi.quasis.map((quasi) => quasi.value.raw);
        // Remove newlines and extra spaces from cssStrings, and concatenate them
        const cssString = cssStrings
          .map((str) => str.replace(/\s+/g, " ").trim())
          .join("");
        const className = !!cssString ? sheet.addRule(cssString) : undefined;
        const styleFunctions = node.quasi.expressions;
        console.log(styleFunctions);
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
      }
    },
    JSXElement(path: NodePath<JSXElement>) {
      const openingElement = path.get("openingElement");

      if (t.isJSXOpeningElement(openingElement.node)) {
        processHTMLTag(true)(openingElement);
      }
    },
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
        processHTMLTag(false)(
          path.get("arguments.1") as NodePath<ObjectExpression>
        );
      }
    },
    Program(path, pass) {
      ensureReactImport(path, t);
    },
  };
  return visitor;
};
