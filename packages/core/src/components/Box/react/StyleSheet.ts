export interface StyleSheet {
  inject(): void;
  isSpeedy(): boolean;
  setSpeedy(bool: boolean): void;
  insertRule(rule: string, index?: number): number;
  deleteRule(index: number): void;
  flush(): void;
  cssRules(): (CSSRule | null)[];
}

export type FakeCSSStyleSheet = {
  cssRules: { cssText: string }[];
  insertRule: CSSStyleSheet["insertRule"];
  deleteRule: CSSStyleSheet["deleteRule"];
};
