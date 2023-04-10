import { SpaceProps } from "./space";
import { TypographyProps } from "./typography";
import { LayoutProps } from "./layout";
import { ColorProps } from "./color";
import { FlexProps } from "./flex";

export type StyledProps = SpaceProps &
  TypographyProps &
  LayoutProps &
  ColorProps &
  FlexProps;

export type StyleFunction = (props: StyledProps) => string;

/**
 * Composes multiple style functions into a single style function.
 * This allows for more efficient application of multiple style functions at once,
 * reducing redundancy and complexity.
 *
 * @param {...StyleFunction[]} styleFunctions - An array of style functions to be combined.
 * @returns {StyleFunction} A new style function that applies all the input style functions
 * and returns a single style string.
 * @example
 * const combinedFunction = compose(space, typography, layout, color, flex);
 * const styles = combinedFunction({ m: 8, fontSize: 16, width: "100%", bg: "red", flexDir: "column" });
 * // The `styles` variable now contains a single style string combining all the applied style functions.
 */
export const compose = (...styleFunctions: StyleFunction[]): StyleFunction => {
  return (props: any): string => {
    let outputProps = { ...props };

    return styleFunctions.reduce((styles, styleFunction) => {
      const newStyles = styleFunction(outputProps);
      const processedProps = Object.keys(outputProps).filter((key) =>
        newStyles.includes(`${outputProps[key]}:`)
      );
      outputProps = Object.keys(outputProps).reduce((remainingProps, key) => {
        if (!processedProps.includes(key)) {
          remainingProps[key] = outputProps[key];
        }
        return remainingProps;
      }, {} as any);

      return styles + newStyles;
    }, "");
  };
};
