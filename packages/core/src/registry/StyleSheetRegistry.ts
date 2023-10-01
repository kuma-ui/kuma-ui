import React from "react";
import { compile, serialize, stringify } from "stylis";
import { StyleSheet } from "./sheet/StyleSheet";
import { isBrowser } from "../utils/isBrowser";
import { isProduction } from "../utils/isProduction";

const STYLE_ID_PREFIX = "__";

export class StyleSheetRegistry {
  private sheet: StyleSheet;
  private serverSideRenderedStyleMap: {
    [id: string]: HTMLStyleElement;
  } | null = null;
  private indexesMap: { [id: string]: number[] | undefined } = {};
  private instancesCountMap: { [id: string]: number | undefined } = {};

  constructor() {
    this.sheet = new StyleSheet("kuma-ui", isProduction);
    this.sheet.inject();
  }

  public add(id: string, css: string): void {
    if (isBrowser && this.serverSideRenderedStyleMap === null) {
      this.serverSideRenderedStyleMap = this.getServerSideRenderedStyleMap();
      Object.keys(this.serverSideRenderedStyleMap).forEach((id) => {
        this.instancesCountMap[id] = 0;
      });
    }

    this.instancesCountMap[id] = 1 + (this.instancesCountMap[id] ?? 0);
    const serverSideRenderedStyle = this.serverSideRenderedStyleMap?.[id];
    if (this.instancesCountMap[id] === 1 && !serverSideRenderedStyle) {
      compile(css).forEach((element) => {
        const rule = serialize([element], stringify);
        this.indexesMap[id] = (this.indexesMap[id] || []).concat(
          this.sheet.insertRule(rule),
        );
      });
    }
  }

  public remove(id: string): void {
    if (this.instancesCountMap[id] === undefined) {
      throw new Error(
        `StyleSheetRegistry: id: \`${id}\` not found in idInstancesCountMap.`,
      );
    }

    this.instancesCountMap[id]! -= 1;

    if (this.instancesCountMap[id]! !== 0) {
      return;
    }

    const serverSideRenderedStyle = this.serverSideRenderedStyleMap?.[id];
    if (serverSideRenderedStyle) {
      serverSideRenderedStyle.remove();
      delete this.serverSideRenderedStyleMap?.[id];
    } else {
      if (this.indexesMap[id] === undefined) {
        throw new Error(
          `StyleSheetRegistry: id: \`${id}\` not found in idIndexesMap.`,
        );
      }

      this.indexesMap[id]!.forEach((index) => this.sheet.deleteRule(index));
      delete this.indexesMap[id];
    }

    delete this.instancesCountMap[id];
  }

  public styles(options: { nonce?: string } = {}) {
    return Object.keys(this.indexesMap)
      .map((id) => {
        const indexes = this.indexesMap[id];
        if (indexes === undefined) {
          return null;
        }
        const cssRules = this.sheet.cssRules();
        const css = indexes
          .map((index) => cssRules[index]?.cssText)
          .filter(Boolean)
          .join(this.sheet.isSpeedy() ? "" : "\n");
        if (css.length === 0) {
          return null;
        }
        return React.createElement("style", {
          id: `${STYLE_ID_PREFIX}${id}`,
          key: `${STYLE_ID_PREFIX}${id}`,
          nonce: options.nonce ? options.nonce : undefined,
          dangerouslySetInnerHTML: {
            __html: css,
          },
        });
      })
      .filter(Boolean);
  }

  public flush(): void {
    this.sheet.flush();
    this.sheet.inject();
    this.serverSideRenderedStyleMap = null;
    this.indexesMap = {};
    this.instancesCountMap = {};
  }

  private getServerSideRenderedStyleMap() {
    const elements: HTMLStyleElement[] = Array.from(
      document.querySelectorAll(`[id^="${STYLE_ID_PREFIX}"]`),
    );
    return elements.reduce(
      (styles, element) => {
        const id = element.id.replace(STYLE_ID_PREFIX, "");
        styles[id] = element;
        return styles;
      },
      {} as Record<string, HTMLStyleElement>,
    );
  }
}
