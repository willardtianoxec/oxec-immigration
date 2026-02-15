import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { FamilyClassProcessFlow } from '@/components/FamilyClassProcessFlow';

export default function FamilyClass() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();

  const t = isEnglish
    ? {
        nav: {
          back: 'Back to Home',
          language: '中文',
        },
        overview: {
          title: 'Family Reunion Immigration: Bringing Love Together in Canada',
          content:
            'The Canadian government believes that family completeness is the foundation of social stability and prosperity. Based on deep humanitarian care, Canada\'s immigration system regards "family reunification" as one of its core objectives. Whether it\'s spouses, children, or parents, we are committed to providing professional legal services to shorten the distance and help your family start a new chapter of life together in the Maple Leaf nation.',
        },
        sponsor: {
          title: 'Who Can Sponsor Family Members?',
          content:
            'To become a qualified sponsor, you typically need to meet the following basic conditions:\n• Must be a Canadian citizen or permanent resident (PR).\n• Must be at least 18 years old.\n• Must be able to demonstrate sufficient financial capacity to support the sponsored person\'s basic living needs in Canada.\n• Must sign a sponsorship agreement, committing to provide financial support for the sponsored person for a certain period.',
        },
        sponsored: {
          title: 'Which Relatives Can Be Sponsored?',
          content:
            'Canada accepts applications from the following categories of family members:\n• Spouses and Partners: Including legal spouses, common-law partners, or conjugal partners.\n• Dependent Children: Usually under 22 years old and unmarried.\n• Parents and Grandparents: Through annual quotas or super visa programs.\n• Other Relatives: In specific special circumstances (such as orphaned siblings) may apply.',
        },
        process: {
          title: 'Categories & Application Process',
          inlandOutland:
            'There are two main pathways: "In-land sponsorship" (for those already in Canada) and "Out-land sponsorship" (for those outside Canada). The process involves assessment, documentation collection, application submission to IRCC, security and medical checks, and finally obtaining permanent resident status.',
          cta: 'Start Your Reunion Journey - Book Consultation Now',
        },
        successCases: {
          title: 'Family Reunion Success Cases',
          description: 'Real stories of families successfully reunited in Canada',
        },
      }
    : {
        nav: {
          back: '返回主页',
          language: 'ENG',
        },
        overview: {
          title: '家庭团聚移民：让爱在加拿大团聚',
          content:
            '加拿大政府深信，家庭的完整是社会稳定与繁荣的基石。基于深厚的人道主义关怀，加拿大移民体系将"家庭团聚"视为核心宗旨之一。无论是配偶、子女还是父母，我们致力于通过专业的法律服务，缩短时空距离，帮助您的家人在枫叶之国开启共同生活的新篇章。',
        },
        sponsor: {
          title: '谁可以担保家庭成员？',
          content:
            '要成为合格的担保人，您通常需要满足以下基本条件：\n• 必须是加拿大公民或永久居民（PR）。\n• 年满 18 周岁。\n• 能够证明有足够的经济能力负担受担保人在加拿大期间的基本生活需求。\n• 签署担保协议，承诺在一定期限内为受担保人提供财务支持。',
        },
        sponsored: {
          title: '哪些亲属可以被担保？',
          content:
            '加拿大接收以下类别的家庭成员申请：\n• 配偶与伴侣：包括合法配偶、同居伴侣（Common-law partner）或婚姻事实伴侣（Conjugal partner）。\n• 受抚养子女：通常为 22 周岁以下且未婚。\n• 父母与祖父母：通过每年特定的配额或超级签证项目申请。\n• 其他亲属：在特定特殊情况下（如孤儿兄弟姐妹）可申请。',
        },
        process: {
          title: '项目分支与申请流程',
          inlandOutland:
            '存在两种主要途径："境内担保"（针对已在加拿大的申请人）和"境外担保"（针对加拿大境外的申请人）。流程包括评估、材料收集、向 IRCC 递交申请、安全和医疗检查，最终获得永久居民身份。',
          cta: '开启您的团聚之旅 - 立即预约专业咨询',
        },
        successCases: {
          title: '家庭团聚成功案例',
          description: '真实的家庭在加拿大成功团聚的故事',
        },
      };

  // Sample success cases
  const successCases = [
    {
      id: 1,
      title: isEnglish ? 'Spouse Sponsorship Success' : '配偶担保成功案例',
      category: isEnglish ? 'Spouse Sponsorship' : '配偶担保',
      timeline: isEnglish ? '8 months' : '8个月',
      keyPoint: isEnglish ? 'In-land sponsorship approved' : '境内担保获批',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: isEnglish ? 'Parents Super Visa' : '父母超级签证案例',
      category: isEnglish ? 'Parents & Grandparents' : '父母祖父母',
      timeline: isEnglish ? '4 months' : '4个月',
      keyPoint: isEnglish ? 'Super Visa approved, 10-year validity' : '超级签证获批，有效期10年',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: isEnglish ? 'Dependent Children Sponsorship' : '受抚养子女担保案例',
      category: isEnglish ? 'Dependent Children' : '受抚养子女',
      timeline: isEnglish ? '6 months' : '6个月',
      keyPoint: isEnglish ? 'Multiple children approved together' : '多个子女同时获批',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t.nav.back}</span>
          </button>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            style={{ borderRadius: '0px' }}
          >
            {t.nav.language}
          </button>
        </div>
      </div>

      {/* Section 1: Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">{t.overview.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t.overview.content}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/SNunBhAdXlz5RhNsw0eVAp-img-1_1770159644000_na1fn_ZmFtaWx5Y2xhc3Mtb3ZlcnZpZXc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1NOdW5CaEFkWGx6NVJoTnN3MGVWQXAtaW1nLTFfMTc3MDE1OTY0NDAwMF9uYTFmbl9abUZ0YVd4NVkyeGhjM010YjNabGNuWnBaWGMuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=upFT9VLDooUlK1CxBPCNvBlvxj0AQ5EhXF--6~HapwWvVQSqyhWLbBi4MlGHTpsyVLyu2Klvj6Jbb0x9JWpKVcIhNX5cFPxUSsPr8jfCmAR1L1vtF4VDZ-iuxz4k0IlKNc~4G4yV2iXniw0htd6zghJuMdrA6DTH4NpjlNIqqLQhh2t~vvm~SdmWI97mbYn4YABAkhk7hDUrHQNWC~osmGfkHYIbTs12btAY1dZs6cMmEn~Ra61yQrWK8vOwh5acmpqKdr9k21R6PMoVKInb4sO535rUcSXzn98BZXdnOSAuvZ7i9LAUaItNrj5Z~4LbbCJIuQiHXrAFrIk~mfiKxw__"
                alt="Family Reunion"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
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
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/SNunBhAdXlz5RhNsw0eVAp-img-2_1770159642000_na1fn_ZmFtaWx5Y2xhc3Mtc3BvbnNvcg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1NOdW5CaEFkWGx6NVJoTnN3MGVWQXAtaW1nLTJfMTc3MDE1OTY0MjAwMF9uYTFmbl9abUZ0YVd4NVkyeGhjM010YzNCdmJuTnZjZy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RFE6l1vVNqhS8sZsnzm53h~mqb7uBbPLKqUZhb~7xVN0Pgrz~hepR86k2j2cQeuSLi8ouPW~tf5UENKFqauQYNWdT6EvhG1fBO9~68512kwFa93uSpMroVP~4QWqjaoYy6kIJfHxFXoKgaUjIAqv1yA8AB4~KFru4Ts-MuHtesUccddOjXFHVzRpy13V~7dXYHpELP9n2I3rreeQ1dEZXnhC7F9-qrBJzyZmi67AM1-OM0cLaxPskj9DLpxDZqGxlOvE-WrliU7HayOBK1Xg5LYMnvaAFO--a-AYBSbfL5ckV5KVYJ~gOIovBL8~-aLY8cqxru0aKssEUF~aXMHL~Q__"
                alt="Sponsor Qualification"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">{t.sponsor.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.sponsor.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Who Can Be Sponsored */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">{t.sponsored.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.sponsored.content}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/SNunBhAdXlz5RhNsw0eVAp-img-3_1770159655000_na1fn_ZmFtaWx5Y2xhc3Mtc3BvbnNvcmVk.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1NOdW5CaEFkWGx6NVJoTnN3MGVWQXAtaW1nLTNfMTc3MDE1OTY1NTAwMF9uYTFmbl9abUZ0YVd4NVkyeGhjM010YzNCdmJuTnZjbVZrLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kgXoM7oPnyuQNkm4absV9ctSvsZkvwfwi9-HXNEekY8Tfm3Zqi8Sg29omFxo4JjttCCFB-Fk8DGSVdKvJizqU77wCwpaBe-MQIpfAihnWTxpyfWRu5kSVYHmgNjiramhTpJcFzgleBrzIPAQ0SkO2QY-2H0CLPW~b5XGhFkkzZ4YbzVntK1aSwGMzm4DDn8nEvJavQYi9An6HicrJeTgbCkE1xYcgm8plz3FgQGOkmYTv2sbWYzfCvHHDq2twmnmJJSWGooUKZMHvVl2BpYxkW691Z0iV-viJbLYKeK0uK-mYaYU~-hx4oVyzxpCRGbtgo6lmpZ9OsAo5sbRFZOjfg__"
                alt="Sponsored Family Members"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Process & Flow */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.process.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.process.inlandOutland}</p>
          </div>

          <FamilyClassProcessFlow isEnglish={isEnglish} />

          <div className="text-center mt-12">
            <Link href="/booking">
              <Button
                size="lg"
                className="px-8 py-3 bg-accent text-white hover:bg-accent/90 transition-colors font-bold text-lg"
                style={{ borderRadius: '0px' }}
              >
                {t.process.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Success Cases */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.successCases.title}</h2>
            <p className="text-lg text-muted-foreground">{t.successCases.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm font-semibold text-accent mb-2">{caseItem.category}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{caseItem.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-semibold">Timeline:</span> {caseItem.timeline}
                    </p>
                    <p>
                      <span className="font-semibold">Key Point:</span> {caseItem.keyPoint}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
