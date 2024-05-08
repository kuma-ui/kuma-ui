import { describe, beforeEach, test, expect } from "vitest";
import { compileSync } from "..";
import { getExpectSnapshotSync } from "./testUtils";
import { theme, sheet } from "@kuma-ui/sheet";

describe("css", () => {
  beforeEach(() => {
    sheet.reset();
    theme.setUserTheme({
      colors: {
        "colors.primary": "red",
      },
    });
  });

  describe.each([{ wasm: true }, { wasm: false }])(
    "Snapshot tests with wasm: %p",
    ({ wasm }) => {
      test("basic usage should match snapshot", () => {
        // Arrange
        const inputCode = `
              import { css } from '@kuma-ui/core'
              const style = css\`color: red;\`
            `;
        // Act
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
      });

      test("using space props should match snapshot", () => {
        // Arrange
        const inputCode = `
              import { css } from '@kuma-ui/core'
              const style = css\`padding: 2px;\`
            `;
        // Act
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
      });

      test("using pseudo props should match snapshot", () => {
        // Arrange
        const inputCode = `
              import { css } from '@kuma-ui/core'
              const style = css\`
              &:hover {
                color: red;
              }
              \`
            `;
        // Act
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        // Assert
        expect(getExpectSnapshotSync(result)).toMatchSnapshot();
      });

      test("placeholder usage should match snapshot", () => {
        // Arrange
        const originalCode = `
              import { css } from '@kuma-ui/core'
              const style = css\`color: red;\`
            `;
        const inputCode = `
              import { css } from '@kuma-ui/core'
              const style = css\`color: t("colors.primary");\`
            `;
        // Act
        const result = compileSync({ code: inputCode, id: "test.tsx", wasm });
        const originalResult = compileSync({
          code: originalCode,
          id: "test.tsx",
          wasm,
        });
        // Assert
        expect(getExpectSnapshotSync(result)).toEqual(
          getExpectSnapshotSync(originalResult),
        );
      });
    },
  );
});
