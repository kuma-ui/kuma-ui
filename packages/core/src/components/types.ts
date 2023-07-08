import { ThemeInput } from "./../theme";
import { componentList } from "./componentList";
import { StyledProps, PseudoProps } from "@kuma-ui/system";
import { ReactNode } from "react";
import { ThemeSystem } from "../theme";
import { If, IsUnknown } from "../utils/types";

/* eslint-disable @typescript-eslint/ban-types */
export type As<Props = any> = React.ElementType<Props>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;
  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, "transition" | "as" | "color" | OmitAdditionalProps>;

type Variants<
  T,
  ComponentType extends keyof typeof componentList
> = T extends Required<Required<ThemeInput>["components"]>[ComponentType]
  ? T["variants"]
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
