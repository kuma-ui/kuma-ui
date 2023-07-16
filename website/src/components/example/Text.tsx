import { Text } from "@kuma-ui/core";
import { useTheme } from "nextra-theme-docs";

export const TextExample = () => {
  const { theme } = useTheme();
  return (
    <Text color={theme === "dark" ? "white" : "black"} fontSize="16px">
      Hello world
    </Text>
  );
};
