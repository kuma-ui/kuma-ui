import { Tokens, UserTheme } from "./theme";

const tokens: Tokens[] = [
  "colors",
  "fonts",
  "fontSizes",
  "fontWeights",
  "lineHeights",
  "letterSpacings",
  "spacings",
  "sizes",
  "radii",
  "zIndices",
  "breakpoints",
];

const synonyms: Partial<Record<Tokens, string>> = {
  breakpoints: "b",
  colors: "c",
};

export interface Placeholders {
  [key: string]: string;
}

export const applyT = (
  input: string,
  placeholders: Placeholders,
  factor: number
): string => {
  return applySpacingScalingFactor(
    applyPlaceholders(input, placeholders),
    factor
  );
};

export const applyPlaceholders = (
  input: string,
  placeholders: Placeholders
): string => {
  const regex = /\bt\s*\(\s*["']([^"']+)["']\s*\)/g;

  return input.replace(regex, (match, placeholder) => {
    if (typeof placeholder === "string" && placeholder in placeholders) {
      return placeholders[placeholder];
    }
    return match; // return the original match if there's no substitution
  });
};

export const applySpacingScalingFactor = (
  input: string,
  factor: number
): string => {
  const regex = /\bt\s*\(\s*(-?\d+(\.\d+)?)\s*\)/g;

  return input.replace(regex, (match, number: string) => {
    const parsedValue = parseFloat(number);
    if (!isNaN(parsedValue)) {
      const multipliedValue = parsedValue * factor;
      return `${multipliedValue}px`;
    }
    return match;
  });
};

export const createPlaceholders = (
  theme: Partial<UserTheme>
): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const token of tokens) {
    const tokenValue = theme[token];
    if (tokenValue) {
      for (const key in tokenValue) {
        result[`${token}.${key}`] = tokenValue[key]; // Add the token itself
        if (synonyms[token]) {
          result[`${synonyms[token]}.${key}`] = tokenValue[key]; // Add the synonym if it exists
        }
      }
    }
  }

  return result;
};
