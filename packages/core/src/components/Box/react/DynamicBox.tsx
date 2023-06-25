"use client";

import React from "react";
import type { BoxComponent } from "./types";
import { isBrowser } from "./isBrowser";
import { useStyleRegistry, createStyleRegistry } from "./StyleRegistry";

const defaultRegistry = isBrowser ? createStyleRegistry() : null;

const useInsertionEffect = React.useInsertionEffect || React.useLayoutEffect;

// TODO: support SSR
export const DynamicBox: BoxComponent = ({
  as: Component = "div",
  children,
  ...props
}) => {
  const box = React.createElement(Component, props, children);
  const registry = defaultRegistry ? defaultRegistry : useStyleRegistry();

  useInsertionEffect(() => {
    if (registry === null) {
      return;
    }
    // TODO: generate id and rule
    const id = "test";
    const rule = "div { color: red }";
    registry.add(id, rule);
    return () => {
      registry.remove(id);
    };
  }, []);

  return box;
};
