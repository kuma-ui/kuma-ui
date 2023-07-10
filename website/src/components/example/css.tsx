import React from "react";
import { css } from "@kuma-ui/core";

export const ThisIsTheCSS = () => {
  return (
    <div
      className={css`
        color: white;
        padding: 8px;
        background: blue;
      `}
    >
      hello world
    </div>
  );
};
