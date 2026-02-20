import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 本地图片目录
const IMAGES_DIR = path.join(__dirname, 'client', 'public', 'images');

// 获取所有图片文件
async function getImageFiles() {
  const files = await fs.readdir(IMAGES_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
  });
}

// 读取图片文件并转换为base64
async function readImageAsBase64(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  const buffer = await fs.readFile(filePath);
  return buffer.toString('base64');
}

// 调用tRPC API上传图片
async function uploadImage(filename, base64Data) {
  try {
    const response = await fetch('http://localhost:3000/api/trpc/images.upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        json: {
          filename,
          base64Data,
          description: `Migrated from local: ${filename}`,
          category: 'local-migration',
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    const data = await response.json();
    console.log(`✓ Uploaded: ${filename}`);
    return data;
  } catch (error) {
    console.error(`✗ Failed to upload ${filename}:`, error.message);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    console.log('Starting image migration...\n');

    const imageFiles = await getImageFiles();
    console.log(`Found ${imageFiles.length} images to migrate\n`);

    let successCount = 0;
    let failCount = 0;

    for (const filename of imageFiles) {
      try {
        const base64Data = await readImageAsBase64(filename);
        await uploadImage(filename, base64Data);
        successCount++;
        
        // 延迟以避免过快请求
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        failCount++;
      }
    }

    console.log(`\nMigration completed!`);
    console.log(`Success: ${successCount}/${imageFiles.length}`);
    console.log(`Failed: ${failCount}/${imageFiles.length}`);
    
    if (failCount > 0) {
      console.log('\nIf all uploads failed with 401 errors, please:');
      console.log('1. Log in as an admin user in the browser');
      console.log('2. Run this script again');
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
