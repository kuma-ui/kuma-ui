import { ClientStyleSheet } from "./ClientStyleSheet";
import { ServerStyleSheet } from "./ServerStyleSheet";
import { isBrowser } from "./isBrowser";

export type FakeCSSStyleSheet = {
  cssRules: { cssText: string }[];
  insertRule: CSSStyleSheet["insertRule"];
  deleteRule: CSSStyleSheet["deleteRule"];
};

export interface StyleSheet {
  inject(): void;
  isSpeedy(): boolean;
  setSpeedy(bool: boolean): void;
  insertRule(rule: string, index?: number): number;
  deleteRule(index: number): void;
  flush(): void;
  cssRules(): (CSSRule | null)[];
}

export class StyleSheet implements StyleSheet {
  constructor(name: string, speedy = false) {
    return isBrowser
      ? new ClientStyleSheet(name, speedy)
      : new ServerStyleSheet(name, speedy);
  }
}
