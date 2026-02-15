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
          title: "Categories & Application Process",
          inlandOutland:
            "There are two main pathways: In-land sponsorship (for those already in Canada) and Out-land sponsorship (for those outside Canada). The process involves assessment, documentation collection, application submission to IRCC, security and medical checks, and finally obtaining permanent resident status.",
          cta: "Start Your Reunion Journey - Book Consultation Now",
        },
        successCases: "Family Reunion Success Cases",
        readyText: "Ready to start your family reunion journey?",
      }
    : {
        nav: {
          back: "返回主页",
          language: "ENG",
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
        readyText: "准备开启您的团聚之旅了吗？",
      };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation - Same as BusinessClass */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">{t.nav.back}</span>
              </a>
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                服务
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a className="block px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors">
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/success-cases">
              <a className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium">
                成功案例
              </a>
            </Link>

            <Link href="/blog">
              <a className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium">
                博客
              </a>
            </Link>

            <Link href="/">
              <a className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium">
                关于我们
              </a>
            </Link>
          </div>

          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            style={{ borderRadius: "0px" }}
          >
            {t.nav.language}
          </button>
        </div>
      </div>

      {/* Section 1: Overview - Left Text, Right Image */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="text-4xl lg:text-5xl font-black text-foreground mb-6"
                style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}
              >
                {t.overview.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.overview.content}</p>
            </div>
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/SNunBhAdXlz5RhNsw0eVAp-img-1_1770159644000_na1fn_ZmFtaWx5Y2xhc3Mtb3ZlcnZpZXc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1NOdW5CaEFkWGx6NVJoTnN3MGVWQXAtaW1nLTFfMTc3MDE1OTY0NDAwMF9uYTFmbl9abUZ0YVd4NVkyeGhjM010YjNabGNuWnBaWGMuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=upFT9VLDooUlK1CxBPCNvBlvxj0AQ5EhXF--6~HapwWvVQSqyhWLbBi4MlGHTpsyVLyu2Klvj6Jbb0x9JWpKVcIhNX5cFPxUSsPr8jfCmAR1L1vtF4VDZ-iuxz4k0IlKNc~4G4yV2iXniw0htd6zghJuMdrA6DTH4NpjlNIqqLQhh2t~vvm~SdmWI97mbYn4YABAkhk7hDUrHQNWC~osmGfkHYIbTs12btAY1dZs6cMmEn~Ra61yQrWK8vOwh5acmpqKdr9k21R6PMoVKInb4sO535rUcSXzn98BZXdnOSAuvZ7i9LAUaItNrj5Z~4LbbCJIuQiHXrAFrIk~mfiKxw__"
                alt="Family Reunion"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Who Can Sponsor - Left Image, Right Text */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/SNunBhAdXlz5RhNsw0eVAp-img-2_1770159642000_na1fn_ZmFtaWx5Y2xhc3Mtc3BvbnNvcg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1NOdW5CaEFkWGx6NVJoTnN3MGVWQXAtaW1nLTJfMTc3MDE1OTY0MjAwMF9uYTFmbl9abUZ0YVd4NVkyeGhjM010YzNCdmJuTnZjZy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RFE6l1vVNqhS8sZsnzm53h~mqb7uBbPLKqUZhb~7xVN0Pgrz~hepR86k2j2cQeuSLi8ouPW~tf5UENKFqauQYNWdT6EvhG1fBO9~68512kwFa93uSpMroVP~4QWqjaoYy6kIJfHxFXoKgaUjIAqv1yA8AB4~KFru4Ts-MuHtesUccddOjXFHVzRpy13V~7dXYHpELP9n2I3rreeQ1dEZXnhC7F9-qrBJzyZmi67AM1-OM0cLaxPskj9DLpxDZqGxlOvE-WrliU7HayOBK1Xg5LYMnvaAFO--a-AYBSbfL5ckV5KVYJ~gOIovBL8~-aLY8cqxru0aKssEUF~aXMHL~Q__"
                alt="Sponsor Qualification"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
            <div>
              <h2
                className="text-3xl lg:text-4xl font-black text-foreground mb-6"
                style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}
              >
                {t.sponsor.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.sponsor.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Who Can Be Sponsored - Left Text, Right Image */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl lg:text-4xl font-black text-foreground mb-6"
                style={{ fontFamily: "'Alibaba PuHuiTi', sans-serif", fontWeight: 900 }}
              >
                {t.sponsored.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.sponsored.content}</p>
            </div>
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/SNunBhAdXlz5RhNsw0eVAp-img-3_1770159655000_na1fn_ZmFtaWx5Y2xhc3Mtc3BvbnNvcmVk.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1NOdW5CaEFkWGx6NVJoTnN3MGVWQXAtaW1nLTNfMTc3MDE1OTY1NTAwMF9uYTFmbl9abUZ0YVd4NVkyeGhjM010YzNCdmJuTnZjbVZrLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kgXoM7oPnyuQNkm4absV9ctSvsZkvwfwi9-HXNEekY8Tfm3Zqi8Sg29omFxo4JjttCCFB-Fk8DGSVdKvJizqU77wCwpaBe-MQIpfAihnWTxpyfWRu5kSVYHmgNjiramhTpJcFzgleBrzIPAQ0SkO2QY-2H0CLPW~b5XGhFkkzZ4YbzVntK1aSwGMzm4DDn8nEvJavQYi9An6HicrJeTgbCkE1xYcgm8plz3FgQGOkmYTv2sbWYzfCvHHDq2twmnmJJSWGooUKZMHvVl2BpYxkW691Z0iV-viJbLYKeK0uK-mYaYU~-hx4oVyzxpCRGbtgo6lmpZ9OsAo5sbRFZOjfg__"
                alt="Sponsored Family Members"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: "16/9", borderRadius: "0px" }}
              />
            </div>
          </div>
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

          <FamilyClassProcessFlow isEnglish={isEnglish} />

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="px-8 py-3 bg-accent text-white hover:bg-accent/90 transition-colors font-bold text-lg"
              style={{ borderRadius: "0px" }}
              onClick={() => navigate("/booking")}
            >
              {t.process.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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
            <p className="text-lg text-muted-foreground">来自我们客户的真实成功故事</p>
          </div>

          {/* Success Cases Grid - Show max 3 cases or fewer if available */}
          {successCases.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8">
              {successCases.slice(0, 3).map((post) => (
                <a
                  key={post.id}
                  href={`/success-cases/${post.slug}`}
                  className="bg-gray-50 overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                  style={{ width: "450px", height: "360px" }}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        style={{ borderRadius: "0px" }}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author?.name || "OXEC Immigration"}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString("zh-CN")}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">暂无成功案例</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">{t.readyText}</h2>
          <Link href="/booking">
            <Button
              size="lg"
              className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 transition-colors font-bold text-lg"
              style={{ borderRadius: "0px" }}
            >
              {t.process.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
