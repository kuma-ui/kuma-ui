// import { Box, styled, k } from "@kuma-ui/core";
import { Box, styled } from "@kuma-ui/core";

function App() {
  return (
    <Box as="main">
      {/* <Heading as="h3">hello</Heading>
      <Spacer size={4} />
      <Flex flexDir="row">
        <Text as="p">hello</Text>
        <Spacer size={8} horizontal />
        <Text>hello</Text>
        <Button>hello</Button>
      </Flex>
      <HelloWorld>hello world</HelloWorld> */}
    </Box>
  );
}

const HelloWorld = styled("p")`
  color: red;
`;

export default App;
