import { SpaceKeys } from "../keys";
import {
  AddProperty,
  CSSProperties,
  CSSValue,
  ThemeSystemType,
} from "../types";

export type SpaceProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  AddProperty<
    CSSProperties<
      | "margin"
      | "marginTop"
      | "marginRight"
      | "marginBottom"
      | "marginLeft"
      | "padding"
      | "paddingTop"
      | "paddingRight"
      | "paddingBottom"
      | "paddingLeft",
      true
    > & {
      /**
       * @see margin
       */
      m: CSSValue<"margin", true>;
      /**
       * @see marginTop
       */
      mt: CSSValue<"marginTop", true>;
      /**
       * @see marginRight
       */
      mr: CSSValue<"marginRight", true>;
      /**
       * @see marginBottom
       */
      mb: CSSValue<"marginBottom", true>;
      /**
       * @see marginLeft
       */
      ml: CSSValue<"marginLeft", true>;
      /**
       * @see marginLeft
       * @see marginRight
       */
      marginX: CSSValue<"marginLeft" | "marginRight", true>;
      /**
       * @see marginLeft
       * @see marginRight
       */
      mx: CSSValue<"marginLeft" | "marginRight", true>;
      /**
       * @see marginTop
       * @see marginBottom
       */
      marginY: CSSValue<"marginTop" | "marginBottom", true>;
      /**
       * @see marginTop
       * @see marginBottom
       */
      my: CSSValue<"marginTop" | "marginBottom", true>;
      /**
       * @see padding
       */
      p: CSSValue<"padding", true>;
      /**
       * @see paddingTop
       */
      pt: CSSValue<"paddingTop", true>;
      /**
       * @see paddingRight
       */
      pr: CSSValue<"paddingRight", true>;
      /**
       * @see paddingBottom
       */
      pb: CSSValue<"paddingBottom", true>;
      /**
       * @see paddingLeft
       */
      pl: CSSValue<"paddingLeft", true>;
      /**
       * @see paddingLeft
       * @see paddingRight
       */
      paddingX: CSSValue<"paddingLeft" | "paddingRight", true>;
      /**
       * @see paddingLeft
       * @see paddingRight
       */
      px: CSSValue<"paddingLeft" | "paddingRight", true>;
      /**
       * @see paddingTop
       * @see paddingBottom
       */
      paddingY: CSSValue<"paddingTop" | "paddingBottom", true>;
      /**
       * @see paddingTop
       * @see paddingBottom
       */
      py: CSSValue<"paddingTop" | "paddingBottom", true>;
    },
    T["spacings"]
  >
>;

export const spaceMappings: Record<SpaceKeys, string> = {
  margin: "margin",
  m: "margin",
  marginTop: "margin-top",
  mt: "margin-top",
  marginRight: "margin-right",
  mr: "margin-right",
  marginBottom: "margin-bottom",
  mb: "margin-bottom",
  marginLeft: "margin-left",
  ml: "margin-left",
  marginX: "margin-left,margin-right",
  mx: "margin-left,margin-right",
  marginY: "margin-top,margin-bottom",
  my: "margin-top,margin-bottom",
  padding: "padding",
  p: "padding",
  paddingTop: "padding-top",
  pt: "padding-top",
  paddingRight: "padding-right",
  pr: "padding-right",
  paddingBottom: "padding-bottom",
  pb: "padding-bottom",
  paddingLeft: "padding-left",
  pl: "padding-left",
  paddingX: "padding-left,padding-right",
  px: "padding-left,padding-right",
  paddingY: "padding-top,padding-bottom",
  py: "padding-top,padding-bottom",
};
