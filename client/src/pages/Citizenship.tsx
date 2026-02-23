import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { OptimizedImage } from "@/components/OptimizedImage";

export default function Citizenship() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const serviceItems = [
    { label: "投资移民", href: "/businessclass" },
    { label: "家庭团聚移民", href: "/familyclass" },
    { label: "枫叶卡续签与加急", href: "/prcard" },
    { label: "拒签与程序公正信", href: "/reconsideration" },
    { label: "留学与访问", href: "/temporary" },
    { label: "技术移民", href: "/skillworker" },
    { label: "公民入籍", href: "/citizenship" },
  ];

  // Fetch success cases - only citizenship category
  const { data: successCases = [] } = trpc.posts.list.useQuery({
    type: "success-case",
    contentCategory: "citizenship",
    publishedOnly: true,
  });

  // Fetch all images for the "信任傲赛" section
  const { data: allImages = [] } = trpc.images.list.useQuery();

  const content = {
    zh: {
      nav: {
        back: "返回首页",
        language: "ENG",
      },
      title: "公民入籍",
      overview: {
        title: "成为加拿大公民",
        text: "获得加拿大公民身份是每一位移民旅程中的重要里程碑。作为加拿大公民，您将享有更广泛的权利与保障，包括政治参与权、身份稳定性、护照便利和职业机会等多方面优势。",
      },
      requirements: {
        title: "入籍的核心条件与路径",
        text: "加拿大公民身份主要通过归化入籍程序（Naturalization）获得。申请人通常需满足以下法定要求：\n\n• 居留要求（5年内实际居住1,095天）\n\n• 税务合规（5年内3年申报所得税）\n\n• 语言能力（CLB 4级及以上）\n\n• 通过入籍考试（加拿大历史、地理、政府架构）\n\n境外出生的子女可以通过加拿大籍父母自动获得国籍，但目前仅限于出生时父母已经入籍的情况。",
      },
      cta: "立即预约咨询",
      trustOXEC: "信任傲赛，专业护航",
      successCases: "公民入籍成功案例",
      readyText: "准备开启您的公民入籍之旅了吗？",
    },
    en: {
      nav: {
        back: "Back to Home",
        language: "中文",
      },
      title: "Canadian Citizenship",
      overview: {
        title: "Become a Canadian Citizen: Opening a New Chapter of Identity",
        text: "Obtaining Canadian citizenship is an important milestone in every immigrant's journey. As a Canadian citizen, you will enjoy broader rights and protections, including political participation, identity stability, passport benefits, and career opportunities.",
      },
      requirements: {
        title: "Core Requirements for Citizenship Application",
        text: "Canadian citizenship is primarily obtained through Naturalization. Applicants typically need to meet the following statutory requirements: Residency requirement (1,095 days within 5 years), Tax compliance (3 years of tax returns within 5 years), Language proficiency (CLB 4 or higher), Citizenship test (Canadian history, geography, government), Lineage status (first-generation children can directly confirm citizenship).",
      },
      cta: "Book a Consultation Now",
      trustOXEC: "Trust OXEC, Professional Guidance",
      successCases: "Canadian Citizenship Success Cases",
      readyText: "Ready to start your Canadian citizenship journey?",
    },
  };

  const t = isEnglish ? content.en : content.zh;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar - Same as BusinessClass */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm" style={{height: '55px'}}>
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
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{isEnglish ? 'Success Cases' : '成功案例'}</span>
            </Link>
            <Link href="/blog">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{isEnglish ? 'Blog' : '博客'}</span>
            </Link>
            <Link href="/team">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{isEnglish ? 'About' : '关于我们'}</span>
            </Link>
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              {isEnglish ? '中文' : 'ENG'}
            </button>
            <Link href="/booking">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <span>{isEnglish ? 'Book Now' : '预约咨询'}</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => navigate("/")}>
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Section 1: Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 
                className="text-foreground mb-6"
                style={{
                  fontFamily: '"Alibaba PuHuiTi", sans-serif',
                  fontSize: 'clamp(32px, 8vw, 48px)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                }}
              >
                {t.overview.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.overview.text}</p>
            </div>
            <div className="order-1 md:order-2">
              <OptimizedImage
                src="/images/citizenship-oath-ceremony-opt.jpg"
                alt="Citizenship Oath Ceremony"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <OptimizedImage
                src="/images/citizenship-legal-documents-opt.jpg"
                alt="Citizenship Legal Documents"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
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
                {t.requirements.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.requirements.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section
        className="py-20 flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/WZnaCRpbTuyKXGGm.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "400px",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="container text-center relative z-10">
          <h2 
            className="font-bold text-white mb-8"
            style={{
              fontFamily: '"Alibaba PuHuiTi", sans-serif',
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.2,
            }}
          >
            {isEnglish ? "Do you need to prepare your citizenship application?" : "您的需要准备公民入籍申请吗？"}
          </h2>
          <a href="/booking">
            <Button
              size="lg"
              className="font-bold text-lg px-8 py-6"
              style={{
                borderRadius: '0px',
                borderWidth: '3px',
                borderColor: '#ffffff',
                color: '#ffffff',
                backgroundColor: '#388088'
              }}
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Section 4: Trust OXEC - with random image from library */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 
                className="text-foreground mb-6"
                style={{
                  fontFamily: '"Alibaba PuHuiTi", sans-serif',
                  fontSize: 'clamp(32px, 8vw, 48px)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                }}
              >
                {t.trustOXEC}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {isEnglish
                  ? "During the citizenship process, you may be concerned about 'defects in residency time calculation' or 'citizenship exam preparation.' Any omissions or calculation errors in residency records could trigger a deep investigation by immigration authorities (RQ), leading to significantly extended processing times or even rejection.\n\nThe OXEC team, with its rigorous service processes, can provide you with precise Physical Presence Calculations and multi-dimensional verification combined with your tax and entry/exit records to ensure your application materials form a complete logical chain. We also provide targeted citizenship exam guidance to help you transition smoothly and efficiently from permanent resident status to Canadian citizenship, achieving a truly comprehensive and flawless application."
                  : "入籍过程中您可能担心的通常是\"居住时间计算中的瑕疵\"或\"入籍考试的准备\"。任何居留记录记录的疏漏或计算瑕疵，都可能引发移民局对申请人居住真实性的深度调查（RQ），从而导致审理周期大幅延长甚至拒签。\n\n傲赛团队凭借严谨的服务流程，可为您提供精准的物理居住时间核算（Physical Presence Calculation），并结合您的税务与出入境记录进行多维度校验，确保申请材料逻辑闭环。同时，我们提供针对性的入籍考试指导，助力您从永居身份平稳、高效地过渡至加拿大公民，实现身份规划的\"万无一失\"。"}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <OptimizedImage
                src="/images/service-1-investment-1771831729788-opt.webp"
                alt="OXEC Professional Team"
                  className="w-full h-auto shadow-lg object-cover"
                  style={{ aspectRatio: "16/9", borderRadius: "0px" }}
                />
            </div>
          </div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 
              className="text-foreground mb-4"
              style={{
                fontFamily: '"Alibaba PuHuiTi", sans-serif',
                fontSize: 'clamp(32px, 8vw, 48px)',
                fontWeight: 900,
                lineHeight: 1.2,
              }}
            >
              {t.successCases}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isEnglish ? "Real success stories from our clients" : "来自我们客户的真实成功故事"}
            </p>
          </div>

          {/* Success Cases Grid - Show max 3 cases or fewer if available */}
          {successCases.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {successCases.slice(0, 3).map((post) => (
              <a
                key={post.id}
                href={`/success-cases/${post.slug}`}
                className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group flex flex-col"
                style={{ width: '450px', height: '360px' }}
              >
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden flex-shrink-0" style={{ height: '220px' }}>
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ borderRadius: "0px" }}
                    />
                  )}
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>OXEC Immigration</span>
                    <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {isEnglish ? "No success cases available yet" : "暂无成功案例"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
