import { NodePath, types as t } from "@babel/core";
import { JSXOpeningElement } from "@babel/types";
import { extractStyleProps } from "./extractStyleProps";
import { sheet } from "@kuma-ui/sheet";
import { all, PseudoProps } from "@kuma-ui/system";
import { pseudoMappings } from "@kuma-ui/system/dist/pseudo";

export const processHTMLTag = (
  path: NodePath<t.JSXOpeningElement> | NodePath<t.ObjectExpression>
) => {
  if (t.isJSXOpeningElement(path.node)) {
    return processJSXHTMLTag(path as NodePath<t.JSXOpeningElement>);
  } else {
    return processReactCreateElementHTMLTag(
      path as NodePath<t.ObjectExpression>
    );
  }
};

const processJSXHTMLTag = (path: NodePath<t.JSXOpeningElement>) => {
  const dataAttribute = path.node.attributes.some(
    (attr) => t.isJSXAttribute(attr) && attr.name.name === "data-kuma-ui"
  );

  if (dataAttribute) return;
  const { filteredAttributes, styledProps, pseudoProps } =
    extractStyleProps(path);
  // Update the attributes of the opening element by removing the styled props,
  // so that the styled props don't get passed down as regular HTML attributes.
  path.node.attributes = filteredAttributes;
  const existingClassName = (() => {
    for (const attr of filteredAttributes) {
      if (
        t.isJSXAttribute(attr) &&
        t.isJSXIdentifier(attr.name) &&
        attr.name.name === "className" &&
        t.isStringLiteral(attr.value)
      ) {
        return attr.value.value;
      }
    }
    return null;
  })();

  if (Object.keys(styledProps).length > 0) {
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
    const combinedClassName = [existingClassName, className]
      .filter(Boolean)
      .join(" ");
    path.node.attributes.push(
      t.jsxAttribute(
        t.jsxIdentifier("className"),
        t.stringLiteral(combinedClassName)
      )
    );
  }
};

const processReactCreateElementHTMLTag = (
  path: NodePath<t.ObjectExpression>
) => {
  const { filteredProperties, styledProps, pseudoProps } =
    extractStyleProps(path);
  // Update the properties of the object expression by removing the styled props,
  // so that the styled props don't get passed down as regular HTML attributes.
  path.node.properties = filteredProperties;

  const existingClassName = (() => {
    for (const prop of filteredProperties) {
      if (
        t.isObjectProperty(prop) &&
        t.isIdentifier(prop.key) &&
        prop.key.name === "className" &&
        t.isStringLiteral(prop.value)
      ) {
        return prop.value.value;
      }
    }
    return null;
  })();

  if (Object.keys(styledProps).length > 0) {
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
    const combinedClassName = [existingClassName, className]
      .filter(Boolean)
      .join(" ");
    path.node.properties.push(
      t.objectProperty(
        t.identifier("className"),
        t.stringLiteral(combinedClassName)
      )
    );
  }
};
