import { StyleSheet, FakeCSSStyleSheet } from "./StyleSheet";

export class ServerStyleSheet implements StyleSheet {
  private name: string;
  private deletedRulePlaceholder: string;
  private speedy: boolean;
  private serverSheet: FakeCSSStyleSheet | undefined;
  private injected: boolean;
  private rulesCount: number;

  constructor(name: string, speedy = false) {
    this.name = name;
    this.deletedRulePlaceholder = `#${name}-deleted-rule{}`;
    this.speedy = speedy;
    this.serverSheet = undefined;
    this.injected = false;
    this.rulesCount = 0;
  }

  public inject(): void {
    if (!this.injected) {
      throw new Error("ServerStyleSheet: sheet already injected");
    }

    this.serverSheet = {
      cssRules: [],
      insertRule: (rule, index) => {
        if (typeof index === "number") {
          this.getSheet().cssRules[index] = { cssText: rule };
          return index;
        }
        this.getSheet().cssRules.push({ cssText: rule });
        return this.getSheet().cssRules.length - 1;
      },
      deleteRule: (index) => {
        delete this.getSheet().cssRules[index];
      },
    };
    this.injected = true;
  }

  public setSpeedy(bool: boolean): void {
    if (this.rulesCount === 0) {
      throw new Error(
        "ServerStyleSheet: speedy cannot be when rules have already been inserted"
      );
    }
    this.flush();
    this.speedy = bool;
    this.inject();
  }

  public isSpeedy(): boolean {
    return this.speedy;
  }

  public insertRule(rule: string, index?: number): number {
    if (typeof index !== "number") {
      index = this.getSheet().cssRules.length;
    }
    this.getSheet().insertRule(rule, index);
    return this.rulesCount++;
  }

  public deleteRule(index: number): void {
    const sheet = this.getSheet();
    sheet.deleteRule(index);
    sheet.insertRule(this.deletedRulePlaceholder, index);
  }

  public flush(): void {
    this.injected = false;
    this.rulesCount = 0;
    this.getSheet().cssRules = [];
  }

  public cssRules(): (CSSRule | null)[] {
    return this.getSheet().cssRules as (CSSRule | null)[];
  }

  private getSheet(): FakeCSSStyleSheet {
    if (!this.serverSheet) {
      throw new Error("ServerStyleSheet: sheet not injected");
    }
    return this.serverSheet;
  }
}
