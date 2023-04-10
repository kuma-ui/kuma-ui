import { NodePath, PluginObj, types as t } from "@babel/core";
import { CallExpression, JSXElement, JSXOpeningElement } from "@babel/types";
import {
  extractStylePropsFromAST,
  extractStylePropsFromObjectExpression,
} from "./extractStyleFromAST";
import { sheet } from "../sheet";
import { combinedStyles } from "../system";

export const processHTMLTag =
  (isJSX: boolean) =>
  (path: NodePath<t.JSXOpeningElement> | NodePath<t.ObjectExpression>) => {
    if (isJSX) {
      return processJSXHTMLTag(path as NodePath<t.JSXOpeningElement>);
    } else {
      return processReactCreateElementHTMLTag(
        path as NodePath<t.ObjectExpression>
      );
    }
  };

const processJSXHTMLTag = (path: NodePath<t.JSXOpeningElement>) => {
  const dataAttribute = path.node.attributes.some(
    (attr) => t.isJSXAttribute(attr) && attr.name.name === "data-zero-styled"
  );

  if (dataAttribute) return;
  const { filteredAttributes, styledProps } = extractStylePropsFromAST(
    path.node
  );
  // Update the attributes of the opening element by removing the styled props,
  // so that the styled props don't get passed down as regular HTML attributes.
  path.node.attributes = filteredAttributes;
  if (Object.keys(styledProps).length > 0) {
    const className = sheet.addRule(combinedStyles(styledProps));
    path.node.attributes.push(
      t.jsxAttribute(t.jsxIdentifier("className"), t.stringLiteral(className))
    );
  }
};

const processReactCreateElementHTMLTag = (
  path: NodePath<t.ObjectExpression>
) => {
  const dataAttribute = path.node.properties.some(
    (prop) =>
      t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key) &&
      prop.key.name === "data-zero-styled"
  );

  if (dataAttribute) return;
  const { filteredProperties, styledProps } =
    extractStylePropsFromObjectExpression(path.node);
  // Update the properties of the object expression by removing the styled props,
  // so that the styled props don't get passed down as regular HTML attributes.
  path.node.properties = filteredProperties;
  if (Object.keys(styledProps).length > 0) {
    console.log(styledProps);
    console.log(combinedStyles(styledProps));
    const className = sheet.addRule(combinedStyles(styledProps));
    path.node.properties.push(
      t.objectProperty(t.identifier("className"), t.stringLiteral(className))
    );
  }
};
