import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';

// 所有遗漏的CDN图片URL
const cdnUrls = [
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-1_1770162528000_na1fn_cmVjb25zaWRlcmF0aW9uLW92ZXJ2aWV3.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTFfMTc3MDE2MjUyODAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxXOTJaWEoyYVdWMy5qcGc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uOa4eCyL12L5jPJXT4qY4XecneW~hnhNlv1zQwvKoAWVNmPLbzOiIBFuW5nFs5GfdcYl4hVUcvbBi17TZwno-AsoflnW3QXb4b~XXICEKuepxcqF0fdM6QAkVbrTRgDNSLjo5C~3RdhFlM-VqjTXOPMNrVW4tDNI3Ug7~Y~tSdCBxr0TGaK3aJT492iwiVRL~UU3jj92TKn~EoGFA3eeVXivtiwlsz7s4fJ9vc4vfMT-6EQ7gNQv-Tox5eTXMsxOPF7l0I41ntftyAaKp1VXuCVI7cY-9NckuAhEStnxGqZxQVN8l1BmG~2BRY8Yon5~2Zcm1NQJNjBhkqg8es4OrA__',
    filename: 'reconsideration-overview.jpg'
  },
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-2_1770162530000_na1fn_cmVjb25zaWRlcmF0aW9uLXNvbHV0aW9ucw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTJfMTc3MDE2MjUzMDAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxYSmxablZ6WVd3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TT8tyb0etBE3bM4iyFncy~oQI1tzeqX6rYekUdY3psnfEcS0gyoF75xyA57n16rAP4GQswfYbPtgt9wBzCTYdVb402aZclR6j42GvS8741iTm9NayRcPQbMMq7Xv5mZiYhVmlru6n~hUrz7AdPaiRSfXSPWa2f554-UNxs8Gr84wDn3qcxG4NGwLAKdgIV2LveaanN5C738DR6dQrf6W5O1S3~IH8DnncdZVBBWkFSyj1xrAjDRWzOm2~2Fg7tvmKs2Qsxz7PRAT488UQ5cdPjGxgMGO5YlbtdyA4-afRvGJe6KjZAD6tEW3DCk3KhBbC0ohykuGZnYBSglOwWZvjQ__',
    filename: 'reconsideration-solutions.jpg'
  },
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-3_1770162536000_na1fn_cmVjb25zaWRlcmF0aW9uLXNvbHV0aW9ucw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTNfMTc3MDE2MjUzNjAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxYTnZiSFYwYVc5dWN3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VNo9Qygri8Kels0VtMlLPnlF5HthK-xbSO2Ftk~7ME5TmOUSUVPUTrf8KnoQENPi0OAvqCx3NFg7NoWJ~wXXVk6-Kvp0XYQrscaEOKVeP2AevAupQINSKZAFEbYz33nsjo2GL0XH4CxhfEF-9oiZ1S1LG~ouJjp7f6WiBNCoaoRefrGhINDi6FQnfSZMipaVL1I~PR98Px1L0GL5ARo18czY-TUylsT8PUnVj3uLNUTmzND9mORrK9ZV3Dzhvev1xTWsAhJ~GZsjAyseMxvXC597w3PS~08pOaXRhYhnn6-DgP-UWlyERP9UT4hUdt4InOzpTECmmUSgIc1uBn3Mtg__',
    filename: 'reconsideration-team.jpg'
  },
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/HKiDtbWNfdZrc6GJJIe87h-img-1_1771010848000_na1fn_ZGVmYXVsdC1hcnRpY2xlLWNvdmVy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0hLaUR0YldOZmRacmM2R0pKSWU4N2gtaW1nLTFfMTc3MTAxMDg0ODAwMF9uYTFmbl9aR1ZtWVhWc2RDMWhjblJwWTJ4bExXTnZkbVZ5LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rIo0CYsuXv4Ux4r6XcQAhYoofw6RyoVzzsxWI0C~x3IbiQql9Vjpr1nYksC~cgrkiNTw5qVnckKAyWYZ~XCbxn9MFsWXSY3N7KC0Lcfjd6nxJ52t4YZp-lFq9atqtMPeWNG2j7-eHIf5UoFf1j-146eTjpTJdYE11a83B~1UI9Q4noYolY1dO2xpnFBbm7djehpVSDuGCJt~mGLzYxMidCQ-LtFbHSwO08afT8mO3Vh45r7iSrvdru7gsZxjyh5TaGLvxZoVucxDt8XPO-LV0DYu~5-m3ykMeOIF8Bq7VXmSHU85n05i8qnuodkFHaw0n7twp7U1NKQHxxdYhqyUYg__',
    filename: 'default-article-cover.png'
  },
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/u6aTSFsI93UUCpbJ3kinYK-img-1_1770249464000_na1fn_Y2l0aXplbnNoaXAtb2F0aC1jZXJlbW9ueQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L3U2YVRTRnNJOTNVVUNwYkoza2luWUstaW1nLTFfMTc3MDI0OTQ2NDAwMF9uYTFmbl9ZMmwwYVhwbGJuTm9hWEF0YjJGMGFDMWpaWEpsYlc5dWVRLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=BgYB88TwuZVdf7zdlHJRa8cge~kcCgmm6oHkq8Oe36y-p-5drnJNr-uZtesfY8cJR1rqiOaLrMzixaCbBY-d3a6xRlmaK8dziZjLjeAoFORt24Ww5ykYoQLjZw5lsVm2LXXQV5D8vVOy5H6iEEaRHxS2iwIFa1kuvXVMTfkqKkmHuxkiQqCSir5PKxa49Co5wa8bh~u94MBFvc3YVNFLxXSkmfQV6mcx49uMswAoZ~utIldkRRTEjXXGDcAusUO~OS7jZPlxThU64GSAvCxQkcKNMywXAs1vYFTTBAuiqvG4KPqpjt-lue7HZn6rVx7DWC~vX7fqVbyEPZbeuH-ozg__',
    filename: 'citizenship-oath-ceremony.jpg'
  },
  {
    url: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/u6aTSFsI93UUCpbJ3kinYK-img-2_1770249466000_na1fn_Y2l0aXplbnNoaXAtbGVnYWwtZG9jdW1lbnRz.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L3U2YVRTRnNJOTNVVUNwYkoza2luWUstaW1nLTJfMTc3MDI0OTQ2NjAwMF9uYTFmbl9ZMmwwYVhwbGJuTm9hWEF0YkdWbllXd3RaRzlqZFcxbGJuUnouanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cABEHdxI0alrNfY85ZKeAafRL2apWiA9w39NXf9qaogEmj69b4TKO-vEyHTQCMQwmJb8MaqfLmwF4HYyhPV4DufRcG2sLwLQhZ~KMstjjaWbPEjC7onNGAObzvPsmFF~5~oUowjzlBuoAEmFbO-vpADDKdSd4-Htld4MCRqaBRad4QyHKE3w7DMSbWrMlZbcbAM2m5-3~Q7pr~9-5UPUxJ3~T4co~9AyL1P2pnhJz2nZQG5RU4vFOJ-bnnj0XhSQvnY0Pv04a2vvnzIErKfeVKNwvz7HWWwk2jpYudNbbrvhCR4rDpNSeU3tvjWGh62hGjWWdzmqrXLoBIC-aw~rBw__',
    filename: 'citizenship-legal-documents.jpg'
  }
];

const imagesDir = path.join(process.cwd(), 'client', 'public', 'images');

// 确保目录存在
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 下载单个文件
function downloadFile(urlObj) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, urlObj.filename);
    
    // 检查文件是否已存在
    if (fs.existsSync(filePath)) {
      console.log(`✓ 文件已存在: ${urlObj.filename}`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filePath);
    const protocol = urlObj.url.startsWith('https') ? https : http;
    
    protocol.get(urlObj.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ 已下载: ${urlObj.filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除不完整的文件
      reject(err);
    });
  });
}

// 批量下载
async function downloadAll() {
  console.log(`开始下载 ${cdnUrls.length} 张图片...`);
  
  for (const urlObj of cdnUrls) {
    try {
      await downloadFile(urlObj);
    } catch (err) {
      console.error(`✗ 下载失败: ${urlObj.filename}`, err.message);
    }
  }
  
  console.log('下载完成！');
}

downloadAll().catch(console.error);
