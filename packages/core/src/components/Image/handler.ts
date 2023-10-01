import { StyledProps } from "@kuma-ui/system";

export const defaultImageTag = "img";

// eslint-disable-next-line @typescript-eslint/ban-types
export type ImageSpecificProps = {};

const imageSpecificProps: (keyof ImageSpecificProps)[] = [];

export const isImageProps = (
  propName: unknown,
): propName is ImageSpecificProps => {
  return imageSpecificProps.some((k) => k === propName);
};

export const imageDefaultProps: StyledProps = {};

export const imageHandler = (props: ImageSpecificProps) => ({});
