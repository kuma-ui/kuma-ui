import { generateHash } from "../utils/hash";

export interface Rule {
  id: string;
  css: string;
}

export class Sheet {
  private static instance: Sheet;
  private rules: Rule[];
  constructor() {
    this.rules = [];
    if (Sheet.instance) {
      throw new Error("You can only create one instance!");
    }
    Sheet.instance = this;
  }

  addRule(css: string): string {
    const id = "zero" + generateHash(css);
    const existingRule = this.rules.find((rule) => rule.id === id);
    if (!existingRule) this.rules.push({ id, css });
    return id;
  }

  removeDuplicates() {
    const hashMap = new Map<string, string>();
    for (const rule of this.rules) {
      if (hashMap.has(rule.id)) continue;
      else hashMap.set(rule.id, rule.css);
    }
    this.rules = Array.from(hashMap, (entry) => ({
      id: entry[0],
      css: entry[1],
    }));
  }

  getCSS(): string {
    this.removeDuplicates();
    return this.rules.map((rule) => `.${rule.id} {${rule.css}}`).join("\n");
  }

  reset() {
    this.rules = [];
  }
}

// Export a single instance of the Sheet class
export const sheet = new Sheet();
