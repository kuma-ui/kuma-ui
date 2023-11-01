import { toCssUnit } from "../toCSS";
import { FlexKeys } from "../keys";
import { applyResponsiveStyles } from "../responsive";
import {
  AddProperty,
  CSSProperties,
  CSSValue,
  ResponsiveStyle,
  ThemeSystemType,
  ValueConverter,
} from "../types";

export type FlexProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  {
    /**
     * @see flexDirection
     */
    flexDir: CSSValue<"flexDirection">;
  } & {
    /**
     * @see justifyContent
     */
    justify: CSSValue<"justifyContent">;
  } & CSSProperties<"alignContent" | "alignItems" | "alignSelf"> &
    CSSProperties<"flexWrap" | "flexFlow" | "flexDirection"> &
    CSSProperties<"flexBasis", true> &
    CSSProperties<"flex" | "flexShrink" | "flexGrow", true> &
    CSSProperties<"justifyItems" | "justifySelf" | "justifyContent"> &
    CSSProperties<"placeItems" | "placeContent"> &
    AddProperty<CSSProperties<"gap", true>, T["spacings"]>
>;

export const flexMappings: Record<FlexKeys, string> = {
  flexDirection: "flex-direction",
  flexDir: "flex-direction",
  justifyContent: "justify-content",
  justify: "justify-content",
  alignContent: "align-content",
  alignItems: "align-items",
  alignSelf: "align-self",
  flex: "flex",
  flexBasis: "flex-basis",
  flexFlow: "flex-flow",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexWrap: "flex-wrap",
  justifyItems: "justify-items",
  justifySelf: "justify-self",
  gap: "gap",
  placeItems: "place-items",
  placeContent: "place-content",
} as const;

export const flexConverters: Partial<Record<FlexKeys, ValueConverter>> = {
  gap: toCssUnit,
  flexBasis: toCssUnit,
};
