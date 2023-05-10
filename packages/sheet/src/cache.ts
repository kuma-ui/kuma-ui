// to avoid cyclic dependency, we declare an exact same type declared in @kuma-ui/system
type ResponsiveStyle = {
  base: string;
  media: {
    [breakpoint: string]: string;
  };
};

export interface ICache<T> {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  reset: () => void;
}

class StyleCache implements ICache<ResponsiveStyle> {
  private static instance: StyleCache;
  private cache: Map<string, ResponsiveStyle>;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance() {
    if (!StyleCache.instance) {
      StyleCache.instance = new StyleCache();
    }
    return StyleCache.instance;
  }

  get(key: string): ResponsiveStyle | undefined {
    return this.cache.get(key);
  }

  set(key: string, styles: ResponsiveStyle): void {
    this.cache.set(key, styles);
  }

  reset(): void {
    this.cache.clear();
  }
}

export const styleCache = StyleCache.getInstance();
