import { CSSProperties } from "../types";
import { FilterKeys } from "../keys";

export type FilterProps = Partial<CSSProperties<"filter" | "backdropFilter">>;

export const filterMappings: Record<FilterKeys, string> = {
  filter: "filter",
  backdropFilter: "backdrop-filter",
} as const;
