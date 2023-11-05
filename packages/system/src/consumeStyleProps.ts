import {
  AnimationProps,
  animationConverters,
  animationMappings,
} from "./props/animation";
import { SpaceProps, spaceConverters, spaceMappings } from "./props/space";
import {
  TypographyProps,
  typographyConverters,
  typographyMappings,
} from "./props/typography";
import { LayoutProps, layoutConverters, layoutMappings } from "./props/layout";
import { ColorProps, colorConverters, colorMappings } from "./props/color";
import { FlexProps, flexConverters, flexMappings } from "./props/flex";
import { BorderProps, borderConverters, borderMappings } from "./props/border";
import {
  OutlineProps,
  outlineConverters,
  outlineMappings,
} from "./props/outline";
import {
  PositionProps,
  positionConverters,
  positionMappings,
} from "./props/position";
import { ShadowProps, shadowConverters, shadowMappings } from "./props/shadow";
import { PseudoProps } from "./pseudo";
import { ThemeSystemType, ResponsiveStyle, ValueConverter } from "./types";
import { styleCache } from "@kuma-ui/sheet";
import { GridProps, gridConverters, gridMappings } from "./props/grid";
import { ListProps, listConverters, listMappings } from "./props/list";
import { EffectProps, effectConverters, effectMappings } from "./props/effect";
import { TextProps, textConverters, textMappings } from "./props/text";
import { FontProps, fontConverters, fontMappings } from "./props/font";
import { MaskProps, maskConverters, maskMappings } from "./props/mask";
import { ColumnProps, columnConverters, columnMappings } from "./props/column";
import {
  BackgroundProps,
  backgroundConverters,
  backgroundMappings,
} from "./props/background";
import { FilterProps, filterConverters, filterMappings } from "./props/filter";
import { StyledKeyType } from "./keys";
import { applyResponsiveStyles } from "./responsive";

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
    // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- FIXME
    EffectProps &
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

const styleConverters: Partial<Record<StyledKeyType, ValueConverter>> =
  Object.assign(
    {},
    animationConverters,
    spaceConverters,
    typographyConverters,
    layoutConverters,
    colorConverters,
    flexConverters,
    borderConverters,
    outlineConverters,
    positionConverters,
    shadowConverters,
    gridConverters,
    listConverters,
    effectConverters,
    textConverters,
    fontConverters,
    maskConverters,
    columnConverters,
    backgroundConverters,
    filterConverters,
  ) as Partial<Record<StyledKeyType, ValueConverter>>;

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

    const converter = styleConverters[key as StyledKeyType];
    const properties = styleMappings[key as StyledKeyType]?.split(",") ?? [];
    for (const property of properties) {
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter,
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
