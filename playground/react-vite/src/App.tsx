import styled from "zero-styled/dist/styled";
import { typography, all, compose, color } from "zero-styled/dist/system/index";

function App() {
  return (
    <Box p={[4, 8]} m="2px" fontSize={["22px", "44px"]} display="flex">
      <Text fontSize={40} color={["red", "blue"]}>
        hello world
      </Text>
    </Box>
  );
}

const Box = styled("div")`
  ${all}
`;

const Text = styled("p")`
  ${compose(color, typography)}
`;

export default App;
