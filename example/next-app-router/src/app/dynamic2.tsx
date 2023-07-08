import { Box } from "@kuma-ui/core";

export function Dynamic2() {
  return <Box bg={(() => "yellow")()}>dynamic</Box>;
}
