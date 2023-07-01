import React from "react";
import { Box, Heading, css } from "@kuma-ui/core";

export const Hero = () => {
  return (
    <Box m={["80px auto 0px", "0px auto"]} maxWidth="1200px" px={[18, 36]}>
      <Box position="relative">
        <Heading
          fontSize="2.25rem"
          fontWeight={800}
          className={css`
            letter-spacing: -0.025em;
            line-height: 2.5rem;
          `}
        >
          Power Your Web Development with Optimal Performance and Flexibility
        </Heading>
      </Box>
    </Box>
  );
};
