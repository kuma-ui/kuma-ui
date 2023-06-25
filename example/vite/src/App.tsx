import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Heading,
  styled,
  k,
  css,
} from "@kuma-ui/core";

const className = "hello";
const row = "row";

function App() {
  return (
    <Box
      as="main"
      display="flex"
      flexDir={["column", "row"]}
      className={className}
    >
      <div
        className={css`
          color: red;
          @media screen (max-width: xs) {
            color: red
          }
        `}
      >
        12345
      </div>
      <Heading as="h3" className="hello">
        hello
      </Heading>
      <Spacer size={4} />
      <Flex flexDir={`column`}>
        <Text as="p" fontSize={24}>
          hello
        </Text>
        <Spacer size={8} horizontal />
        <Text>hello</Text>
        <Button>hello</Button>
      </Flex>
      <HelloWorld>hello world</HelloWorld>
    </Box>
  );
}

const HelloWorld = styled("p")`
  color: red;
`;

export default App;
