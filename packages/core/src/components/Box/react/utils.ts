import { isStyledProp, isPseudoProps, StyleGenerator } from "@kuma-ui/system";
import { BoxProps } from "./types";
import { stableStringify } from "../../../utils/stableStringify";

function isDynamicProp(key: string) {
  if (isStyledProp(key) || isPseudoProps(key) || key === "variant") {
    return true;
  }
  return false;
}

export function hasDynamicProps(props: BoxProps) {
  return Object.keys(props).some((key) => {
    if (isDynamicProp(key) && props[key as keyof BoxProps] != null) {
      return true;
    }
    return false;
  });
}

export function extractDynamicProps(props: BoxProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dynamicProps: Record<string, any> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const restProps: Record<string, any> = {};

  Object.entries(props).forEach(([key, prop]) => {
    if (isDynamicProp(key)) {
      dynamicProps[key] = prop;
      return;
    }
    restProps[key] = prop;
  });
  return {
    dynamicProps,
    restProps,
  };
}

const styleCache: {
  [key: string]: { className: string; css: string } | undefined;
} = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
export function getCachedStyle(dynamicProps: Record<string, any>) {
  const key = stableStringify(dynamicProps);
  let generatedStyle = styleCache[key];
  // If the result isn't in the cache, generate it and save it to the cache
  if (!generatedStyle) {
    generatedStyle = new StyleGenerator(dynamicProps, true).getStyle();
    styleCache[key] = generatedStyle;
  }
  return generatedStyle;
}
