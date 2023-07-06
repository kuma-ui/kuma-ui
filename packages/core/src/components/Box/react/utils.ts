import { isStyledProp, isPseudoProps, StyleGenerator } from "@kuma-ui/system";
import { BoxProps } from "./types";

function isDynamicProp(key: string) {
  if (isStyledProp(key) || isPseudoProps(key) || key === "variant") {
    return true;
  }
  return false;
}

export function hasDynamicProps(props: BoxProps) {
  return Object.keys(props).some((key) => {
    if (isDynamicProp(key)) {
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

/**
 * Generates a unique key for props, aiding cache efficiency.
 * Incurs O(n log n) cost due to sorting, but it's acceptable given the
 * expensive nature of StyleGenerator's internals.
 */
const generateKey = (props: Record<string, any>) => {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
};

export function getCachedStyle(dynamicProps: Record<string, any>) {
  const key = generateKey(dynamicProps);
  let generatedStyle = styleCache[key];
  // If the result isn't in the cache, generate it and save it to the cache
  if (!generatedStyle) {
    generatedStyle = new StyleGenerator(dynamicProps).getStyle();
    styleCache[key] = generatedStyle;
  }
  return generatedStyle;
}
