import { BackgroundKeys } from "./keys";
import { CSSProperties, CSSValue, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from ".";

type AddProperty<T, T2> = {
  [Key in keyof T]: T[Key] | T2;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type BackgroundProps<AutoPrefix extends string = string & {}> = Partial<
  CSSProperties<
    | "backgroundImage"
    | "backgroundPosition"
    | "backgroundRepeat"
    | "backgroundAttachment"
    | "backgroundClip"
    | "backgroundOrigin"
  > &
    CSSProperties<
      "backgroundPositionX" | "backgroundPositionY" | "backgroundSize",
      true
    > &
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
  backgroundImage: "background-image",
  bgImage: "background-image",
  backgroundPosition: "background-position",
  bgPosition: "background-position",
  backgroundPositionX: "background-position-x",
  bgPositionX: "background-position-x",
  backgroundPositionY: "background-position-y",
  bgPositionY: "background-position-y",
  backgroundSize: "background-size",
  bgSize: "background-size",
  backgroundRepeat: "background-repeat",
  bgRepeat: "background-repeat",
  backgroundAttachment: "background-attachment",
  bgAttachment: "background-attachment",
  backgroundClip: "background-clip",
  bgClip: "background-clip",
  backgroundOrigin: "background-origin",
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
