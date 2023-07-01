import React from "react";
import type { BoxComponent } from "./types";

export const StaticBox: BoxComponent = ({
  as: Component = "div",
  children,
  ...props
}) => React.createElement(Component, props, children);
