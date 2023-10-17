import { CSSProperties, ResponsiveStyle } from "./types";
import { FilterKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";

export type FilterProps = Partial<CSSProperties<"filter" | "backdropFilter">>;

export const filterMappings: Record<FilterKeys, string> = {
  filter: "filter",
  backdropFilter: "backdrop-filter",
} as const;

export const filter = (props: FilterProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in filterMappings) {
    const cssValue = props[key as FilterKeys];
    if (cssValue != undefined) {
      const property = filterMappings[key as FilterKeys];
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
