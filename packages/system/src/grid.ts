import { toCssUnit } from "./toCSS";
import { GridKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import {
  AddProperty,
  CSSProperties,
  ResponsiveStyle,
  ThemeSystemType,
} from "./types";

const gapKeys = ["gridGap", "gridColumnGap", "gridRowGap"] as const;
type GapKeys = (typeof gapKeys)[number];

export type GridProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  CSSProperties<Exclude<GridKeys, GapKeys>> &
    AddProperty<CSSProperties<GapKeys, true>, T["spacings"]>
>;

export const gridMappings: Record<GridKeys, string> = {
  grid: "grid",
  gridArea: "grid-area",
  gridAutoColumns: "grid-auto-columns",
  gridAutoFlow: "grid-auto-flow",
  gridAutoRows: "grid-auto-rows",
  gridColumn: "grid-column",
  gridColumnEnd: "grid-column-end",
  gridColumnStart: "grid-column-start",
  gridRow: "grid-row",
  gridRowEnd: "grid-row-end",
  gridRowStart: "grid-row-start",
  gridTemplate: "grid-template",
  gridTemplateAreas: "grid-template-areas",
  gridTemplateColumns: "grid-template-columns",
  gridTemplateRows: "grid-template-rows",
  gridGap: "grid-gap",
  gridColumnGap: "grid-column-gap",
  gridRowGap: "grid-row-gap",
} as const;

export const grid = (props: GridProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in gridMappings) {
    const cssValue = props[key as GridKeys];
    if (cssValue != undefined) {
      const property = gridMappings[key as GridKeys];
      const converter = gapKeys.includes(key as GapKeys)
        ? toCssUnit
        : undefined;
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter,
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
