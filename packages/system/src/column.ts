import { CSSProperties, ResponsiveStyle } from "./types";
import { ColumnKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from "./toCSS";

export type ColumnProps = Partial<
  CSSProperties<
    | "columnFill"
    | "columnRule"
    | "columnRuleColor"
    | "columnRuleStyle"
    | "columnSpan"
  > &
    CSSProperties<
      | "columnCount"
      | "columnGap"
      | "columnWidth"
      | "columnRuleWidth"
      | "columns",
      true
    >
>;

const columnMappings: Record<ColumnKeys, string> = {
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

export const column = (props: ColumnProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in columnMappings) {
    const cssValue = props[key as ColumnKeys];
    if (cssValue) {
      const property = columnMappings[key as ColumnKeys];
      const converter = [
        columnMappings.columnGap,
        columnMappings.columnWidth,
        columnMappings.columnRuleWidth,
      ].includes(property)
        ? toCssUnit
        : undefined;
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter
      );
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) media[breakpoint] += css;
        else media[breakpoint] = css;
      }
    }
  }
  return { base, media };
};
