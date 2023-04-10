import { toCssUnit } from "./toCSS";
import { LayoutKeys } from "./keys";

export type LayoutProps = Partial<Record<LayoutKeys, string | number>>;

const camelToKebab = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export const layout = (props: LayoutProps): string => {
  let styles = "";

  for (const key in props) {
    const cssValue = props[key as LayoutKeys];
    if (cssValue) {
      const cssProperty = camelToKebab(key);
      styles += `${cssProperty}: ${toCssUnit(cssValue)}; `;
    }
  }

  return styles;
};
