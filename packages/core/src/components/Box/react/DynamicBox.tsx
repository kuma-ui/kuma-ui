"use client";

import React, { useMemo } from "react";
import type { BoxComponent } from "./types";
import { isBrowser } from "../../../utils/isBrowser";
import {
  useStyleRegistry,
  createStyleRegistry,
} from "../../../registry/StyleRegistry";
import { extractDynamicProps, getCachedStyle } from "./utils";
import { theme } from "@kuma-ui/sheet";
import { forwardRef } from "../../forwardRef";

const defaultRegistry = createStyleRegistry();
const useInsertionEffect = React.useInsertionEffect || React.useLayoutEffect;

export const DynamicBox: BoxComponent = forwardRef(
  (
    { as: Component = "div", children, variant, IS_KUMA_DEFAULT, ...props },
    ref,
  ) => {
    const registry = useStyleRegistry() || defaultRegistry;

    const variantStyle: Record<string, unknown> = (() => {
      if (!variant) return {};
      if (IS_KUMA_DEFAULT) return {};
      const variants = theme.getVariants("Box")?.variants as
        | Record<string, Record<string, unknown>>
        | undefined;
      const variantKey = variant as string | undefined;
      return (variants && variantKey && variants[variantKey]) || {};
    })();

    const { dynamicProps, restProps } = extractDynamicProps({
      ...variantStyle,
      ...props,
    });

    const { className, css } = getCachedStyle(dynamicProps);

    const box = React.createElement(Component as React.ElementType, {
      ref,
      ...restProps,
      className: [restProps.className, className].filter(Boolean).join(" "),
      children: children as React.ReactNode,
    });

    if (!isBrowser) {
      registry.add(className, css);
      return box;
    }

    useInsertionEffect(() => {
      registry.add(className, css);
      return () => {
        registry.remove(className);
      };
    }, [className, css]);

    return box;
  },
);
