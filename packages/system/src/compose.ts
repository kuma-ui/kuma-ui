import { AnimationProps, animationMappings } from "./animation";
import { SpaceProps, spaceMappings } from "./space";
import { TypographyProps, typographyMappings } from "./typography";
import { LayoutProps, layoutMappings } from "./layout";
import { ColorProps, colorMappings } from "./color";
import { FlexProps, flexMappings } from "./flex";
import { BorderProps, borderMappings } from "./border";
import { OutlineProps, outlineMappings } from "./outline";
import { PositionProps, positionMappings } from "./position";
import { ShadowProps, shadowMappings } from "./shadow";
import { PseudoProps } from "./pseudo";
import { ThemeSystemType, ResponsiveStyle } from "./types";
import { styleCache } from "@kuma-ui/sheet";
import { GridProps, gridMappings } from "./grid";
import { ListProps, listMappings } from "./list";
import { EffectProps, effectMappings } from "./effect";
import { TextProps, textMappings } from "./text";
import { FontProps, fontMappings } from "./font";
import { MaskProps, maskMappings } from "./mask";
import { ColumnProps, columnMappings } from "./column";
import { BackgroundProps, backgroundMappings } from "./background";
import { StyledKeyType } from "./keys";

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

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
const styleMappings: Record<StyledKeyType, string> = Object.assign(
  {},
  animationMappings,
  spaceMappings,
  typographyMappings,
  layoutMappings,
  colorMappings,
  flexMappings,
  borderMappings,
  outlineMappings,
  positionMappings,
  shadowMappings,
  gridMappings,
  listMappings,
  effectMappings,
  textMappings,
  fontMappings,
  maskMappings,
  columnMappings,
  backgroundMappings
);
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
          newStyles.base.includes(`${styleMappings[key as StyledKeyType]}:`)
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
