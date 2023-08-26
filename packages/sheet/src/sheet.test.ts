import { sheet, SystemStyle } from "./sheet";
import { describe, expect, test, beforeEach } from "vitest";
import { removeSpacesAroundCssPropertyValues } from "./regex";

describe("Sheet class", () => {
  beforeEach(() => {
    sheet.reset();
  });

  // // Arrange
  const style: SystemStyle = {
    base: "color: red;",
    responsive: {
      "768px": "color: blue;",
    },
    pseudo: [
      {
        key: ":hover",
        base: "color: green;",
        responsive: {
          "768px": "color: yellow;",
        },
      },
    ],
  };

  test("addRule() should handle SystemStyle correctly", () => {
    // Act
    const className = sheet.addRule(style);
    const cssString = sheet.getCSS();
    // Assert
    expect(className.startsWith("🐻-")).toBeTruthy();
    expect(cssString).toContain(
      `.${className}{${removeSpacesAroundCssPropertyValues(style.base)}}`
    );
    expect(cssString).toContain(
      `@media (min-width:768px){.${className}{${removeSpacesAroundCssPropertyValues(
        style.responsive["768px"]
      )}}}`
    );
    expect(cssString).toContain(
      `.${className}${
        style.pseudo[0].key
      }{${removeSpacesAroundCssPropertyValues(style.pseudo[0].base)}}`
    );
  });

  test("addRule() should not add duplicate rules", () => {
    // Act
    const id1 = sheet.addRule(style);
    const id2 = sheet.addRule(style);
    // Assert
    expect(id1).toBe(id2);
  });

  test("parseCSS() should parse given styles to valid CSS and returns a generated ID", () => {
    // Arrange
    const style = `
      display: flex;
      flex-direction: row;
      @media (max-width: 768px) {
        flex-direction: column;
      }
      &:after {
        content: " 🦄";
      }`;
    // Act
    const className = sheet.parseCSS(style);
    // Assert
    const expectedCSS = `.${className}{display:flex;flex-direction:row;}@media (max-width: 768px){.${className}{flex-direction:column;}}.${className}:after{content:" 🦄";}`;
    expect(sheet.getCSS()).toEqual(expectedCSS);
  });

  test("getCSS() should return the CSS string with unique rules", () => {
    // Arrange
    const id = sheet.addRule(style);
    // Act
    const cssString = sheet.getCSS();
    const expectedCSS = `.${id}{color:red;}@media (min-width:768px){.${id}{color:blue;}}@media (min-width:768px){.${id}:hover{color:yellow;}}.${id}:hover{color:green;}`;
    // Assert
    expect(cssString).toEqual(expectedCSS);
  });
});
