import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const docsDirectory = path.join(process.cwd(), "docs");

// Get content from mdx file
export async function getMdxContent(slug: string) {
  try {
    const fullPath = path.join(docsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);

    // Combine the data with the id and contentHtml
    return {
      contentHtml: processedContent.value,
      title: matterResult.data.title,
      description: matterResult.data.description,
    };
  } catch {
    return null;
  }
}

// Get paths of all mdx files
export function getAllDocPaths() {
  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.relative(docsDirectory, dirPath + "/" + file));
      }
    });

    return arrayOfFiles;
  }

  let fileNames = getAllFiles(docsDirectory);

  // Remove .mdx extension from filename
  fileNames = fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));

  const paths = fileNames.map((fileName) => ({
    params: {
      slug: fileName.split("/"), // split filename into array to get each part of the slug
    },
  }));

  return paths;
}
