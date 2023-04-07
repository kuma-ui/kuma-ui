import { toCssUnit } from "./toCSS";
import { LayoutKeys } from "./keys";

export type LayoutProps = Partial<Record<LayoutKeys, string | number>>;

export const layout = (props: LayoutProps): string => {
  let styles = "";

  for (const key in props) {
    const cssValue = props[key as LayoutKeys];
    if (cssValue) {
      styles += `${key}: ${toCssUnit(cssValue)}; `;
    }
  }

  return styles;
};
