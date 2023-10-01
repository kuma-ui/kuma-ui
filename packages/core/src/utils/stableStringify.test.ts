import { stableStringify } from "./stableStringify";

import { describe, expect, test } from "vitest";

describe("stableStringify", () => {
  test("should stringify sipmle object", () => {
    expect(
      stableStringify({
        a: 3,
        b: [4, 5],
        c: 6,
        z: null,
        nested: [{ arr: "hello" }],
      }),
    ).toEqual('{"a":3,"b":[4,5],"c":6,"nested":[{"arr":"hello"}],"z":null}');
  });

  test("should generate the same string when keys orders are just different", () => {
    expect(
      stableStringify({
        b: 999,
        a: 33,
        nested: {
          y: "y",
          x: "x",
        },
      }),
    ).toEqual(
      stableStringify({
        a: 33,
        nested: {
          x: "x",
          y: "y",
        },
        b: 999,
      }),
    );
  });
});
