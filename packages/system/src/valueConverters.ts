import { theme } from "@kuma-ui/sheet";
import { toCssUnit } from "./toCSS";

type Converter = (value: string | number) => string | number;

export const spaceConverter: Converter = (v) => {
  const userTheme = theme.getUserTheme();
  return userTheme.spaces?.[v] || toCssUnit(v);
};
