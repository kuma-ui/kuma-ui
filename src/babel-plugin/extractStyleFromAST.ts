import { types as t } from "@babel/core";
import type { JSXOpeningElement } from "@babel/types";
import { isStyledProp } from "../system";

/**
 * Extracts style props from a JSX opening element and returns the filtered
 * attributes and the extracted style props.
 *
 * @param openingElement - The JSXOpeningElement node from which style props are to be extracted
 * @returns An object containing the filtered attributes and the extracted style props
 */
export function extractStylePropsFromAST(openingElement: JSXOpeningElement): {
  filteredAttributes: t.JSXAttribute[];
  styledProps: { [key: string]: string | number };
} {
  const styledProps: { [key: string]: string | number } = {};

  const filteredAttributes = openingElement.attributes.filter((attr) => {
    if (
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      isStyledProp(attr.name.name)
    ) {
      if (t.isStringLiteral(attr.value)) {
        styledProps[attr.name.name] = attr.value.value;
      } else if (t.isJSXExpressionContainer(attr.value)) {
        const { expression } = attr.value;
        if (t.isNumericLiteral(expression) || t.isStringLiteral(expression)) {
          styledProps[attr.name.name] = expression.value;
        }
      }
      return false;
    }
    return true;
  }) as t.JSXAttribute[];

  return { filteredAttributes, styledProps };
}

/**
 * Extracts style props from an ObjectExpression in a React.createElement call
 * and returns the filtered properties and the extracted style props.
 *
 * @param objectExpression - The ObjectExpression node from which style props are to be extracted
 * @returns An object containing the filtered properties and the extracted style props
 */
export function extractStylePropsFromObjectExpression(
  objectExpression: t.ObjectExpression
): {
  filteredProperties: t.ObjectProperty[];
  styledProps: { [key: string]: string | number };
} {
  const styledProps: { [key: string]: string | number } = {};

  const filteredProperties = objectExpression.properties.filter((prop) => {
    if (
      t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key) &&
      isStyledProp(prop.key.name)
    ) {
      if (t.isStringLiteral(prop.value)) {
        styledProps[prop.key.name] = prop.value.value;
      } else if (
        t.isNumericLiteral(prop.value) ||
        t.isStringLiteral(prop.value)
      ) {
        styledProps[prop.key.name] = prop.value.value;
      }
      return false;
    }
    return true;
  }) as t.ObjectProperty[];

  return { filteredProperties, styledProps };
}
