import {
  Box,
  HStack,
  styled,
  css,
  Select as S,
  Text,
  Button,
} from "@kuma-ui/core";
import { Dynamic } from "./Dynamic";
import { MouseEventHandler, useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    alert("Hi");
  };

  useEffect(() => {
    if (ref.current) {
      console.log("ref", ref.current);
      // console.log("buttonRef", buttonRef.current);
    }
  }, []);

  return (
    <Box color="GrayText" border="1px solid" borderColor="orange">
      test
      <Styled>Styled</Styled>
      <Text>日本語</Text>
      <Dynamic />
    </Box>
  );
}

export default App;

const Styled = styled.div`
  color: orange;
`;
