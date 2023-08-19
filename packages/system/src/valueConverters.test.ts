import { theme } from "@kuma-ui/sheet";
import { beforeAll, describe, expect, test } from "vitest";
import { spaceConverter } from "./valueConverters";

describe("spaceConverter", () => {
  beforeAll(() => {
    theme.setUserTheme({
      spacings: {
        sm: "1rem",
      },
    });
  });

  test("should correctly convert theme token value", () => {
    const converted = spaceConverter("sm");

    // Assert
    expect(converted).toBe("1rem");
  });

  test("should correctly convert raw string value", () => {
    const converted = spaceConverter("1px");

    // Assert
    expect(converted).toBe("1px");
  });

  test("should correctly convert raw number value", () => {
    const converted = spaceConverter(1);

    // Assert
    expect(converted).toBe("1px");
  });
});
