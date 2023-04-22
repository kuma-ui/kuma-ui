import { NodePath, PluginObj, types as t } from "@babel/core";
import { CallExpression, JSXElement, JSXOpeningElement } from "@babel/types";
import {
  extractStylePropsFromAST,
  extractStylePropsFromObjectExpression,
} from "./extractStyleFromAST";
import { sheet } from "../sheet";
import { all } from "../system";
import { PseudoProps, pseudoMappings } from "src/system/pseudo";

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
  const { filteredAttributes, styledProps, pseudoProps } =
    extractStylePropsFromAST(path.node);
  // Update the attributes of the opening element by removing the styled props,
  // so that the styled props don't get passed down as regular HTML attributes.
  path.node.attributes = filteredAttributes;
  if (Object.keys(styledProps).length > 0) {
    // FIXME: Currently, the style functions are applied directly using 'all' function.
    // In the future, we might want to look up the functions from the styledFunctionsMap
    // by using the hashed key stored in the data-zero-styled property.
    const style = all(styledProps);
    const className = sheet.addRule(style.base);
    for (const [breakpoint, css] of Object.entries(style.media)) {
      sheet.addMediaRule(className, css, breakpoint);
    }
    for (const [pseudoKey, pseudoValue] of Object.entries(pseudoProps)) {
      const pseudoStyle = all(pseudoValue);
      const pseudo = pseudoMappings[pseudoKey as keyof PseudoProps];
      sheet.addPseudoRule(className, pseudoStyle.base, pseudo);
      for (const [breakpoint, css] of Object.entries(pseudoStyle.media)) {
        sheet.addMediaRule(`${className}${pseudo}`, css, breakpoint);
      }
    }
    path.node.attributes.push(
      t.jsxAttribute(t.jsxIdentifier("className"), t.stringLiteral(className))
    );
  }
};

const processReactCreateElementHTMLTag = (
  path: NodePath<t.ObjectExpression>
) => {
  const { filteredProperties, styledProps, pseudoProps } =
    extractStylePropsFromObjectExpression(path, path.node);
  // Update the properties of the object expression by removing the styled props,
  // so that the styled props don't get passed down as regular HTML attributes.
  path.node.properties = filteredProperties;
  if (Object.keys(styledProps).length > 0) {
    // FIXME: Currently, the style functions are applied directly using 'all' function.
    // In the future, we might want to look up the functions from the styledFunctionsMap
    // by using the hashed key stored in the data-zero-styled property.
    const style = all(styledProps);
    const className = sheet.addRule(style.base);
    for (const [breakpoint, css] of Object.entries(style.media)) {
      sheet.addMediaRule(className, css, breakpoint);
    }

    for (const [pseudoKey, pseudoValue] of Object.entries(pseudoProps)) {
      const pseudoStyle = all(pseudoValue);
      const pseudo = pseudoMappings[pseudoKey as keyof PseudoProps];
      sheet.addPseudoRule(className, pseudoStyle.base, pseudo);
      for (const [breakpoint, css] of Object.entries(pseudoStyle.media)) {
        sheet.addMediaRule(`${className}${pseudo}`, css, breakpoint);
      }
    }

    path.node.properties.push(
      t.objectProperty(t.identifier("className"), t.stringLiteral(className))
    );
  }
};
