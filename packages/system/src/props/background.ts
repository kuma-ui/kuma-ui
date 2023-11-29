import { BackgroundKeys } from "../keys";
import { AddProperty, CSSProperties, CSSValue } from "../types";

// eslint-disable-next-line @typescript-eslint/ban-types
export type BackgroundProps<AutoPrefix extends string = string & {}> = Partial<
  AddProperty<
    CSSProperties<
      | "backgroundImage"
      | "backgroundPosition"
      | "backgroundRepeat"
      | "backgroundAttachment"
      | "backgroundClip"
      | "backgroundOrigin"
      | "backgroundBlendMode"
    > &
      CSSProperties<
        "backgroundPositionX" | "backgroundPositionY" | "backgroundSize",
        true
      > & {
        /**
         * @see backgroundImage
         */
        bgImage: CSSValue<"backgroundImage">;
        /**
         * @see backgroundPosition
         */
        bgPosition: CSSValue<"backgroundPosition">;
        /**
         * @see backgroundPositionX
         */
        bgPositionX: CSSValue<"backgroundPositionX", true>;
        /**
         * @see backgroundPositionY
         */
        bgPositionY: CSSValue<"backgroundPositionY", true>;
        /**
         * @see backgroundSize
         */
        bgSize: CSSValue<"backgroundSize", true>;
        /**
         * @see backgroundRepeat
         */
        bgRepeat: CSSValue<"backgroundRepeat">;
        /**
         * @see backgroundAttachment
         */
        bgAttachment: CSSValue<"backgroundAttachment">;
        /**
         * @see backgroundClip
         */
        bgClip: CSSValue<"backgroundClip">;
        /**
         * @see backgroundOrigin
         */
        bgOrigin: CSSValue<"backgroundOrigin">;
        /**
         * @see backgroundBlendMode
         */
        bgBlendMode: CSSValue<"backgroundBlendMode">;
      },
    AutoPrefix
  >
>;

export const backgroundMappings: Record<BackgroundKeys, string> = {
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
  backgroundBlendMode: "background-blend-mode",
  bgBlendMode: "background-blend-mode",
} as const;
