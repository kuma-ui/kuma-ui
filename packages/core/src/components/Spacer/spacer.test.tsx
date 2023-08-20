import { spacerHandler } from "./handler";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spacer } from "./react";
import React from "react";

describe("Spacer", () => {
  describe("spacerHandler", () => {
    it("should return an empty object if both horizontal and size props are not defined", () => {
      // Arrange
      const props = {};
      // Act
      const result = spacerHandler(props);
      // Assert
      expect(result).toEqual({});
    });

    it("should return a style object for horizontal spacing if horizontal prop is true", () => {
      // Arrange
      const props = { horizontal: true, size: 10 };
      // Act
      const result = spacerHandler(props);
      // Assert
      expect(result).toEqual({
        width: "10px",
        height: "auto",
        display: "inline-block",
        flexShrink: 0,
      });
    });

    it("should return a style object for vertical spacing if horizontal prop is false or undefined", () => {
      // Arrange
      const props = { size: 10 };
      // Act
      const result = spacerHandler(props);
      // Assert
      expect(result).toEqual({
        width: "auto",
        height: "10px",
        display: "block",
        flexShrink: 0,
      });
    });
  });

  describe("Spacer component", () => {
    it("should render correctly with given props", () => {
      // Arrange
      const props = { size: 10, horizontal: true };

      // Act
      render(<Spacer {...props} data-testid="spacer" />);

      // Assert
      expect(screen.getByTestId("spacer")).toHaveStyle({
        width: "10px",
      });
    });
  });
});
