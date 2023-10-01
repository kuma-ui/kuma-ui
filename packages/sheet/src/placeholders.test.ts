import { applyPlaceholders, createPlaceholders, applyT } from "./placeholders";
import { describe, expect, it } from "vitest";
import { UserTheme } from "./theme";

describe("Theme utility functions", () => {
  describe("applyPlaceholders", () => {
    it("replaces valid placeholders", () => {
      const input =
        "Color is t('colors.primary') and breakpoint is t('breakpoints.mobile')";
      const placeholders = {
        "colors.primary": "#FF0000",
        "breakpoints.mobile": "480px",
      };
      expect(applyPlaceholders(input, placeholders)).toBe(
        "Color is #FF0000 and breakpoint is 480px",
      );
    });

    it("ignores invalid placeholders", () => {
      const input =
        "Color is t('colors.primary') and something is t('invalid.key')";
      const placeholders = {
        "colors.primary": "#FF0000",
      };
      expect(applyPlaceholders(input, placeholders)).toBe(
        "Color is #FF0000 and something is t('invalid.key')",
      );
    });
  });

  describe("createPlaceholders", () => {
    it("creates placeholders for valid theme values", () => {
      const theme: Partial<UserTheme> = {
        colors: {
          "colors.primary": "#FF0000",
        },
        breakpoints: {
          "breakpoints.mobile": "480px",
        },
      };

      expect(createPlaceholders(theme)).toEqual({
        "colors.primary": "#FF0000",
        "breakpoints.mobile": "480px",
      });
    });

    it("ignores invalid or non-existent theme values", () => {
      const theme: Partial<UserTheme> = {
        colors: {
          "colors.primary": "#FF0000",
        },
      };

      expect(createPlaceholders(theme)).toEqual({
        "colors.primary": "#FF0000",
      });
    });
  });

  describe("applyPlaceholders edge cases", () => {
    it("handles empty strings", () => {
      const placeholders = { "colors.primary": "#FF0000" };
      expect(applyPlaceholders("", placeholders)).toBe("");
    });

    it("handles strings without placeholders", () => {
      const placeholders = { "colors.primary": "#FF0000" };
      expect(applyPlaceholders("No placeholders here", placeholders)).toBe(
        "No placeholders here",
      );
    });

    it("replaces multiple occurrences of the same placeholder", () => {
      const placeholders = { "colors.primary": "#FF0000" };
      expect(
        applyPlaceholders(
          "Color t('colors.primary') and again t('colors.primary')",
          placeholders,
        ),
      ).toBe("Color #FF0000 and again #FF0000");
    });

    it("handles a mixture of valid and invalid placeholders", () => {
      const placeholders = { "colors.primary": "#FF0000" };
      expect(
        applyPlaceholders(
          "Colors: t('colors.primary'), t('colors.secondary')",
          placeholders,
        ),
      ).toBe("Colors: #FF0000, t('colors.secondary')");
    });
  });

  describe("createPlaceholders edge cases", () => {
    it("handles empty theme", () => {
      const theme: Partial<UserTheme> = {};
      expect(createPlaceholders(theme)).toEqual({});
    });

    it("handles tokens without synonyms", () => {
      const theme: Partial<UserTheme> = {
        fontSizes: {
          "fontSizes.small": "12px",
        },
      };
      expect(createPlaceholders(theme)).toEqual({ "fontSizes.small": "12px" });
    });

    it("handles whitespace around placeholders", () => {
      const placeholders = { "colors.primary": "#FF0000" };
      expect(
        applyPlaceholders("Color t(  'colors.primary'  )", placeholders),
      ).toBe("Color #FF0000");
      expect(
        applyPlaceholders('Color t(  "colors.primary"  )', placeholders),
      ).toBe("Color #FF0000");
    });

    it("handles both single and double quotation marks", () => {
      const placeholders = {
        "colors.primary": "#FF0000",
        "breakpoints.mobile": "480px",
      };
      expect(
        applyPlaceholders('Color is t("colors.primary")', placeholders),
      ).toBe("Color is #FF0000");
      expect(
        applyPlaceholders(
          "Breakpoint is t('breakpoints.mobile')",
          placeholders,
        ),
      ).toBe("Breakpoint is 480px");
    });
  });

  describe("applyT function", () => {
    const theme: UserTheme = {
      colors: {
        "colors.primary": "#FF0000",
        "colors.secondary": "#00FF00",
      },
      breakpoints: {
        "breakpoints.mobile": "480px",
      },
    };

    const placeholders = createPlaceholders(theme);

    it("should handle spacing scaling factor for positive numbers", () => {
      const input = "Margin is t(2)";
      const result = applyT(input, placeholders);
      expect(result).toBe("Margin is t(2)");
    });

    it("should handle spacing scaling factor for negative numbers", () => {
      const input = "Margin is t(-2)";
      const result = applyT(input, placeholders);
      expect(result).toBe("Margin is t(-2)");
    });

    it("should handle decimals in spacing scaling", () => {
      const input = "Padding is t(1.5)";
      const result = applyT(input, placeholders);
      expect(result).toBe("Padding is t(1.5)");
    });

    it("should handle whitespaces and both single and double quotation marks", () => {
      const input = 'Color is t( "colors.primary" ) and space is t( 1 )';
      const result = applyT(input, placeholders);
      expect(result).toBe("Color is #FF0000 and space is t( 1 )");
    });

    it("should leave unchanged values when there's no matching placeholder", () => {
      const input = "This is a t('non.existent') placeholder";
      const result = applyT(input, placeholders);
      expect(result).toBe("This is a t('non.existent') placeholder");
    });
  });
});
