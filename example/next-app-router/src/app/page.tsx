import { k, Box, css, styled } from "@kuma-ui/core";
import { Dynamic } from "./dynamic";
import { Dynamic2 } from "./dynamic2";

export default function Home() {
  return (
    <div>
      <k.header
        height={56}
        fontSize={"fontSizes.y.z"}
        fontWeight={"fontWeights.super_bold"}
        fontFamily={"fonts.a"}
        letterSpacing={"letterSpacings.space_200"}
        lineHeight={"lineHeights.sx"}
      >
        <k.div
          maxWidth={1200}
          fontSize={32}
          fontWeight="600"
          fontFamily="quicksand"
          mx="auto"
          color="green"
        >
          Kuma UI
        </k.div>
      </k.header>
      <Dynamic key={1} />
      <Dynamic key={2} />
      <Dynamic2 />
      <Box color={(() => "colors.blue")()}>dynamic</Box>
      <Box variant={(() => "action" as const)()}>dynamic</Box>
      <Box p={[8, 16]} color="colors.green">
        static
      </Box>
      <div
        className={css`
          background-color: gray;
        `}
      >
        css
      </div>
      <Styled>styled</Styled>
    </div>
  );
}

const Styled = styled("div")`
  background-color: lightblue;
`;
