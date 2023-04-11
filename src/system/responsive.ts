import { theme } from "../theme";

export const applyResponsiveStyles = (
  cssProperty: string,
  cssValues: string | number | (string | number)[],
  convertFn: (value: string | number) => string | number = (value) => value
): string => {
  const breakpoints = theme.getBreakpoints();

  if (Array.isArray(cssValues)) {
    const baseValue = convertFn(cssValues[0]);
    const mediaQueries = cssValues.slice(1).map((value, index) => {
      const breakpoint = Object.keys(breakpoints)[index];
      return `@media (min-width: ${breakpoints[breakpoint]}) {
            ${cssProperty}: ${convertFn(value)};
          }`;
    });

    return `${cssProperty}: ${baseValue}; ${mediaQueries.join(" ")}`;
  }

  return `${cssProperty}: ${convertFn(cssValues)}; `;
};
