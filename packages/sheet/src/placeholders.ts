import { Tokens, UserTheme, tokens } from "./theme";

export interface Placeholders {
  [key: string]: string;
}

export const applyT = (input: string, placeholders: Placeholders): string => {
  return applyPlaceholders(input, placeholders);
};

export const applyPlaceholders = (
  input: string,
  placeholders: Placeholders,
): string => {
  const regex = /\bt\s*\(\s*["']([^"']+)["']\s*\)/g;

  return input.replace(regex, (match, placeholder) => {
    if (typeof placeholder === "string" && placeholder in placeholders) {
      return placeholders[placeholder];
    }
    return match; // return the original match if there's no substitution
  });
};

export const createPlaceholders = (
  theme: Partial<UserTheme>,
): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const token of tokens) {
    const tokenValue = theme[token];
    if (tokenValue) {
      for (const key in tokenValue) {
        result[key] = tokenValue[key]; // Add the token itself
      }
    }
  }

  return result;
};
