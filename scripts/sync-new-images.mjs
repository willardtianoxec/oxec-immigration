import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const imagesDir = path.join(projectRoot, 'client/public/images');

// Get database URL from environment
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Parse MySQL connection string
const url = new URL(databaseUrl);
const config = {
  host: url.hostname,
  port: url.port || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: 'Amazon RDS' in url.hostname ? { rejectUnauthorized: false } : false,
};

async function syncImages() {
  const connection = await mysql.createConnection(config);

  try {
    // Get all image files
    const files = fs.readdirSync(imagesDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
    });

    console.log(`Found ${files.length} image files to sync`);

    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      const relativePath = `/images/${file}`;
      const ext = path.extname(file).toLowerCase().slice(1);
      const mimeType = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
      }[ext] || 'image/jpeg';

      // Check if image already exists
      const [existing] = await connection.execute(
        'SELECT id FROM imageLibrary WHERE relativePath = ?',
        [relativePath]
      );

      if (existing.length === 0) {
        // Insert new image
        await connection.execute(
          `INSERT INTO imageLibrary (filename, relativePath, fileSize, mimeType, category, description, uploadedBy, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [file, relativePath, stats.size, mimeType, 'service-images', 'Migrated from CDN', 1]
        );
        console.log(`✓ Added: ${file} (${stats.size} bytes)`);
      } else {
        console.log(`✓ Already exists: ${file}`);
      }
    }

    console.log('\n✅ All images synced to database successfully!');
  } finally {
    await connection.end();
  }
}

syncImages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
