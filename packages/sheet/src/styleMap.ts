import { ICache } from "./cache";

class StyleMap implements ICache<string> {
  private static instance: StyleMap;
  private map: Map<string, string>;

  private constructor() {
    this.map = new Map();
  }

  static getInstance() {
    if (!StyleMap.instance) {
      StyleMap.instance = new StyleMap();
    }
    return StyleMap.instance;
  }

  // Add the given CSS for the specified file to the map.
  // In the future, we might use an id to associate the HTML tag
  // with the corresponding CSS (by using the data-kuma-ui attribute)
  // and improve performance by removing duplicate CSS across different files.
  set(fileName: string, css: string): void {
    this.map.set(fileName, css);
  }

  get(fileName: string): string | undefined {
    return this.map.get(fileName);
  }

  delete(fileName: string) {
    this.map.delete(fileName);
  }

  reset() {
    this.map.clear();
  }
}

/**
 * The StyleMap singleton class is created to address the issue of unnecessary
 * CSS accumulation with Hot Module Replacement (HMR) during development.
 * In the previous implementation, the Sheet singleton stores all styles,
 * causing problems with HMR, where unnecessary CSS accumulates after each update.
 *
 * StyleMap associates each file with its corresponding styles, allowing us
 * to handle updates for each file individually during HMR. It provides methods
 * to add, update and reset styles per file.
 */
export const styleMap = StyleMap.getInstance();
