import { toCssUnit } from "./toCSS";
import { LayoutKeys } from "./keys";

export type LayoutProps = Partial<Record<LayoutKeys, string | number>>;

const layoutMappings: Record<LayoutKeys, string> = {
  width: "width",
  height: "height",
  display: "display",
  overflow: "overflow",
  position: "position",
  zIndex: "z-index",
};

export const layout = (props: LayoutProps): string => {
  let styles = "";
  for (const key in layoutMappings) {
    const cssValue = props[key as LayoutKeys];
    if (cssValue) {
      const property = layoutMappings[key as LayoutKeys];
      styles += `${property}: ${toCssUnit(cssValue)}; `;
    }
  }

  return styles;
};
