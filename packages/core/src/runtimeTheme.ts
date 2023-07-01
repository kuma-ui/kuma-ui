type RuntimeTheme = {
  components: Record<string, Record<string, string>>;
  tokens: Record<string, string>;
  breakpoints: Record<string, string>;
};

//@ts-expect-error type
const theme: RuntimeTheme = globalThis.KUMA_USER_THEME;

export function getVariants(
  componentName: string
): Record<string /*VariantKey*/, string /*VariantKey*/> {
  return theme.components[componentName] || {};
}

export function getTokens(): Record<string, string> {
  return theme.tokens || {};
}


export function getBreakPoints(): Record<string, string> {
  return theme.breakpoints || {};
}
