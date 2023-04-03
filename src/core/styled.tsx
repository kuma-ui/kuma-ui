import React, {
  ComponentType,
  ReactElement,
  ComponentProps,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  cloneElement,
  createElement,
} from "react";
import { dataAttributeName } from "../utils/assignDataAttribute";
import { combinedStyles } from "../system";
import { sheet } from "./sheet";

type StyleProps = any;
type CSSProperties = keyof CSSStyleDeclaration;
/**
 * A higher-order component that wraps a given component with styled-system
 * functionality and applies the data-zero-styled attribute.
 *
 * the Babel plugin replaces the styled function with the hashed class name during the build process.
 * This is essentially a placeholder for the actual implementation that happens in the Babel plugin.
 *
 * @param Component - The component to be wrapped with styled-system functionality
 * @returns A new component with styled-system functionality and a unique data-zero-styled attribute
 */
export function styled<
  T extends keyof JSX.IntrinsicElements | ComponentType<any>
>(Component: T) {
  return function <T extends readonly CSSProperties[] | undefined>(
    strings: TemplateStringsArray,
    ...interpolations: T[]
  ): ReactElement {
    let cssString = "";

    strings.forEach((string, index) => {
      cssString += string;

      if (interpolations[index] !== undefined) {
        const interpolation = interpolations[index];

        if (
          typeof interpolation === "string" ||
          typeof interpolation === "number"
        ) {
          cssString += interpolation;
        } else {
          throw new Error("Dynamic values are not supported in Zero-Styled.");
        }
      }
    });

    const className = sheet.addRule(cssString);
    return createElement(Component, {
      "data-zero-styled": true,
      className,
    });
  };
}
