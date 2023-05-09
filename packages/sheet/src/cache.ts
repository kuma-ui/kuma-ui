// to avoid cyclic dependency, we declare an exact same type declared in @kuma-ui/system
type ResponsiveStyle = {
  base: string;
  media: {
    [breakpoint: string]: string;
  };
};

class StyleCache {
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
