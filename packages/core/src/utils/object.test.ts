import { flattenObject } from "./object";
import { describe, expect, test, expectTypeOf } from "vitest";

describe("flattenObject", () => {
  test("should flatten the object and map properties correctly", () => {
    const flatten = flattenObject({
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

    expect(flatten).toEqual({
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
    });

    expectTypeOf(flatten).toEqualTypeOf<{
      "colors.red": "#red";
      "colors.blue": "#blue";
      "colors.green.dark": "#green_dark";
      "colors.green.light": "#green_light";
      "colors.yellow.100": "#yellow_100";
      "colors.yellow.200": "#yellow_200";
      "colors.purple.light": "#purple_light";
      "colors.purple.dark": "#purple_dark";
      "colors.purple.100": "#purple_100";
      "colors.purple.200": "#purple_200";
    }>(flatten);
  });
});
