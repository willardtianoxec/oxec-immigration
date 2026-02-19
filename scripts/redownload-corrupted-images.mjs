import fs from 'fs';
import path from 'path';
import https from 'https';

// 需要重新下载的图片URL
const cdnUrls = [
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-1_1770162528000_na1fn_cmVjb25zaWRlcmF0aW9uLW92ZXJ2aWV3.jpg',
    filename: 'reconsideration-overview.jpg'
  },
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-2_1770162530000_na1fn_cmVjb25zaWRlcmF0aW9uLXNvbHV0aW9ucw.jpg',
    filename: 'reconsideration-solutions.jpg'
  }
];

const imagesDir = path.join(process.cwd(), 'client', 'public', 'images');

// 确保目录存在
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 下载单个文件（不使用查询参数）
function downloadFile(urlObj) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, urlObj.filename);
    const file = fs.createWriteStream(filePath);
    
    console.log(`正在下载: ${urlObj.filename}`);
    
    https.get(urlObj.url, (response) => {
      // 检查响应状态
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        
        // 检查文件大小
        const stats = fs.statSync(filePath);
        if (stats.size < 1000) { // 小于1KB说明下载失败
          fs.unlinkSync(filePath);
          reject(new Error(`文件太小: ${stats.size} bytes`));
        } else {
          console.log(`✓ 已下载: ${urlObj.filename} (${(stats.size / 1024).toFixed(2)} KB)`);
          resolve();
        }
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除不完整的文件
      reject(err);
    });
  });
}

// 批量下载
async function downloadAll() {
  console.log(`开始重新下载 ${cdnUrls.length} 张损坏的图片...`);
  
  for (const urlObj of cdnUrls) {
    try {
      await downloadFile(urlObj);
    } catch (err) {
      console.error(`✗ 下载失败: ${urlObj.filename}`, err.message);
    }
  }
  
  console.log('重新下载完成！');
}

downloadAll().catch(console.error);
