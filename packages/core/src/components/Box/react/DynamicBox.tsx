"use client";

import React from "react";
import type { BoxComponent } from "./types";
import { isBrowser } from "./isBrowser";
import { useStyleRegistry, createStyleRegistry } from "./StyleRegistry";

const useInsertionEffect = React.useInsertionEffect || React.useLayoutEffect;

// TODO: generate id and rule
const id = "test";
const rule = "div { color: red }";

export const DynamicBox: BoxComponent = ({
  as: Component = "div",
  children,
  ...props
}) => {
  const rootRegistry = useStyleRegistry();
  const [registry] = React.useState(
    () => rootRegistry || createStyleRegistry()
  );
  const box = React.createElement(Component, props, children);

  if (!isBrowser) {
    registry.add(id, rule);
    return box;
  }

  useInsertionEffect(() => {
    registry.add(id, rule);
    return () => {
      registry.remove(id);
    };
  }, []);

  return box;
};
