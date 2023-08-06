import { toCssUnit } from "./toCSS";
import { FlexKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import {
  AddProperty,
  CSSProperties,
  CSSValue,
  ResponsiveStyle,
  ThemeSystemType,
} from "./types";
import { spaceConverter } from "./valueConverters";

// eslint-disable-next-line @typescript-eslint/ban-types
export type FlexProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
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
    AddProperty<CSSProperties<"gap", true>, T["spaces"]>
>;

const flexMappings: Record<FlexKeys, string> = {
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
      const converter =
        property === flexMappings.flexBasis
          ? toCssUnit
          : property === flexMappings.gap
          ? spaceConverter
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
