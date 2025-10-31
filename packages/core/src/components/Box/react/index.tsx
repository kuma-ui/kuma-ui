import React from "react";
import type { BoxComponent, BoxProps } from "./types";
import { DynamicBox } from "./DynamicBox";
import { StaticBox } from "./StaticBox";
import { hasDynamicProps } from "./utils";
import { forwardRef } from "../../forwardRef";

/**
 * Box is the most abstract component in Kuma UI, providing a base upon which all other components are built.
 * It renders a div element by default, and can accept any system style properties for extensive customization.
 *
 * @see — http://kuma-ui.com/docs/Components/Box
 */
const Box: BoxComponent = forwardRef<BoxProps, "div">(
  ({ children, ...props }, ref) => {
    if (hasDynamicProps(props)) {
      return <DynamicBox ref={ref} {...props}>{children}</DynamicBox>;
    }

    return <StaticBox ref={ref} {...props}>{children}</StaticBox>;
  },
);

export { Box, type BoxComponent, BoxProps };
