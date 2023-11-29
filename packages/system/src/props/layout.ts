import { LayoutKeys } from "../keys";
import {
  AddProperty,
  CSSProperties,
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
    CSSProperties<"verticalAlign">
>;

export const layoutMappings: Record<LayoutKeys, string> = {
  width: "width",
  minWidth: "min-width",
  maxWidth: "max-width",
  height: "height",
  minHeight: "min-height",
  maxHeight: "max-height",
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
