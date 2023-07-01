import type { FC, ReactNode } from "react";
import { Inter } from "next/font/google";
import { k } from "@kuma-ui/core";

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
      <body>
        <k.div bg={'colors.green'} className={inter.className}>
          {children}
        </k.div>
      </body>
    </html>
  );
};

export default Layout;
