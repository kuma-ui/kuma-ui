import { StyledProps, StyleFunction } from "./compose";
import { theme } from "../theme";

export const applyResponsiveStyles = (
  cssProperty: string,
  cssValues: string | string[]
): string => {
  const breakpoints = theme.getBreakpoints();
  if (Array.isArray(cssValues)) {
    const baseValue = cssValues[0];
    const mediaQueries = cssValues.slice(1).map((value, index) => {
      const breakpoint = Object.keys(breakpoints)[index];
      return `@media (min-width: ${breakpoints[breakpoint]}) {
            ${cssProperty}: ${value};
          }`;
    });

    return `${cssProperty}: ${baseValue}; ${mediaQueries.join(" ")}`;
  }

  return `${cssProperty}: ${cssValues}; `;
};
