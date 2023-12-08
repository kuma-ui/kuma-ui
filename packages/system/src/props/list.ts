import { CSSProperties } from "../types";
import { ListKeys } from "../keys";

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
