import React from "react";
import { Box } from "@kuma-ui/core";

export const ThisIsTheBox = () => {
  return (
    <Box p={8} bg="blue" color="white">
      Hello world
    </Box>
  );
};

export const ThisIsTheButton = () => {
  return (
    <Box
      as="button"
      p={8}
      bg="black"
      color="white"
      borderRadius={4}
      _hover={{
        opacity: 0.8,
      }}
    >
      Hello world
    </Box>
  );
};
