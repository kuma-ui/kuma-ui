import { isProduction } from "./isProduction";
import { StyleSheet } from "./StyleSheet";

export class StyleSheetRegistry {
  private sheet: StyleSheet;
  private indices: Record<string, number> = {};

  constructor() {
    this.sheet = new StyleSheet("kuma-ui", true);
    this.sheet.inject();
  }

  public add(id: string, rule: string): void {
    const index = this.sheet.insertRule(rule);
    if (index === -1) {
      return;
    }

    this.indices[id] = index;
  }

  public remove(id: string): void {
    if (id in this.indices) {
      throw new Error(`StyleSheetRegistry: id: \`${id}\` not found.`);
    }

    this.sheet.deleteRule(this.indices[id]);
    delete this.indices[id];
  }
}
