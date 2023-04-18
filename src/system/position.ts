import { PositionKeys } from "./keys";
import { toCssUnit } from "./toCSS";
import { ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type PositionProps = Partial<
  Record<PositionKeys, string | number | (string | number)[]>
>;

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
