import { ColorKeys } from "./keys";
import { CSSProperties, CSSValue, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";
import { theme } from "@kuma-ui/sheet";

type AddProperty<T, T2> = {
  [Key in keyof T]: T[Key] | T2;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ColorProps<AutoPrefix extends string = string & {}> = Partial<
  AddProperty<
    {
      /**
       * @see background
       */
      bg: CSSValue<"background"> | AutoPrefix;
      /**
       * @see backgroundColor
       */
      bgColor: CSSValue<"backgroundColor"> | AutoPrefix;
    } & CSSProperties<
      | "background"
      | "backgroundColor"
      | "borderColor"
      | "outlineColor"
      | "color"
      | "accentColor"
      | "caretColor"
      | "opacity",
      false
    >,
    AutoPrefix
  >
>;

const colorMappings: Record<ColorKeys, string> = {
  background: "background",
  bg: "background",
  backgroundColor: "background-color",
  bgColor: "background-color",
  color: "color",
  borderColor: "border-color",
  outlineColor: "outline-color",
  accentColor: "accent-color",
  caretColor: "caret-color",
  opacity: "opacity",
};

export const color = (props: ColorProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};
  for (const key in colorMappings) {
    const cssValue = props[key as ColorKeys];
    if (cssValue != undefined) {
      const property = colorMappings[key as ColorKeys];
      const userTheme = theme.getUserTheme();
      let converter: (value: string | number) => string | number;
      if (userTheme.colors) {
        converter = (value) => {
          let newValue = value;
          for (const key in userTheme.colors) {
            if (value === key) {
              newValue = userTheme.colors[key];
              break;
            }
          }
          return newValue;
        };
      } else {
        converter = (v) => v;
      }
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter
      );
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) media[breakpoint] += css;
        else media[breakpoint] = css;
      }
    }
  }

  return { base, media };
};
