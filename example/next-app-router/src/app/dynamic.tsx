"use client";

import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Dynamic() {
  const [checked, toggle] = React.useReducer((state) => !state, false);

  return (
    <Box p={12} bg={checked ? "blue" : "green"}>
      dynamic
      <Button onClick={() => toggle()}>Change Background Color</Button>
    </Box>
  );
}
