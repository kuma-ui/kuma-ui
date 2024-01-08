import { AnimationProps, animationMappings } from "./props/animation";
import { SpaceProps, spaceMappings } from "./props/space";
import { TypographyProps, typographyMappings } from "./props/typography";
import { LayoutProps, layoutMappings } from "./props/layout";
import { ColorProps, colorMappings } from "./props/color";
import { FlexProps, flexMappings } from "./props/flex";
import { BorderProps, borderMappings } from "./props/border";
import { OutlineProps, outlineMappings } from "./props/outline";
import { PositionProps, positionMappings } from "./props/position";
import { ShadowProps, shadowMappings } from "./props/shadow";
import { ThemeSystemType, ResponsiveStyle } from "./types";
import { styleCache } from "@kuma-ui/sheet";
import { GridProps, gridMappings } from "./props/grid";
import { ListProps, listMappings } from "./props/list";
import { EffectProps, effectMappings } from "./props/effect";
import { TextProps, textMappings } from "./props/text";
import { FontProps, fontMappings } from "./props/font";
import { MaskProps, maskMappings } from "./props/mask";
import { ColumnProps, columnMappings } from "./props/column";
import { BackgroundProps, backgroundMappings } from "./props/background";
import { FilterProps, filterMappings } from "./props/filter";
import { StyledKeyType } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from "./toCSS";

export type StyledProps<T extends ThemeSystemType = ThemeSystemType> =
  TypographyProps<T> &
    FontProps<T> &
    ColorProps<T> &
    SpaceProps<T> &
    AnimationProps &
    TextProps &
    LayoutProps<T> &
    FlexProps<T> &
    BorderProps<T> &
    OutlineProps &
    PositionProps &
    ShadowProps &
    GridProps<T> &
    ListProps &
    EffectProps &
    MaskProps &
    ColumnProps<T> &
    BackgroundProps &
    FilterProps;

export type StyleFunction = (props: StyledProps) => ResponsiveStyle;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
const styleMappings: Record<StyledKeyType, string> = Object.assign(
  {},
  animationMappings,
  spaceMappings,
  typographyMappings,
  layoutMappings,
  colorMappings,
  flexMappings,
  borderMappings,
  outlineMappings,
  positionMappings,
  shadowMappings,
  gridMappings,
  listMappings,
  effectMappings,
  textMappings,
  fontMappings,
  maskMappings,
  columnMappings,
  backgroundMappings,
  filterMappings,
);

export const consumeStyleProps = (props: StyledProps): ResponsiveStyle => {
  const cacheKey = JSON.stringify(props);

  const cachedStyles = styleCache.get(cacheKey);
  if (cachedStyles) {
    return cachedStyles;
  }

  let base = "";
  const media: { [breakpoint: string]: string } = {};
  for (const key in props) {
    const cssValue = props[key as StyledKeyType];
    if (cssValue == null) continue;

    const properties = styleMappings[key as StyledKeyType]?.split(",") ?? [];
    for (const property of properties) {
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        (value) => toCssUnit(key, value),
      );
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) {
          media[breakpoint] += css;
        } else {
          media[breakpoint] = css;
        }
      }
    }
  }

  const combinedStyles = { base, media };

  styleCache.set(cacheKey, combinedStyles);

  return combinedStyles;
};
