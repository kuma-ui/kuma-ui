import { theme } from "@kuma-ui/sheet";
import { componentList } from "./componentList";
import type { ComponentProps } from "./types";
import type { BoxProps } from "./Box/react/types";

/**
 * Resolve and merge variant-defined props with component props, returning Box-compatible props.
 * Centralizes the common pattern used by the Kuma React wrappers.
 */
export function resolveMergedBoxProps<
  ComponentType extends keyof typeof componentList,
>(
  componentName: ComponentType,
  props: Omit<ComponentProps<ComponentType>, "children">,
): BoxProps {
  type ComponentName = Parameters<typeof theme.getVariants>[0];
  const variantData = theme.getVariants(componentName as ComponentName);
  const variants = variantData?.variants;

  // Variant is already typed as string literal union or undefined from ComponentProps
  const variantKey = props.variant;
  const variantProps: Partial<BoxProps> =
    variantKey &&
    variants &&
    typeof variantKey === "string" &&
    variantKey in variants
      ? (variants[variantKey] as Partial<BoxProps>)
      : {};

  return {
    ...variantProps,
    ...props,
    IS_KUMA_DEFAULT: true,
  };
}
