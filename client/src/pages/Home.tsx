import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DotMatrixWorldMap from "@/components/DotMatrixWorldMap";
import { Footer } from "@/components/Footer";
import { GoogleReviewsPreview } from "@/components/GoogleReviewsPreview";
import { LatestArticlesSection } from "@/components/LatestArticlesSection";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [location] = useLocation();

  const serviceItems = [
    { label: "投资移民", href: "/businessclass" },
    { label: "家庭团聚移民", href: "/familyclass" },
    { label: "枫叶卡续签与加急", href: "/prcard" },
    { label: "拒签与程序公正信", href: "/reconsideration" },
    { label: "留学与访问", href: "/temporary" },
    { label: "技术移民", href: "/skillworker" },
    { label: "公民入籍", href: "/citizenship" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm" style={{height: '55px'}}>
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
            <Link href="/booking">
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
              <Link href="/booking">
                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                  <span>{t("nav.contact")}</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Split Hero Section - Fixed Height 560px */}
      <section className="relative w-full overflow-hidden bg-background flex flex-col lg:flex-row" style={{height: '560px'}}>
        {/* Left: Image - Full Height, No Padding */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 flex items-center justify-center" style={{height: '100%'}}>
          <img
            src="/hero-canadian.jpg"
            alt="Canadian Immigration - Flag and Parliament"
            className="w-full h-full object-cover" style={{display: 'flex'}}
          />
        </div>

        {/* Right: Content - Deep Blue Background */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex items-center justify-center p-8 lg:p-16 relative z-10" style={{ backgroundColor: "#335577", height: '100%' }}>
          <div className="space-y-6 w-full max-w-lg">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
              {t('hero.subtitle')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontWeight: 900, color: "#ffffff" }}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{t("hero.title_part1")}</span>
              <span className="block mt-2" style={{ color: "#ffffff" }}>
                {t("hero.title_part2")}
              </span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#ffffff" }}>
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/booking">
                <Button asChild size="lg" className="text-lg px-8 rounded-none" style={{ backgroundColor: "#ffffff", color: "#335577" }}>
                  <span>
                    {t("hero.book_consultation")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </Link>
              <Link href="/success-cases">
                <Button asChild size="lg" className="text-lg px-8 rounded-none" style={{ backgroundColor: "transparent", color: "#ffffff", border: "2px solid #ffffff" }}>
                  <span>查看案例</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Standardized Spacing */}
      <section className="relative z-20 w-full bg-background" style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-bold text-foreground mb-4" style={{ fontFamily: '"Alibaba PuHuiTi", "Noto Sans SC", sans-serif', fontSize: '48px', fontWeight: 900 }}>我们的移民服务</h2>
            <p className="text-lg text-muted-foreground">{t("services.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Service 1: Investment Immigration */}
            <Link href="/businessclass">
              <div className="group relative overflow-hidden bg-white border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{borderRadius: '0px'}}>
                <div className="relative h-40 overflow-hidden">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/fgGPQFerLMkuAdRf.jpg" alt="Investment Immigration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 text-center">{t("services.pr")}</h3>
                  <p className="text-muted-foreground text-sm text-center">{t("services.pr_desc")}</p>
                </div>
              </div>
            </Link>

            {/* Service 2: Family Reunification */}
            <Link href="/familyclass">
              <div className="group relative overflow-hidden bg-white border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{borderRadius: '0px'}}>
                <div className="relative h-40 overflow-hidden">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/KhxxYEppSEUjeQkQ.jpg" alt="Family Reunification" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 text-center">{t("services.visa")}</h3>
                  <p className="text-muted-foreground text-sm text-center">{t("services.visa_desc")}</p>
                </div>
              </div>
            </Link>

            {/* Service 3: PR Card Renewal */}
            <Link href="/prcard">
              <div className="group relative overflow-hidden bg-white border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{borderRadius: '0px'}}>
                <div className="relative h-40 overflow-hidden">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/rvJWecgriFmwUjBk.jpg" alt="PR Card Renewal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 text-center">{t("services.citizenship")}</h3>
                  <p className="text-muted-foreground text-sm text-center">{t("services.citizenship_desc")}</p>
                </div>
              </div>
            </Link>

            {/* Service 4: Refusal & Procedural Fairness */}
            <Link href="/reconsideration">
              <div className="group relative overflow-hidden bg-white border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{borderRadius: '0px'}}>
                <div className="relative h-40 overflow-hidden">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/VgBXmJUHhJeMKVtb.jpg" alt="Refusal & Procedural Fairness" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 text-center">{t("services.appeals")}</h3>
                  <p className="text-muted-foreground text-sm text-center">{t("services.appeals_desc")}</p>
                </div>
              </div>
            </Link>

            {/* Service 5: Study & Visitor */}
            <Link href="/temporary">
              <div className="group relative overflow-hidden bg-white border border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{borderRadius: '0px'}}>
                <div className="relative h-40 overflow-hidden">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/HDGZKfSynBhXiUbR.jpg" alt="Study & Visitor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 text-center">留学与访问</h3>
                  <p className="text-muted-foreground text-sm text-center">专业的留学签证和访问签证申请指导与支持。</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About OXEC Section - Standardized Spacing */}
      <section className="relative z-20 w-full bg-gray-50" style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="font-bold text-foreground mb-4" style={{ fontFamily: '"Alibaba PuHuiTi", "Noto Sans SC", sans-serif', fontSize: '48px', fontWeight: 900 }}>关于傲赛（OXEC）</h2>
            <p className="text-lg text-muted-foreground">一家领先的专业型加拿大移民与行政法事务所，设于加拿大卑诗省，为加拿大及全球客户提供服务</p>
          </div>

          {/* First Group - Left Image Right Text */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">扎根加西，服务全球</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                傲赛（OXEC）移民事务所总部位于大温哥华地区的 Burnaby。我们不仅拥有深厚的法律背景，更致力于为每一位客户提供量身定制的移民解决方案，确保在复杂的行政法流程中为您保驾护航。
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/images/oxecimm-metro-tower1-office-opt.jpg"
                alt="OXEC Burnaby Office"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
          </div>

          {/* Second Group - Right Image Left Text */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/VZnfHnrpTMgWxPkt.jpg"
                alt="Professional Consultation"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">专业驱动，诚信为本</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                作为由 RCIC 注册移民顾问领衔的专业团队，我们精通各类疑难案件处理。我们相信每一份申请都承载着一个家庭的梦想，因此我们坚持透明、严谨的工作流程，将成功率与客户体验放在首位。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Preview Section */}
      <GoogleReviewsPreview />

      {/* Global Services Section - Standardized Spacing */}
      <section className="relative z-20 w-full bg-gray-50" style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center" style={{ display: 'flex', alignItems: 'center', minHeight: 'auto', overflow: 'visible' }}>
            <div>
              <img
                src="/world-map-dots.svg"
                alt="Global Services Map"
                className="w-full"
                style={{ height: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", "Noto Sans SC", sans-serif', fontSize: '48px', fontWeight: 900 }}>欢迎帮助我们"点亮地图"</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                我们为来自加拿大各地及世界各国的客户提供移民咨询服务。您来自我们尚未服务过的国家，我们诚挚期待与您建立联系。每一位客户都是一段全新的旅程——在为您提供专业支持的同时，我们也渴望汲取您深厚的文化底蕴与移民故事，并分享我们的专业经验。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                我们期待与您共同走过这段旅程。
              </p>
              <Link href="/booking">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                  <span>开始咨询</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <LatestArticlesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
