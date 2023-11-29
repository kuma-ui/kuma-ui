import { AddProperty, CSSProperties, ThemeSystemType } from "../types";
import { ColumnKeys } from "../keys";

export type ColumnProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  CSSProperties<
    | "columnFill"
    | "columnRule"
    | "columnRuleColor"
    | "columnRuleStyle"
    | "columnSpan"
  > &
    CSSProperties<
      "columnCount" | "columnWidth" | "columnRuleWidth" | "columns",
      true
    > &
    AddProperty<CSSProperties<"columnGap", true>, T["spacings"]>
>;

export const columnMappings: Record<ColumnKeys, string> = {
  columnCount: "column-count",
  columnFill: "column-fill",
  columnGap: "column-gap",
  columnRule: "column-rule",
  columnRuleColor: "column-rule-color",
  columnRuleStyle: "column-rule-style",
  columnRuleWidth: "column-rule-width",
  columnSpan: "column-span",
  columnWidth: "column-width",
  columns: "columns",
};
