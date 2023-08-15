import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, it, expect } from "vitest";
import { Grid, GridProps } from "./react";

describe("Grid component", () => {
  it("should renders all the allowed shorthand style props", () => {
    // Arrange
    const props: GridProps = {
      grid: "auto-flow / auto-flow",
      gridArea: "auto-flow",
      gridAutoColumns: "auto-flow",
      gridAutoFlow: "auto-flow",
      gridAutoRows: "auto-flow",
      gridColumn: "auto-flow",
      gridColumnEnd: "auto-flow",
      gridColumnStart: "auto-flow",
      gridRow: "auto-flow",
      gridRowEnd: "auto-flow",
      gridRowStart: "auto-flow",
      gridTemplate: "auto-flow",
      gridTemplateAreas: "auto-flow",
      gridTemplateColumns: "auto-flow",
      gridTemplateRows: "auto-flow",
      gridGap: "auto-flow",
      gridColumnGap: "auto-flow",
      gridRowGap: "auto-flow",
    };

    // Act
    render(<Grid {...props}>Grid</Grid>);

    // Assert
    expect(screen.getByText("Grid")).toBeInTheDocument();
  });
});
