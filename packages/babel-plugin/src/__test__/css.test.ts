import { describe, expect, test } from "@jest/globals";
import { babelTransform } from "./testUtils";

describe("css function", () => {
  test("should contain CSS prefix unique to Kuma UI", () => {
    const { code } = babelTransform(`
        import { css } from '@kuma-ui/core'
        const style = css({ color: 'red' })
    `);
    expect(code).toContain("kuma-");
  });

  test("should work correctly when css function is renamed", () => {
    const { code } = babelTransform(`
        import { css as c } from '@kuma-ui/core'
        const style = c({ color: 'red' })
    `);
    expect(code).toContain("kuma-");
  });

  describe("Snapshot tests", () => {
    test("basic usage should match snapshot", () => {
      const { code } = babelTransform(`
        import { css } from '@kuma-ui/core'
        const style = css({ color: 'red' })
      `);
      expect(code).toMatchSnapshot();
    });

    test("using space props should match snapshot", () => {
      const { code } = babelTransform(`
        import { css } from '@kuma-ui/core'
        const style = css({ p: 2 })
      `);
      expect(code).toMatchSnapshot();
    });

    test("using pseudo props should match snapshot", () => {
      const { code } = babelTransform(`
        import { css } from '@kuma-ui/core'
        const style = css({ _hover: { color: 'red' } })
      `);
      expect(code).toMatchSnapshot();
    });
  });
});
