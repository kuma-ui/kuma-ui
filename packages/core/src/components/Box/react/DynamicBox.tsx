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

const defaultRegistry = createStyleRegistry();
const useInsertionEffect = React.useInsertionEffect || React.useLayoutEffect;

export const DynamicBox: BoxComponent = ({
  as: Component = "div",
  children,
  variant,
  IS_KUMA_DEFAULT,
  ...props
}) => {
  const registry = useStyleRegistry() || defaultRegistry;

  const variantStyle = (() => {
    if (!variant) return {};
    if (!!IS_KUMA_DEFAULT) return {};
    return theme.getVariants("Box")?.variants?.[variant];
  })();

  const { dynamicProps, restProps } = extractDynamicProps({
    ...variantStyle,
    ...props,
  });

  const { className, css } = getCachedStyle(dynamicProps);

  const box = React.createElement(
    Component,
    {
      ...restProps,
      className: [restProps.className, className].filter(Boolean).join(" "),
    },
    children
  );

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
};
