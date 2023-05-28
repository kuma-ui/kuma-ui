import { CSSProperties, ResponsiveStyle } from "./types";
import { ListKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";

export type ListProps = Partial<
  CSSProperties<
    "listStyle" | "listStyleImage" | "listStylePosition" | "listStyleType"
  >
>;

const listMappings: Record<ListKeys, string> = {
  listStyle: "list-style",
  listStyleImage: "list-style-image",
  listStylePosition: "list-style-position",
  listStyleType: "list-style-type",
} as const;

export const list = (props: ListProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in listMappings) {
    const cssValue = props[key as ListKeys];
    if (cssValue) {
      const property = listMappings[key as ListKeys];
      const responsiveStyles = applyResponsiveStyles(property, cssValue);
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) media[breakpoint] += css;
        else media[breakpoint] = css;
      }
    }
  }

  return { base, media };
};
