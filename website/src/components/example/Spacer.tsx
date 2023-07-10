import React from "react";
import { Box, Spacer, Flex } from "@kuma-ui/core";

export const ExampleSpacerVertical = () => {
  return (
    <>
      <Box p={8} bg="blue" color="white">
        Component A
      </Box>
      <Spacer size="20px" />
      <Box p={8} bg="green" color="white">
        Component B
      </Box>
    </>
  );
};

export const ExampleSpacerHorizontal = () => {
  return (
    <Flex flexDir="row">
      <Box p={8} bg="blue" color="white">
        Component A
      </Box>
      <Spacer size="20px" horizontal />
      <Box p={8} bg="green" color="white">
        Component B
      </Box>
    </Flex>
  );
};
