import { isProduction } from "./isProduction";
import { StyleSheet } from "./StyleSheet";
import React from "react";
import { isBrowser } from "./isBrowser";

const STYLE_ID_PREFIX = "__kuma-ui-";

export class StyleSheetRegistry {
  private sheet: StyleSheet;
  private serverSideRenderedStyles: Record<string, HTMLStyleElement> | null =
    null;
  private indices: Record<string, number | undefined> = {};

  constructor() {
    this.sheet = new StyleSheet("kuma-ui", isProduction);
    this.sheet.inject();
  }

  public add(id: string, rule: string): void {
    if (isBrowser && this.serverSideRenderedStyles === null) {
      this.setServerSideRenderedStyles();
      this.indices[id] = -1;
      return;
    }

    const index = this.sheet.insertRule(rule, this.indices[id]);
    this.indices[id] = index;
  }

  public remove(id: string): void {
    const index = this.indices[id];
    if (index === undefined) {
      throw new Error(`StyleSheetRegistry: index for id: \`${id}\` not found.`);
    }

    const serverSideRenderedStyle = this.serverSideRenderedStyles?.[id];
    if (serverSideRenderedStyle) {
      serverSideRenderedStyle.remove();
      delete this.serverSideRenderedStyles?.[id];
    } else {
      this.sheet.deleteRule(index);
    }

    delete this.indices[id];
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
  }

  private setServerSideRenderedStyles() {
    const elements: HTMLStyleElement[] = Array.from(
      document.querySelectorAll(`[id^="${STYLE_ID_PREFIX}"]`)
    );
    this.serverSideRenderedStyles = elements.reduce((styles, element) => {
      const id = element.id.replace(STYLE_ID_PREFIX, "");
      styles[id] = element;
      return styles;
    }, {} as Record<string, HTMLStyleElement>);
  }
}
