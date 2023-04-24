import { types as t, type NodePath } from "@babel/core";
import { PseudoProps } from "src/system/pseudo";
import { CSSProperty } from "../../system/types";
import { extractStylePropsFromJSX } from "./fromJSX";
import { extractStylePropsFromObjectExpression } from "./fromObject";

export type ExtractedStyleProps<T> = T extends NodePath<t.JSXOpeningElement>
  ? {
      filteredAttributes: t.JSXAttribute[];
      styledProps: {
        [key: string]: CSSProperty | number | (CSSProperty | number)[];
      };
      pseudoProps: PseudoProps;
    }
  : {
      filteredProperties: t.ObjectProperty[];
      styledProps: { [key: string]: string | number | (string | number)[] };
      pseudoProps: PseudoProps;
    };

/**
 * Extracts style props from a JSX opening element or an ObjectExpression in a React.createElement call
 * and returns the filtered properties and the extracted style props.
 */
export function extractStyleProps<
  T extends NodePath<t.JSXOpeningElement> | NodePath<t.ObjectExpression>
>(path: T): ExtractedStyleProps<T> {
  if (t.isJSXOpeningElement(path.node)) {
    return extractStylePropsFromJSX(path.node) as ExtractedStyleProps<T>;
  } else {
    return extractStylePropsFromObjectExpression(
      path as NodePath<t.ObjectExpression>,
      path.node
    ) as ExtractedStyleProps<T>;
  }
}
