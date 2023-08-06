import {
  AddProperty,
  CSSProperties,
  ResponsiveStyle,
  ThemeSystemType,
} from "./types";
import { ColumnKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from "./toCSS";
import { spaceConverter } from "./valueConverters";

// eslint-disable-next-line @typescript-eslint/ban-types
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
    AddProperty<CSSProperties<"columnGap", true>, T["spaces"]>
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
    if (cssValue != undefined) {
      const property = columnMappings[key as ColumnKeys];
      const converter =
        property === columnMappings.columnGap
          ? spaceConverter
          : [
              columnMappings.columnWidth,
              columnMappings.columnRuleWidth,
            ].includes(property)
          ? spaceConverter
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
