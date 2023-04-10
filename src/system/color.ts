import { ColorKeys } from "./keys";

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
      const property = colorMappings[key as ColorKeys];
      styles += `${property}: ${cssValue}; `;
    }
  }

  return styles;
};
