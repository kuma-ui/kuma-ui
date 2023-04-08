import { ColorKeys } from "./keys";
import { toCssUnit } from "./toCSS";

export type ColorProps = Partial<Record<ColorKeys, string | number>>;

const colorMappings: Record<ColorKeys, string> = {
  bg: "background-color",
  color: "color",
};

export const color = (props: ColorProps): string => {
  let styles = "";
  for (const key in colorMappings) {
    const cssValue = props[key as ColorKeys];
    if (cssValue) {
      const properties = colorMappings[key as ColorKeys].split(",");
      for (const property of properties) {
        styles += `${property}: ${toCssUnit(cssValue)}; `;
      }
    }
  }

  return styles;
};
