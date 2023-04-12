import { camelToKebab } from "./camelToKebab";

export function serializeStyles(styles: Record<string, any>): string {
  let css = "";
  for (const [property, value] of Object.entries(styles)) {
    const kebabCaseProperty = camelToKebab(property);
    css += `${kebabCaseProperty}: ${value}; `;
  }
  return css;
}
