import React from "react";
import type { BoxComponent } from "./types";

export const StaticBox: BoxComponent = ({
  as: Component = "div",
  children,
  IS_KUMA_DEFAULT,
  ...props
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- FIXME
}) => React.createElement(Component, props, children);
