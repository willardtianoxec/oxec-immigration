import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Temporary() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('study');
  const isEnglish = language === 'en';

  const serviceItems = [
    { label: "投资移民", href: "/businessclass" },
    { label: "家庭团聚移民", href: "/familyclass" },
    { label: "枫叶卡续签与加急", href: "/prcard" },
    { label: "拒签与程序公正信", href: "/reconsideration" },
    { label: "留学与访问", href: "/temporary" },
    { label: "技术移民", href: "/skillworker" },
    { label: "公民入籍", href: "/citizenship" },
  ];

  const sidebarMenuItems = [
    { id: 'study', label: isEnglish ? 'Study Abroad' : '留学申请' },
    { id: 'pal', label: isEnglish ? 'Study Quotas & PAL' : '留学配额与省证明信' },
    { id: 'visitor', label: isEnglish ? 'Visitor Visa' : '探亲与旅游' },
    { id: 'spousal', label: isEnglish ? 'Spousal & Family' : '配偶工签与家长陪读' },
    { id: 'super-visa', label: isEnglish ? 'Super Visa' : '父母超级签证' },
    { id: 'consultation', label: isEnglish ? 'Book Consultation' : '预约咨询' },
  ];



  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 75,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarMenuItems.map(item => item.id);
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarMenuItems]);

  return (
    <div 
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* Navigation Bar - Sticky (Complete Copy from Home) */}
      <nav className="sticky top-0 z-40 bg-white border-b border-border shadow-sm" style={{height: '55px'}}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          {/* Logo */}
          <Link href="/">
            <img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} />
          </Link>

          {/* Desktop Menu - Single Unified Navigation Group */}
          <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'space-around', marginLeft: '32px' }}>
            <Link href="/">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.home")}</span>
            </Link>
            <div className="relative group">
              <button
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="flex items-center text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
              >
                {t("nav.services")}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesDropdownOpen && (
                <div
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-0 w-56 bg-white border border-border rounded-md shadow-lg z-50"
                >
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span className="block px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer first:rounded-t-md last:rounded-b-md">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/success-cases">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.success_cases")}</span>
            </Link>
            <Link href="/blog">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.blog")}</span>
            </Link>
            <Link href="/team">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.about")}</span>
            </Link>
            <button
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              {language === "en" ? "中文" : "ENG"}
            </button>
            <Link href="/contact">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <span>{t("nav.contact")}</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container py-4 space-y-3">
              <Link href="/">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">{t("nav.home")}</span>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2 flex items-center justify-between"
                >
                  {t("nav.services")}
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="bg-gray-50 rounded-md mt-2 py-2 pl-4">
                    {serviceItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span className="block px-2 py-2 text-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/success-cases">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">{t("nav.success_cases")}</span>
              </Link>
              <Link href="/blog">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">{t("nav.blog")}</span>
              </Link>
              <Link href="/team">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">{t("nav.about")}</span>
              </Link>
              <button
                onClick={() => setLanguage(language === "en" ? "zh" : "en")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2"
              >
                {language === "en" ? "中文" : "ENG"}
              </button>
              <Link href="/contact">
                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                  <span>{t("nav.contact")}</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex relative" style={{ minHeight: 'calc(100vh - 55px)' }}>
        {/* Left Sidebar Navigation - Dark Slate, Sticky */}
        <aside 
          className="hidden md:flex flex-col sticky"
          style={{
            width: '240px',
            top: '55px',
            backgroundColor: '#1E293B',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            height: 'fit-content',
            zIndex: 30,
            maxHeight: 'calc(100vh - 55px)',
            overflowY: 'auto',
          }}
        >
          {/* Sidebar Content */}
          <nav className="p-6 space-y-2">
            <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-wider opacity-70">
              {isEnglish ? 'Navigation' : '导航菜单'}
            </h3>
            
            {sidebarMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 transition-all duration-200 relative group text-sm font-medium"
                style={{
                  backgroundColor: activeSection === item.id ? '#334155' : 'transparent',
                  color: activeSection === item.id ? '#FFFFFF' : '#CBD5E1',
                }}
              >
                {/* Blue indicator bar for active item */}
                {activeSection === item.id && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: '#0061FF' }}
                  />
                )}
                <span className="block ml-2">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content Area - Flex 1 to expand */}
        <main className="flex-1 flex flex-col" style={{ marginRight: '20px' }}>
          {/* Content Wrapper with padding */}
          <div className="flex-1 py-12 px-4 md:px-8">
            {/* Single Frosted Glass Container - All Content Inside */}
            <div
              className="w-full mx-auto p-8 md:p-12 shadow-lg"
              style={{
                maxWidth: '1400px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.2), 0 20px 50px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Section 1: Study Abroad */}
              <section id="study" className="mb-12 pb-12 border-b border-gray-200">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h2 
                      className="text-foreground mb-6"
                      style={{
                        fontFamily: '"Alibaba PuHuiTi", sans-serif',
                        fontSize: 'clamp(32px, 8vw, 48px)',
                        fontWeight: 900,
                        lineHeight: 1.2,
                      }}
                    >
                      {isEnglish
                        ? 'Study in Canada'
                        : '留学加拿大'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {isEnglish
                        ? 'Canada is renowned globally for its high-quality public education system and safe, inclusive social environment.\n\nCanada offers adolescents a beautiful natural environment and multicultural atmosphere, conducive to healthy physical and mental development and comprehensive quality cultivation.\n\nCanada also offers ambitious adult international students an opportunity to transform their life trajectory. Studying abroad is not just about acquiring knowledge—it\'s a \'royal pathway\' to Canadian immigration. By obtaining local credentials and work experience, you can significantly enhance your success rate in Provincial Nomination Programs (PNP) and Federal Express Entry (EE).\n\nWe will assist and guide you in handling complex study permits, avoiding refusal risks, and planning your entire study phase for immigration compliance.'
                        : '加拿大以其高质量的公立教育体系和安全包容的社会环境享誉全球。\n\n在优美的自然环境与多元文化氛围中，加拿大不仅有利于青少年的身心健康成长与综合素质培养，更帮助孩子们发现自我、找到未来的人生目标。\n\n对于有志于转换人生赛道的成年留学生，留学不仅是更新知识体系的机会，更是一条移民加拿大的"王道路径"。通过获取本地学历与工作经验，可大幅提升省提名（PNP）及联邦快速通道（EE）的成功率。\n\n我们将协助您处理复杂的学签申请，并帮助您规避拒签风险、详细规划整个学习阶段的身份合规。'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="/images/oxecimm-temporary-study-abroad-1771884109783-opt.webp"
                      alt="Study Abroad"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 2: Study Quotas & PAL */}
              <section id="pal" className="mb-12 pb-12 border-b border-gray-200">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="md:order-2">
                    <h2 
                      className="text-foreground mb-6"
                      style={{
                        fontFamily: '"Alibaba PuHuiTi", sans-serif',
                        fontSize: 'clamp(32px, 8vw, 48px)',
                        fontWeight: 900,
                        lineHeight: 1.2,
                      }}
                    >
                      {isEnglish
                        ? 'Study Quotas and Provincial Attestation Letters (PAL)'
                        : '留学配额与省证明信 (PAL)'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {isEnglish
                        ? 'Affected by policy adjustments in recent years, Canada has introduced a total quota system for study permit applications.\n\nMost college and undergraduate applicants must now obtain a Provincial Attestation Letter (PAL) or, in Quebec, a TA (Tableau d\'Attestation) to submit their applications.\n\nThe OXEC team stays abreast of the latest policy developments and will assist you in obtaining relevant certifications from your school to ensure smooth study permit approval.'
                        : '受政策调整影响，加拿大对学签申请引入了总量配额制。\n\n大多数大专及本科申请人现在必须获得省证明信 (Provincial Attestation Letter, PAL) 或在魁北克省获得 TA（Tableau d\'Attestation）才能递交申请。\n\n傲赛团队紧跟最新政策动态，会协助您向学校申请相关证明以保证学签的顺利审批通过。'}
                    </p>
                  </div>
                  <div className="md:order-1" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="/images/bbp-ubco-teaching-and-learning-centre-1771884876305-opt.webp"
                      alt="Study Quotas & PAL"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 3: Visitor Visa */}
              <section id="visitor" className="mb-12 pb-12 border-b border-gray-200">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h2 
                      className="text-foreground mb-6"
                      style={{
                        fontFamily: '"Alibaba PuHuiTi", sans-serif',
                        fontSize: 'clamp(32px, 8vw, 48px)',
                        fontWeight: 900,
                        lineHeight: 1.2,
                      }}
                    >
                      {isEnglish
                        ? 'Visitor Visa'
                        : '探亲与旅游'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {isEnglish
                        ? 'Family visits and tourism in the Canadian immigration context both require applying for a Temporary Resident Visa (TRV). Although it\'s only a short-term visit, this type of visa application is not simple and must strictly comply with immigration review requirements. Core materials must demonstrate travel plans, proof of funds, and domestic ties.\n\nNever entrust a \'tourist visa\' to unqualified intermediaries due to its seemingly low threshold. Once submitted, your application materials are permanently retained in your immigration record. If material logic conflicts or false information leads to misrepresentation, you face a 5-year entry ban.\n\nThe OXEC team upholds professional service standards and carefully handles each application case to help you maintain a good immigration application record.'
                        : '探亲和旅游在加拿大移民语境中申请的都是临时访问签证（Temporary Resident Visa， TRV）。尽管只是短期访问，该类签证申请也并不简单，需要严格符合移民审查的要求。核心材料需要举证旅行计划、资金证明、国内束缚力等。\n\n切勿因"旅游签"看似门槛低而交由不合资质的中介代办。申请材料一经递交将永久保留在您的申请记录中，一旦因材料逻辑冲突或信息不实导致虚假陈述 (Misrepresentation)，将面临 5 年入境禁令。\n\n傲赛团队秉承专业的服务精神，会谨慎处理每一个申请案件，帮助您维护良好的移民申请记录。'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="/images/oxecimm-temporary-visitor-visa-1771884096038-opt.webp"
                      alt="Visitor Visa"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Spousal Work Permits and Family Accompaniment */}
              <section id="spousal" className="mb-12 pb-12 border-b border-gray-200">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="md:order-2">
                    <h2 
                      className="text-foreground mb-6"
                      style={{
                        fontFamily: '"Alibaba PuHuiTi", sans-serif',
                        fontSize: 'clamp(32px, 8vw, 48px)',
                        fontWeight: 900,
                        lineHeight: 1.2,
                      }}
                    >
                      {isEnglish
                        ? 'Spousal Work Permits and Family Accompaniment'
                        : '配偶工签与家长陪读'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {isEnglish
                        ? 'Spousal Open Work Permit (SOWP): This visa allows certain study permit and work permit holders\' spouses to work legally in Canada, effectively easing family financial pressure while accumulating key local work experience for potential future immigration planning.\n\nParental Accompaniment and Visitor Record: For parents accompanying minor children studying in Canada, a Visitor Record (VR) is essential for maintaining legal residency status and ensuring continuous companionship. The focus of VR applications is to demonstrate to immigration officers sufficient financial reserves and clear, genuine intent to accompany.'
                        : '配偶开放工签 (SOWP)：该签证允许部分学签和工签持有人的配偶在加拿大境内合法受雇，在有效分担家庭经济压力的同时，更是为未来可能的身份规划积累关键的本地工作经验。\n\n父母陪读与 Visitor Record：对于长期陪伴未成年子女在加读书的父母，VR 是维持合法居留身份、确保持续陪伴的关键文件。VR 的申请重心在于向移民官举证充足的资金储备及明确、真实的陪读意图。'}
                    </p>
                  </div>
                  <div className="md:order-1" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="/images/oxecimm-temporary-spousal-work-1771884118306-opt.webp"
                      alt="Spousal & Family"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 5: Super Visa */}
              <section id="super-visa" className="mb-12 pb-12 border-b border-gray-200">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h2 
                      className="text-foreground mb-6"
                      style={{
                        fontFamily: '"Alibaba PuHuiTi", sans-serif',
                        fontSize: 'clamp(32px, 8vw, 48px)',
                        fontWeight: 900,
                        lineHeight: 1.2,
                      }}
                    >
                      {isEnglish
                        ? 'Parent & Grandparent Super Visa'
                        : '父母超级签证'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                      {isEnglish
                        ? 'The Super Visa is a long-term residency solution tailored specifically for parents and grandparents of Canadian citizens or permanent residents. Compared to regular visitor visas, its core advantages include: single entry allows stays of up to 5 years, and no need for frequent status renewals (Visitor Record) during the validity period—the ideal choice for long-term family reunification.\n\nHowever, the Super Visa application threshold is significantly higher than regular tourist visas. Beyond routine "domestic ties" review, immigration authorities have strict minimum income requirements for sponsors (LICO), and applicants must hold recognized Canadian health insurance.\n\nSince the Super Visa involves longer-term residency arrangements, immigration officers conduct in-depth scrutiny of applicants\' health status and financial sustainability. We will help you precisely calculate sponsorship funds, interpret insurance terms, and optimize application logic to ensure this "family bond" is robustly approved within the legal framework, avoiding refusal records due to material defects.'
                        : '超级签证是为加拿大公民或永久居民的父母及祖父母量身定制的长期居住方案。相较于普通访问签证，其核心优势在于单次入境停留时间最长可达 5 年，且在有效期内无需频繁办理身份续签（Visitor Record），是实现家庭长久团聚的理想选择。\n\n然而，超级签证的申请门槛远高于普通旅游签。除了常规的"国内束缚力"审查外，移民局对邀请人的家庭年收入有严格的最低标准限制（LICO），且要求申请人必须持有受认可的加拿大医疗保险。\n\n由于超级签证涉及更长周期的居留安排，移民官会对申请人的健康状况及财务可持续性进行深度穿透式审查。我们会协助您精准核算担保金、解读保险条款并优化申请逻辑，确保这份"亲情纽带"在法律框架下稳健获批，避免因材料瑕疵留下拒签记录。'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="/images/oxecimm-temporary-super-visa-1771884173248-opt.webp"
                      alt="Super Visa"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 6: Consultation CTA - Separate Section */}
              <section id="consultation" className="text-center">
                <h2 
                  className="text-foreground mb-6"
                  style={{
                    fontFamily: '"Alibaba PuHuiTi", sans-serif',
                    fontSize: 'clamp(32px, 8vw, 48px)',
                    fontWeight: 900,
                    lineHeight: 1.2,
                  }}
                >
                  {isEnglish
                    ? 'Start Your Canadian Visa Application'
                    : '开始您的加拿大签证申请'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {isEnglish
                    ? 'Let us help you avoid risks and smoothly obtain Canadian entry eligibility'
                    : '让我们为您规避风险，顺利取得加拿大入境资格'}
                </p>
                <Link href="/booking">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                    {isEnglish ? 'Book Consultation Now' : '立即预约咨询'}
                  </Button>
                </Link>
              </section>
            </div>

            {/* Bottom spacing to prevent Footer overlap */}
            <div style={{ height: '60px' }} />
          </div>
        </main>
      </div>

      {/* Footer - Full Width, Direct Child of Body */}
      <Footer />
    </div>
  );
}
