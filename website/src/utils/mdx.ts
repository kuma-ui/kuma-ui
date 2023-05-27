import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "docs");

// Get content from mdx file
export async function getMdContent(slug: string) {
  try {
    const fullPath = path.join(docsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      contentHtml: matterResult.content,
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

  return fileNames;
}
