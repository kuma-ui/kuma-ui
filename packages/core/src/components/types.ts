import { RawThemeInput } from "./../theme";
import { componentList } from "./componentList";
import { StyledProps, PseudoProps } from "@kuma-ui/system";
import { ReactNode } from "react";
import { ThemeSystem } from "../theme";
import { If, IsUnknown } from "../utils/types";

/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
export type As<Props = any> = React.ElementType<Props>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type PolymorphicRef<T extends As> =
  React.ComponentPropsWithRef<T>["ref"];

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: Omit<
      React.ComponentPropsWithoutRef<AsComponent>,
      keyof Props | "as"
    > &
      Props & { as?: AsComponent; ref?: PolymorphicRef<AsComponent> },
  ): JSX.Element;
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  propTypes?: React.WeakValidationMap<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  contextTypes?: React.ValidationMap<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  defaultProps?: Partial<any>;
  id?: string;
};

type Variants<
  T,
  ComponentType extends keyof typeof componentList,
> = T extends Required<Required<RawThemeInput>["components"]>[ComponentType]
  ? NonNullable<T["variants"]>
  : never;

type Variant<ComponentType extends keyof typeof componentList> = If<
  IsUnknown<ThemeSystem["components"][ComponentType]>,
  never,
  Extract<
    keyof Variants<ThemeSystem["components"][ComponentType], ComponentType>,
    string
  >
>;

export type ComponentProps<ComponentType extends keyof typeof componentList> =
  StyledProps<ThemeSystem> &
    Partial<PseudoProps<ThemeSystem>> & {
      children?: ReactNode;
    } & {
      variant?: Variant<ComponentType>;
      /**
       * @internal
       */
      IS_KUMA_DEFAULT?: boolean;
    };
