import { OutlineKeys } from "./keys";
import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from "./toCSS";

export type OutlineProps = Partial<
  CSSProperties<"outline"> &
    CSSProperties<"outlineOffset", true> &
    CSSProperties<"outlineWidth", true> &
    CSSProperties<"outlineStyle">
>;

export const outlineMappings: Record<OutlineKeys, string> = {
  outline: "outline",
  outlineOffset: "outline-offset",
  outlineWidth: "outline-width",
  outlineStyle: "outline-style",
} as const;

export const outlineConverters: Partial<Record<OutlineKeys, ValueConverter>> = {
  outlineWidth: toCssUnit,
  outlineOffset: toCssUnit,
};

export const outline = (props: OutlineProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in outlineMappings) {
    const cssValue = props[key as OutlineKeys];
    if (cssValue != undefined) {
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
        converter,
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
