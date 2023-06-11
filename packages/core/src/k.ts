import { ThemeColors } from "./theme";
import { StyledComponentProps } from "./styled";
import { StyledProps, StyledKeyType, PseudoProps } from "@kuma-ui/system";

type StyledComponent<T extends keyof JSX.IntrinsicElements> = React.FC<
  Omit<StyledComponentProps<T>, StyledKeyType> &
    StyledProps<{
      colors: keyof ThemeColors extends string ? keyof ThemeColors : string & {};
    }> &
    Partial<PseudoProps>
>;

const k: {
  [K in keyof JSX.IntrinsicElements]: StyledComponent<K>;
} = new Proxy(
  {},
  {
    get() {
      throw new Error('Using the "k" in runtime is not supported.');
    },
  }
) as any;

export { k };
