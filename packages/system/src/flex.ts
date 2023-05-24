import { toCssUnitWithPx } from "./toCSS";
import { FlexKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { CSSProperties, CSSValue, ResponsiveStyle } from "./types";

export type FlexProps = Partial<
  {
    /**
     * @see flexDirection
     */
    flexDir: CSSValue<"flexDirection">;
  } & {
    /**
     * @see justifyContent
     */
    justify: CSSValue<"justifyContent">;
  } & CSSProperties<"alignItems" | "alignContent"> &
    CSSProperties<"flexWrap" | "flexGrow"> &
    CSSProperties<"flexShrink" | "flexBasis"> &
    CSSProperties<"gap">
>;

const flexMappings: Record<FlexKeys, string> = {
  flexDir: "flex-direction",
  justify: "justify-content",
  alignItems: "align-items",
  alignContent: "align-content",
  flexWrap: "flex-wrap",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
  gap: "gap",
} as const;

export const flex = (props: FlexProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in flexMappings) {
    const cssValue = props[key as FlexKeys];
    if (cssValue) {
      const property = flexMappings[key as FlexKeys];
      const converter = property === "gap" ? toCssUnitWithPx : undefined;
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
