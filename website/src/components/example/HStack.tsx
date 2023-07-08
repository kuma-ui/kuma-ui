import { HStack, Box } from "@kuma-ui/core";

export const HStackExample = () => {
  return (
    <HStack justify="center" alignItems="center" gap={8}>
      <Box p={8} bg="blue" color="white">
        Hello world
      </Box>
      <Box p={8} bg="green" color="white">
        Hello again
      </Box>
    </HStack>
  );
};
