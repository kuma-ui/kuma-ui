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

  it("should only touch 'styled' tag from kuma-ui", () => {
    // Arrange
    const code = `
        import { styled as kuma } from "@kuma-ui/core";
        import styled from "styled-components";
        
        export const One = styled.div\`
          color: green;
        \`
        export const Two = kuma.div\`
          color: red;
        \`
    `;

    // Act
    const result = compile(code, "file.tsx", {
      ...componentList,
      styled: "kuma",
    });
    // Assert
    expect(getExpectSnapshot(result)).toMatchSnapshot();
  });
});
