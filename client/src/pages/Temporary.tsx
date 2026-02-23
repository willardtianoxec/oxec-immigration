import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Temporary() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm py-4">
        <div className="container flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isEnglish ? "Back to Home" : "返回主页"}</span>
          </button>
          <h1 className="text-xl font-bold">
            {isEnglish ? "Temporary Residents" : "临时居民"}
          </h1>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isEnglish ? "中文" : "ENG"}
          </button>
        </div>
      </nav>

      {/* Quick Navigation Cards */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: "study", label: isEnglish ? "Study Abroad" : "留学申请" },
              { id: "family-stay", label: isEnglish ? "Spousal & Family" : "陪读与家庭" },
              { id: "visitor", label: isEnglish ? "Visitor Visa" : "探亲旅游" },
              { id: "super-visa", label: isEnglish ? "Super Visa" : "父母超级签证" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition text-center font-semibold text-blue-600 hover:text-blue-700"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        {/* Section 1: Study Abroad Overview - Left Text, Right Image */}
        <section id="study" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 scroll-mt-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
              {isEnglish
                ? "Study in Canada"
                : "留学加拿大"}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? "Canada is renowned globally for its high-quality public education system and safe, inclusive social environment.\n\n• Youth Education: Beautiful natural surroundings and multicultural atmosphere are ideal for adolescent physical and mental health development and comprehensive quality cultivation.\n\n• Adult International Students: Studying abroad is not just about acquiring knowledge—it's a 'royal pathway' to Canadian immigration. By obtaining local credentials and work experience, you can significantly enhance your success rate in Provincial Nomination Programs (PNP) and Federal Express Entry (EE)."
                : "加拿大以其高质量的公立教育体系和安全包容的社会环境享誉全球。\n\n• 青少年教育：优美的自然环境与多元文化氛围，极利于青少年的身心健康成长与综合素质培养。\n\n• 成年留学生：留学不仅是获取知识，更是通往加拿大移民的'王道路径'，通过获取本地学历与工作经验，可大幅提升省提名（PNP）及联邦快速通道（EE）的成功率。"}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/img-1-opt.jpg"
              alt="Study Abroad"
              className="w-full h-auto shadow-lg" style={{ borderRadius: "0px" }}
            />
          </div>
        </section>

        {/* Section 2: Study Quota & PAL/TA - Left Image, Right Text */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="flex justify-center lg:order-first">
            <img
              src="/images/img-2-opt.jpg"
              alt="Study Quota and PAL"
              className="w-full h-auto shadow-lg" style={{ borderRadius: "0px" }}
            />
          </div>
          <div className="flex flex-col justify-center lg:order-last">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
              {isEnglish
                ? "Study Quotas and Provincial Attestation Letters (PAL)"
                : "留学配额与省证明信 (PAL)"}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? "Affected by policy adjustments in recent years, Canada has introduced a total quota system for study permit applications. Most college and undergraduate applicants must now obtain a Provincial Attestation Letter (PAL) or, in Quebec, a TA (Attestation d'acceptation québécoise) to submit their applications. The OXEC team stays abreast of the latest policy developments and helps students seize opportunities in the competitive application landscape."
                : "受近两年政策调整影响，加拿大对学签申请引入了总量配额制。大多数大专及本科申请人现在必须获得省证明信 (Provincial Attestation Letter, PAL) 或在魁北克省获得 TA 才能递交申请。傲赛（OXEC）团队紧跟最新政策动态，协助学生在名额竞争中抢占先机。"}
            </p>
          </div>
        </section>

        {/* Section 3: Spousal & Family Support - Left Text, Right Image */}
        <section id="family-stay" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 scroll-mt-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
              {isEnglish
                ? "Spousal Work Permits and Family Accompaniment"
                : "配偶工签与家长陪读"}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? "• Spousal Open Work Permit (SOWP): Eligible spouses of qualified international students can apply for an open work permit. This policy allows spouses to work legally in Canada, easing financial pressure while accumulating valuable local work experience.\n\n• Parental Accompaniment and Visitor Record: For parents accompanying minor children studying in Canada, a Visitor Record (VR) is essential for maintaining legal residency status and ensuring continuous companionship. Applications must demonstrate sufficient financial support and genuine intent to accompany."
                : "• 配偶开放工签 (SOWP)：介绍符合资质的留学生配偶如何申请开放式工签。这一政策允许配偶在加拿大合法工作，分担家庭经济压力的同时积累本地工作经验。\n\n• 父母陪读与 Visitor Record：详细介绍 Visitor Record (VR) 的定义。对于长期陪伴未成年子女在加读书的父母，VR 是维持合法居留身份、确保持续陪伴的关键文件。申请时需证明充足的资金支持及真实的陪读意图。"}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/img-3-opt.jpg"
              alt="Family Visit"
              className="w-full h-auto shadow-lg" style={{ borderRadius: "0px" }}
            />
          </div>
        </section>

        {/* Section 4: Visitor Visa - Left Image, Right Text */}
        <section id="visitor" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 scroll-mt-20">
          <div className="flex justify-center lg:order-first">
            <img
              src="/images/img-4-opt.jpg"
              alt="Visitor Visa"
              className="w-full h-auto shadow-lg" style={{ borderRadius: "0px" }}
            />
          </div>
          <div className="flex flex-col justify-center lg:order-last">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
              {isEnglish
                ? "Visitor Visas for Family Visits"
                : "探亲与旅游"}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? "Visitor visas (TRV) may seem straightforward, but the document logic is extremely critical.\n\n• Key Documents: Include detailed travel plans, proof of funds, and proof of ties to your home country.\n\n• Professional Reminder: Never entrust a 'tourist visa' to unqualified intermediaries due to its seemingly low threshold. If material logic conflicts or false information leads to misrepresentation, you face a 5-year entry ban."
                : "访问签证（TRV）看似简单，实则材料逻辑极其重要。\n\n• 核心材料：包括详细的旅行计划、资金证明、国内束缚力证明等。\n\n• 专业提醒：切勿因'旅游签'看似门槛低而交由不合资质的中介代办。一旦因材料逻辑冲突或信息不实导致虚假陈述 (Misrepresentation)，将面临 5 年入境禁令。"}
            </p>
          </div>
        </section>

        {/* Section 5: Super Visa - Left Text, Right Image */}
        <section id="super-visa" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 scroll-mt-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "48px" }}>
              {isEnglish
                ? "Parent & Grandparent Super Visa"
                : "父母超级签证"}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? "The Super Visa is designed specifically for parents and grandparents of Canadian citizens or permanent residents. Its advantages include:\n\n• Extended Stay: Single entry allows stays of up to 5 years.\n\n• No Frequent Renewals: Eliminates the need for frequent visa renewals.\n\n• Ideal for Family Reunion: The perfect choice for long-term family reunification and multigenerational bonding."
                : "超级签证是专为加拿大公民或永久居民的父母及祖父母设计的。其优势在于单次入境停留时间最长可达 5 年，且无需频繁办理续签，是家庭长久团聚的理想选择。"}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/img-5-opt.jpg"
              alt="Super Visa"
              className="w-full h-auto shadow-lg" style={{ borderRadius: "0px" }}
            />
          </div>
        </section>

        {/* CTA Button */}
        <section className="py-12 text-center">
          <Button
            onClick={() => navigate("/booking")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            {isEnglish
              ? "Customize Your Plan - Consult Now"
              : "定制您的规划方案 - 立即咨询"}
          </Button>
        </section>
      </main>
    </div>
  );
}
