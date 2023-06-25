import { ClientStyleSheet } from "./ClientStyleSheet";
import { ServerStyleSheet } from "./ServerStyleSheet";
import { isBrowser } from "./isBrowser";

export type FakeCSSStyleSheet = {
  insertRule: CSSStyleSheet["insertRule"];
  deleteRule: CSSStyleSheet["deleteRule"];
  cssRules: ({ cssText: string } | undefined)[];
};

export interface StyleSheet {
  inject(): void;
  isSpeedy(): boolean;
  setSpeedy(bool: boolean): void;
  insertRule(rule: string, index?: number): number;
  deleteRule(index: number): void;
  flush(): void;
  cssRules(): (CSSRule | undefined)[];
}

export class StyleSheet implements StyleSheet {
  constructor(name: string, speedy = false) {
    return isBrowser
      ? new ClientStyleSheet(name, speedy)
      : new ServerStyleSheet(name, speedy);
  }
}
