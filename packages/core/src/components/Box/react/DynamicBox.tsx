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
    ref
  ) => {
    const registry = useStyleRegistry() || defaultRegistry;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    const variantStyle: object = (() => {
      if (!variant) return {};
      // eslint-disable-next-line no-extra-boolean-cast -- FIXME
      if (!!IS_KUMA_DEFAULT) return {};
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- FIXME
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
        ref,
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
  }
);
