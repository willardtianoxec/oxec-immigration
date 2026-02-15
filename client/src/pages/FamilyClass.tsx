import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { FamilyClassProcessFlow } from "@/components/FamilyClassProcessFlow";


export default function FamilyClass() {
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
          title: "Project Categories & Application Process",
          inlandOutland:
            "There are two main pathways: In-land sponsorship (for those already in Canada) and Out-land sponsorship (for those outside Canada). The process involves assessment, documentation collection, application submission to IRCC, security and medical checks, and finally obtaining permanent resident status.",
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
          title: "项目分支与申请流程",
          inlandOutland:
            "存在两种主要途径：境内担保（针对已在加拿大的申请人）和境外担保（针对加拿大境外的申请人）。流程包括评估、材料收集、向 IRCC 递交申请、安全和医疗检查，最终获得永久居民身份。",
          cta: "开启您的团聚之旅 - 立即预约专业咨询",
        },
        successCases: "家庭团聚成功案例",
        readyText: "准备与您的家人在加拿大团聚吗？",
      };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar - Same as Home */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm" style={{ height: '55px' }}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          {/* Logo */}
          <Link href="/">
            <img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} />
          </Link>

          {/* Desktop Menu - Single Unified Navigation Group */}
          <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'space-around', marginLeft: '32px' }}>
            <Link href="/">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t.nav.home}</span>
            </Link>
            <div className="relative group">
              <button
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="flex items-center text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
              >
                {t.nav.services}
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
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t.nav.success_cases}</span>
            </Link>
            <Link href="/blog">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t.nav.blog}</span>
            </Link>
            <Link href="/team">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t.nav.about}</span>
            </Link>
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              {isEnglish ? '中文' : 'ENG'}
            </button>
            <Link href="/booking">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <span>{t.nav.contact}</span>
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
              <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-6" style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}>
                {t.overview.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.overview.content}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/family-reunion-hero.jpg"
                alt="Family Reunion in Canada"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Who Can Sponsor */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/sponsor-meeting.jpg"
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

      {/* Section 3: Which Relatives */}
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
                src="/family-gathering.jpg"
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

      {/* Section 4: Process & Flow */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-black text-foreground mb-4"
              style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}
            >
              {t.process.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.process.inlandOutland}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/1KnEnHRJ5m7G4yZchCDKJn-img-2_1771140735000_na1fn_ZG9jdW1lbnQtc3VibWlzc2lvbi1vZmZpY2U.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94LzFLbkVuSFJKNW03RzR5WmNoQ0RLSm4taW1nLTJfMTc3MTE0MDczNTAwMF9uYTFmbl9aRzlqZFcxbGJuUXRjM1ZpYldsemMybHZiaTF2Wm1acFkyVS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=I4TlxHs7ICyTRpYrWJTOAjzyqatyH2vTdwiRLVCPTA49kXyERI3MN8K1LWMZqcZMu5e34Lx8xr7eWTckQAeHklCdSHrxaIFOC7h55vCDeAb0Yn~dJGMHcn42mrLS07uILaaQf5r1OACLtprriOQ1r9giMMzsfnMBBZB5F~CKnyknvfxJuTIXEB-nhPYEjyc-q2Tm9Q~792lnuLE5yq-3tTmQN91PTiT7x6m1OJYJzttbZTnPaDXo4IEWy9GRLmSFGucogzBaZQtTnm6u9QR6u0Hre-AT7MCzaAXDDDU6SuIosZv2zbSsnMcW4SY9mDrTfBYHyCk5-QcF1RSDJbsJ3A__"
                alt="Document Submission Office"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
            <div>
              <FamilyClassProcessFlow isEnglish={isEnglish} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Success Cases */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-black text-foreground mb-4"
              style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}
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
                      <span>{post.author?.name || "OXEC Immigration"}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{isEnglish ? "No success cases yet" : "暂无成功案例"}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
