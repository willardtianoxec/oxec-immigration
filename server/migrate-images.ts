import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { getDb } from './db';
import { imageLibrary } from '../drizzle/schema';

const IMAGES_DIR = path.join(process.cwd(), 'client', 'public', 'images');

// 获取所有图片文件
async function getImageFiles() {
  const files = await fs.readdir(IMAGES_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
  });
}

// 获取MIME类型
function getMimeType(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return mimeTypes[ext] || 'image/unknown';
}

// 优化并保存图片
async function optimizeAndSaveImage(
  imageBuffer: Buffer,
  originalFilename: string
): Promise<{ filename: string; fileSize: number }> {
  try {
    // 获取文件扩展名
    const ext = path.extname(originalFilename).toLowerCase();
    const nameWithoutExt = path.basename(originalFilename, ext);

    // 优化原始图片
    const optimizedBuffer = await sharp(imageBuffer)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer();

    // 保存优化后的原始格式
    const optimizedFilename = `${nameWithoutExt}-opt${ext}`;
    const optimizedPath = path.join(IMAGES_DIR, optimizedFilename);
    await fs.writeFile(optimizedPath, optimizedBuffer);

    // 转换为WebP
    const webpBuffer = await sharp(optimizedBuffer)
      .webp({ quality: 80 })
      .toBuffer();

    // 保存WebP版本
    const webpFilename = `${nameWithoutExt}-opt.webp`;
    const webpPath = path.join(IMAGES_DIR, webpFilename);
    await fs.writeFile(webpPath, webpBuffer);

    return {
      filename: optimizedFilename,
      fileSize: optimizedBuffer.length,
    };
  } catch (error) {
    console.error('[Image Optimization] Error optimizing image:', error);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    console.log('Starting image migration...\n');

    // 获取数据库连接
    console.log('Connecting to database...');
    const db = await getDb();
    if (!db) {
      throw new Error('Database connection failed');
    }
    console.log('Database connected!\n');

    // 获取管理员用户ID（使用第一个管理员）
    // 假设已有管理员用户，使用ID 1
    const adminUserId = 1;
    console.log(`Using admin user ID: ${adminUserId}\n`);

    // 获取所有图片文件
    const imageFiles = await getImageFiles();
    console.log(`Found ${imageFiles.length} images to migrate\n`);

    let successCount = 0;
    let failCount = 0;

    for (const filename of imageFiles) {
      try {
        console.log(`Processing: ${filename}`);
        
        // 读取图片文件
        const filePath = path.join(IMAGES_DIR, filename);
        const imageBuffer = await fs.readFile(filePath);

        // 优化并保存
        const { filename: optimizedFilename, fileSize } = await optimizeAndSaveImage(imageBuffer, filename);

        // 插入数据库记录
        const mimeType = getMimeType(optimizedFilename);
        const relativePath = `/images/${optimizedFilename}`;
        const description = `Migrated from local: ${filename}`;
        const category = 'local-migration';

        await db.insert(imageLibrary).values({
          filename: optimizedFilename,
          relativePath,
          fileSize,
          mimeType,
          description,
          category,
          uploadedBy: adminUserId,
        });

        console.log(`✓ Migrated: ${filename} → ${optimizedFilename} (${(fileSize / 1024).toFixed(2)} KB)\n`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to migrate ${filename}:`, (error as Error).message, '\n');
        failCount++;
      }
    }

    console.log(`\nMigration completed!`);
    console.log(`Success: ${successCount}/${imageFiles.length}`);
    console.log(`Failed: ${failCount}/${imageFiles.length}`);

    if (successCount > 0) {
      console.log(`\n✓ All images have been optimized and added to the image library.`);
      console.log(`✓ WebP versions have been generated for all images.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
