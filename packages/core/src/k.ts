import { StyledComponentProps } from "./styled";
import { StyledProps, StyledKeyType, PseudoProps } from "@kuma-ui/system";

type StyledComponent<T extends keyof JSX.IntrinsicElements> = React.FC<
  Omit<StyledComponentProps<T>, StyledKeyType> &
    StyledProps &
    Partial<PseudoProps>
>;

const k: {
  [K in keyof JSX.IntrinsicElements]: StyledComponent<K>;
} = {} as any;

export { k };
