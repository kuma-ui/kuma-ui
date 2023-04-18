import { toCssUnit } from "./toCSS";
import { TypographyKeys } from "./keys";
import { ResponsiveStyle, CSSValue } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type TypographyProps = Partial<{
  fontSize?: CSSValue<"fontSize", true>;
  fontWeight?: CSSValue<"fontWeight", true>;
  lineHeight?: CSSValue<"lineHeight", true>;
  letterSpacing?: CSSValue<"letterSpacing", true>;
  textAlign?: CSSValue<"textAlign">;
  fontFamily?: CSSValue<"fontFamily">;
}>;

const typographyMappings: Record<TypographyKeys, string> = {
  fontSize: "font-size",
  fontWeight: "font-weight",
  lineHeight: "line-height",
  letterSpacing: "letter-spacing",
  textAlign: "text-align",
  fontFamily: "font-family",
};

export const typography = (props: TypographyProps): ResponsiveStyle => {
  let baseStyles = "";
  const mediaStyles: ResponsiveStyle["media"] = {};

  for (const key in typographyMappings) {
    const cssValue = props[key as TypographyKeys];
    if (cssValue) {
      const property = typographyMappings[key as TypographyKeys];
      const converter = [
        typographyMappings.fontSize,
        typographyMappings.fontWeight,
        typographyMappings.lineHeight,
        typographyMappings.letterSpacing,
      ].includes(property)
        ? toCssUnit
        : undefined;
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter
      );
      baseStyles += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (mediaStyles[breakpoint]) mediaStyles[breakpoint] += css;
        else mediaStyles[breakpoint] = css;
      }
    }
  }
  return { base: baseStyles, media: mediaStyles };
};
