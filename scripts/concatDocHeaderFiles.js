const concat = require('concat');
const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function main() {
  try {
    const currentPath = process.cwd();
    const filePaths = await getFiles('docs/docs/headers');
    for (const headerFilePath of filePaths) {
      const fileName = headerFilePath.replace(`${currentPath}/docs/docs/headers/`, '').split('/');
      const apiFilePath = `${currentPath}/docs/docs/api/${fileName.join('/')}`;
      concat([headerFilePath, apiFilePath], apiFilePath);
    }
  } catch(error) {
    console.error(error);
  }
}

main();
