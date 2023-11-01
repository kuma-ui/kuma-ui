import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { FilterKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";

export type FilterProps = Partial<CSSProperties<"filter" | "backdropFilter">>;

export const filterMappings: Record<FilterKeys, string> = {
  filter: "filter",
  backdropFilter: "backdrop-filter",
} as const;

export const filterConverters: Partial<Record<FilterKeys, ValueConverter>> = {};
