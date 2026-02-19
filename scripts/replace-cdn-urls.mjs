import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const pagesDir = path.join(projectRoot, 'client/src/pages');

// Map CDN URLs to local paths
const urlMappings = [
  // Extract from grep results and map to local images
  // We'll create a mapping based on the file names
];

const pageFiles = ['Home.tsx', 'BusinessClass.tsx', 'FamilyClass.tsx', 'Temporary.tsx', 'SkillWorker.tsx'];

pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // Replace CDN URLs with local paths
  // Pattern: https://private-us-east-1.manuscdn.com/sessionFile/.../sandbox/...
  let replacementCount = 0;
  let imageIndex = 1;

  content = content.replace(/https:\/\/private-us-east-1\.manuscdn\.com[^"]+/g, (match) => {
    // Try to determine which local image this should map to
    // For now, we'll use sequential mapping
    const localPath = `/images/img-${imageIndex}.jpg`;
    imageIndex++;
    replacementCount++;
    return localPath;
  });

  if (replacementCount > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Updated ${file}: replaced ${replacementCount} CDN URLs`);
  } else {
    console.log(`- No CDN URLs found in ${file}`);
  }
});

console.log('\n✅ All CDN URLs have been replaced with local paths');
