import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Footer } from '@/components/Footer';

export default function Temporary() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('study');

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
    { id: 'family-stay', label: isEnglish ? 'Spousal & Family' : '陪读与家庭' },
    { id: 'visitor', label: isEnglish ? 'Visitor Visa' : '探亲旅游' },
    { id: 'super-visa', label: isEnglish ? 'Super Visa' : '父母超级签证' },
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

  // Scroll spy: detect which section is in view
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
  }, []);

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

      {/* Navigation Bar - Sticky */}
      <nav className="sticky top-0 z-40 bg-white border-b border-border shadow-sm" style={{ height: '55px' }}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          {/* Logo */}
          <Link href="/">
            <img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'space-around', marginLeft: '32px' }}>
            <Link href="/">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{isEnglish ? 'Home' : '首页'}</span>
            </Link>
            <div className="relative group">
              <button
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="flex items-center text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
              >
                {isEnglish ? 'Services' : '服务'}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesDropdownOpen && (
                <div
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-0 w-56 bg-white border border-border rounded-md shadow-lg z-50"
                >
                  {serviceItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-foreground">
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/success-cases">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{isEnglish ? 'Success Cases' : '成功案例'}</span>
            </Link>
            <Link href="/blog">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{isEnglish ? 'Blog' : '博客'}</span>
            </Link>
            <Link href="/team">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{isEnglish ? 'About Us' : '关于我们'}</span>
            </Link>
          </div>

          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
          >
            {isEnglish ? '中文' : 'ENG'}
          </button>

          <Link href="/contact">
            <button className="ml-4 px-4 py-2 bg-white text-primary border border-primary rounded-none hover:bg-gray-50 transition font-medium">
              {isEnglish ? 'Book Now' : '预约咨询'}
            </button>
          </Link>
        </div>
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
                        ? 'Canada is renowned globally for its high-quality public education system and safe, inclusive social environment.\n\n• Youth Education: Beautiful natural surroundings and multicultural atmosphere are ideal for adolescent physical and mental health development and comprehensive quality cultivation.\n\n• Adult International Students: Studying abroad is not just about acquiring knowledge—it\'s a \'royal pathway\' to Canadian immigration. By obtaining local credentials and work experience, you can significantly enhance your success rate in Provincial Nomination Programs (PNP) and Federal Express Entry (EE).'
                        : '加拿大以其高质量的公立教育体系和安全包容的社会环境享誉全球。\n\n• 青少年教育：优美的自然环境与多元文化氛围，极利于青少年的身心健康成长与综合素质培养。\n\n• 成年留学生：留学不仅是获取知识，更是通往加拿大移民的\'王道路径\'，通过获取本地学历与工作经验，可大幅提升省提名（PNP）及联邦快速通道（EE）的成功率。'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg"
                      alt="Study Abroad"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 2: Spousal & Family */}
              <section id="family-stay" className="mb-12 pb-12 border-b border-gray-200">
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
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {isEnglish
                        ? 'Affected by policy adjustments in recent years, Canada has introduced a total quota system for study permit applications. Most college and undergraduate applicants must now obtain a Provincial Attestation Letter (PAL) or, in Quebec, a TA (Attestation d\'acceptation québécoise) to submit their applications. The OXEC team stays abreast of the latest policy developments and helps students seize opportunities in the competitive application landscape.'
                        : '受近两年政策调整影响，加拿大对学签申请引入了总量配额制。大多数大专及本科申请人现在必须获得省证明信 (Provincial Attestation Letter, PAL) 或在魁北克省获得 TA 才能递交申请。傲赛（OXEC）团队紧跟最新政策动态，协助学生在名额竞争中抢占先机。'}
                    </p>
                  </div>
                  <div className="md:order-1" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg"
                      alt="Spousal & Family"
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
                        ? 'Visitor visas (TRV) may seem straightforward, but the document logic is extremely critical.\n\n• Key Documents: Include detailed travel plans, proof of funds, and proof of ties to your home country.\n\n• Professional Reminder: Never entrust a \'tourist visa\' to unqualified intermediaries due to its seemingly low threshold. If material logic conflicts or false information leads to misrepresentation, you face a 5-year entry ban.'
                        : '访问签证（TRV）看似简单，实则材料逻辑极其重要。\n\n• 核心材料：包括详细的旅行计划、资金证明、国内束缚力证明等。\n\n• 专业提醒：切勿因\'旅游签\'看似门槛低而交由不合资质的中介代办。一旦因材料逻辑冲突或信息不实导致虚假陈述 (Misrepresentation)，将面临 5 年入境禁令。'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg"
                      alt="Visitor Visa"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Super Visa - CTA Section */}
              <section id="super-visa" className="mb-12 pb-12 border-b border-gray-200">
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
                        ? '• Spousal Open Work Permit (SOWP): Eligible spouses of qualified international students can apply for an open work permit. This policy allows spouses to work legally in Canada, easing financial pressure while accumulating valuable local work experience.\n\n• Parental Accompaniment and Visitor Record: For parents accompanying minor children studying in Canada, a Visitor Record (VR) is essential for maintaining legal residency status and ensuring continuous companionship. Applications must demonstrate sufficient financial support and genuine intent to accompany.'
                        : '• 配偶开放工签 (SOWP)：介绍符合资质的留学生配偶如何申请开放式工签。这一政策允许配偶在加拿大合法工作，分担家庭经济压力的同时积累本地工作经验。\n\n• 父母陪读与 Visitor Record：对于长期陪伴未成年子女在加读书的父母，VR 是维持合法居留身份、确保持续陪伴的关键文件。申请时需证明充足的资金支持及真实的陪读意图。'}
                    </p>
                  </div>
                  <div className="md:order-1" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg"
                      alt="Spousal & Family"
                      className="w-full h-auto"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 5: Super Visa - CTA Section */}
              <section id="super-visa" className="text-center">
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
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {isEnglish
                    ? 'The Super Visa is designed specifically for parents and grandparents of Canadian citizens or permanent residents. Its advantages include: Extended Stay—single entry allows stays of up to 5 years. No Frequent Renewals—eliminates the need for frequent visa renewals. Ideal for Family Reunion—the perfect choice for long-term family reunification and multigenerational bonding.'
                    : '超级签证是专为加拿大公民或永久居民的父母及祖父母设计的。其优势在于单次入境停留时间最长可达 5 年，且无需频繁办理续签，是家庭长久团聚的理想选择。'}
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {isEnglish ? 'Start Your Canadian Visa Application' : '开始您的加拿大签证申请'}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {isEnglish ? 'Let us help you avoid risks and smoothly obtain Canadian entry eligibility' : '让为您规避风险，顺利取得加拿大入境资格'}
                  </p>
                </div>
                <Link href="/contact">
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
