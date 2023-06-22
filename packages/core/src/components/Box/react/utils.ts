import { isStyledProp, isPseudoProps } from "@kuma-ui/system";

export function hasStyledOrPseudoProps(props: any): boolean {
  return Object.keys(props).some((key) => {
    if (isStyledProp(key) || isPseudoProps(key)) {
      return true;
    }
    return false;
  });
}
