import { OutlineKeys } from "./keys";
import { CSSProperties, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from "./toCSS";

export type OutlineProps = Partial<
  CSSProperties<"outline"> &
    CSSProperties<"outlineOffset", true> &
    CSSProperties<"outlineWidth", true> &
    CSSProperties<"outlineStyle">
>;

const outlineMappings: Record<OutlineKeys, string> = {
  outline: "outline",
  outlineOffset: "outline-offset",
  outlineWidth: "outline-width",
  outlineStyle: "outline-style",
};

export const outline = (props: OutlineProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in outlineMappings) {
    const cssValue = props[key as OutlineKeys];
    if (cssValue) {
      const property = outlineMappings[key as OutlineKeys];
      const converter = [
        outlineMappings.outlineWidth,
        outlineMappings.outlineOffset,
      ].includes(property)
        ? toCssUnit
        : undefined;
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter
      );
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) media[breakpoint] += css;
        else media[breakpoint] = css;
      }
    }
  }
  return { base, media };
};
