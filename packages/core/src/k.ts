import { ThemeInput } from "./index";
import { StyledComponentProps } from "./styled";
import { StyledProps, StyledKeyType, PseudoProps } from "@kuma-ui/system";

type StyledComponent<T extends keyof JSX.IntrinsicElements> = React.FC<
  Omit<StyledComponentProps<T>, StyledKeyType> &
    StyledProps<{
      //@ts-expect-error type
      colors: keyof ThemeInput["colors"] extends string
      //@ts-expect-error type
        ? keyof ThemeInput["colors"]
        : string & {};
    }> &
    Partial<PseudoProps>
>;

type X = Parameters<StyledComponent<"a">>[0]["bgColor"];

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
