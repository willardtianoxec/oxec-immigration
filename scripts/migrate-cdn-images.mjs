import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const imagesDir = path.join(projectRoot, 'client/public/images');
const pagesDir = path.join(projectRoot, 'client/src/pages');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Extract all CDN URLs from page files
const pageFiles = ['Home.tsx', 'BusinessClass.tsx', 'FamilyClass.tsx', 'Temporary.tsx', 'SkillWorker.tsx'];
const cdnUrls = new Set();
const urlToFilename = new Map();

pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(/https:\/\/private-us-east-1\.manuscdn\.com[^"]+/g) || [];
    matches.forEach(url => {
      cdnUrls.add(url);
      // Extract filename from URL
      const match = url.match(/sandbox\/([^-]+)-([^_]+)_\d+_[^.]+\.(\w+)/);
      if (match) {
        const baseName = match[2];
        const ext = match[3];
        const filename = `${baseName}.${ext}`;
        urlToFilename.set(url, filename);
      }
    });
  }
});

console.log(`Found ${cdnUrls.size} unique CDN image URLs`);

// Download images
let downloadedCount = 0;

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    
    // Skip if already exists
    if (fs.existsSync(filePath)) {
      console.log(`✓ Already exists: ${filename}`);
      resolve(filename);
      return;
    }

    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(err);
    });
  });
};

// Download all images
const downloadPromises = Array.from(cdnUrls).map(url => {
  const filename = urlToFilename.get(url) || `image-${Date.now()}.jpg`;
  return downloadImage(url, filename).catch(err => {
    console.error(`✗ Failed to download: ${filename}`, err.message);
    return null;
  });
});

Promise.all(downloadPromises).then(results => {
  const successful = results.filter(r => r !== null).length;
  console.log(`\n✅ Downloaded ${successful} images successfully`);
  
  // Print mapping for reference
  console.log('\nImage URL to local path mapping:');
  Array.from(urlToFilename.entries()).forEach(([url, filename]) => {
    console.log(`  /images/${filename}`);
  });
}).catch(err => {
  console.error('Error during migration:', err);
  process.exit(1);
});
