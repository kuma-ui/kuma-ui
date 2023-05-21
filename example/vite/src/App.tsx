import { k, styled, css } from "@kuma-ui/core";

function App() {
  return (
    <div>
      <div className={text}>hello</div>
      <Text color="blue">world</Text>
      <k.button p="10px 12px" fontSize={16} disabled>
        button
      </k.button>
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
