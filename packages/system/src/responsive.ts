import { theme } from "@kuma-ui/sheet";
import { CSSProperty, ResponsiveStyle } from "./types";

const isReadonlyArray = <T>(value: unknown): value is readonly T[] =>
  Array.isArray(value);

export const applyResponsiveStyles = (
  cssProperty: string,
  cssValues: CSSProperty | ReadonlyArray<CSSProperty>,
  convertFn: (value: CSSProperty) => string | number = (value) => value,
): ResponsiveStyle => {
  const { breakpoints } = theme.getUserTheme();
  const media: ResponsiveStyle["media"] = {};

  if (!isReadonlyArray<CSSProperty>(cssValues)) {
    return { base: `${cssProperty}: ${convertFn(cssValues)};`, media: {} };
  }

  const values = cssValues;
  const baseValue = convertFn(values[0]);

  values.slice(1).forEach((value, index) => {
    if (breakpoints) {
      const breakpoint = Object.keys(breakpoints)[index];
      const breakpointValue = breakpoints[breakpoint];
      media[breakpointValue] = `${cssProperty}: ${convertFn(value)};`;
    }
  });

  return { base: `${cssProperty}: ${baseValue};`, media };
};
