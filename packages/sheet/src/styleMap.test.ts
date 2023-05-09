import { describe, expect, test, beforeEach } from "@jest/globals";
import { styleMap } from "./styleMap";

describe("StyleMap class", () => {
  beforeEach(() => {
    styleMap.resetAll();
  });

  test("addStyle() should correctly set the CSS for a given file", () => {
    // Arrange
    const fileName = "testFile.css";
    const css = ".testClass { color: red; }";
    // Act
    styleMap.addStyle(fileName, css);
    // Assert
    expect(styleMap["map"].get(fileName)).toEqual(css);
  });

  test("resetFile() should remove the styles for the given file", () => {
    // Arrange
    const fileName = "testFile.css";
    const css = ".testClass { color: red; }";
    styleMap.addStyle(fileName, css);
    // Act
    styleMap.resetFile(fileName);
    // Assert
    expect(styleMap["map"].has(fileName)).toBeFalsy();
  });

  test("resetAll() should remove all styles", () => {
    // Arrange
    const fileName1 = "testFile1.css";
    const css1 = ".testClass1 { color: red; }";
    const fileName2 = "testFile2.css";
    const css2 = ".testClass2 { color: blue; }";
    styleMap.addStyle(fileName1, css1);
    styleMap.addStyle(fileName2, css2);
    // Act
    styleMap.resetAll();
    // Assert
    expect(styleMap["map"].size).toBe(0);
  });
});
