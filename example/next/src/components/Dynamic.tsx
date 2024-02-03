import React from "react";
import { Box, Button } from "@kuma-ui/core";

export function Dynamic() {
  const [checked, toggle] = React.useReducer((state) => !state, false);
  const color = checked ? "blue" : "green";

  return (
    <Box p={12} bg={color}>
      dynamic
      <Button onClick={() => toggle()}>Change Background Color</Button>
    </Box>
  );
}
