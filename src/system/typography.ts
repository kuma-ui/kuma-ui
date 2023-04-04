import { toCssUnit } from "./util";
import { TypographyKeys } from "./keys";

export type TypographyProps = Partial<Record<TypographyKeys, string | number>>;

const typographyMappings: Record<TypographyKeys, string> = {
  fontSize: "font-size",
  fontWeight: "font-weight",
  lineHeight: "line-height",
  letterSpacing: "letter-spacing",
  textAlign: "text-align",
  fontFamily: "font-family",
};

export const typography = (props: TypographyProps): string => {
  let styles = "";

  for (const key in props) {
    const cssValue = typographyMappings[key as TypographyKeys];
    if (cssValue) {
      styles += `${key}: ${toCssUnit(cssValue)}; `;
    }
  }

  return styles;
};
