import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import { PageLayout } from "@src/components";

export default function Home<NextPage>() {
  return (
    <>
      <div></div>
    </>
  );
}

Home.getLayout = (page: any) => <PageLayout>{page}</PageLayout>;
