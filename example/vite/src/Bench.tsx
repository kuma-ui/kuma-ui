import React, { Profiler, ProfilerOnRenderCallback } from "react";
import { Box, Heading, css, Text, Link } from "@kuma-ui/core";
import { useState, useEffect } from "react";

export const Bench = () => {
  const callback = (
    id: string, // the "id" prop of the Profiler tree that has just committed
    phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration: number, // time spent rendering the committed update
    baseDuration: number, // estimated time to render the entire subtree without memoization
    startTime: number, // when React began rendering this update
    commitTime: number, // when React committed this update
    interactions: Set<any>,
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    });
  };

  return (
    <Profiler id="hero" onRender={callback}>
      {Array.from({ length: 1000 }).map((_, index) => (
        <Hero key={index} />
      ))}
    </Profiler>
  );
};

const Hero = () => {
  return (
    <Box m={["40px auto", "80px auto 0px"]}>
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
            @media (prefers-color-scheme: dark) {
              mix-blend-mode: plus-lighter;
            }
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
            bg="#292e32"
            color="white"
            px="1.5rem"
            lineHeight="45px"
            borderRadius="6px"
            height="3rem"
            textAlign="center"
            cursor="pointer"
            fontWeight={600}
            _hover={{
              opacity: 0.9,
            }}
          >
            Get Started
          </Link>
        </Box>
      </Box>
      <Box as="section" mt="5rem">
        <Box
          display="grid"
          gap="1.5rem"
          gridTemplateColumns={[
            "repeat(1,minmax(0,1fr))",
            "repeat(1,minmax(0,1fr))",
            "repeat(3,minmax(0,1fr))",
          ]}
        >
          {gridData.map((data) => (
            <Box key={data.emoji}>
              <Box
                width="3rem"
                height="3rem"
                fontSize="24px"
                display="flex"
                alignItems="center"
                justify="center"
                bg="#f6f6f7"
                borderRadius="6px"
                mb="0.75rem"
              >
                {data.emoji}
              </Box>
              <Heading
                as="h2"
                className={css`
                  font-size: 1.25rem;
                  line-height: 1.75rem;
                  font-weight: 700;
                  margin-bottom: 0.25rem;
                `}
              >
                {data.title}
              </Heading>
              <Text
                className={css`
                  font-size: 1rem;
                  line-height: 1.5rem;
                `}
              >
                {data.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const gridData = [
  {
    emoji: "⚡️",
    title: "Zero-runtime",
    description:
      "Deliver blazing-fast websites with zero-runtime CSS extraction.",
  },
  {
    emoji: "🔮",
    title: "Autocomplete",
    description: "Experience seamless development with style autocompletion.",
  },
  {
    emoji: "🛠️",
    title: "Headless Components",
    description:
      "Enjoy maximum customization freedom with our headless components.",
  },
  {
    emoji: "🤝",
    title: "Hybrid Approach",
    description:
      "The best of both worlds—support for any writing style with our hybrid approach.",
  },
  {
    emoji: "🚀",
    title: "RSC Support",
    description:
      "Stay updated with cutting-edge Next.js technology via our RSC support.",
  },
  {
    emoji: "🥇",
    title: "Familiar DX",
    description: "Delight in the ultimate DX with our familiar API design.",
  },
];
