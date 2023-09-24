import { compile } from "../compile";
import { getExpectSnapshot } from "./testUtils";
import { describe, it, expect } from "vitest";
import { componentList } from "@kuma-ui/core/components/componentList";

describe("styled tag", () => {
  it("should generate code", () => {
    // Arrange
    const code = `
        import { styled } from "@kuma-ui/core";
        
        export const GreenButton = styled.button\`
          background: green;
        \`
        export const GreenButtonRedText = styled(GreenButton)\`
          color: red;
        \`
    `;

    // Act
    const result = compile(code, "file.tsx", {
      ...componentList,
      styled: "styled",
    });
    // Assert
    expect(getExpectSnapshot(result)).toMatchSnapshot();
  });
});
