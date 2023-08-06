import {
  AddProperty,
  CSSProperties,
  ResponsiveStyle,
  ThemeSystemType,
} from "./types";
import { ColumnKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from "./toCSS";
import { ValueConverter, spaceConverter } from "./valueConverters";

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

const columnMappings: Record<
  ColumnKeys,
  string | { property: string; converter: ValueConverter }
> = {
  columnCount: "column-count",
  columnFill: "column-fill",
  columnGap: {
    property: "column-gap",
    converter: spaceConverter,
  },
  columnRule: "column-rule",
  columnRuleColor: "column-rule-color",
  columnRuleStyle: "column-rule-style",
  columnRuleWidth: {
    property: "column-rule-width",
    converter: toCssUnit,
  },
  columnSpan: "column-span",
  columnWidth: {
    property: "column-width",
    converter: toCssUnit,
  },
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
        typeof property !== "string" ? property.converter : undefined;

      const responsiveStyles = applyResponsiveStyles(
        typeof property !== "string" ? property.property : property,
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
