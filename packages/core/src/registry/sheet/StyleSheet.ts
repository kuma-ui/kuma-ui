import { ClientStyleSheet } from "./ClientStyleSheet";
import { ServerStyleSheet } from "./ServerStyleSheet";
import { isBrowser } from "../../utils/isBrowser";

export type FakeCSSStyleSheet = {
  insertRule: CSSStyleSheet["insertRule"];
  deleteRule: CSSStyleSheet["deleteRule"];
  cssRules: ({ cssText: string } | undefined)[];
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging -- FIXME
export interface StyleSheet {
  inject(): void;
  isSpeedy(): boolean;
  setSpeedy(bool: boolean): void;
  insertRule(rule: string, index?: number): number;
  deleteRule(index: number): void;
  flush(): void;
  cssRules(): (CSSRule | undefined)[];
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging -- FIXME
export class StyleSheet implements StyleSheet {
  constructor(name: string, speedy = false) {
    return isBrowser
      ? new ClientStyleSheet(name, speedy)
      : new ServerStyleSheet(name, speedy);
  }
}
