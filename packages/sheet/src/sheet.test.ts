import { sheet, SystemStyle } from "./sheet";
import { describe, expect, test, beforeEach, beforeAll } from "vitest";
import { removeSpacesAroundCssPropertyValues } from "./regex";
import { theme } from "./theme";

describe("Sheet class", () => {
  beforeEach(() => {
    sheet.reset();
    theme.setUserTheme({
      breakpoints: {
        "breakpoints.sm": "1000px",
      },
      colors: {
        "colors.primary": "grey",
        "colors.secondary": "black",
      },
      zIndices: {
        "zIndices.modal": "1000",
      },
    });
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

  const stylePlaceholders: SystemStyle = {
    base: "color: t('colors.primary');",
    responsive: {
      "t('breakpoints.sm')": "color: t('colors.secondary');",
    },
    pseudo: [
      {
        key: ":hover",
        base: "color: t('colors.secondary');",
        responsive: {
          "t('breakpoints.sm')": "color: t('colors.primary');",
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
      `.${className}{${removeSpacesAroundCssPropertyValues(style.base)}}`,
    );
    expect(cssString).toContain(
      `@media (min-width:768px){.${className}{${removeSpacesAroundCssPropertyValues(
        style.responsive["768px"],
      )}}}`,
    );
    expect(cssString).toContain(
      `.${className}${
        style.pseudo[0].key
      }{${removeSpacesAroundCssPropertyValues(style.pseudo[0].base)}}`,
    );
  });

  test("addRule() should not add duplicate rules", () => {
    // Act
    const id1 = sheet.addRule(style);
    const id2 = sheet.addRule(style);
    // Assert
    expect(id1).toBe(id2);
  });

  test("addRule() should not add duplicate rules (placeholders)", () => {
    // Act
    const id1 = sheet.addRule(stylePlaceholders);
    const id2 = sheet.addRule(stylePlaceholders);
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

  test("parseCSS() should allow :global selectors to emit global rules", () => {
    const className = sheet.parseCSS(`
      color: red;
      :global(.external) {
        color: blue;
      }
    `);
    const css = sheet.getCSS();
    expect(css).toContain(`.${className}{color:red;}`);
    expect(css).toContain(`.external{color:blue;}`);
  });

  test("parseCSS() should handle :global blocks", () => {
    sheet.parseCSS(`
      :global {
        ::view-transition(test) {
          color: blue;
        }
      }
    `);
    expect(sheet.getCSS()).toContain(`::view-transition(test){color:blue;}`);
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

  test("getCSS() should return the CSS string with unique rules (placeholders)", () => {
    // Arrange
    const id = sheet.addRule(stylePlaceholders);
    // Act
    const cssString = sheet.getCSS();
    const expectedCSS = `.${id}{color:grey;}@media (min-width:1000px){.${id}{color:black;}}@media (min-width:1000px){.${id}:hover{color:grey;}}.${id}:hover{color:black;}`;
    // Assert
    expect(cssString).toEqual(expectedCSS);
  });

  describe("Sheet placeholders", () => {
    test("parseCSS() support of t()", () => {
      // Arrange
      const style = `
      color: t("colors.primary");
      background-color: t('colors.secondary');
      @media (max-width: t("breakpoints.sm")) {
        flex-direction: column;
      }
    `;
      // Act
      const className = sheet.parseCSS(style);
      // Assert
      const expectedCSS = `.${className}{color:grey;background-color:black;}@media (max-width: 1000px){.${className}{flex-direction:column;}}`;
      expect(sheet.getCSS()).toEqual(expectedCSS);
    });
  });

  describe("Support of global CSS", () => {
    test("parseCSS() emits unscoped :global rules", () => {
      // Arrange
      const style = `
      color: red;
      background-color: blue;

      :global(::view-transition-old(root)) {
        color: green;
      }

      :global {
        ::view-transition(test) {
          background: green;
        }

        ::view-transition-new(root) {
          color: red;
        }
      }

      :global(.app-dark-mode) & {
        background-color: black;
      }

      strong {
        :global(.app-dark-mode) & {
          color: white;
        }
      }
      `;
      // Act
      const className = sheet.parseCSS(style);
      const expectedCSS = `.${className}{color:red;background-color:blue;}::view-transition-old(root){color:green;}::view-transition(test){background:green;}::view-transition-new(root){color:red;}.app-dark-mode .${className}{background-color:black;}.app-dark-mode .${className} strong{color:white;}`;
      expect(sheet.getCSS()).toEqual(expectedCSS);
    });
  });
});
