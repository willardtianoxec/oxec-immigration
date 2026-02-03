import { db } from './db.ts';
import { successCases } from '../drizzle/schema.ts';

async function seedReconsiderationCases() {
  try {
    // Case A: Misrepresentation - 5-year ban lifted
    await db.insert(successCases).values({
      title: '虚假陈述指控撤销 - 5年禁令解除',
      category: '拒签重审/PF',
      description: '申请人因移民史申报不完整被指控虚假陈述，面临5年入境禁令。我们通过详尽的法律分析和新证据提交，成功说服移民官撤销指控。',
      clientBackground: '来自上海的商务人士，首次加拿大工作签证申请被拒',
      imageUrl: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-2_1770162530000_na1fn_cmVjb25zaWRlcmF0aW9uLXJlZnVzYWw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTJfMTc3MDE2MjUzMDAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxYSmxablZ6WVd3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TT8tyb0etBE3bM4iyFncy~oQI1tzeqX6rYekUdY3psnfEcS0gyoF75xyA57n16rAP4GQswfYbPtgt9wBzCTYdVb402aZclR6j42GvS8741iTm9NayRcPQbMMq7Xv5mZiYhVmlru6n~hUrz7AdPaiRSfXSPWa2f554-UNxs8Gr84wDn3qcxG4NGwLAKdgIV2LveaanN5C738DR6dQrf6W5O1S3~IH8DnncdZVBBWkFSyj1xrAjDRWzOm2~2Fg7tvmKs2Qsxz7PRAT488UQ5cdPjGxgMGO5YlbtdyA4-afRvGJe6KjZAD6tEW3DCk3KhBbC0ohykuGZnYBSglOwWZvjQ__',
      successYear: 2023,
      processingTime: '8个月',
      keyPoints: '案件难点：虚假陈述指控；最终获批：签证获批，禁令撤销',
    });

    // Case B: PF Letter - Successful response
    await db.insert(successCases).values({
      title: '程序公正信完美回复 - 签证获批',
      category: '拒签重审/PF',
      description: '申请人收到PF Letter，被质疑提交的财务证明真实性。我们准备了详尽的补充文件和银行确认信，成功回复并最终获得签证。',
      clientBackground: '来自北京的留学申请人，资金证明遭质疑',
      imageUrl: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-1_1770162528000_na1fn_cmVjb25zaWRlcmF0aW9uLW92ZXJ2aWV3.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTFfMTc3MDE2MjUyODAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxXOTJaWEoyYVdWMy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uOa4eCyL12L5jPJXT4qY4XecneW~hnhNlv1zQwvKoAWVNmPLbzOiIBFuW5nFs5GfdcYl4hVUcvbBi17TZwno-AsoflnW3QXb4b~XXICEKuepxcqF0fdM6QAkVbrTRgDNSLjo5C~3RdhFlM-VqjTXOPMNrVW4tDNI3Ug7~Y~tSdCBxr0TGaK3aJT492iwiVRL~UU3jj92TKn~EoGFA3eeVXivtiwlsz7s4fJ9vc4vfMT-6EQ7gNQv-Tox5eTXMsxOPF7l0I41ntftyAaKp1VXuCVI7cY-9NckuAhEStnxGqZxQVN8l1BmG~2BRY8Yon5~2Zcm1NQJNjBhkqg8es4OrA__',
      successYear: 2023,
      processingTime: '6个月',
      keyPoints: '案件难点：PF Letter回复；最终获批：学签获批',
    });

    // Case C: Criminal Rehabilitation
    await db.insert(successCases).values({
      title: '刑事康复申请成功 - 不可入境状态消除',
      category: '拒签重审/PF',
      description: '申请人因境外犯罪记录被判定为不可入境。我们协助其申请刑事康复（Criminal Rehabilitation），成功消除不可入境状态，最终获得加拿大永久居民身份。',
      clientBackground: '来自广州的企业家，因年轻时犯罪记录面临不可入境',
      imageUrl: 'https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-3_1770162536000_na1fn_cmVjb25zaWRlcmF0aW9uLXNvbHV0aW9ucw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTNfMTc3MDE2MjUzNjAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxYTnZiSFYwYVc5dWN3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VNo9Qygri8Kels0VtMlLPnlF5HthK-xbSO2Ftk~7ME5TmOUSUVPUTrf8KnoQENPi0OAvqCx3NFg7NoWJ~wXXVk6-Kvp0XYQrscaEOKVeP2AevAupQINSKZAFEbYz33nsjo2GL0XH4CxhfEF-9oiZ1S1LG~ouJjp7f6WiBNCoaoRefrGhINDi6FQnfSZMipaVL1I~PR98Px1L0GL5ARo18czY-TUylsT8PUnVj3uLNUTmzND9mORrK9ZV3Dzhvev1xTWsAhJ~GZsjAyseMxvXC597w3PS~08pOaXRhYhnn6-DgP-UWlyERP9UT4hUdt4InOzpTECmmUSgIc1uBn3Mtg__',
      successYear: 2024,
      processingTime: '12个月',
      keyPoints: '案件难点：刑事康复申请；最终获批：永久居民身份获批',
    });

    console.log('✅ Reconsideration cases seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding reconsideration cases:', error);
    process.exit(1);
  }
}

seedReconsiderationCases();
