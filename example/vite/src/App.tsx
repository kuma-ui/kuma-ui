import { Box, Flex, Spacer, Text } from "@kuma-ui/core";

function App() {
  return (
    <div>
      <Box as="a" color="blue" href="kuma-ui.com">
        hello
      </Box>
      <Spacer size={4} />
      <Flex flexDir="row">
        <Text as="p">hello</Text>
        <Spacer size={8} horizontal />
        <Text>hello</Text>
      </Flex>
    </div>
  );
}

export default App;
