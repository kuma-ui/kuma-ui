import { cssPropertyRegex, removeSpacesExceptInPropertiesRegex } from "./regex";
import { describe, expect, test } from "vitest";

describe("regex", () => {
  describe("cssPropertyRegex", () => {
    // Arrange
    const testCases = [
      { input: "color: red;", expected: "color:red;" },
      { input: "padding: 10px 20px;", expected: "padding:10px 20px;" },
      {
        input: "margin: 5px 10px 5px 10px;",
        expected: "margin:5px 10px 5px 10px;",
      },
      {
        input: "background-color: rgba(0, 0, 0, 0.5);",
        expected: "background-color:rgba(0, 0, 0, 0.5);",
      },
      {
        input: "font: 14px Arial, sans-serif;",
        expected: "font:14px Arial, sans-serif;",
      },
      {
        input: "border: 1px solid black;",
        expected: "border:1px solid black;",
      },
      {
        input: "transform: rotate(90deg);",
        expected: "transform:rotate(90deg);",
      },
      {
        input:
          "box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);",
        expected:
          "box-shadow:0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);",
      },
      {
        input: "grid-template-columns: repeat(3, 1fr);",
        expected: "grid-template-columns:repeat(3, 1fr);",
      },
      { input: "border-radius: 50%;", expected: "border-radius:50%;" },
    ];

    test.each(testCases)(
      "should removes whitespace around CSS property values correctly",
      ({ input, expected }) => {
        // Act
        const result = input.replace(cssPropertyRegex, "$1$2");
        // Assert
        expect(result).toStrictEqual(expected);
      }
    );
  });

  describe("removeSpacesExceptInPropertiesRegex", () => {
    // Arrange
    const testCases = [
      { input: "padding: 10px 20px;", expected: "padding:10px 20px;" },
      {
        input: ".kuma-xxx&:hover { padding: 10px 20px; }",
        expected: ".kuma-xxx&:hover{padding:10px 20px;}",
      },
      {
        input: "@media(min-width: 768px) { .kuma-xxx { padding: 10px 20px; } }",
        expected: "@media(min-width:768px){.kuma-xxx{padding:10px 20px;}}",
      },
      {
        input:
          "@media(min-width: 768px) { .kuma-xxx { padding: 10px 20px; border: 1px solid black; } }",
        expected:
          "@media(min-width:768px){.kuma-xxx{padding:10px 20px; border:1px solid black;}}",
      },
    ];
    test.each(testCases)(
      "should removes whitespace except around CSS property values and after commas",
      ({ input, expected }) => {
        // Act
        const result = input.replace(
          removeSpacesExceptInPropertiesRegex,
          "$1$2$3"
        );
        // Assert
        expect(result).toStrictEqual(expected);
      }
    );
  });
});
