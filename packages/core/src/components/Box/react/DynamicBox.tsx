"use client";

import React from "react";
import type { BoxComponent } from "./types";

export const DynamicBox: BoxComponent = ({
  as: Component = "div",
  children,
  ...props
}) => {
  return React.createElement(Component, props, children);
};
