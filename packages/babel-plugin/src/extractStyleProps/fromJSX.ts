import { types as t, type NodePath } from "@babel/core";
import type { JSXOpeningElement } from "@babel/types";
import { isStyledProp, PseudoProps, isPseudoProps } from "@kuma-ui/system";
import { ExtractedStyleProps } from ".";

export function extractStylePropsFromJSX(
  openingElement: JSXOpeningElement
): ExtractedStyleProps<NodePath<t.JSXOpeningElement>> {
  const styledProps: { [key: string]: string | number | (string | number)[] } =
    {};
  const pseudoProps: PseudoProps = {};

  const filteredAttributes = (openingElement.attributes.filter((attr) => {
    if (
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      isStyledProp(attr.name.name)
    ) {
      if (t.isStringLiteral(attr.value)) {
        styledProps[attr.name.name] = attr.value.value;
      } else if (t.isJSXExpressionContainer(attr.value)) {
        const { expression } = attr.value;
        if (t.isStringLiteral(expression) || t.isNumericLiteral(expression)) {
          styledProps[attr.name.name] = expression.value;
        } else if (t.isArrayExpression(expression)) {
          styledProps[attr.name.name] = expression.elements
            .map((e) => {
              if (e?.type === "NumericLiteral" || e?.type === "StringLiteral") {
                return e.value;
              }
            })
            .filter(Boolean) as (string | number)[];
        }
      }
      return false;
    } else if (
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      t.isObjectExpression(attr.value) &&
      isPseudoProps(attr.name.name)
    ) {
      Object.assign(pseudoProps, {
        ...pseudoProps,
        [attr.name.name]: extractStylePropsFromJSX(attr.value).styledProps,
      });
      return false;
    }
    return true;
  }) || []) as t.JSXAttribute[];

  return { filteredAttributes, styledProps, pseudoProps };
}
