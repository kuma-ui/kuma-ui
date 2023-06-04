import { describe, beforeEach, test, expect } from "vitest";
import { styleCache } from "./cache";

describe("Sheet class", () => {
  beforeEach(() => {
    styleCache.reset();
  });

  test("get() should return undefined if no value is cached for the given key", () => {
    // Arrange
    const cacheKey = JSON.stringify({ color: "red" });
    // Act
    const cachedValue = styleCache.get(cacheKey);
    // Assert
    expect(cachedValue).toBeUndefined();
  });

  test("set() and getFromCache() should work correctly", () => {
    // Arrange
    const cacheKey = JSON.stringify({ color: "red" });
    const styles = { base: "color: red;", media: {} };
    // Act
    styleCache.set(cacheKey, styles);
    const cachedValue = styleCache.get(cacheKey);
    // Assert
    expect(cachedValue).toEqual(styles);
  });
});
