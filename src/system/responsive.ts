import { theme } from "../theme";
import { ResponsiveStyle } from "./compose";

export const applyResponsiveStyles = (
  cssProperty: string,
  cssValues: string | number | (string | number)[],
  convertFn: (value: string | number) => string | number = (value) => value
): ResponsiveStyle => {
  const breakpoints = theme.getBreakpoints();
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
