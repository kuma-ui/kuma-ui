import { isProduction } from "./isProduction";
import { StyleSheet } from "./StyleSheet";
import React from "react";
import { isBrowser } from "./isBrowser";

const STYLE_ID_PREFIX = "__";

export class StyleSheetRegistry {
  private sheet: StyleSheet;
  private serverSideRenderedStyles: Record<string, HTMLStyleElement> | null =
    null;
  private indices: Record<string, number | undefined> = {};
  private instancesCounts: Record<string, number | undefined> = {};

  constructor() {
    this.sheet = new StyleSheet("kuma-ui", isProduction);
    this.sheet.inject();
  }

  public add(id: string, rule: string): void {
    if (isBrowser && this.serverSideRenderedStyles === null) {
      this.serverSideRenderedStyles = this.getServerSideRenderedStyles();
      this.indices[id] = -1;
      this.instancesCounts = Object.keys(this.serverSideRenderedStyles).reduce(
        (instancesCounts, id) => {
          instancesCounts[id] = 1 + (instancesCounts[id] ?? 0);
          return instancesCounts;
        },
        {} as Record<string, number | undefined>
      );
      return;
    }

    if (this.indices[id] === undefined) {
      this.indices[id] = this.sheet.insertRule(rule, this.indices[id]);
    }
    this.instancesCounts[id] = 1 + (this.instancesCounts[id] ?? 0);
  }

  public remove(id: string): void {
    if (
      this.indices[id] !== undefined &&
      this.instancesCounts[id] !== undefined
    ) {
      throw new Error(`StyleSheetRegistry: id: \`${id}\` not found.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.instancesCounts[id]! -= 1;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (this.instancesCounts[id]! !== 0) {
      return;
    }

    const serverSideRenderedStyle = this.serverSideRenderedStyles?.[id];
    if (serverSideRenderedStyle) {
      serverSideRenderedStyle.remove();
      delete this.serverSideRenderedStyles?.[id];
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.sheet.deleteRule(this.indices[id]!);
    }

    delete this.indices[id];
    delete this.instancesCounts[id];
  }

  public styles(options: { nonce?: string } = {}) {
    return Object.keys(this.indices)
      .map((id) => {
        const index = this.indices[id];
        if (index === undefined) {
          return null;
        }
        const cssRules = this.sheet.cssRules();
        const rule = cssRules[index];
        if (rule === undefined) {
          return null;
        }
        return React.createElement("style", {
          id: `${STYLE_ID_PREFIX}${id}`,
          key: `${STYLE_ID_PREFIX}${id}`,
          nonce: options.nonce ? options.nonce : undefined,
          dangerouslySetInnerHTML: {
            __html: rule.cssText,
          },
        });
      })
      .filter((props) => props !== null);
  }

  public flush(): void {
    this.sheet.flush();
    this.sheet.inject();
    this.serverSideRenderedStyles = null;
    this.indices = {};
    this.instancesCounts = {};
  }

  private getServerSideRenderedStyles() {
    const elements: HTMLStyleElement[] = Array.from(
      document.querySelectorAll(`[id^="${STYLE_ID_PREFIX}"]`)
    );
    return elements.reduce((styles, element) => {
      const id = element.id.replace(STYLE_ID_PREFIX, "");
      styles[id] = element;
      return styles;
    }, {} as Record<string, HTMLStyleElement>);
  }
}
