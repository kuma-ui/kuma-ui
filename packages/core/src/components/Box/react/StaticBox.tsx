import React from "react";
import type { BoxComponent } from "./types";

export const StaticBox: BoxComponent = ({
  as: Component = "div",
  children,
  IS_KUMA_DEFAULT,
  ...props
}) => React.createElement(Component, props, children);
