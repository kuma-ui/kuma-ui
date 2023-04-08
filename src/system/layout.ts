import { toCssUnit } from "./toCSS";
import { LayoutKeys } from "./keys";

export type LayoutProps = Partial<Record<LayoutKeys, string | number>>;

const layoutMappings: Record<LayoutKeys, string> = {
  display: "display",
  height: "height",
  overflow: "overflow",
  position: "position",
  zIndex: "z-index",
  width: "width",
};

export const layout = (props: LayoutProps): string => {
  let styles = "";

  for (const key in props) {
    const cssValue = props[key as LayoutKeys];
    if (cssValue) {
      //   const properties = layoutMappings[cssValue as LayoutKeys].split(",");
      //   for (const property of properties) {
      //     styles += `${property}: ${toCssUnit(cssValue)}; `;
      //   }
      styles += `${key}: ${toCssUnit(cssValue)}; `;
    }
  }

  return styles;
};
