import type { FC, ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <html>
      <head>
        <title></title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
