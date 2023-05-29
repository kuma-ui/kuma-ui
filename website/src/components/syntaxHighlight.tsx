"use client";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css"; // import whichever theme you prefer
import { k } from "@kuma-ui/core";

type Props = {
  language: string;
  children: string;
  inline?: boolean;
};

export const SyntaxHighlight = ({ language, children, inline }: Props) => {
  const codeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, []);

  if (inline) {
    return (
      <k.span color="#2d7fbd" fontWeight={600}>
        {children}
      </k.span>
    );
  }

  return (
    <code ref={codeRef} className={language} style={{ borderRadius: "8px" }}>
      {children.trim()}
    </code>
  );
};
