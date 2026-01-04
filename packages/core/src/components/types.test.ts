import type { ComponentProps } from "./types";
import type { ThemeSystem } from "../theme";
import type { PseudoProps, StyledProps } from "@kuma-ui/system";
import { expectTypeOf, test } from "vitest";

type UserTheme = {
  colors: {
    primary: string;
    secondary: string;
  };
};

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

test("ComponentProps keeps ThemeSystem-based style props", () => {
  type Props = ComponentProps<"Box">;
  type ThemedStyleProps = StyledProps<ThemeSystem> &
    Partial<PseudoProps<ThemeSystem>>;

  expectTypeOf<Props>().toMatchTypeOf<ThemedStyleProps>();
});
