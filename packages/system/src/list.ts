import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { ListKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";

export type ListProps = Partial<
  CSSProperties<
    "listStyle" | "listStyleImage" | "listStylePosition" | "listStyleType"
  >
>;

export const listMappings: Record<ListKeys, string> = {
  listStyle: "list-style",
  listStyleImage: "list-style-image",
  listStylePosition: "list-style-position",
  listStyleType: "list-style-type",
} as const;

export const listConverters: Partial<Record<ListKeys, ValueConverter>> = {};
