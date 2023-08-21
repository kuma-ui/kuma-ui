import { theme } from "@kuma-ui/sheet";
import { beforeAll, describe, expect, test } from "vitest";
import {
  sizeConverter,
  spaceConverter,
  radiusConverter,
  zIndexConverter,
} from "./valueConverters";

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

describe("sizeConverter", () => {
  beforeAll(() => {
    theme.setUserTheme({
      sizes: {
        sm: "1rem",
      },
    });
  });

  test("should correctly convert theme token value", () => {
    const converted = sizeConverter("sm");

    // Assert
    expect(converted).toBe("1rem");
  });

  test("should correctly convert raw string value", () => {
    const converted = sizeConverter("1px");

    // Assert
    expect(converted).toBe("1px");
  });

  test("should correctly convert raw number value", () => {
    const converted = sizeConverter(1);

    // Assert
    expect(converted).toBe("1px");
  });
});

describe("radiusConverter", () => {
  beforeAll(() => {
    theme.setUserTheme({
      radii: {
        sm: "1rem",
      },
    });
  });

  test("should correctly convert theme token value", () => {
    const converted = radiusConverter("sm");

    // Assert
    expect(converted).toBe("1rem");
  });

  test("should correctly convert raw string value", () => {
    const converted = radiusConverter("1px");

    // Assert
    expect(converted).toBe("1px");
  });

  test("should correctly convert raw number value", () => {
    const converted = radiusConverter(1);

    // Assert
    expect(converted).toBe("1px");
  });
});

describe("zIndexConverter", () => {
  beforeAll(() => {
    theme.setUserTheme({
      zIndices: {
        overlay: "10",
      },
    });
  });

  test("should correctly convert theme token value", () => {
    const converted = zIndexConverter("overlay");

    // Assert
    expect(converted).toBe("10");
  });

  test("should correctly convert raw string value", () => {
    const converted = zIndexConverter("5");

    // Assert
    expect(converted).toBe("5");
  });

  test("should correctly convert raw number value", () => {
    const converted = zIndexConverter(1);

    // Assert
    expect(converted).toBe(1);
  });
});
