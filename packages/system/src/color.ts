import { ColorKeys } from "./keys";
import {
  AddProperty,
  CSSProperties,
  CSSValue,
  ResponsiveStyle,
  ThemeSystemType,
  ValueConverter,
} from "./types";
import { applyResponsiveStyles } from "./responsive";

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
      | "opacity"
      | "visibility",
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
  visibility: "visibility",
};

export const colorConverters: Partial<Record<ColorKeys, ValueConverter>> = {};
