import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function FamilyClass() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  // Image URLs for family reunion sections
  const familyImage1 = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/oqyCwXSpqVZjOXit.jpg';
  const familyImage2 = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/sxLiylhjEbzOSvBQ.jpg';
  const familyImage3 = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/yQpDINPnXnfonPlF.jpg';

  const serviceItems = [
    { label: "投资移民", href: "/businessclass" },
    { label: "家庭团聚移民", href: "/familyclass" },
    { label: "枫叶卡续签与加急", href: "/prcard" },
    { label: "拒签与程序公正信", href: "/reconsideration" },
    { label: "留学与访问", href: "/temporary" },
    { label: "技术移民", href: "/skillworker" },
    { label: "公民入籍", href: "/citizenship" },
  ];

  // Fetch success cases - only family-reunion category using contentCategory
  const { data: successCases = [] } = trpc.posts.list.useQuery({
    type: "success-case",
    contentCategory: "family-reunion",
    publishedOnly: true,
  });

  const t = isEnglish
    ? {
        nav: {
          back: "Back to Home",
          language: "中文",
          home: "Home",
          services: "Services",
          success_cases: "Success Cases",
          blog: "Blog",
          about: "About",
          contact: "Book Now",
        },
        overview: {
          title: "Family Reunion Immigration: Bringing Love Together in Canada",
          content:
            "The Canadian government believes that family completeness is the foundation of social stability and prosperity. Based on deep humanitarian care, Canada's immigration system regards family reunification as one of its core objectives. Whether it's spouses, children, or parents, we are committed to providing professional legal services to shorten the distance and help your family start a new chapter of life together in the Maple Leaf nation.",
        },
        sponsor: {
          title: "Who Can Sponsor Family Members?",
          content:
            "To become a qualified sponsor, you typically need to meet the following basic conditions:\n• Must be a Canadian citizen or permanent resident (PR).\n• Must be at least 18 years old.\n• Must be able to demonstrate sufficient financial capacity to support the sponsored person's basic living needs in Canada.\n• Must sign a sponsorship agreement, committing to provide financial support for the sponsored person for a certain period.",
        },
        sponsored: {
          title: "Which Relatives Can Be Sponsored?",
          content:
            "Canada accepts applications from the following categories of family members:\n• Spouses and Partners: Including legal spouses, common-law partners, or conjugal partners.\n• Dependent Children: Usually under 22 years old and unmarried.\n• Parents and Grandparents: Through annual quotas or super visa programs.\n• Other Relatives: In specific special circumstances (such as orphaned siblings) may apply.",
        },
        process: {
          title: "Project Application Process",
          text: "There are two main pathways: In-land sponsorship (for those already in Canada) and Out-land sponsorship (for those outside Canada). The process involves assessment, documentation collection, application submission to IRCC, security and medical checks, and finally obtaining permanent resident status.",
          steps: [
            "Initial assessment and consultation",
            "Prepare business plan and financial documents",
            "Submit EOI (Letter of Intent) or direct application",
            "Receive invitation (ITA)",
            "Apply for work permit",
            "Obtain provincial nomination",
            "Apply for permanent residence",
          ],
          cta: "Start Your Reunion Journey - Book Consultation Now",
        },
        successCases: "Family Reunion Success Cases",
        readyText: "Ready to Reunite Your Family in Canada?",
      }
    : {
        nav: {
          back: "返回主页",
          language: "ENG",
          home: "首页",
          services: "服务",
          success_cases: "成功案例",
          blog: "博客",
          about: "关于我们",
          contact: "预约咨询",
        },
        overview: {
          title: "家庭团聚移民：让爱在加拿大团聚",
          content:
            "加拿大政府深信，家庭的完整是社会稳定与繁荣的基石。基于深厚的人道主义关怀，加拿大移民体系将家庭团聚视为核心宗旨之一。无论是配偶、子女还是父母，我们致力于通过专业的法律服务，缩短时空距离，帮助您的家人在枫叶之国开启共同生活的新篇章。",
        },
        sponsor: {
          title: "谁可以担保家庭成员？",
          content:
            "要成为合格的担保人，您通常需要满足以下基本条件：\n• 必须是加拿大公民或永久居民（PR）。\n• 年满 18 周岁。\n• 能够证明有足够的经济能力负担受担保人在加拿大期间的基本生活需求。\n• 签署担保协议，承诺在一定期限内为受担保人提供财务支持。",
        },
        sponsored: {
          title: "哪些亲属可以被担保？",
          content:
            "加拿大接收以下类别的家庭成员申请：\n• 配偶与伴侣：包括合法配偶、同居伴侣（Common-law partner）或婚姻事实伴侣（Conjugal partner）。\n• 受抚养子女：通常为 22 周岁以下且未婚。\n• 父母与祖父母：通过每年特定的配额或超级签证项目申请。\n• 其他亲属：在特定特殊情况下（如孤儿兄弟姐妹）可申请。",
        },
        process: {
          title: "项目申请流程",
          text: "存在两种主要途径：境内担保（针对已在加拿大的申请人）和境外担保（针对加拿大境外的申请人）。流程包括评估、材料收集、向 IRCC 递交申请、安全和医疗检查，最终获得永久居民身份。",
          steps: [
            "初步评估与咨询",
            "准备商业计划书与财务文件",
            "提交 EOI（意向书）或直接申请",
            "获得邀请 (ITA)",
            "申请工作签证",
            "获得省提名",
            "申请永久居民身份",
          ],
          cta: "开启您的团聚之旅 - 立即预约专业咨询",
        },
        successCases: "家庭团聚成功案例",
        readyText: "准备与您的家人在加拿大团聚吗？",
      };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold">{t.nav.back}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="/" className="text-sm hover:text-accent">{t.nav.home}</a>
            
            <div className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="text-sm hover:text-accent flex items-center gap-1"
              >
                {t.nav.services}
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  {serviceItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t last:rounded-b"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/success-cases" className="text-sm hover:text-accent">{t.nav.success_cases}</a>
            <a href="/blog" className="text-sm hover:text-accent">{t.nav.blog}</a>
            <a href="/about" className="text-sm hover:text-accent">{t.nav.about}</a>
            
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="text-sm font-semibold hover:text-accent"
            >
              {t.nav.language}
            </button>

            <Button
              size="sm"
              onClick={() => navigate("/booking")}
              className="bg-accent hover:bg-accent/90"
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>
      </nav>

      {/* Section 1: Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6" style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}>
                {t.overview.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.overview.content}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={familyImage1}
                alt="Family Reunion"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sponsor Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={familyImage2}
                alt="Sponsor Meeting"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6" style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}>
                {t.sponsor.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.sponsor.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Sponsored Categories */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6" style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}>
                {t.sponsored.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.sponsored.content}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={familyImage3}
                alt="Family Gathering"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image - Before Success Cases */}
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
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">{t.readyText}</h2>
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
            onClick={() => navigate("/booking")}
          >
            {t.process.cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Section 4: Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={familyImage2}
                alt="Document Submission Office"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
            <div>
              <h2 className="section-title text-foreground mb-6">{t.process.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.process.text}</p>
              <ol className="space-y-3">
                {t.process.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-8 h-8 bg-accent text-white font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title text-foreground mb-4">{t.successCases}</h2>
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
                className="bg-gray-50 overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group flex flex-col"
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

      {/* Footer - Use the same Footer component as Home */}
      <Footer />
    </div>
  );
}
