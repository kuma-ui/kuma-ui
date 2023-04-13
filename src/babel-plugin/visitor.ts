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
import p from "path";

const v: PluginObj<PluginPass>["visitor"] = {};

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
        const styleStringArg = node.quasi;

        const component = t.isStringLiteral(componentArg)
          ? componentArg.value
          : t.isJSXElement(componentArg)
          ? componentArg
          : "div";
        const createElementAst = template.expression.ast(
          `
              (props) => React.${
                typeof component === "string"
                  ? `createElement("${component}"`
                  : `cloneElement(${component}`
              }, {
                "data-zero-styled": true,
                ...props,
              })`
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
