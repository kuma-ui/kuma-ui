import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { SpacerSpecificProps } from "./handler";
import { defaultSpacerTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type SpacerProps = ComponentProps<"Spacer"> & SpacerSpecificProps;

type SpacerComponent<T extends As = "div"> = ComponentWithAs<T, SpacerProps>;

/**
 * Spacer is a utility component used to create space between other components in a Kuma UI application.
 * Accepts 'size' and 'horizontal' props, which specify the size of the space and its orientation, respectively.
 *
 * @see — Further documentation will be available in the future.
 */
const Spacer: SpacerComponent = forwardRef<SpacerProps, "div">(
  (
    { as: Component = defaultSpacerTag, children, size, horizontal, ...props },
    ref,
  ) => {
    const inlineStyle: React.CSSProperties = !horizontal && !size
      ? {}
      : horizontal
        ? {
            width:
              typeof size === "undefined"
                ? "0px"
                : typeof size === "number"
                ? `${size}px`
                : `${size}`,
            height: "auto",
            display: "inline-block",
            flexShrink: 0,
          }
        : {
            width: "auto",
            height:
              typeof size === "undefined"
                ? "0px"
                : typeof size === "number"
                ? `${size}px`
                : `${size}`,
            display: "block",
            flexShrink: 0,
          };

    const mergedProps = resolveMergedBoxProps("Spacer", props);
    const baseStyle: React.CSSProperties =
      "style" in mergedProps && mergedProps.style
        ? mergedProps.style
        : {};
    const finalStyle: React.CSSProperties = {
      ...baseStyle,
      ...inlineStyle,
    };

    return (
      <Box {...mergedProps} as={Component} style={finalStyle} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Spacer, type SpacerComponent, SpacerProps };
