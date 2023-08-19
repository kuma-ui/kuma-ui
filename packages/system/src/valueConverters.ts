import { theme } from "@kuma-ui/sheet";
import { toCssUnit } from "./toCSS";

export type ValueConverter = (value: string | number) => string | number;

export const spaceConverter: ValueConverter = (v) => {
  const userTheme = theme.getUserTheme();
  return userTheme.spacings?.[v] || toCssUnit(v);
};

export const sizeConverter: ValueConverter = (v) => {
  const userTheme = theme.getUserTheme();
  return userTheme.sizes?.[v] || toCssUnit(v);
};

export const radiusConverter: ValueConverter = (v) => {
  const userTheme = theme.getUserTheme();
  return userTheme.radii?.[v] || toCssUnit(v);
};
