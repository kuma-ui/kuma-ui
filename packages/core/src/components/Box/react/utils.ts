import {
  isStyledProp,
  isPseudoProps,
  all,
  normalizePseudo,
  type StyledProps,
  type PseudoProps,
} from "@kuma-ui/system";
import { SystemStyle } from "@kuma-ui/sheet";

export function hasStyledOrPseudoProps(props: any): boolean {
  return Object.keys(props).some((key) => {
    if (isStyledProp(key) || isPseudoProps(key)) {
      return true;
    }
    return false;
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractStyledProps(props: any): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restProps: Record<string, any>;
  styledProps: StyledProps;
  pseudoProps: PseudoProps;
} {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styledProps: any = {};
  const pseudoProps: PseudoProps = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const restProps: Record<string, any> = {};
  Object.keys(props).forEach((key) => {
    if (isStyledProp(key)) {
      styledProps[key] = props[key];
      return;
    }
    if (isPseudoProps(key)) {
      pseudoProps[key] = extractStyledProps(props[key]).styledProps;
      return;
    }
    restProps[key] = props[key];
  });
  return {
    restProps,
    styledProps,
    pseudoProps,
  };
}

export function getStyle({
  styledProps,
  pseudoProps,
}: {
  styledProps: StyledProps;
  pseudoProps: PseudoProps;
}): SystemStyle {
  const convertedPseudoProps: SystemStyle["pseudo"] = Object.entries(
    pseudoProps
  ).map(([pseudoKey, pseudoValue]) => {
    const pseudoStyle = all(pseudoValue);
    return {
      key: normalizePseudo(pseudoKey),
      base: pseudoStyle.base,
      responsive: pseudoStyle.media,
    };
  });
  return {
    base: all(styledProps).base,
    responsive: all(styledProps).media,
    pseudo: convertedPseudoProps,
  };
}
