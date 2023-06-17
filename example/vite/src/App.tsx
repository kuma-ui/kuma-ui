import { Box, Flex, Spacer } from "@kuma-ui/core";

function App() {
  return (
    <div>
      <Box as="a" color="blue" href="kuma-ui.com">
        hello
      </Box>
      <Spacer size={4} />
      <Flex>hello</Flex>
    </div>
  );
}

export default App;
