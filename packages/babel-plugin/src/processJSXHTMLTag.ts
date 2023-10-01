import { NodePath, types as t } from "@babel/core";
import { extractStyleProps } from "./extractStyleProps";
import { sheet, SystemStyle } from "@kuma-ui/sheet";
import { all } from "@kuma-ui/system";
import { normalizePseudo } from "@kuma-ui/system";

export const processJSXHTMLTag = (path: NodePath<t.JSXOpeningElement>) => {
  const { filteredAttributes, styledProps, pseudoProps } =
    extractStyleProps(path);
  // Update the attributes of the opening element by removing the styled props,
  // so that the styled props don't get passed down as regular HTML attributes.
  path.node.attributes = filteredAttributes;
  if (Object.keys(styledProps).length > 0) {
    const convertedPseudoProps: SystemStyle["pseudo"] = Object.entries(
      pseudoProps,
    ).map(([pseudoKey, pseudoValue]) => {
      const pseudoStyle = all(pseudoValue);
      return {
        key: normalizePseudo(pseudoKey),
        base: pseudoStyle.base,
        responsive: pseudoStyle.media,
      };
    });

    const style: SystemStyle = {
      base: all(styledProps).base,
      responsive: all(styledProps).media,
      pseudo: convertedPseudoProps,
    };

    // Add the style rule to the sheet and get the generated class name.
    const generatedClassName = sheet.addRule(style);

    const generatedClassNameAttr = t.stringLiteral(generatedClassName);
    const classNameAttrs: t.Expression[] = [generatedClassNameAttr];

    const existsClassNameAttr = path.node.attributes.find(
      (attr): attr is t.JSXAttribute =>
        t.isJSXAttribute(attr) &&
        t.isJSXIdentifier(attr.name, { name: "className" }),
    );
    if (existsClassNameAttr) {
      if (t.isStringLiteral(existsClassNameAttr.value)) {
        classNameAttrs.push(existsClassNameAttr.value);
      }
      if (
        t.isJSXExpressionContainer(existsClassNameAttr.value) &&
        t.isExpression(existsClassNameAttr.value.expression)
      ) {
        classNameAttrs.push(existsClassNameAttr.value.expression);
      }
    }
    // Combine existing and new classNames. This respects user-specified class names
    // and works with non-StringLiterals, as they'll be resolved at runtime.
    // E.g., <k.div className={styles.someClass} fontSize={24} /> keeps both classes.
    if (existsClassNameAttr) {
      existsClassNameAttr.value = t.jSXExpressionContainer(
        t.callExpression(
          t.memberExpression(
            t.arrayExpression(classNameAttrs),
            t.identifier("join"),
          ),
          [t.stringLiteral(" ")],
        ),
      );
    } else {
      path.node.attributes.push(
        t.jsxAttribute(t.jsxIdentifier("className"), generatedClassNameAttr),
      );
    }
  }
};
