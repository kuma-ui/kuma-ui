import { AnimationProps } from "./animation";
import { SpaceProps } from "./space";
import { TypographyProps } from "./typography";
import { LayoutProps } from "./layout";
import { ColorProps } from "./color";
import { FlexProps } from "./flex";
import { BorderProps } from "./border";
import { OutlineProps } from "./outline";
import { PositionProps } from "./position";
import { ShadowProps } from "./shadow";
import { PseudoProps } from "./pseudo";
import { ThemeSystemType, ResponsiveStyle } from "./types";
import { styleCache } from "@kuma-ui/sheet";
import { GridProps } from "./grid";
import { ListProps } from "./list";
import { EffectProps } from "./effect";
import { TextProps } from "./text";
import { FontProps } from "./font";
import { MaskProps } from "./mask";
import { ColumnProps } from "./column";
import { BackgroundProps } from "./background";

export type StyledProps<T extends ThemeSystemType = ThemeSystemType> =
  TypographyProps<T> &
    FontProps<T> &
    ColorProps<T> &
    SpaceProps<T> &
    AnimationProps &
    TextProps &
    LayoutProps &
    FlexProps<T> &
    BorderProps &
    OutlineProps &
    PositionProps &
    ShadowProps &
    GridProps<T> &
    ListProps &
    EffectProps &
    MaskProps &
    ColumnProps<T> &
    BackgroundProps &
    // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- FIXME
    EffectProps;

export type StyleFunction = (props: StyledProps) => ResponsiveStyle;

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
  return (props: StyledProps): ResponsiveStyle => {
    const cacheKey = JSON.stringify(props);
    let outputProps = { ...props };

    const cachedStyles = styleCache.get(cacheKey);
    if (cachedStyles) {
      return cachedStyles;
    }

    const combinedStyles = styleFunctions.reduce(
      (styles, styleFunction) => {
        const newStyles = styleFunction(outputProps);
        styles.base += newStyles.base;
        for (const [breakpoint, css] of Object.entries(newStyles.media)) {
          if (styles.media[breakpoint]) {
            styles.media[breakpoint] += css;
          } else {
            styles.media[breakpoint] = css;
          }
        }

        const processedProps = Object.keys(outputProps).filter((key) =>
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- FIXME
          newStyles.base.includes(`${outputProps[key as keyof StyledProps]}:`)
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
        outputProps = Object.keys(outputProps).reduce((remainingProps, key) => {
          if (!processedProps.includes(key)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- FIXME
            remainingProps[key] = outputProps[key as keyof StyledProps];
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- FIXME
          return remainingProps;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
        }, {} as any);

        return styles;
      },
      { base: "", media: {} } as ResponsiveStyle
    );

    styleCache.set(cacheKey, combinedStyles);

    return combinedStyles;
  };
};
