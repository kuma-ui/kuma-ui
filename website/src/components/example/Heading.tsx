import { Heading } from "@kuma-ui/core";
import { useTheme } from "nextra-theme-docs";

export const HeadingExample = () => {
  const { theme } = useTheme();
  return (
    <Heading
      as="h2"
      color={theme === "dark" ? "white" : "black"}
      fontSize="24px"
    >
      Hello world
    </Heading>
  );
};
