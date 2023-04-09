import { sheet } from "../sheet";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import { extractStylePropsFromAST } from "./extractStyleFromAST";
import { JSXElement, JSXExpressionContainer } from "@babel/types";
import { combinedStyles } from "../system";
import { ensureReactImport } from "./ensureReactImport";
import type { Core } from "./core";
import { insertStylesheetLink } from "./insertStylesheetLink";
import { promises as fs } from "fs";
import { join } from "path";

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
      insertStylesheetLink(path, t);
      const openingElement = path.get("openingElement");

      if (t.isJSXOpeningElement(openingElement.node)) {
        const dataAttribute = openingElement.node.attributes.some(
          (attr) =>
            t.isJSXAttribute(attr) && attr.name.name === "data-zero-styled"
        );

        if (dataAttribute) return;
        const { filteredAttributes, styledProps } = extractStylePropsFromAST(
          openingElement.node
        );
        // Update the attributes of the opening element by removing the styled props,
        // so that the styled props don't get passed down as regular HTML attributes.
        openingElement.node.attributes = filteredAttributes;
        if (Object.keys(styledProps).length > 0) {
          const className = sheet.addRule(combinedStyles(styledProps));
          // if (typeof process !== "undefined" && process.versions.node) {
          //   const css = sheet.getCSS();
          //   fs.writeFile(join(process.cwd(), "zero-styled.css"), css);
          // }
          openingElement.node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier("className"),
              t.stringLiteral(className)
            )
          );
        }
      }
    },
    Program(path) {
      ensureReactImport(path, t);
    },
  };
  return visitor;
};
