import React from "react";
import type { BoxComponent } from "./types";
import { forwardRef } from "../../forwardRef";

export const StaticBox: BoxComponent = forwardRef(
  ({ as: Component = "div", children, IS_KUMA_DEFAULT, ...props }, ref) =>
    React.createElement(Component, { ref, ...props }, children)
);
