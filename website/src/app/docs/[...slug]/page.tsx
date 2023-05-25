import { getAllDocPaths, getMdxContent } from "@src/utils/mdx";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

interface DocProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params,
}: DocProps): Promise<Metadata> {
  const page = await getMdxContent(params.slug[0]);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Documentation(props: DocProps) {
  const content = await getMdxContent(props.params.slug[0]);
  if (!content) redirect("/doc/introduction");

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: content.contentHtml.toString() }}
        style={{ maxWidth: "700px" }}
      />
    </div>
  );
}
