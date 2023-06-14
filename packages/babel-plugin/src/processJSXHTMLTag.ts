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
      pseudoProps
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
    const className = sheet.addRule(style);

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
