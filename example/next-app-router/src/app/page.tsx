import Head from "next/head";
import Image from "next/image";
import { k } from "@kuma-ui/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <k.header height={56}>
        <k.div
          maxWidth={1200}
          fontSize={32}
          fontWeight="600"
          fontFamily="quicksand"
          mx="auto"
          color="green"
          className={inter.className}
        >
          Kuma UI
        </k.div>
      </k.header>
    </div>
  );
}
