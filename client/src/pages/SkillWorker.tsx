import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function SkillWorker() {
  const [isEnglish, setIsEnglish] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-sm font-medium text-foreground/70 hover:text-foreground cursor-pointer">
              {isEnglish ? '← Back to Home' : '← 返回主页'}
            </span>
          </Link>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded hover:bg-accent"
          >
            {isEnglish ? '中文' : 'ENG'}
          </button>
        </div>
      </nav>

      {/* Anchor Navigation Cards */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: 'ee', label: isEnglish ? 'Express Entry' : '联邦快速通道' },
              { id: 'bcpnp', label: isEnglish ? 'BC PNP' : 'BC省提名' },
              { id: 'lmia', label: isEnglish ? 'LMIA Work Permit' : 'LMIA工签' },
              { id: 'ict', label: isEnglish ? 'ICT Work Permit' : 'ICT工签' },
              { id: 'pgwp', label: isEnglish ? 'Post-Graduation Work Permit' : '毕业后工签' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="p-4 bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center"
              >
                <p className="font-semibold text-foreground">{item.label}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section 1: Skilled Worker Overview - Left Text, Right Image */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
              {isEnglish
                ? 'Skilled Immigration: The Golden Path to Canada'
                : '技术移民：通往加拿大的黄金路径'}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? 'Canada consistently welcomes global talent. Among major English-speaking immigration countries, Canada offers the most attractive policies and is the most reliable country for obtaining permanent residency (PR) through employment. Thanks to the federal-provincial shared immigration system, applicants can flexibly plan their immigration strategy through Federal Express Entry (EE) or provincial nomination programs (PNP).'
                : '加拿大始终向全球技术人才敞开大门。在主要英语移民国家中，加拿大拥有最具吸引力的政策，是通过工作获得永居身份（PR）最稳妥的国家。得益于联邦与各省共管移民事务的体制，申请人可以通过联邦快速通道 (Express Entry) 或各省的省提名计划 (PNP) 灵活规划移民方案。'}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/img-14.jpg"
            alt="Skilled Workers"
            className="w-full h-auto shadow-lg"
          />
        </div>
      </section>

      {/* Section 2: Express Entry - Left Image, Right Text */}
      <section id="ee" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-4 scroll-mt-20">
        <div className="flex justify-center lg:order-first">
          <img
            src="/images/img-15.jpg"
            alt="Express Entry"
            className="w-full h-auto shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center lg:order-last container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
            {isEnglish
              ? 'Express Entry: Efficient and Transparent Choice'
              : '联邦快速通道：高效透明的选择'}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
            {isEnglish
              ? '• Profile Creation: Calculate your CRS score based on age, education, language proficiency, and work experience.\n\n• Invitation to Apply (ITA): Wait for the federal immigration department to issue invitations based on category-specific cutoff scores.\n\n• Formal Application: After receiving an invitation, submit complete documentation. Processing typically completes within 6 months.'
              : '• 入池 (Profile Creation)：根据年龄、学历、语言及工作经验计算 CRS 分数。\n\n• 抽签 (ITA)：等待联邦移民部根据各类别分数线发放邀请。\n\n• 正式申请：获得邀请后递交完整材料，通常在 6 个月内完成审理。'}
          </p>
        </div>
      </section>

      {/* Section 3: BC PNP - Left Text, Right Image */}
      <section id="bcpnp" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-4 scroll-mt-20">
        <div className="flex flex-col justify-center container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
            {isEnglish
              ? 'BC PNP: Ideal Choice for Experienced Professionals'
              : 'BC 省省提名：成熟职场人的理想选择'}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
            {isEnglish
              ? 'BC PNP is particularly suitable for applicants with mature work experience in relevant industries who may no longer have age-based advantages in Express Entry scores. By securing a long-term offer from a BC employer, applicants can lock in provincial nomination points and ensure immigration success.'
              : 'BC PNP 尤其适合在相关行业有成熟工作经验、但可能在年龄方面不再具备 EE 分数优势的申请人。通过获得 BC 省雇主的长期聘书，申请人可以锁定省提名加分，确保移民成功率。'}
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/img-16.jpg"
            alt="BC PNP"
            className="w-full h-auto shadow-lg"
          />
        </div>
      </section>

      {/* Section 4: LMIA - Left Image, Right Text */}
      <section id="lmia" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-4 scroll-mt-20">
        <div className="flex justify-center lg:order-first">
          <img
            src="/images/img-6.jpg"
            alt="LMIA"
            className="w-full h-auto shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center lg:order-last container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
            {isEnglish
              ? 'LMIA: Foundation of Work Permits'
              : 'LMIA 劳动力市场影响评估：工签的基石'}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
            {isEnglish
              ? '• Definition: LMIA is a document Canadian employers submit to the Department of Labor to prove they cannot find suitable local employees and need to hire foreign workers.\n\n• Wage Classification: Based on provincial median wages—high-wage positions typically receive longer work permit validity (usually 3 years), while low-wage positions face stricter ratio restrictions and shorter validity periods.'
              : '• 定义：LMIA 是加拿大雇主向劳工部申请，证明无法在本地招到合适员工而需聘请外劳的文件。\n\n• 高低工资定义：介绍以省中位数工资为准的分类标准。高工资岗位通常获批更长的工签有效期（通常为 3 年），而低工资岗位则有更严格的比例限制和较短的有效期。'}
          </p>
        </div>
      </section>

      {/* Section 5: ICT - Left Text, Right Image */}
      <section id="ict" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-4 scroll-mt-20">
        <div className="flex flex-col justify-center container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
            {isEnglish
              ? 'ICT Work Permit: Fast Track for Global Executives'
              : 'ICT 工签：跨国高管的快速通道'}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
            {isEnglish
              ? '• Advantage: The ICT category is exempt from LMIA, eliminating complex labor market testing.\n\n• Suitable Applicants: Ideal for senior managers or key technical personnel in multinational companies who are being transferred to work at Canadian branch offices.'
              : '• 优势：ICT 类别可豁免 LMIA，无需复杂的劳工市场测试。\n\n• 适用人群：适用于在全球性公司中担任高级管理人员或核心技术人员，且计划被派往加拿大分公司工作的申请人。'}
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/img-7.jpg"
            alt="ICT"
            className="w-full h-auto shadow-lg"
          />
        </div>
      </section>

      {/* Section 6: PGWP - Left Image, Right Text */}
      <section id="pgwp" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 px-4 scroll-mt-20">
        <div className="flex justify-center lg:order-first">
          <img
            src="/images/img-8.jpg"
            alt="PGWP"
            className="w-full h-auto shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center lg:order-last container mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
            {isEnglish
              ? 'PGWP: International Students\' Stay in Canada'
              : 'PGWP 毕业后工签：留学生的留加利器'}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
            {isEnglish
              ? '• Eligibility: Students who graduate from designated learning institutions (DLI) in Canada and meet course duration requirements.\n\n• Special Cases: If your study permit expires before applying for PGWP, you must immediately apply for status restoration or, under specific conditions, submit your application from outside Canada. OXEC provides professional remedial solutions for expired permits.'
              : '• 申请资格：从加拿大指定院校（DLI）毕业并符合课程时长要求的学生。\n\n• 特殊情况：若毕业前学签已到期，但尚未申请 PGWP，需立即申请身份恢复（Restoration）或在特定条件下于境外递交。傲赛提供专业的过期补救方案。'}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-6 text-white" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif' }}>
            {isEnglish
              ? 'Assess Your Immigration Points'
              : '评估您的移民加分'}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? 'Let our expert team help you plan your skilled immigration pathway and maximize your success rate.'
              : '让我们的专家团队帮助您规划技术移民路径，最大化您的成功率。'}
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {isEnglish ? 'Book Consultation Now' : '立即预约咨询'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
