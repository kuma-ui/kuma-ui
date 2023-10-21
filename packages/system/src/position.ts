import { PositionKeys } from "./keys";
import { toCssUnit } from "./toCSS";
import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type PositionProps = Partial<
  CSSProperties<"top" | "right" | "left" | "bottom" | "inset", true>
>;

export const positionMappings: Record<PositionKeys, string> = {
  top: "top",
  right: "right",
  left: "left",
  bottom: "bottom",
  inset: "inset",
};

export const positionConverters: Partial<Record<PositionKeys, ValueConverter>> =
  Object.fromEntries(
    Object.keys(positionMappings).map((key) => [key, toCssUnit]),
  );

export const position = (props: PositionProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in positionMappings) {
    const cssValue = props[key as PositionKeys];
    if (cssValue != undefined) {
      const property = positionMappings[key as PositionKeys];
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        toCssUnit,
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
