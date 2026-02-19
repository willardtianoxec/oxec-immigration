import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

// Load environment variables from .env file
if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  dotenv.config();
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '../client/public/images');

// 获取数据库连接配置
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

// 解析MySQL连接字符串
const url = new URL(dbUrl);
const config = {
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: url.hostname.includes('tidbcloud') || url.hostname.includes('amazonaws') ? { rejectUnauthorized: false } : undefined,
};

async function syncMissingImages() {
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');

    // 获取本地所有图片文件
    const localFiles = fs.readdirSync(imagesDir);
    console.log(`📁 Found ${localFiles.length} local image files`);

    // 获取数据库中已有的图片
    const [existingImages] = await connection.execute(
      'SELECT filename FROM imageLibrary'
    );
    const existingFilenames = new Set(existingImages.map(img => img.filename));
    console.log(`📊 Found ${existingImages.length} images in database`);

    // 找出缺失的图片
    const missingFiles = localFiles.filter(file => !existingFilenames.has(file));
    console.log(`⚠️  Found ${missingFiles.length} missing images: ${missingFiles.join(', ')}`);

    // 同步缺失的图片
    let syncedCount = 0;
    for (const filename of missingFiles) {
      const filePath = path.join(imagesDir, filename);
      const stats = fs.statSync(filePath);
      const fileSize = stats.size;
      const relativePath = `/images/${filename}`;
      const description = `Auto-imported: ${filename}`;
      const category = 'general';

      try {
        await connection.execute(
          'INSERT INTO imageLibrary (filename, relativePath, fileSize, description, category, uploadedBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [filename, relativePath, fileSize, description, category, 1]
        );
        console.log(`✅ Synced: ${filename} (${(fileSize / 1024).toFixed(2)} KB)`);
        syncedCount++;
      } catch (error) {
        console.error(`❌ Failed to sync ${filename}:`, error.message);
      }
    }

    console.log(`\n✅ Sync complete! ${syncedCount} images synced to database`);

    // 显示最终统计
    const [finalCount] = await connection.execute('SELECT COUNT(*) as total FROM imageLibrary');
    console.log(`📊 Total images in database: ${finalCount[0].total}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

syncMissingImages();
