import {
  Box,
  Flex,
  Spacer,
  Text,
  Button,
  Heading,
  styled,
  css,
} from "@kuma-ui/core";

function App() {
  return (
    <Box
      as="main"
      display="flex"
      flexDir={["column", "row"]}
      _hover={{
        bg: "red",
      }}
    >
      <Heading
        as="h3"
        className={css`
          color: red;
          @media (max-width: sm) {
            color: blue;
          }
        `}
      >
        Kuma UI
      </Heading>
      <Spacer size={4} />
      <Flex flexDir={`column`}>
        <Text as="p" fontSize={24}>
          Zero Runtime UI Component Library
        </Text>
        <Spacer size={8} horizontal />
        <Button>Getting Started</Button>
      </Flex>
    </Box>
  );
}

const HelloWorld = styled("p")`
  color: red;
`;

export default App;
