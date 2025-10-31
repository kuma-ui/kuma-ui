import React from "react";
import { As, ComponentWithAs, ComponentProps } from "../types";
import { Box } from "../Box";
import { defaultLinkTag } from "./handler";
import { forwardRef } from "../forwardRef";
import { resolveMergedBoxProps } from "../variants";

type LinkProps = ComponentProps<"Link">;
type LinkComponent<T extends As = "a"> = ComponentWithAs<T, LinkProps>;

/**
 * Link is a component that creates a hyperlink, providing styling that integrates well with the Kuma UI ecosystem.
 *
 * @see — http://kuma-ui.com/docs/Components/Link
 */
const Link: LinkComponent = forwardRef<LinkProps, "a">(
  ({ as: Component = defaultLinkTag, children, ...props }, ref) => {
    const mergedProps = resolveMergedBoxProps("Link", props);

    return (
      <Box {...mergedProps} as={Component} ref={ref}>
        {children}
      </Box>
    );
  },
);

export { Link, type LinkComponent, LinkProps };
