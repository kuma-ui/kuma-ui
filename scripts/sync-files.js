const main = () => {
  const fs = require('fs');

// You can add more files to be synchronized by adding file names here.
  const TARGETS = ['README.md'];

  TARGETS.forEach(name => {
    // Get the contents of the target file in the root directory
    const rootFile = fs.readFileSync(name, 'utf8');

    // Copy the contents of the target file in the root directory,
    // if there are differences in the target files in each package directory.
    const packageDirs = fs.readdirSync('packages');
    let synced = false;
    packageDirs.forEach((packageDir, idx) => {
      const packageFilePath = `packages/${packageDir}/${name}`;

      if (
        // If the target file does not exist in packages dir, add it.
        !fs.existsSync(packageFilePath) ||
        fs.readFileSync(packageFilePath, 'utf8') !== rootFile
      ) {
        fs.writeFileSync(packageFilePath, rootFile);
        synced = true;
      }

      if (idx === packageDirs.length - 1 && synced)  {
        console.info(`🔄 ${name} of the root was copied to ${name} of each packages dir.`);
      }
    });
  });
};

main();
