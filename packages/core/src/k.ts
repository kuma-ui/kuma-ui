import { StyledComponentProps } from "./styled";
import { StyledProps, StyledKeyType, PseudoProps } from "@kuma-ui/system";

type StyledComponent<T extends keyof HTMLElementTagNameMap> = React.FC<
  Omit<StyledComponentProps<T>, StyledKeyType> &
    StyledProps &
    Partial<PseudoProps>
>;

const k: {
  [K in keyof HTMLElementTagNameMap]: StyledComponent<K>;
} = {} as any;

export { k };
