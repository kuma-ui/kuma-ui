import { Text } from "@kuma-ui/core";
import { useTheme } from "nextra-theme-docs";

export const TextExample = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Text color={resolvedTheme === "dark" ? "white" : "black"} fontSize="16px">
      Hello world
    </Text>
  );
};
