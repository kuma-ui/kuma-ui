import { describe, expect, test, beforeEach } from "@jest/globals";
import { styleMap } from "./styleMap";

describe("StyleMap class", () => {
  beforeEach(() => {
    styleMap.reset();
  });

  test("set() should correctly set the CSS for a given file", () => {
    // Arrange
    const fileName = "testFile.tsx";
    const css = ".testClass { color: red; }";
    // Act
    styleMap.set(fileName, css);
    // Assert
    expect(styleMap.get(fileName)).toEqual(css);
  });

  test("get() should return the CSS for the given file", () => {
    // Arrange
    const fileName = "testFile.tsx";
    const css = ".testClass { color: red; }";
    styleMap.set(fileName, css);
    // Act
    const retrievedCss = styleMap.get(fileName);
    // Assert
    expect(retrievedCss).toEqual(css);
  });

  test("delete() should remove the styles for the given file", () => {
    // Arrange
    const fileName = "testFile.tsx";
    const css = ".testClass { color: red; }";
    styleMap.set(fileName, css);
    // Act
    styleMap.delete(fileName);
    // Assert
    expect(styleMap.get(fileName)).toBeFalsy();
  });

  test("reset() should remove all styles", () => {
    // Arrange
    const fileName1 = "testFile1.tsx";
    const css1 = ".testClass1 { color: red; }";
    const fileName2 = "testFile2.tsx";
    const css2 = ".testClass2 { color: blue; }";
    styleMap.set(fileName1, css1);
    styleMap.set(fileName2, css2);
    // Act
    styleMap.reset();
    // Assert
    expect(styleMap["map"].size).toBe(0);
  });
});
