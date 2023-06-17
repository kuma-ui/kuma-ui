import { k, styled, css, Box } from "@kuma-ui/core";

function App() {
  return (
    <div>
      <Box as="a" href="">
        hello
      </Box>
    </div>
  );
}

export default App;

const Text = styled("p")`
  color: red;
`;

const text = css({
  color: "red",
  p: [2, 4],
  _hover: {
    color: "black",
  },
});

const ResponsiveTest = styled("div")`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: rgba(255, 0, 0, 0.5);

  &:hover {
    background-color: rgba(0, 0, 255, 0.5);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    border-top: 5px solid red;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 5px solid blue;
  }
`;
