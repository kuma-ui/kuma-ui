import { isProduction } from "../../utils/isProduction";
import { StyleSheet } from "./StyleSheet";

export class ClientStyleSheet implements StyleSheet {
  private name: string;
  private deletedRulePlaceholder: string;
  private speedy: boolean;
  private tags: (HTMLStyleElement | undefined)[];
  private injected: boolean;
  private rulesCount: number;

  constructor(name: string, speedy = false) {
    this.name = name;
    this.deletedRulePlaceholder = `#${name}-deleted-rule{}`;
    this.speedy = speedy;
    this.tags = [];
    this.injected = false;
    this.rulesCount = 0;
  }

  public inject(): void {
    if (this.injected) {
      throw new Error("ClientStyleSheet: sheet already injected");
    }

    if (this.speedy) {
      this.tags[0] = this.makeStyleTag();
      this.speedy = "insertRule" in this.getLatestSheet();
      if (!this.speedy) {
        if (!isProduction) {
          console.warn(
            "ClientStyleSheet: speedy mode not supported falling back to standard mode.",
          );
        }
        this.flush();
      }
    }

    this.injected = true;
  }

  public isSpeedy(): boolean {
    return this.speedy;
  }

  public setSpeedy(bool: boolean): void {
    if (this.rulesCount === 0) {
      throw new Error(
        "ClientStyleSheet: speedy cannot be when rules have already been inserted",
      );
    }
    this.flush();
    this.speedy = bool;
    this.inject();
  }

  public insertRule(rule: string, index?: number): number {
    if (this.speedy) {
      const sheet = this.getLatestSheet();
      if (typeof index !== "number") {
        index = sheet.cssRules.length;
      }

      // this weirdness for perf, and chrome's weird bug
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
      try {
        sheet.insertRule(rule, index);
      } catch (error) {
        if (!isProduction) {
          console.warn(
            `ClientStyleSheet: illegal rule: \n\n${rule}\n\nSee https://stackoverflow.com/q/20007992 for more info`,
          );
        }

        return -1;
      }
      return this.rulesCount++;
    }
    const insertionPoint = index ? this.tags[index] : undefined;
    this.tags = this.tags.concat(this.makeStyleTag(rule, insertionPoint));
    return this.rulesCount++;
  }

  public deleteRule(index: number): void {
    if (this.speedy) {
      const sheet = this.getLatestSheet();
      sheet.deleteRule(index);
      sheet.insertRule(this.deletedRulePlaceholder, index);
      return;
    }
    const tag = this.tags[index];
    if (!tag) {
      throw new Error(`ClientStyleSheet: rule at index \`${index}\` not found`);
    }
    tag.parentNode?.removeChild(tag);
    delete this.tags[index];
  }

  public flush(): void {
    this.injected = false;
    this.rulesCount = 0;
    this.tags.forEach((tag) => tag && tag.parentNode?.removeChild(tag));
    this.tags = [];
  }

  public cssRules(): ReturnType<StyleSheet["cssRules"]> {
    return this.tags.reduce(
      (rules, tag) => {
        if (tag) {
          return rules.concat(
            Array.from(this.getSheet(tag).cssRules, (rule) =>
              rule.cssText === this.deletedRulePlaceholder ? undefined : rule,
            ),
          );
        }
        return rules;
      },
      [] as ReturnType<StyleSheet["cssRules"]>,
    );
  }

  private makeStyleTag(
    cssString?: string,
    relativeToTag?: HTMLStyleElement,
  ): HTMLStyleElement {
    const tag = document.createElement("style");
    tag.setAttribute(`data-${this.name}`, "");

    const nonce = document
      .querySelector('meta[property="csp-nonce"]')
      ?.getAttribute("content");
    if (nonce) {
      tag.setAttribute("nonce", nonce);
    }

    if (cssString) {
      tag.appendChild(document.createTextNode(cssString));
    }

    const head = document.head || document.getElementsByTagName("head")[0];

    if (relativeToTag) {
      head.insertBefore(tag, relativeToTag);
    } else {
      head.appendChild(tag);
    }

    return tag;
  }

  private getSheet(tag: HTMLStyleElement): CSSStyleSheet {
    if (tag.sheet) {
      return tag.sheet;
    }

    // this weirdness brought to you by firefox
    const sheet = Array.from(document.styleSheets).find(
      (sheet) => sheet.ownerNode === tag,
    );
    if (sheet) {
      return sheet;
    }

    throw new Error("ClientStyleSheet: styleSheet not found");
  }

  private getLatestSheet(): CSSStyleSheet {
    const latestTag = this.tags[this.tags.length - 1];
    if (!latestTag) {
      throw new Error("ClientStyleSheet: style tag not found");
    }
    return this.getSheet(latestTag);
  }
}
