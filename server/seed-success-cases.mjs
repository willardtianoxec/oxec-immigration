import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { successCases } from "../drizzle/schema.ts";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "oxec_immigration",
});

const db = drizzle(connection);

const seedData = [
  {
    title: "BC零售企业收购成功案例",
    caseType: "投资移民",
    clientBackground: "来自上海的资深零售商，拥有20年连锁超市管理经验，家庭净资产150万加元",
    challenge: "申请人年龄55岁，英语能力有限，传统雇主担保路径竞争激烈",
    solution: "通过BC企业家移民基础类别，申请人收购温哥华现有零售店铺，投资80万加元，创造5个本地就业机会",
    outcome: "2023年获得省提名，2024年获得永久居民身份。现已成功扩展到第二家门店",
    coverImage: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=450&fit=crop",
    published: true,
  },
  {
    title: "科技初创公司战略类别获批",
    caseType: "投资移民",
    clientBackground: "来自新加坡的科技企业CEO，公司年营收500万美元，拥有50名员工",
    challenge: "企业希望在加拿大建立研发中心，需要快速获得工作签证和永居身份",
    solution: "通过BC企业家移民战略项目，以公司名义申请，投资200万加元在温哥华建立分支机构，计划招聘10名技术人员",
    outcome: "2024年一次性获得5名关键员工及家属的省提名，申请人及配偶获得工作签证，预计2024年底获得永居身份",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
    published: true,
  },
  {
    title: "区域试点项目在坎卢普斯成功落地",
    caseType: "投资移民",
    clientBackground: "来自温哥华的房地产开发商，拥有15年行业经验，家庭净资产100万加元",
    challenge: "申请人希望在小城市创业，但担心竞争压力和资金门槛",
    solution: "通过BC企业家移民区域试点项目，在坎卢普斯投资50万加元开办房地产咨询公司，获得当地政府推荐",
    outcome: "2023年获得省提名，2024年获得永久居民身份。业务已扩展至3个城市，创造了8个本地就业机会",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
    published: true,
  },
];

async function seed() {
  try {
    console.log("开始插入成功案例数据...");
    
    for (const caseData of seedData) {
      await db.insert(successCases).values(caseData);
      console.log(`✓ 已插入: ${caseData.title}`);
    }
    
    console.log("✓ 所有成功案例数据已插入完成！");
  } catch (error) {
    console.error("插入数据失败:", error);
  } finally {
    await connection.end();
  }
}

seed();
