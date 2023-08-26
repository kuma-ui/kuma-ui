import { ColorKeys } from "./keys";
import {
  AddProperty,
  CSSProperties,
  CSSValue,
  ResponsiveStyle,
  ThemeSystemType,
} from "./types";
import { applyResponsiveStyles } from "./responsive";
import { theme } from "@kuma-ui/sheet";

export type ColorProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  AddProperty<
    {
      /**
       * @see background
       */
      bg: CSSValue<"background">;
      /**
       * @see backgroundColor
       */
      bgColor: CSSValue<"backgroundColor">;
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
    T["colors"]
  >
>;

export const colorMappings: Record<ColorKeys, string> = {
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
          if (value in (userTheme.colors ?? {})) {
            return userTheme.colors?.[value] as string;
          }
          return value;
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
