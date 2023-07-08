import React from "react";
import { Box, Flex } from "@kuma-ui/core";

export const FlexExample = () => {
  return (
    <Flex justify="center" alignItems="center">
      <Box p={8} bg="blue" color="white">
        Hello world
      </Box>
    </Flex>
  );
};
