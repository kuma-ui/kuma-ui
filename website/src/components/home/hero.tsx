import React from "react";
import { Box, Heading, css, Text } from "@kuma-ui/core";
import Link from "next/link";

export const Hero = () => {
  return (
    <Box m={["40px auto", "80px auto 0px"]} maxWidth="1200px">
      <Box position="relative">
        <Box role="presentation" display={["initial"]} bg="white">
          <Box
            bg="radial-gradient(circle at 75% 50%, hsl(186 75% 85%), rgba(255, 255, 255, 0) 25%), radial-gradient(circle at 60% 30%, hsl(200 75% 85%), rgba(255, 255, 255, 0) 10%)"
            position="fixed"
            inset={["0px", "100px"]}
            zIndex="-1"
          />
        </Box>
        <Heading
          fontSize={["2.25rem", "3.25rem"]}
          fontWeight={800}
          className={css`
            letter-spacing: -0.025em;
            line-height: 1;
            @media (max-width: sm) {
              line-height: 2.5rem;
            }
          `}
        >
          Empower Your Web with Ultimate Performance and Flexibility
        </Heading>
        <Text
          color="#718096"
          mt="1.5rem"
          fontSize="1.125rem"
          className={css`
            line-height: 1.75rem;
          `}
        >
          With Kuma UI's headless, zero-runtime UI components, build
          top-performing websites effortlessly, while enjoying the best
          developer experience. Say hello to the future of CSS-in-JS
        </Text>
        <Box
          p={40}
          display="flex"
          flexDir={["column", "row"]}
          mx="auto"
          justify="center"
          gap="1rem"
        >
          <Link
            href="/docs"
            className={css`
              background: #292e32;
              color: white;
              padding-left: 1.5rem;
              padding-right: 1.5rem;
              line-height: 45px;
              border-radius: 6px;
              height: 3rem;
              text-align: center;
              cursor: pointer;
              &:hover {
                opacity: 0.9;
              }
            `}
          >
            Get Started
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
