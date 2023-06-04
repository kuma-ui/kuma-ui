import { sheet } from "./sheet";
import { describe, expect, test, beforeEach } from "vitest";
import { removeSpacesExceptInPropertiesRegex, cssPropertyRegex } from "./regex";

describe("Sheet class", () => {
  beforeEach(() => {
    sheet.reset();
  });

  test("addRule() should add a new rule with a generated ID", () => {
    // Arrange
    const css = "color: red;";
    // Act
    const id = sheet.addRule(css);
    // Assert
    expect(id.startsWith("kuma-")).toBeTruthy();
  });

  test("addRule() should not add duplicate rules", () => {
    // Arrange
    const css = "color: red;";
    // Act
    const id1 = sheet.addRule(css);
    const id2 = sheet.addRule(css);
    // Assert
    expect(id1).toBe(id2);
  });

  test("addMediaRule() should add a new media rule with a generated ID", () => {
    // Arrange
    const className = "kuma-12345";
    const css = "padding: 8px;";
    const breakpoint = "576px";
    const mediaCss = `@media (min-width: ${breakpoint}) { .${className} { ${css} } }`;
    // Act
    sheet.addMediaRule(className, css, breakpoint);
    // Assert
    expect(sheet.getCSS()).toContain(
      mediaCss.replace(removeSpacesExceptInPropertiesRegex, "")
    );
  });

  test("addPseudoRule() should add a new pseudo rule with a generated ID", () => {
    // Arrange
    const className = "kuma-12345";
    const css = "padding: 8px;";
    const pseudo = ":hover";
    const pseudoCss = `.${className}${pseudo} { ${css} }`.replace(
      removeSpacesExceptInPropertiesRegex,
      ""
    );
    // Act
    sheet.addPseudoRule(className, css, pseudo);
    // Assert
    expect(sheet.getCSS()).toContain(pseudoCss);
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
    expect(sheet.getCSS()).toContain(expectedCSS);
  });

  test("getCSS() should return the CSS string with unique rules", () => {
    // Arrange
    const css = "color: red;";
    const id = sheet.addRule(css);
    // Act
    const cssString = sheet.getCSS();
    // Assert
    expect(cssString).toContain(
      `.${id} {${css}}`.replace(cssPropertyRegex, "")
    );
  });
});
