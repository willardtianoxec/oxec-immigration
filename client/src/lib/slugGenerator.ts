/**
 * 将中文文本转换为拼音
 * 使用简单的拼音映射表
 */
function chineseToPinyin(text: string): string {
  const pinyinMap: { [key: string]: string } = {
    '中': 'zhong', '国': 'guo', '文': 'wen', '章': 'zhang', '标': 'biao',
    '题': 'ti', '详': 'xiang', '说': 'shuo', '拒': 'ju', '签': 'qian',
    '史': 'shi', '移': 'yi', '民': 'min', '申': 'shen', '请': 'qing',
    '加': 'jia', '拿': 'na', '大': 'da', '成': 'cheng', '功': 'gong',
    '案': 'an', '例': 'li', '技': 'ji', '术': 'shu', '工': 'gong',
    '作': 'zuo', '证': 'zheng', '家': 'jia', '庭': 'ting',
    '团': 'tuan', '聚': 'ju', '枫': 'feng', '叶': 'ye', '卡': 'ka',
    '续': 'xu', '临': 'lin', '时': 'shi', '居': 'ju',
    '公': 'gong', '入': 'ru', '籍': 'ji',
    '程': 'cheng', '序': 'xu', '正': 'zheng', '信': 'xin',
  };

  let result = '';
  for (let char of text) {
    if (pinyinMap[char]) {
      result += pinyinMap[char];
    } else if (/[a-zA-Z0-9]/.test(char)) {
      result += char.toLowerCase();
    }
  }
  return result;
}

/**
 * 生成URL Slug
 * 支持中文转拼音或生成随机代码
 */
export function generateSlug(title: string, useTranslation: boolean = true): string {
  if (!title.trim()) {
    return generateRandomSlug();
  }

  let slug: string;

  if (useTranslation) {
    // 尝试转换为拼音
    slug = chineseToPinyin(title);
    
    // 如果转换结果为空或太短，生成随机slug
    if (!slug || slug.length < 3) {
      slug = generateRandomSlug();
    }
  } else {
    slug = generateRandomSlug();
  }

  // 清理slug：移除特殊字符，用连字符连接单词
  slug = slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格转连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .replace(/^-+|-+$/g, ''); // 移除首尾连字符

  return slug || generateRandomSlug();
}

/**
 * 生成随机slug
 * 格式：post-{随机字符串}
 */
export function generateRandomSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'post-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 验证slug是否有效
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 3;
}
