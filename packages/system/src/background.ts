import { BackgroundKeys } from "./keys";
import { CSSValue, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from ".";

type AddProperty<T, T2> = {
  [Key in keyof T]: T[Key] | T2;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type BackgroundProps<AutoPrefix extends string = string & {}> = Partial<
  AddProperty<
    {
      /**
       * @see backgroundImage
       */
      bgImage: CSSValue<"backgroundImage"> | AutoPrefix;
      /**
       * @see backgroundPosition
       */
      bgPosition: CSSValue<"backgroundPosition"> | AutoPrefix;
      /**
       * @see backgroundPositionX
       */
      bgPositionX: CSSValue<"backgroundPositionX", true> | AutoPrefix;
      /**
       * @see backgroundPositionY
       */
      bgPositionY: CSSValue<"backgroundPositionY", true> | AutoPrefix;
      /**
       * @see backgroundSize
       */
      bgSize: CSSValue<"backgroundSize", true> | AutoPrefix;
      /**
       * @see backgroundRepeat
       */
      bgRepeat: CSSValue<"backgroundRepeat"> | AutoPrefix;
      /**
       * @see backgroundAttachment
       */
      bgAttachment: CSSValue<"backgroundAttachment"> | AutoPrefix;
      /**
       * @see backgroundClip
       */
      bgClip: CSSValue<"backgroundClip"> | AutoPrefix;
      /**
       * @see backgroundOrigin
       */
      bgOrigin: CSSValue<"backgroundOrigin"> | AutoPrefix;
    },
    AutoPrefix
  >
>;

const backgroundMappings: Record<BackgroundKeys, string> = {
  bgImage: "background-image",
  bgPosition: "background-position",
  bgPositionX: "background-position-x",
  bgPositionY: "background-position-y",
  bgSize: "background-size",
  bgRepeat: "background-repeat",
  bgAttachment: "background-attachment",
  bgClip: "background-clip",
  bgOrigin: "background-origin",
} as const;

export const background = (props: BackgroundProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in backgroundMappings) {
    const cssValue = props[key as BackgroundKeys];
    if (cssValue) {
      const property = backgroundMappings[key as BackgroundKeys];
      const converter = [
        backgroundMappings.bgPositionX,
        backgroundMappings.bgPositionY,
        backgroundMappings.bgSize,
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
