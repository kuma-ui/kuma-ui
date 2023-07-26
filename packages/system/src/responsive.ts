import { theme } from "@kuma-ui/sheet";
import { CSSProperty, ResponsiveStyle } from "./types";

export const applyResponsiveStyles = (
  cssProperty: string,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- FIXME
  cssValues: CSSProperty | number | (CSSProperty | number)[],
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- FIXME
  convertFn: (value: CSSProperty | number) => string | number = (value) => value
): ResponsiveStyle => {
  const { breakpoints } = theme.getUserTheme();
  const media: ResponsiveStyle["media"] = {};

  if (Array.isArray(cssValues)) {
    const baseValue = convertFn(cssValues[0]);
    cssValues.slice(1).map((value, index) => {
      const breakpoint = Object.keys(breakpoints)[index];
      const breakpointValue = breakpoints[breakpoint];
      media[breakpointValue] = `${cssProperty}: ${convertFn(value)};`;
    });

    return { base: `${cssProperty}: ${baseValue};`, media };
  }

  return { base: `${cssProperty}: ${convertFn(cssValues)};`, media: {} };
};
