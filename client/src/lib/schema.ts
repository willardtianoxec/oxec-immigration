/**
 * Schema.org结构化数据生成工具
 * 用于生成JSON-LD格式的结构化数据，提高SEO效果
 */

export interface SchemaConfig {
  type: 'Organization' | 'LocalBusiness' | 'Article' | 'FAQPage' | 'BreadcrumbList';
  [key: string]: any;
}

/**
 * 生成Organization Schema
 * 用于首页和公司信息页面
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OXEC Immigration Services Ltd.',
    alternateName: 'OXEC移民事务所',
    url: 'https://oxec-immigration.manus.space',
    logo: 'https://oxec-immigration.manus.space/logo.png',
    description: 'OXEC移民事务所提供全面的加拿大移民咨询服务，拥有专家指导、个性化策略和成功帮助客户实现加拿大梦想的良好记录。',
    sameAs: [
      'https://www.linkedin.com/company/oxec-immigration',
      'https://www.facebook.com/oxecimmigration',
      'https://www.wechat.com/oxecimmigration'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-236-521-5115',
      contactType: 'Customer Service',
      email: 'business@oxecimm.com',
      areaServed: 'CA',
      availableLanguage: ['en', 'zh']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4710 Kingsway, MetroTower 1',
      addressLocality: 'Burnaby',
      addressRegion: 'BC',
      postalCode: 'V5H 4M2',
      addressCountry: 'CA'
    },
    founder: {
      '@type': 'Person',
      name: 'OXEC Team'
    },
    foundingDate: '2015',
    areaServed: {
      '@type': 'Country',
      name: 'Canada'
    }
  };
}

/**
 * 生成LocalBusiness Schema
 * 用于本地商业信息
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'OXEC Immigration Services Ltd.',
    image: 'https://oxec-immigration.manus.space/logo.png',
    description: '加拿大移民咨询服务提供商',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4710 Kingsway, MetroTower 1',
      addressLocality: 'Burnaby',
      addressRegion: 'BC',
      postalCode: 'V5H 4M2',
      addressCountry: 'CA'
    },
    telephone: '+1-236-521-5115',
    url: 'https://oxec-immigration.manus.space',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '16:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '4'
    }
  };
}

/**
 * 生成Article Schema
 * 用于博客文章和成功案例
 */
export function generateArticleSchema(config: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: config.title,
    description: config.description,
    image: config.image,
    datePublished: config.datePublished,
    dateModified: config.dateModified,
    author: {
      '@type': 'Organization',
      name: config.author || 'OXEC Immigration Services Ltd.'
    },
    publisher: {
      '@type': 'Organization',
      name: 'OXEC Immigration Services Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://oxec-immigration.manus.space/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.url
    }
  };
}

/**
 * 生成FAQPage Schema
 * 用于常见问题页面
 */
export function generateFAQPageSchema(faqs: Array<{
  question: string;
  answer: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * 生成BreadcrumbList Schema
 * 用于面包屑导航
 */
export function generateBreadcrumbSchema(items: Array<{
  name: string;
  url: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * 生成Product/Service Schema
 * 用于服务页面
 */
export function generateServiceSchema(config: {
  name: string;
  description: string;
  image: string;
  url: string;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.name,
    description: config.description,
    image: config.image,
    url: config.url,
    provider: {
      '@type': 'Organization',
      name: 'OXEC Immigration Services Ltd.',
      url: 'https://oxec-immigration.manus.space'
    },
    ...(config.priceRange && { priceRange: config.priceRange })
  };
}

/**
 * 在HTML head中插入JSON-LD脚本
 */
export function injectSchemaScript(schema: any) {
  if (typeof document === 'undefined') return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * 生成完整的Schema脚本标签HTML
 */
export function generateSchemaScriptTag(schema: any): string {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
