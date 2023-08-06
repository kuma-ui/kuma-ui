import { createTheme } from "./theme";
import { describe, expect, test, expectTypeOf } from "vitest";

describe("createTheme", () => {
  test("should convert color theme object to expected format", () => {
    const theme = createTheme({
      colors: {
        red: "#red",
        blue: "#blue",
        green: { light: "#green_light", dark: "#green_dark" },
        yellow: { 100: "#yellow_100", 200: "#yellow_200" },
        purple: {
          light: "#purple_light",
          dark: "#purple_dark",
          100: "#purple_100",
          200: "#purple_200",
        },
      },
    });

    expect(theme).toEqual({
      colors: {
        "colors.red": "#red",
        "colors.blue": "#blue",
        "colors.green.light": "#green_light",
        "colors.green.dark": "#green_dark",
        "colors.yellow.100": "#yellow_100",
        "colors.yellow.200": "#yellow_200",
        "colors.purple.light": "#purple_light",
        "colors.purple.dark": "#purple_dark",
        "colors.purple.100": "#purple_100",
        "colors.purple.200": "#purple_200",
      },
    });

    expectTypeOf(theme).toEqualTypeOf<{
      readonly colors: {
        "colors.red": "#red";
        "colors.blue": "#blue";
        "colors.green.light": "#green_light";
        "colors.green.dark": "#green_dark";
        "colors.yellow.100": "#yellow_100";
        "colors.yellow.200": "#yellow_200";
        "colors.purple.light": "#purple_light";
        "colors.purple.dark": "#purple_dark";
        "colors.purple.100": "#purple_100";
        "colors.purple.200": "#purple_200";
      };
      components: unknown;
    }>();
  });

  test("should return an empty theme when no colors are provided", () => {
    const theme = createTheme({});

    expect(theme).toEqual({
      colors: undefined,
    });

    expectTypeOf(theme).toEqualTypeOf<{
      components: unknown;
    }>();
  });
});
