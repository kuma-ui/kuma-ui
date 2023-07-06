import { isStyledProp, isPseudoProps } from "@kuma-ui/system";
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
