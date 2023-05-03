import { k } from "@kuma-ui/core";
import type { FC, ReactNode } from "react";
import { Header } from "./Header";

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    <k.div flexDir={["column", "row"]} display="flex">
      {children}
    </k.div>
  </>
);
