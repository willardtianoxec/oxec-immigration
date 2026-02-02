export type Language = 'en' | 'zh';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.success_cases': 'Success Cases',
    'nav.blog': 'Blog',
    'nav.about': 'About Us',
    'nav.contact': 'Book Consultation',
    'nav.book_consultation': 'Book Consultation',

    // Hero Section
    'hero.subtitle': 'We are OXEC Immigration Services',
    'hero.title_part1': 'Professional, Leading, and Trustworthy',
    'hero.title_part2': 'Canadian Immigration Partner',
    'hero.description': 'OXEC Immigration Services Ltd. provides comprehensive immigration consulting services with expert guidance, personalized strategies, and a proven track record of success in helping clients achieve their Canadian dreams.',
    'hero.book_consultation': 'Book Consultation',
    'hero.success_cases': 'Success Cases',
    'hero.calculator': 'Immigration Calculator',

    // Services Section
    'services.title': 'Our Immigration Services',
    'services.subtitle': 'Comprehensive immigration solutions tailored to your unique needs and circumstances',
    'services.pr': 'Investment Immigration',
    'services.pr_desc': 'Professional investment immigration guidance and comprehensive support for entrepreneurs and investors.',
    'services.visa': 'Family Reunification Immigration',
    'services.visa_desc': 'Help family members reunite with complete application assistance and documentation support.',
    'services.citizenship': 'PR Card Renewal & Expedited Processing',
    'services.citizenship_desc': 'Fast processing of permanent resident card renewal and expedited application services.',
    'services.appeals': 'Refusal & Procedural Fairness Letter',
    'services.appeals_desc': 'Handle refusal applications and provide procedural fairness letter services to protect your rights.',
    'services.investment': 'Study & Visitor Visa Applications',
    'services.investment_desc': 'Professional guidance and support for study permit and visitor visa applications.',
    'services.calculator': 'Try Our Immigration Calculator',

    // Success Cases
    'success.title': 'Success Cases',
    'success.subtitle': 'Real stories from our satisfied clients',
    'success.case_type': 'Immigration Category',
    'success.case_background': 'Applicant Background',
    'success.case_outcome': 'Successful Outcome',
    'success.view_all': 'View All Cases',

    // Blog Page
    'blog.title': 'Latest Updates',
    'blog.subtitle': 'Immigration policy analysis and success case studies',
    'blog.category': 'Category',
    'blog.all': 'All Articles',
    'blog.read_more': 'Read More',
    'blog.article_title': 'Immigration Policy Update',
    'blog.article_excerpt': 'Learn about the latest changes in Canadian immigration policy and application requirements.',
    'blog.view_all': 'View All Articles',

    // Footer
    'footer.about': 'About Us',
    'footer.about_desc': 'OXEC Immigration Services is a leading immigration consulting firm in Canada, dedicated to helping clients achieve their Canadian dreams.',
    'footer.services': 'Services',
    'footer.resources': 'Resources',
    'footer.contact': 'Contact Us',
    'footer.address': 'Canada',
    'footer.rights': 'All rights reserved.',

    // Booking Page
    'booking.title': 'Book Consultation',
    'booking.subtitle': 'Please fill out the form below and submit. We will evaluate your needs and contact you by phone to confirm the consultation time.',
    'booking.form_title': 'Appointment Request Form',
    'booking.name': 'Full Name *',
    'booking.email': 'Email Address *',
    'booking.phone': 'Phone Number *',
    'booking.type': 'Consultation Type *',
    'booking.type_phone': 'Phone Consultation',
    'booking.type_inperson': 'In-person Consultation',
    'booking.date': 'Preferred Date',
    'booking.content': 'Additional Information',
    'booking.submit': 'Submit Appointment Request',
    'booking.success': 'Your appointment request has been received. Our professional consultants will contact you within 24 hours.',
    'booking.what_to_expect': 'Service Process',
    'booking.consultation': 'Initial Consultation',
    'booking.before_consultation': 'Preparation Before Initial Consultation',

    // Admin Page
    'admin.title': 'Admin Dashboard',
    'admin.blog': 'Blog Management',
    'admin.cases': 'Success Cases Management',
    'admin.create': 'Create New',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.published': 'Published',
    'admin.draft': 'Draft',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.services': '服务',
    'nav.success_cases': '成功案例',
    'nav.blog': '博客',
    'nav.about': '关于我们',
    'nav.contact': '预约咨询',
    'nav.book_consultation': '预约咨询',

    // Hero Section
    'hero.subtitle': '我们是傲赛（OXEC）移民事务所',
    'hero.title_part1': '专业、领先、值得信赖的',
    'hero.title_part2': '加拿大移民合作伙伴',
    'hero.description': 'OXEC移民事务所提供全面的移民咨询服务，拥有专家指导、个性化策略和成功帮助客户实现加拿大梦想的良好记录。',
    'hero.book_consultation': '预约咨询',
    'hero.success_cases': '成功案例',
    'hero.calculator': '移民算分工具',

    // Services Section
    'services.title': '我们的移民服务',
    'services.subtitle': '根据您的独特需求和情况量身定制的全面移民解决方案',
    'services.pr': '投资移民',
    'services.pr_desc': '为企业家和投资者提供专业的投资移民指导和全面支持。',
    'services.visa': '家庭团聚移民',
    'services.visa_desc': '帮助家庭成员团聚，提供完整的申请协助和文件支持。',
    'services.citizenship': '枫叶卡续签与加急',
    'services.citizenship_desc': '快速处理永久居民卡续签和加急申请服务。',
    'services.appeals': '拒签与程序公证信',
    'services.appeals_desc': '处理拒签申请和提供程序公证信服务，维护您的权益。',
    'services.investment': '留学与访问申请',
    'services.investment_desc': '提供留学签证和访问签证申请的专业指导和支持。',
    'services.calculator': '尝试我们的移民算分工具',

    // Success Cases
    'success.title': '成功案例',
    'success.subtitle': '来自我们满意客户的真实故事',
    'success.case_type': '移民类别',
    'success.case_background': '申请人背景',
    'success.case_outcome': '成功结果',
    'success.view_all': '查看所有案例',

    // Blog Page
    'blog.title': '最新资讯',
    'blog.subtitle': '移民政策解读和成功案例分享',
    'blog.category': '分类',
    'blog.all': '所有文章',
    'blog.read_more': '阅读更多',
    'blog.article_title': '移民政策更新',
    'blog.article_excerpt': '了解最新的加拿大移民政策变化和申请要求。',
    'blog.view_all': '查看所有文章',

    // Footer
    'footer.about': '关于我们',
    'footer.about_desc': 'OXEC移民事务所是加拿大领先的移民咨询公司，致力于帮助客户实现加拿大梦想。',
    'footer.services': '服务',
    'footer.resources': '资源',
    'footer.contact': '联系我们',
    'footer.address': '加拿大',
    'footer.rights': '版权所有。',

    // Booking Page
    'booking.title': '预约咨询',
    'booking.subtitle': '请准确填写以下表单并提交，我们将在最短时间内评估您的需求，然后电话联系您确认面谈时间',
    'booking.form_title': '预约申请表',
    'booking.name': '客户名称 *',
    'booking.email': '电子邮件 *',
    'booking.phone': '联系电话 *',
    'booking.type': '预约事项 *',
    'booking.type_phone': '电话咨询',
    'booking.type_inperson': '线下咨询',
    'booking.date': '预计咨询时间',
    'booking.content': '需求说明',
    'booking.submit': '提交预约申请',
    'booking.success': '您的预约申请已收到，我们的专业顾问将在24小时内与您联系。',
    'booking.what_to_expect': '服务流程',
    'booking.consultation': '首次咨询',
    'booking.before_consultation': '初次咨询前的准备',

    // Admin Page
    'admin.title': '管理员仪表板',
    'admin.blog': '博客管理',
    'admin.cases': '成功案例管理',
    'admin.create': '创建新项目',
    'admin.edit': '编辑',
    'admin.delete': '删除',
    'admin.published': '已发布',
    'admin.draft': '草稿',
  },
};

export function getTranslation(language: Language, key: string): string {
  return translations[language]?.[key] || key;
}

export const t = translations;
