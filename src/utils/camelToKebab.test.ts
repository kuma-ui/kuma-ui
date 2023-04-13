import { camelToKebab } from "./camelToKebab";
import { describe, expect, test } from "@jest/globals";

describe("camelToKebab", () => {
  test("should convert camelCase to kebab-case", () => {
    // Arrange
    const camelCaseProp = "backgroundColor";
    const expectedKebabCaseProp = "background-color";

    // Act
    const kebabCaseProp = camelToKebab(camelCaseProp);

    // Assert
    expect(kebabCaseProp).toBe(expectedKebabCaseProp);
  });

  test("should not modify an already kebab-case string", () => {
    // Arrange
    const kebabCaseProp = "font-size";
    const expectedKebabCaseProp = "font-size";

    // Act
    const result = camelToKebab(kebabCaseProp);

    // Assert
    expect(result).toBe(expectedKebabCaseProp);
  });

  test("should return an empty string if the input is an empty string", () => {
    // Arrange
    const emptyString = "";
    const expectedEmptyString = "";

    // Act
    const result = camelToKebab(emptyString);

    // Assert
    expect(result).toBe(expectedEmptyString);
  });
});
