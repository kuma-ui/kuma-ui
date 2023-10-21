import { toCssUnit } from "./toCSS";
import { TextKeys } from "./keys";
import { ResponsiveStyle, CSSProperties, ValueConverter } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type TextProps = Partial<
  CSSProperties<"textAlign"> &
    CSSProperties<"textAlignLast"> &
    CSSProperties<"textCombineUpright"> &
    CSSProperties<"textDecoration"> &
    CSSProperties<"textDecorationColor"> &
    CSSProperties<"textDecorationLine"> &
    CSSProperties<"textDecorationSkipInk"> &
    CSSProperties<"textDecorationStyle"> &
    CSSProperties<"textDecorationThickness"> &
    CSSProperties<"textEmphasis"> &
    CSSProperties<"textEmphasisColor"> &
    CSSProperties<"textEmphasisPosition"> &
    CSSProperties<"textEmphasisStyle"> &
    CSSProperties<"textIndent", true> &
    CSSProperties<"textJustify"> &
    CSSProperties<"textOrientation"> &
    CSSProperties<"textOverflow"> &
    CSSProperties<"textRendering"> &
    CSSProperties<"textShadow"> &
    CSSProperties<"textSizeAdjust"> &
    CSSProperties<"textTransform"> &
    CSSProperties<"textUnderlineOffset"> &
    CSSProperties<"textUnderlinePosition">
>;

export const textMappings: Record<TextKeys, string> = {
  textAlign: "text-align",
  textAlignLast: "text-align-last",
  textCombineUpright: "text-combine-upright",
  textDecoration: "text-decoration",
  textDecorationColor: "text-decoration-color",
  textDecorationLine: "text-decoration-line",
  textDecorationSkipInk: "text-decoration-skip-ink",
  textDecorationStyle: "text-decoration-style",
  textDecorationThickness: "text-decoration-thickness",
  textEmphasis: "text-emphasis",
  textEmphasisColor: "text-emphasis-color",
  textEmphasisPosition: "text-emphasis-position",
  textEmphasisStyle: "text-emphasis-style",
  textIndent: "text-indent",
  textJustify: "text-justify",
  textOrientation: "text-orientation",
  textOverflow: "text-overflow",
  textRendering: "text-rendering",
  textShadow: "text-shadow",
  textTransform: "text-transform",
  textUnderlineOffset: "text-underline-offset",
  textUnderlinePosition: "text-underline-position",
};

export const textConverters: Partial<Record<TextKeys, ValueConverter>> = {
  textIndent: toCssUnit,
};

export const text = (props: TextProps): ResponsiveStyle => {
  let baseStyles = "";
  const mediaStyles: ResponsiveStyle["media"] = {};

  for (const key in textMappings) {
    const cssValue = props[key as TextKeys];
    if (cssValue != undefined) {
      const property = textMappings[key as TextKeys];
      const converter = [textMappings.textIndent].includes(property)
        ? toCssUnit
        : undefined;
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter,
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
