import { toCssUnit } from "./toCSS";
import { SpaceKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { CSSValue, ResponsiveStyle } from "./types";

export type SpaceProps = Partial<{
  /**
   * @see margin
   */
  m: CSSValue<"margin", true>;
  /**
   * @see marginTop
   */
  mt: CSSValue<"marginTop", true>;
  /**
   * @see marginRight
   */
  mr: CSSValue<"marginRight", true>;
  /**
   * @see marginBottom
   */
  mb: CSSValue<"marginBottom", true>;
  /**
   * @see marginLeft
   */
  ml: CSSValue<"marginLeft", true>;
  /**
   * @see marginLeft
   * @see marginRight
   */
  mx: CSSValue<"marginLeft" | "marginRight", true>;
  /**
   * @see marginTop
   * @see marginBottom
   */
  my: CSSValue<"marginTop" | "marginBottom", true>;
  /**
   * @see padding
   */
  p: CSSValue<"padding", true>;
  /**
   * @see paddingTop
   */
  pt: CSSValue<"paddingTop", true>;
  /**
   * @see paddingRight
   */
  pr: CSSValue<"paddingRight", true>;
  /**
   * @see paddingBottom
   */
  pb: CSSValue<"paddingBottom", true>;
  /**
   * @see paddingLeft
   */
  pl: CSSValue<"paddingLeft", true>;
  /**
   * @see paddingLeft
   * @see paddingRight
   */
  px: CSSValue<"paddingLeft" | "paddingRight", true>;
  /**
   * @see paddingTop
   * @see paddingBottom
   */
  py: CSSValue<"paddingTop" | "paddingBottom", true>;
}>;

const spaceMappings: Record<SpaceKeys, string> = {
  m: "margin",
  mt: "margin-top",
  mr: "margin-right",
  mb: "margin-bottom",
  ml: "margin-left",
  mx: "margin-left,margin-right",
  my: "margin-top,margin-bottom",
  p: "padding",
  pt: "padding-top",
  pr: "padding-right",
  pb: "padding-bottom",
  pl: "padding-left",
  px: "padding-left,padding-right",
  py: "padding-top,padding-bottom",
};

export const space = (props: SpaceProps): ResponsiveStyle => {
  let baseStyles = "";
  const mediaStyles: { [breakpoint: string]: string } = {};

  for (const key in spaceMappings) {
    const cssValue = props[key as SpaceKeys];
    if (cssValue != undefined) {
      const properties = spaceMappings[key as SpaceKeys].split(",");
      for (const property of properties) {
        const responsiveStyles = applyResponsiveStyles(
          property,
          cssValue,
          toCssUnit
        );
        baseStyles += responsiveStyles.base;
        for (const [breakpoint, css] of Object.entries(
          responsiveStyles.media
        )) {
          if (mediaStyles[breakpoint]) {
            mediaStyles[breakpoint] += css;
          } else {
            mediaStyles[breakpoint] = css;
          }
        }
      }
    }
  }
  return {
    base: baseStyles,
    media: mediaStyles,
  };
};
