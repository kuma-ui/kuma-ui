import { ThemeSystem } from "./theme";
import { StyledComponentProps } from "./styled";
import { StyledProps, StyledKeyType, PseudoProps } from "@kuma-ui/system";

type StyledComponent<T extends keyof JSX.IntrinsicElements> = React.FC<
  Omit<StyledComponentProps<T>, StyledKeyType> &
    StyledProps<ThemeSystem> &
    Partial<PseudoProps<ThemeSystem>>
>;

/**
 * The `k` API allows you to use utility style props directly on a React component. These elements accept utility props for inline styling that are type-safe and intuitively named. This means you can apply styles directly on the components while maintaining code readability and ease of use.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
const k: {
  [K in keyof JSX.IntrinsicElements]: StyledComponent<K>;
} = new Proxy(
  {},
  {
    get() {
      throw new Error('Using the "k" in runtime is not supported.');
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
) as any;

export { k };
