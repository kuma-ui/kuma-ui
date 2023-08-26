import { ThemeInput } from "./../theme";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  propTypes?: React.WeakValidationMap<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  contextTypes?: React.ValidationMap<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, "transition" | "as" | "color" | OmitAdditionalProps>;

type Variants<
  T,
  ComponentType extends keyof typeof componentList
> = T extends Required<Required<ThemeInput>["components"]>[ComponentType]
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
