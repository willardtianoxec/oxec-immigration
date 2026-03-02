/**
 * Meta标签管理工具
 * 用于动态更新页面的Title、Meta Description和OG标签
 */

export interface MetaTagConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * 更新页面的Meta标签
 */
export function updateMetaTags(config: MetaTagConfig): void {
  if (typeof document === 'undefined') return;

  // 更新Title
  document.title = config.title;

  // 更新Meta Description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', config.description);

  // 更新Keywords
  if (config.keywords) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', config.keywords);
  }

  // 更新OG标签
  updateOGTag('og:title', config.title);
  updateOGTag('og:description', config.description);
  updateOGTag('og:type', config.type || 'website');
  
  if (config.url) {
    updateOGTag('og:url', config.url);
  }
  
  if (config.image) {
    updateOGTag('og:image', config.image);
  }

  // 更新Twitter Card标签
  updateOGTag('twitter:title', config.title);
  updateOGTag('twitter:description', config.description);
  if (config.image) {
    updateOGTag('twitter:image', config.image);
  }
}

/**
 * 更新单个OG标签
 */
function updateOGTag(property: string, content: string): void {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * 预定义的页面Meta标签配置
 */
export const pageMetaTags: Record<string, MetaTagConfig> = {
  // 首页
  home: {
    title: '加拿大移民咨询 | 专业移民律师 | OXEC移民事务所',
    description: 'OXEC移民事务所提供专业的加拿大移民咨询服务。拥有资深移民律师团队，专业处理联邦快速通道、省提名、家庭团聚等移民项目。立即咨询获得免费评估。',
    keywords: '加拿大移民,移民咨询,移民律师,Express Entry,省提名,家庭团聚',
    url: 'https://oxec-immigration.manus.space'
  },

  // 技术移民
  skillworker: {
    title: '加拿大技术移民 | Express Entry快速通道 | OXEC',
    description: 'OXEC提供专业的加拿大技术移民咨询。专业处理Express Entry、CRS评分、工作经验认证等。资深移民律师为您规划最优移民路径，成功率高达95%以上。立即预约咨询。',
    keywords: '加拿大技术移民,Express Entry,CRS评分,快速通道,移民律师',
    url: 'https://oxec-immigration.manus.space/skillworker'
  },

  // 商业移民
  businessclass: {
    title: '加拿大商业移民 | 投资移民 | 创业移民 | OXEC',
    description: 'OXEC商业移民咨询团队专业处理投资移民、创业移民、自雇移民等项目。拥有丰富的商业背景审查经验，帮助企业家和投资者快速获得加拿大永居身份。立即咨询。',
    keywords: '加拿大商业移民,投资移民,创业移民,自雇移民,商业背景审查',
    url: 'https://oxec-immigration.manus.space/businessclass'
  },

  // 家庭团聚
  familyclass: {
    title: '加拿大家庭团聚 | 配偶担保 | 父母团聚 | OXEC',
    description: 'OXEC家庭团聚移民专家帮您与家人团聚。专业处理配偶担保、父母团聚、超级签证等项目。平均审批周期快速，成功案例众多。开启您的团聚之旅。',
    keywords: '加拿大家庭团聚,配偶担保,父母团聚,超级签证,家庭移民',
    url: 'https://oxec-immigration.manus.space/familyclass'
  },

  // PR卡续签
  prcard: {
    title: '加拿大PR卡续签 | 枫叶卡更新 | 快速办理 | OXEC',
    description: 'OXEC提供专业的加拿大PR卡续签服务。快速办理枫叶卡更新，避免身份失效。经验丰富的团队确保申请顺利通过。立即咨询了解续签流程。',
    keywords: '加拿大PR卡续签,枫叶卡更新,永居卡续期,PR卡过期',
    url: 'https://oxec-immigration.manus.space/prcard'
  },

  // 拒签重审
  reconsideration: {
    title: '加拿大拒签重审 | 签证被拒申请 | 专业重审服务 | OXEC',
    description: 'OXEC拒签重审团队专业处理签证被拒案件。深入分析拒签原因，制定有效的重审策略。成功帮助数百名申请人扭转局面，重获签证。立即咨询。',
    keywords: '加拿大拒签重审,签证被拒,申请重新审核,拒签申诉,签证上诉',
    url: 'https://oxec-immigration.manus.space/reconsideration'
  },

  // CRS评分计算器
  calculator: {
    title: 'CRS评分计算器 | Express Entry评分工具 | OXEC',
    description: '免费的CRS评分计算器，快速评估您的Express Entry评分。准确计算语言成绩、工作经验、学历等因素。了解您的移民竞争力，制定申请策略。',
    keywords: 'CRS评分,Express Entry评分,快速通道评分,移民评分计算',
    url: 'https://oxec-immigration.manus.space/calculator'
  },

  // FSW评分计算器
  fswCalculator: {
    title: 'FSW评分计算器 | 联邦技术工人评分 | OXEC',
    description: '精准的FSW评分计算工具，评估您的联邦技术工人项目评分。综合考虑年龄、语言、工作经验、学历等因素。快速了解您的移民资格。',
    keywords: 'FSW评分,联邦技术工人评分,移民评分,技术工人评估',
    url: 'https://oxec-immigration.manus.space/fsw-calculator'
  },

  // CLB换算工具
  clbTranslator: {
    title: 'CLB等级换算工具 | 语言成绩转换 | OXEC',
    description: '快速转换您的语言成绩到CLB等级。支持IELTS、TOEFL、法语等多种考试成绩转换。准确了解您的语言水平评分。',
    keywords: 'CLB等级,语言成绩转换,IELTS转CLB,语言评分,CLB换算',
    url: 'https://oxec-immigration.manus.space/clb-translator'
  },

  // BC省提名计算器
  bcCalculator: {
    title: 'BC省提名评分工具 | BC PNP评分计算器 | OXEC',
    description: 'BC省提名项目评分计算工具。精准评估您在BC PNP项目中的竞争力。了解分数要求，制定省提名申请策略。',
    keywords: 'BC省提名,BC PNP评分,不列颠哥伦比亚省提名,省提名评分',
    url: 'https://oxec-immigration.manus.space/bccalculator'
  },

  // 博客
  blog: {
    title: '加拿大移民资讯 | 移民政策解读 | OXEC移民观察',
    description: 'OXEC移民观察博客提供最新的加拿大移民资讯和政策解读。深入分析移民趋势，帮助您了解最新的移民动态和申请策略。',
    keywords: '加拿大移民资讯,移民政策,移民新闻,移民动态,移民指南',
    url: 'https://oxec-immigration.manus.space/blog'
  },

  // 成功案例
  successCases: {
    title: '加拿大移民成功案例 | 真实移民故事 | OXEC',
    description: 'OXEC真实移民成功案例展示。数百个成功的移民申请故事，涵盖技术移民、商业移民、家庭团聚等多个项目。了解成功申请者的经验和策略。',
    keywords: '移民成功案例,移民申请成功,加拿大移民经验,成功故事',
    url: 'https://oxec-immigration.manus.space/success-cases'
  },

  // 关于我们
  about: {
    title: '关于OXEC | 专业移民律师团队 | 加拿大移民咨询',
    description: 'OXEC移民事务所是加拿大领先的移民咨询机构。拥有资深移民律师和顾问团队，专业处理各类移民申请。20年行业经验，成功率业界领先。',
    keywords: 'OXEC移民事务所,移民律师,移民咨询公司,专业移民团队',
    url: 'https://oxec-immigration.manus.space/about'
  },

  // 团队
  team: {
    title: 'OXEC专业团队 | 资深移民律师 | 移民顾问',
    description: '认识OXEC的专业团队。我们的移民律师和顾问拥有丰富的行业经验和成功案例。为您提供最专业的移民咨询服务。',
    keywords: '移民律师,移民顾问,OXEC团队,专业顾问',
    url: 'https://oxec-immigration.manus.space/team'
  },

  // 预约咨询
  booking: {
    title: '免费移民咨询 | 预约评估 | OXEC',
    description: '预约OXEC的免费移民咨询和评估服务。我们的专家将为您分析移民资格，制定个性化的申请方案。立即预约，开启您的移民之旅。',
    keywords: '免费咨询,移民评估,预约咨询,移民申请',
    url: 'https://oxec-immigration.manus.space/booking'
  },

  // 服务条款
  termOfService: {
    title: '服务条款 | OXEC移民事务所',
    description: 'OXEC移民事务所的服务条款和使用协议。了解我们的服务范围、收费标准和客户权益保护政策。',
    keywords: '服务条款,使用协议,服务范围',
    url: 'https://oxec-immigration.manus.space/term-of-service'
  },

  // 使用条款
  termOfUse: {
    title: '使用条款 | OXEC移民事务所',
    description: 'OXEC网站的使用条款和隐私政策。保护您的个人信息，了解我们如何收集和使用您的数据。',
    keywords: '使用条款,隐私政策,个人信息保护',
    url: 'https://oxec-immigration.manus.space/term-of-use'
  }
};

/**
 * 根据路由路径获取对应的Meta标签配置
 */
export function getMetaTagsByPath(pathname: string): MetaTagConfig | null {
  // 移除末尾的斜杠
  const path = pathname.replace(/\/$/, '') || '/';

  // 映射路由到Meta标签配置
  const routeMap: Record<string, string> = {
    '/': 'home',
    '/skillworker': 'skillworker',
    '/businessclass': 'businessclass',
    '/familyclass': 'familyclass',
    '/prcard': 'prcard',
    '/reconsideration': 'reconsideration',
    '/calculator': 'calculator',
    '/fsw-calculator': 'fswCalculator',
    '/clb-translator': 'clbTranslator',
    '/bccalculator': 'bcCalculator',
    '/blog': 'blog',
    '/success-cases': 'successCases',
    '/about': 'about',
    '/team': 'team',
    '/booking': 'booking',
    '/term-of-service': 'termOfService',
    '/term-of-use': 'termOfUse'
  };

  const configKey = routeMap[path];
  return configKey ? pageMetaTags[configKey] : null;
}

/**
 * 在组件中使用的Hook（如果使用React）
 */
export function useMetaTags(config: MetaTagConfig): void {
  if (typeof window !== 'undefined') {
    updateMetaTags(config);
  }
}
