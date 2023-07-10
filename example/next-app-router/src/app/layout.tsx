import type { FC, ReactNode } from "react";
import { Inter } from "next/font/google";
import { k } from "@kuma-ui/core";
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";

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
        <KumaRegistry>
          <k.div bg={"red"} className={inter.className}>
            {children}
          </k.div>
        </KumaRegistry>
      </body>
    </html>
  );
};

export default Layout;
