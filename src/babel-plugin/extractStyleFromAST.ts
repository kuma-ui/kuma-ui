import { types as t } from "@babel/core";
import type { JSXOpeningElement } from "@babel/types";
import { isStyledProp } from "../system";
import { PseudoProps, isPseudoProps } from "src/system/pseudo";
import { CSSProperty } from "../system/types";

/**
 * Extracts style props from a JSX opening element and returns the filtered
 * attributes and the extracted style props.
 *
 * @param openingElement - The JSXOpeningElement node from which style props are to be extracted
 * @returns An object containing the filtered attributes and the extracted style props
 */
export function extractStylePropsFromAST(openingElement: JSXOpeningElement): {
  filteredAttributes: t.JSXAttribute[];
  styledProps: {
    [key: string]: CSSProperty | number | (CSSProperty | number)[];
  };
  pseudoProps: PseudoProps;
} {
  const styledProps: { [key: string]: string | number | (string | number)[] } =
    {};
  const pseudoProps: PseudoProps = {};

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
        [attr.name.name]: extractStylePropsFromAST(attr.value).styledProps,
      });
      return false;
    }
    return true;
  }) as t.JSXAttribute[];

  return { filteredAttributes, styledProps, pseudoProps };
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
  styledProps: { [key: string]: string | number | (string | number)[] };
  pseudoProps: PseudoProps;
} {
  const styledProps: { [key: string]: string | number | (string | number)[] } =
    {};
  const pseudoProps: PseudoProps = {};

  const filteredProperties = objectExpression.properties?.filter((prop) => {
    if (
      t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key) &&
      isStyledProp(prop.key.name)
    ) {
      if (t.isStringLiteral(prop.value) || t.isNumericLiteral(prop.value)) {
        styledProps[prop.key.name] = prop.value.value;
      } else if (t.isIdentifier(prop.value)) {
        // DO SOMETHING
      } else if (t.isArrayExpression(prop.value)) {
        styledProps[prop.key.name] = prop.value.elements
          .map((e) => {
            if (e?.type === "NumericLiteral" || e?.type === "StringLiteral") {
              return e.value;
            }
          })
          .filter(Boolean) as (string | number)[];
      }
      return false;
    } else if (
      t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key) &&
      t.isObjectExpression(prop.value) &&
      isPseudoProps(prop.key.name)
    ) {
      Object.assign(pseudoProps, {
        ...pseudoProps,
        [prop.key.name]: extractStylePropsFromObjectExpression(prop.value)
          .styledProps,
      });
      return false;
    } else if (
      t.isObjectProperty(prop) &&
      prop.key.type === "StringLiteral" &&
      prop.key.value === "data-zero-styled"
    ) {
      return false;
    }
    return true;
  }) as t.ObjectProperty[];

  return { filteredProperties, styledProps, pseudoProps };
}
