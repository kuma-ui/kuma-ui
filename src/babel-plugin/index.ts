import { sheet } from "../core/sheet";
import { relative, basename, join } from "path";
import { readFileSync } from "fs";
import { Core } from "../babel";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import {
  type TaggedTemplateExpression,
  CallExpression,
  Node,
} from "@babel/types";
import { serializeTemplateLiteral } from "../utils/serialize";
import { JSXElement, JSXExpressionContainer } from "@babel/types";

let count = 0;

const plugin = ({ types: t, template }: Core): PluginObj => {
  return {
    name: "zero-styled-plugin",
    visitor: {
      TaggedTemplateExpression(path) {
        // Check if the tag is a CallExpression with the callee named 'styled'
        const { node } = path;
        if (
          t.isCallExpression(node.tag) &&
          t.isIdentifier(node.tag.callee, { name: "styled" })
        ) {
          const componentArg = node.tag.arguments[0];
          const styleStringArg = node.quasi;
          const styleStringValue = styleStringArg.quasis
            .map((quasi) => quasi.value.cooked)
            .join("");
          const className = sheet.addRule(styleStringValue);
          console.log(className);

          const component = t.isStringLiteral(componentArg)
            ? componentArg.value
            : t.isJSXElement(componentArg)
            ? componentArg
            : "div";
          const createElementAst = template.expression.ast(
            `
            React.${
              typeof component === "string"
                ? `createElement("${component}"`
                : `cloneElement(${component}`
            }, {
              "data-zero-styled": true,
              "className": ${className},
            })`
          );
          path.replaceWith(createElementAst);
        }
      },
      JSXElement(path: NodePath<JSXElement>) {
        const openingElement = path.get("openingElement");

        if (t.isJSXOpeningElement(openingElement.node)) {
          const dataAttribute = openingElement.node.attributes.find(
            (attr) =>
              t.isJSXAttribute(attr) && attr.name.name === "data-zero-styled"
          );

          if (dataAttribute) {
            const componentName = openingElement.node.name;

            // Get the generated className from zeroStyledCall
            const className = ""; // Replace this line with the actual className

            // Create a new JSXAttribute for the className
            const classNameAttribute = t.jsxAttribute(
              t.jsxIdentifier("className"),
              t.stringLiteral(className)
            );

            // Append the classNameAttribute to the openingElement.node.attributes
            openingElement.node.attributes.push(classNameAttribute);
          }
        }
      },
      Program(path) {
        let hasReactImport = false;
        path.node.body.forEach((node) => {
          if (t.isImportDeclaration(node) && node.source.value === "react") {
            hasReactImport = true;
          }
        });

        if (!hasReactImport) {
          const reactImportDeclaration = t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier("React"))],
            t.stringLiteral("react")
          );
          path.unshiftContainer("body", reactImportDeclaration);
        }
      },
    },
  };
};

export default plugin;
