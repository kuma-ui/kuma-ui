"use client";

import React, { useMemo } from "react";
import type { BoxComponent } from "./types";
import { isBrowser } from "../../../utils/isBrowser";
import {
  useStyleRegistry,
  createStyleRegistry,
} from "../../../registry/StyleRegistry";
import { extractDynamicProps } from "./utils";
import { StyleGenerator } from "@kuma-ui/system";
import { theme } from "@kuma-ui/sheet";

const defaultRegistry = createStyleRegistry();
const useInsertionEffect = React.useInsertionEffect || React.useLayoutEffect;

export const DynamicBox: BoxComponent = ({
  as: Component = "div",
  children,
  variant,
  ...props
}) => {
  const registry = useStyleRegistry() || defaultRegistry;

  const variantStyle = variant
    ? theme.getVariants("Box")?.variants?.[variant]
    : {};

  const { dynamicProps, restProps } = extractDynamicProps({
    ...variantStyle,
    ...props,
  });

  const { className, css } = useMemo(
    () => new StyleGenerator(dynamicProps, true).getStyle(),
    [JSON.stringify(dynamicProps)]
  );

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
