import { BorderKeys } from "./keys";
import { toCssUnitWithPx } from "./toCSS";
import { CSSProperties, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type BorderProps = Partial<
  CSSProperties<"borderTop" | "borderRight" | "borderLeft" | "borderBottom"> &
    CSSProperties<"borderStyle"> &
    CSSProperties<"borderRadius" | "borderWidth", true>
>;

const borderMappings: Record<BorderKeys, string> = {
  borderTop: "border-top",
  borderRight: "border-right",
  borderLeft: "border-left",
  borderBottom: "border-bottom",
  borderRadius: "border-radius",
  borderStyle: "border-style",
  borderWidth: "border-width",
};

export const border = (props: BorderProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in borderMappings) {
    const cssValue = props[key as BorderKeys];
    if (cssValue) {
      const property = borderMappings[key as BorderKeys];
      const converter = [
        borderMappings.borderWidth,
        borderMappings.borderRadius,
      ].includes(property)
        ? toCssUnitWithPx
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
