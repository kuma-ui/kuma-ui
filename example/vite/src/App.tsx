import { Box, Flex, Spacer, Text, Button, Heading } from "@kuma-ui/core";

const flexDir = "column";

function App() {
  return (
    <Box as="main" display="flex" flexDir={[flexDir, "row"]}>
      <Heading as="h3">hello</Heading>
      <Spacer size={4} />
      <Flex flexDir="row">
        <Text as="p" fontSize={24}>
          hello
        </Text>
        <Spacer size={8} horizontal />
        <Text>hello</Text>
        <Button>hello</Button>
      </Flex>
    </Box>
  );
}

export default App;
