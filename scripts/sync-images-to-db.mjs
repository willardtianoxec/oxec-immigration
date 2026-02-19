#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const imagesDir = path.join(projectRoot, 'client', 'public', 'images');

// Parse DATABASE_URL
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('ERROR: DATABASE_URL environment variable not set');
  process.exit(1);
}

const url = new URL(dbUrl);
const config = {
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  port: url.port || 3306,
  ssl: { rejectUnauthorized: false },
  enableKeepAlive: true,
};

async function syncImagesToDb() {
  let connection;
  try {
    connection = await mysql.createConnection(config);
  } catch (error) {
    console.error('Connection error:', error.message);
    process.exit(1);
  }
  
  try {
    // Get list of image files
    const files = fs.readdirSync(imagesDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
    });

    console.log(`Found ${files.length} image files in ${imagesDir}`);

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
          [file, relativePath, stats.size, mimeType, 'general', 'Auto-imported: ' + file, 1]
        );
        console.log(`✓ Added: ${file} (${stats.size} bytes)`);
      } else {
        console.log(`✓ Already exists: ${file}`);
      }
    }

    console.log('\n✅ All images synced to database successfully!');
  } catch (error) {
    console.error('Error syncing images:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

syncImagesToDb();
