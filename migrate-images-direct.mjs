import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 本地图片目录
const IMAGES_DIR = path.join(__dirname, 'client', 'public', 'images');

// 数据库配置
const DB_CONFIG = {
  host: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : 'localhost',
  user: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).username : 'root',
  password: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).password : '',
  database: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).pathname.slice(1) : 'oxec_immigration',
  ssl: true, // 为TiDB启用SSL
};

// 获取所有图片文件
async function getImageFiles() {
  const files = await fs.readdir(IMAGES_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
  });
}

// 获取MIME类型
function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
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
async function optimizeAndSaveImage(imageBuffer, originalFilename) {
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
      webpFilename,
      fileSize: optimizedBuffer.length,
      webpSize: webpBuffer.length,
    };
  } catch (error) {
    console.error('[Image Optimization] Error optimizing image:', error);
    throw error;
  }
}

// 主函数
async function main() {
  let connection;
  try {
    console.log('Starting direct image migration...\n');

    // 连接数据库
    console.log('Connecting to database...');
    console.log('Database URL:', process.env.DATABASE_URL ? 'Using DATABASE_URL' : 'Using default config');
    try {
      connection = await mysql.createConnection(DB_CONFIG);
    } catch (err) {
      console.error('Connection error:', err.message);
      // 尝试不使SSL重新连接
      console.log('Retrying without SSL...');
      DB_CONFIG.ssl = false;
      connection = await mysql.createConnection(DB_CONFIG);
    }
    console.log('Database connected!\n');

    // 获取管理员用户ID
    const [adminUsers] = await connection.query('SELECT id FROM users WHERE role = "admin" LIMIT 1');
    if (adminUsers.length === 0) {
      throw new Error('No admin user found in database');
    }
    const adminUserId = adminUsers[0].id;
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

        await connection.query(
          'INSERT INTO imageLibrary (filename, relativePath, fileSize, mimeType, description, category, uploadedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [optimizedFilename, relativePath, fileSize, mimeType, description, category, adminUserId]
        );

        console.log(`✓ Migrated: ${filename} → ${optimizedFilename} (${(fileSize / 1024).toFixed(2)} KB)\n`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to migrate ${filename}:`, error.message, '\n');
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
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();
