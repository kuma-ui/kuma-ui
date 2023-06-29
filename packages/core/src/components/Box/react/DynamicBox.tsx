"use client";

import React, { useMemo } from "react";
import type { BoxComponent } from "./types";
import { isBrowser } from "./isBrowser";
import { useStyleRegistry, createStyleRegistry } from "./StyleRegistry";
import { extractStyledProps, getStyle } from "./utils";
import { sheet } from "@kuma-ui/sheet";

const defaultRegistry = createStyleRegistry();
const useInsertionEffect = React.useInsertionEffect || React.useLayoutEffect;

export const DynamicBox: BoxComponent = ({
  as: Component = "div",
  children,
  ...props
}) => {
  const registry = useStyleRegistry() || defaultRegistry;
  const styledProps = extractStyledProps(props);
  const { className, rule } = useMemo(() => {
    const style = getStyle(styledProps);
    const className = sheet.addRule(style, true);
    const rule = sheet.getCSS();
    sheet.reset();
    return { className, rule };
  }, [
    JSON.stringify(styledProps.styledProps),
    JSON.stringify(styledProps.styledProps),
  ]);
  const box = React.createElement(
    Component,
    {
      ...styledProps.restProps,
      className: [styledProps.restProps.className, className]
        .filter(Boolean)
        .join(" "),
    },
    children
  );

  if (!isBrowser) {
    registry.add(className, rule);
    return box;
  }

  useInsertionEffect(() => {
    registry.add(className, rule);
    return () => {
      registry.remove(className);
    };
  }, [className, rule]);

  return box;
};
