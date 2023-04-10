import { toCssUnit } from "./toCSS";
import { FlexKeys } from "./keys";

export type FlexProps = Partial<Record<FlexKeys, string | number>>;

const flexMappings: Record<FlexKeys, string> = {
  flexDir: "flex-direction",
  justify: "justify-content",
  alignItems: "align-items",
  alignContent: "align-content",
  flexWrap: "flex-wrap",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
};

export const flex = (props: FlexProps): string => {
  let styles = "";

  for (const key in props) {
    const cssValue = props[key as FlexKeys];
    if (cssValue) {
      const cssProperty = flexMappings[key as FlexKeys];
      styles += `${cssProperty}: ${toCssUnit(cssValue)}; `;
    }
  }

  return styles;
};
