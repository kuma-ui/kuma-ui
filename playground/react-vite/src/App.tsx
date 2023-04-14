import { styled } from "zero-styled";
import { typography, compose, color } from "zero-styled/dist/system/index";
import { Box } from "./Box";

function App() {
  return (
    <Box p={[4, 8]} m="2px" display="flex">
      <Text
        fontSize={"40px"}
        color={["red", "orange"]}
        _hover={{
          m: 2,
        }}
      >
        hello world
      </Text>
    </Box>
  );
}

// const Box = styled("div")`
//   ${all}
// `;

const Text = styled("p")`
  ${compose(color, typography)}
`;

export default App;
