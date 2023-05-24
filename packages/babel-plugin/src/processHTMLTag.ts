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

    const classNameAttrs: t.Expression[] = [t.stringLiteral(className)];

    for (const attr of filteredAttributes) {
      if (
        t.isJSXAttribute(attr) &&
        t.isJSXIdentifier(attr.name) &&
        attr.name.name === "className"
      ) {
        if (t.isStringLiteral(attr.value)) {
          classNameAttrs.push(attr.value);
        } else if (
          t.isJSXExpressionContainer(attr.value) &&
          t.isExpression(attr.value.expression)
        ) {
          classNameAttrs.push(attr.value.expression);
        }
        return attr.value;
      }
    }
    // Combine existing and new classNames. This respects user-specified class names
    // and works with non-StringLiterals, as they'll be resolved at runtime.
    // E.g., <k.div className={styles.someClass} fontSize={24} /> keeps both classes.
    path.node.attributes.push(
      t.jsxAttribute(
        t.jsxIdentifier("className"),
        t.jSXExpressionContainer(
          t.callExpression(
            t.memberExpression(
              t.arrayExpression(classNameAttrs),
              t.identifier("join")
            ),
            [t.stringLiteral(" ")]
          )
        )
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

    const classNameProps: t.Expression[] = [t.stringLiteral(className)];

    for (const prop of filteredProperties) {
      if (
        t.isObjectProperty(prop) &&
        t.isIdentifier(prop.key) &&
        prop.key.name === "className" &&
        t.isExpression(prop.value)
      ) {
        classNameProps.push(prop.value);
      }
    }

    path.node.properties.push(
      // className: ["kuma-*", defaultClassNameValue].join(' ')
      t.objectProperty(
        t.identifier("className"),
        t.callExpression(
          t.memberExpression(
            t.arrayExpression(classNameProps),
            t.identifier("join")
          ),
          [t.stringLiteral(" ")]
        )
      )
    );
  }
};
