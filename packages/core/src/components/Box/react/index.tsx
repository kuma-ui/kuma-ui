import React from "react";
import type { BoxComponent, BoxProps } from "./types";
import { DynamicBox } from "./DynamicBox";
import { StaticBox } from "./StaticBox";
import { hasDynamicProps } from "./utils";

/**
 * Box is the most abstract component in Kuma UI, providing a base upon which all other components are built.
 * It renders a div element by default, and can accept any system style properties for extensive customization.
 *
 * @see — http://kuma-ui.com/docs/Components/Box
 */
const Box: BoxComponent = ({ children, ...props }) => {
  if (hasDynamicProps(props)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- FIXME
    return React.createElement(DynamicBox, props, children);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- FIXME
  return React.createElement(StaticBox, props, children);
};

export { Box, type BoxComponent, BoxProps };
