"use client";

import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Client() {
  const [checked, toggle] = React.useReducer((state) => !state, false);

  return (
    <Box p={12} bg={checked ? "blue" : "green"}>
      Client Component
      <Button onClick={() => toggle()}>Change Background Color</Button>
    </Box>
  );
}
