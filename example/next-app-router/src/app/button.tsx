'use client'

import { getBreakPoints, getVariants, getTokens } from "@kuma-ui/core";
import { useEffect } from "react";

export function Button() {
  useEffect(() => {
    console.log(getTokens());
    console.log(getVariants("Box"));
    console.log(getBreakPoints());
  }, [])
  return (
    <div>Button</div>
  );
}
