"use client";
import { k, Box, css, styled } from "@kuma-ui/core";
import { Dynamic } from "./dynamic";
import { Dynamic2 } from "./dynamic2";

export default function Home() {
  return (
    <Box>
      <Box color="red" fontSize={24}>
        hello
      </Box>
      <StyledFn />
      <StyledProperty />
      <StyledExtended />
    </Box>
  );
}

const StyledFn = styled("div")`
  background-color: lightblue;
  height: 100px;
  width: 100px;
`;

const StyledProperty = styled.button`
  background-color: cyan;
`;

const StyledExtended = styled(StyledProperty)`
  color: orange;
`;
