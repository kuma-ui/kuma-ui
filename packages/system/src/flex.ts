import { toCssUnit } from "./toCSS";
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
  } & CSSProperties<"alignContent" | "alignItems" | "alignSelf"> &
    CSSProperties<"flexWrap" | "flexFlow" | "flexDirection"> &
    CSSProperties<"flexBasis", true> &
    CSSProperties<"flex" | "flexShrink" | "flexGrow", true> &
    CSSProperties<"justifyItems" | "justifySelf" | "justifyContent"> &
    CSSProperties<"gap", true>
>;

export const flexMappings: Record<FlexKeys, string> = {
  flexDirection: "flex-direction",
  flexDir: "flex-direction",
  justifyContent: "justify-content",
  justify: "justify-content",
  alignContent: "align-content",
  alignItems: "align-items",
  alignSelf: "align-self",
  flex: "flex",
  flexBasis: "flex-basis",
  flexFlow: "flex-flow",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexWrap: "flex-wrap",
  justifyItems: "justify-items",
  justifySelf: "justify-self",
  gap: "gap",
} as const;

export const flex = (props: FlexProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in flexMappings) {
    const cssValue = props[key as FlexKeys];
    if (cssValue != undefined) {
      const property = flexMappings[key as FlexKeys];
      const converter = [flexMappings.flexBasis, flexMappings.gap].includes(
        property
      )
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
