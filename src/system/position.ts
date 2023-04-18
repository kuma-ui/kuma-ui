import { PositionKeys } from "./keys";
import { toCssUnit } from "./toCSS";
import { CSSValue, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type PositionProps = Partial<{
  top: CSSValue<"top", true>;
  right: CSSValue<"right", true>;
  left: CSSValue<"left", true>;
  bottom: CSSValue<"left", true>;
  inset: CSSValue<"left", true>;
}>;

const positionMappings: Record<PositionKeys, string> = {
  top: "top",
  right: "right",
  left: "left",
  bottom: "bottom",
  inset: "inset",
};

export const position = (props: PositionProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in positionMappings) {
    const cssValue = props[key as PositionKeys];
    if (cssValue) {
      const property = positionMappings[key as PositionKeys];
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        toCssUnit
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
