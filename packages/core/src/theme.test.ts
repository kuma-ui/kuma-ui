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
      fonts: {
        sans: {
          n: "fonts sans n",
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
      fonts: {
        "fonts.sans.n": "fonts sans n",
      },
    });

    expectTypeOf(theme).toEqualTypeOf<{
      colors: {
        "colors.red": string;
        "colors.blue": string;
        "colors.green.light": string;
        "colors.green.dark": string;
        "colors.yellow.100": string;
        "colors.yellow.200": string;
        "colors.purple.light": string;
        "colors.purple.dark": string;
        "colors.purple.100": string;
        "colors.purple.200": string;
      };
      fonts: {
        "fonts.sans.n": string;
      };
      components: undefined;
    }>();
  });

  test("should convert space theme object to expected format", () => {
    const theme = createTheme({
      spacings: {
        1: "0.25rem",
        4: "1rem",
        sm: "8px",
      },
    });

    expect(theme).toEqual({
      spacings: {
        "spacings.1": "0.25rem",
        "spacings.4": "1rem",
        "spacings.sm": "8px",
      },
    });

    expectTypeOf(theme).toEqualTypeOf<{
      spacings: {
        "spacings.1": string;
        "spacings.4": string;
        "spacings.sm": string;
      };
      components: undefined;
    }>();
  });

  test("should convert size theme object to expected format", () => {
    const theme = createTheme({
      sizes: {
        1: "0.25rem",
        4: "1rem",
        sm: "8px",
      },
    });

    expect(theme).toEqual({
      sizes: {
        "sizes.1": "0.25rem",
        "sizes.4": "1rem",
        "sizes.sm": "8px",
      },
    });

    expectTypeOf(theme).toEqualTypeOf<{
      sizes: {
        "sizes.1": string;
        "sizes.4": string;
        "sizes.sm": string;
      };
      components: undefined;
    }>();
  });

  test("should convert radius theme object to expected format", () => {
    const theme = createTheme({
      radii: {
        1: "0.25rem",
        4: "1rem",
        sm: "8px",
      },
    });

    expect(theme).toEqual({
      radii: {
        "radii.1": "0.25rem",
        "radii.4": "1rem",
        "radii.sm": "8px",
      },
    });

    expectTypeOf(theme).toEqualTypeOf<{
      radii: {
        "radii.1": string;
        "radii.4": string;
        "radii.sm": string;
      };
      components: undefined;
    }>();
  });

  test("should convert z-index theme object to expected format", () => {
    const theme = createTheme({
      zIndices: {
        overlay: "10",
        modal: "100",
      },
    });

    expect(theme).toEqual({
      zIndices: {
        "zIndices.overlay": "10",
        "zIndices.modal": "100",
      },
    });

    expectTypeOf(theme).toEqualTypeOf<{
      zIndices: {
        "zIndices.overlay": string;
        "zIndices.modal": string;
      };
      components: undefined;
    }>();
  });

  test("should autocomplete theme components", () => {
    const theme = createTheme({});

    expect(theme).toEqual({
      colors: undefined,
      spacings: undefined,
    });

    expectTypeOf(theme).toEqualTypeOf<{
      components: undefined;
    }>();
  });

  test("should correctly generate theme for components", () => {
    const theme = createTheme({
      components: {
        Box: {
          baseStyle: {
            color: "red",
          },
          defaultProps: { variant: "red" },
          variants: {
            red: {
              color: "red",
            },
          },
        },
      },
    });

    expect(theme).toEqual({
      components: {
        Box: {
          baseStyle: {
            color: "red",
          },
          defaultProps: { variant: "red" },
          variants: {
            red: {
              color: "red",
            },
          },
        },
      },
    });

    expectTypeOf(theme).toEqualTypeOf<{
      components: {
        Box: {
          baseStyle: {
            color: "red";
          };
          defaultProps: {
            variant: string;
          };
          variants: {
            red: {
              color: "red";
            };
          };
        };
      };
    }>();
  });
});
