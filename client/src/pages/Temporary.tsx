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
                        ? 'Study Abroad: Open the Door to Canadian Education'
                        : '留学申请：开启加拿大教育之门'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {isEnglish
                        ? 'Canada offers world-class education and diverse learning environments. With our professional guidance, you can successfully apply to Canadian high schools, colleges, universities, and graduate programs. We help you plan the best learning path and provide comprehensive support throughout the visa application process.'
                        : '加拿大拥有世界一流的教育体系和多元化的学习环境。通过我们的专业指导，您可以顺利申请加拿大的高中、大专、大学和研究生项目。我们帮助您规划最适合的学习路径，并在签证申请过程中提供全面支持。'}
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
                        ? 'Spousal & Family: Grow Together with Loved Ones'
                        : '陪读与家庭：与亲人一起成长'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {isEnglish
                        ? 'Family reunification is an important part of immigration. Whether you are a student, worker, or permanent resident, we can help your spouse and family members obtain appropriate visas. We provide professional consultation and application support to ensure your family can reunite in Canada.'
                        : '家庭团聚是移民的重要部分。无论您是学生、工作者还是永久居民，我们都可以帮助您的配偶和家庭成员获得相应的签证。我们提供专业的咨询和申请支持，确保您的家庭能够在加拿大团聚。'}
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
                        ? 'Visitor Visa: Explore Canada'
                        : '探亲旅游：畅游加拿大'}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {isEnglish
                        ? 'Visiting Canada is the best way to experience this beautiful country. We provide professional visitor visa application services to help your family and friends obtain visitor visas smoothly. Whether it\'s visiting relatives or tourism, we ensure a smooth application process.'
                        : '访问加拿大是体验这个美丽国家的最好方式。我们提供专业的访问签证申请服务，帮助您的亲友顺利获得访问签证。无论是探亲还是旅游，我们都能确保申请过程顺利进行。'}
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
                    ? 'Super Visa: Bring Your Parents to Visit'
                    : '父母超级签证：让父母安心来访'}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {isEnglish
                    ? 'The Super Visa is a long-term visitor visa designed for parents and grandparents of Canadian citizens and permanent residents. This visa allows your parents to stay in Canada for up to 2 years. We provide complete application guidance to ensure your parents obtain this special visa.'
                    : '超级签证是为加拿大公民和永久居民的父母和祖父母设计的长期访问签证。这个签证允许您的父母在加拿大停留长达2年。我们提供完整的申请指导，确保您的父母能够获得这个特殊的签证。'}
                </p>
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
