import Head from "next/head";
import Image from "next/image";
import { k } from "@kuma-ui/core";
import { Dynamic, Header } from "@src/components";

export default function Home() {
  return (
    <div>
      <Header />
      <Dynamic key={1} />
      <Dynamic key={2} />
    </div>
  );
}
