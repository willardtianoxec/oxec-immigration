"use client";

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

  const content = {
    zh: {
      nav: {
        back: "返回主页",
        language: "ENG",
      },
      title: "家庭团聚移民",
      overview: {
        title: "家庭团聚移民：加拿大团聚计划",
        text: "加拿大重视家庭团聚。通过家庭团聚移民项目，加拿大公民和永久居民可以担保其符合条件的家庭成员移民加拿大。无论是配偶、子女、父母还是祖父母，我们都提供专业的指导和支持，帮助您和家人团聚。",
      },
      whoApplies: {
        title: "谁适合家庭团聚移民项目？",
        text: "家庭团聚移民项目适合有加拿大公民或永久居民亲属的申请人。如果您想与配偶、子女、父母或祖父母团聚，或者您是加拿大公民/永久居民想要担保家庭成员，家庭团聚移民将是您的理想选择。",
      },
      categories: {
        title: "主要团聚类别",
        items: [
          {
            name: "配偶和同居伴侣",
            description: "加拿大公民或永久居民可以担保其合法配偶或同居伴侣移民。申请人需要证明真实的婚姻或同居关系，提供充分的经济支持，并满足其他相关要求。",
          },
          {
            name: "父母和祖父母",
            description: "加拿大公民或永久居民可以通过父母祖父母团聚计划或超级签证担保其父母或祖父母。超级签证允许父母和祖父母在加拿大停留最长10年，无需续签。",
          },
          {
            name: "受抚养子女",
            description: "加拿大公民或永久居民可以担保其受抚养的子女，包括亲生子女、继子女和收养子女。申请人需要证明有能力提供经济支持，并满足其他相关要求。",
          },
        ],
      },
      process: {
        title: "项目申请流程",
        text: "从初步评估、文件准备、提交申请、安全检查到最终获得永久居民身份的基本流程：",
        steps: [
          "初步评估与咨询",
          "准备担保文件与财务证明",
          "提交申请表格与相关文件",
          "接收确认并进行安全检查",
          "等待审批与最终决定",
          "获得永久居民身份",
        ],
      },
      cta: "立即预约专业咨询",
      successCases: "家庭团聚成功案例",
      readyText: "准备开启您的团聚之旅了吗？",
    },
    en: {
      nav: {
        back: "Back to Home",
        language: "中文",
      },
      title: "Family Reunification Immigration",
      overview: {
        title: "Family Reunification Immigration: Canada's Family Reunification Program",
        text: "Canada values family unity. Through the Family Reunification Immigration program, Canadian citizens and permanent residents can sponsor eligible family members to immigrate to Canada. Whether it's spouses, children, parents, or grandparents, we provide professional guidance and support to help you reunite with your family.",
      },
      whoApplies: {
        title: "Who Should Apply for Family Reunification Immigration?",
        text: "The Family Reunification Immigration program is suitable for applicants with Canadian citizen or permanent resident relatives. If you want to reunite with spouses, children, parents, or grandparents, or if you are a Canadian citizen/permanent resident who wants to sponsor family members, Family Reunification Immigration is your ideal choice.",
      },
      categories: {
        title: "Main Reunification Categories",
        items: [
          {
            name: "Spouses and Common-law Partners",
            description: "Canadian citizens or permanent residents can sponsor their legal spouses or common-law partners to immigrate. Applicants need to prove a genuine marital or common-law relationship, provide sufficient financial support, and meet other relevant requirements.",
          },
          {
            name: "Parents and Grandparents",
            description: "Canadian citizens or permanent residents can sponsor their parents or grandparents through the Parents and Grandparents Sponsorship Program or Super Visa. The Super Visa allows parents and grandparents to stay in Canada for up to 10 years without renewal.",
          },
          {
            name: "Dependent Children",
            description: "Canadian citizens or permanent residents can sponsor their dependent children, including biological children, stepchildren, and adopted children. Applicants need to prove they have the financial capacity to provide support and meet other relevant requirements.",
          },
        ],
      },
      process: {
        title: "Application Process",
        text: "The basic process from initial assessment, document preparation, application submission, security check to final permanent residence approval:",
        steps: [
          "Initial Assessment and Consultation",
          "Prepare Sponsorship Documents and Financial Proof",
          "Submit Application Forms and Supporting Documents",
          "Receive Confirmation and Undergo Security Check",
          "Wait for Review and Final Decision",
          "Obtain Permanent Residence Status",
        ],
      },
      cta: "Schedule Professional Consultation Now",
      successCases: "Family Reunification Success Cases",
      readyText: "Ready to Start Your Family Reunification Journey?",
    },
  };

  const t = isEnglish ? content.en : content.zh;

  // Add Google Font for Alibaba PuHuiTi Black
  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@900&display=swap');
    .section-title {
      font-family: 'Noto Sans SC', sans-serif;
      font-weight: 900;
      font-size: 48px;
      letter-spacing: 0.5px;
    }
  `;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>{fontStyle}</style>

      {/* Top Navigation Bar - Same as Home */}
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
              <h2 className="section-title text-foreground mb-6">{t.overview.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.overview.text}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/service-2.jpg"
                alt="Family Reunification"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Who Applies */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/team-member-1.jpg"
                alt="Who Applies"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="section-title text-foreground mb-6">{t.whoApplies.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.whoApplies.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Categories */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="section-title text-center text-foreground mb-12">{t.categories.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.categories.items.map((item, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-4">{item.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-foreground mb-6">{t.process.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.process.text}</p>
              <div className="space-y-4">
                {t.process.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="/service-3.jpg"
                alt="Application Process"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">{t.readyText}</h2>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-none">
              {t.cta}
            </Button>
          </Link>
        </div>
      </section>

      {/* Section 6: Success Cases */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="section-title text-center text-foreground mb-4">{t.successCases}</h2>
          <p className="text-center text-muted-foreground mb-12">来自我们客户的真实成功故事</p>

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
              <p className="text-muted-foreground">{isEnglish ? 'No success cases available yet.' : '暂无成功案例'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
