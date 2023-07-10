import React from "react";
import { Button } from "@kuma-ui/core";

export const ButtonExample = () => {
  return (
    <Button p={8} bg="blue" color="white" borderRadius={6}>
      Click me
    </Button>
  );
};

export const PrimaryButton = () => {
  return <Button variant="primary">I'm a primary button</Button>;
};
