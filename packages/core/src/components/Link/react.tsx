import { StyledProps, PseudoProps } from "@kuma-ui/system";
import React, { ReactNode } from "react";
import {
  As,
  ComponentWithAs,
  MergeWithAs,
  PropsOf,
  ComponentProps,
} from "../types";
import { Box } from "../Box";
import { theme } from "@kuma-ui/sheet";
import { defaultLinkTag } from "./handler";
import { forwardRef } from "../forwardRef";

type LinkProps = ComponentProps<"Link">;

type LinkComponent<T extends As = "a"> = ComponentWithAs<T, LinkProps>;

/**
 * Link is a component that creates a hyperlink, providing styling that integrates well with the Kuma UI ecosystem.
 *
 * @see — http://kuma-ui.com/docs/Components/Link
 */
const Link: LinkComponent = forwardRef(
  ({ as: Component = defaultLinkTag, children, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    const variant = props.variant
      ? theme.getVariants("Link")?.variants?.[props.variant]
      : {};

    return (
      <Box
        as={Component}
        ref={ref}
        {...variant}
        {...props}
        children={children}
        IS_KUMA_DEFAULT
      />
    );
  }
);

export { Link, type LinkComponent, LinkProps };
