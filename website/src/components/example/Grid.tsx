import { Grid, Box } from "@kuma-ui/core";

export const GridExample = () => {
  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" gap={6}>
      <Box bg="teal" height="80px" />
      <Box bg="teal" height="80px" />
      <Box bg="teal" height="80px" />
      <Box bg="teal" height="80px" />
    </Grid>
  );
};
