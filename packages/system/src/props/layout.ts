import { LayoutKeys } from "../keys";
import {
  AddProperty,
  CSSProperties,
  CSSValue,
  ThemeSystemType,
} from "../types";

export type LayoutProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  AddProperty<
    CSSProperties<"width" | "minWidth" | "maxWidth", true>,
    T["sizes"]
  > &
    AddProperty<
      CSSProperties<"height" | "minHeight" | "maxHeight", true>,
      T["sizes"]
    > &
    CSSProperties<"display" | "position"> &
    CSSProperties<"overflow" | "overflowX" | "overflowY"> &
    AddProperty<CSSProperties<"zIndex", true>, T["zIndices"]> &
    CSSProperties<"cursor" | "userSelect"> &
    CSSProperties<"aspectRatio"> &
    CSSProperties<"boxSizing"> &
    CSSProperties<"float" | "clear"> &
    CSSProperties<"objectFit" | "objectPosition"> &
    CSSProperties<"resize"> &
    CSSProperties<"verticalAlign"> & {
      /**
       * @see width
       */
      w: CSSValue<"width", true>;
      /**
       * @see minWidth
       */
      minW: CSSValue<"minWidth", true>;
      /**
       * @see maxWidth
       */
      maxW: CSSValue<"maxWidth", true>;
      /**
       * @see height
       */
      h: CSSValue<"height", true>;
      /**
       * @see minHeight
       */
      minH: CSSValue<"minHeight", true>;
      /**
       * @see maxHeight
       */
      maxH: CSSValue<"maxHeight", true>;
    }
>;

export const layoutMappings: Record<LayoutKeys, string> = {
  width: "width",
  w: "width",
  minWidth: "min-width",
  minW: "min-width",
  maxWidth: "max-width",
  maxW: "max-width",
  height: "height",
  h: "height",
  minHeight: "min-height",
  minH: "min-height",
  maxHeight: "max-height",
  maxH: "max-height",
  display: "display",
  overflow: "overflow",
  overflowX: "overflow-x",
  overflowY: "overflow-y",
  position: "position",
  zIndex: "z-index",
  cursor: "cursor",
  aspectRatio: "aspect-ratio",
  boxSizing: "box-sizing",
  float: "float",
  clear: "clear",
  objectFit: "object-fit",
  objectPosition: "object-position",
  resize: "resize",
  verticalAlign: "vertical-align",
  userSelect: "user-select",
} as const;
