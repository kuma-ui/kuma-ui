import { NextPage } from "next";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    slug: string[];
  };
};

const Home: NextPage = (props) => redirect("/docs/introduction");

export default Home;
