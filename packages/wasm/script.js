import fs from "node:fs/promises";

async function main() {
  await fs.writeFile(
    "./pkg/esm/package.json",
    JSON.stringify({ type: "module" }),
  );

  await fs.writeFile(
    "./pkg/node/package.json",
    JSON.stringify({ type: "commonjs" }),
  );

  await fs.rm("./pkg/node/.gitignore", { force: true });
  await fs.rm("./pkg/esm/.gitignore", { force: true });
}

await main();
