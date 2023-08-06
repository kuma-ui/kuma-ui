import { theme } from "@kuma-ui/sheet";
import { toCssUnit } from "./toCSS";

export type ValueConverter = (value: string | number) => string | number;

export const spaceConverter: ValueConverter = (v) => {
  const userTheme = theme.getUserTheme();
  return userTheme.spaces?.[v] || toCssUnit(v);
};
