import React from "react";
import { styled } from "@kuma-ui/core";

export const ThisIsStyledComponent = styled("div")`
  padding: 8px;
  color: white;
  background: black;
  @media (max-width: 500px) {
    color: blue;
  }
`;
