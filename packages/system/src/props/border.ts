import { BorderKeys } from "../keys";
import {
  AddProperty,
  CSSProperties,
  CSSValue,
  ThemeSystemType,
} from "../types";

export type BorderProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  {
    /**
     * @see borderTop
     * @see borderBottom
     */
    borderY: CSSValue<"borderTop" | "borderBottom", true>;
    /**
     * @see borderLeft
     * @see borderRight
     */
    borderX: CSSValue<"borderLeft" | "borderRight", true>;
    /**
     * @see borderInlineStart
     */
    borderStart: CSSValue<"borderInlineStart", true>;
    /**
     * @see borderInlineEnd
     */
    borderEnd: CSSValue<"borderInlineEnd", true>;
    /**
     * @see borderInlineStartWidth
     */
    borderStartWidth: CSSValue<"borderInlineStartWidth", true>;
    /**
     * @see borderInlineEndWidth
     */
    borderEndWidth: CSSValue<"borderInlineEndWidth", true>;
    /**
     * @see borderInlineStartStyle
     */
    borderStartStyle: CSSValue<"borderInlineStartStyle">;
    /**
     * @see borderInlineEndStyle
     */
    borderEndStyle: CSSValue<"borderInlineEndStyle">;
  } & AddProperty<
    CSSProperties<
      | "borderRadius"
      | "borderTopLeftRadius"
      | "borderTopRightRadius"
      | "borderBottomLeftRadius"
      | "borderBottomRightRadius",
      true
    > & {
      /**
       * @see borderTopLeftRadius
       * @see borderBottomLeftRadius
       */
      borderStartRadius: CSSValue<
        "borderTopLeftRadius" | "borderBottomLeftRadius",
        true
      >;
      /**
       * @see borderTopRightRadius
       * @see borderBottomRightRadius
       */
      borderEndRadius: CSSValue<
        "borderTopRightRadius" | "borderBottomRightRadius",
        true
      >;
    },
    T["radii"]
  > &
    CSSProperties<
      "border" | "borderTop" | "borderRight" | "borderLeft" | "borderBottom",
      true
    > &
    CSSProperties<
      | "borderStyle"
      | "borderTopStyle"
      | "borderBottomStyle"
      | "borderLeftStyle"
      | "borderRightStyle"
    > &
    CSSProperties<
      | "borderWidth"
      | "borderTopWidth"
      | "borderBottomWidth"
      | "borderLeftWidth"
      | "borderRightWidth",
      true
    >
>;

export const borderMappings: Record<BorderKeys, string> = {
  border: "border",
  borderTop: "border-top",
  borderRight: "border-right",
  borderLeft: "border-left",
  borderBottom: "border-bottom",
  borderX: "border-left,border-right",
  borderY: "border-top,border-bottom",
  borderRadius: "border-radius",
  borderTopLeftRadius: "border-top-left-radius",
  borderTopRightRadius: "border-top-right-radius",
  borderBottomLeftRadius: "border-bottom-left-radius",
  borderBottomRightRadius: "border-bottom-right-radius",
  borderStyle: "border-style",
  borderTopStyle: "border-top-style",
  borderBottomStyle: "border-bottom-style",
  borderLeftStyle: "border-left-style",
  borderRightStyle: "border-right-style",
  borderWidth: "border-width",
  borderTopWidth: "border-top-width",
  borderBottomWidth: "border-bottom-width",
  borderLeftWidth: "border-left-width",
  borderRightWidth: "border-right-width",
  borderStart: "border-inline-start",
  borderEnd: "border-inline-end",
  borderStartWidth: "border-inline-start-width",
  borderEndWidth: "border-inline-end-width",
  borderStartStyle: "border-inline-start-style",
  borderEndStyle: "border-inline-end-style",
  borderStartRadius: "border-top-left-radius,border-bottom-left-radius",
  borderEndRadius: "border-top-right-radius,border-bottom-right-radius",
};
