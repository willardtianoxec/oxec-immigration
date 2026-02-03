import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BusinessClass() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();

  const content = {
    zh: {
      nav: {
        back: "返回主页",
        language: "ENG",
      },
      overview: {
        title: "投资移民：BC省企业家移民项目",
        text: "加拿大一向欢迎境外投资。作为加拿大经济最活跃的地区之一，温哥华所在的 BC 省拥有长期、稳定运行的省提名计划（BC PNP）企业家项目，旨在吸引能够促进当地经济增长的全球优秀商业人才。",
      },
      whoApplies: {
        title: "谁适合企业家移民项目？",
        text: "该项目主要针对拥有企业高级管理经验或企业实际控制人经验的申请人。如果您在商业领域建树颇丰，但在年龄或语言能力方面相对于传统的雇主担保项目不占优势，BC 企业家移民将是您的理想路径。",
      },
      categories: {
        title: "三大分支项目",
        items: [
          {
            name: "基础类",
            description: "面向个人企业家，主要审核申请人及配偶的家庭净资产和个人投资能力。资金门槛中等，要求个人出资并实际参与企业经营，投资地点可选择 BC 省内任意城市或社区。该类别采用 EOI 打分筛选机制，每份申请仅提名申请人本人及家庭成员。",
          },
          {
            name: "战略项目",
            description: "以海外企业作为申请主体，重点审核的是公司资产、企业规模和商业可行性，而非个人家庭资产。投资金额通常较高，适合已有成熟业务、计划在 BC 设立分支机构的企业。该类别不进入 EOI 打分池，且可一次性提名最多 5 名关键员工及其家庭成员。",
          },
          {
            name: "区域试点",
            description: "面向个人企业家，审核对象仍为个人及家庭资产，但资金和投资门槛明显低于基础类。项目必须落地于 BC 省指定的中小城市或社区，并取得当地推荐。采用简化的打分和社区审核结合方式，地域限制明确，但整体竞争压力相对较低，仅提名申请人本人及家庭成员。",
          },
        ],
      },
      process: {
        title: "项目申请流程",
        text: "从考察、商业计划书准备、注册、受邀（ITA）、工作签证到最终获得提名的基本流程：",
        steps: [
          "初步评估与咨询",
          "准备商业计划书与财务文件",
          "提交 EOI（意向书）或直接申请",
          "获得邀请（ITA）",
          "申请工作签证",
          "获得省提名",
          "申请永久居民身份",
        ],
      },
      cta: "立即预约专业咨询",
      successCases: "投资移民成功案例",
    },
    en: {
      nav: {
        back: "Back to Home",
        language: "中文",
      },
      overview: {
        title: "Investment Immigration: BC Entrepreneur Immigration Program",
        text: "Canada has always welcomed foreign investment. As one of Canada's most economically vibrant regions, British Columbia, home to Vancouver, operates a long-established and stable Provincial Nominee Program (BC PNP) Entrepreneur category, designed to attract globally talented business professionals who can promote local economic growth.",
      },
      whoApplies: {
        title: "Who Should Apply for the Entrepreneur Immigration Program?",
        text: "This program is primarily designed for applicants with senior management experience in enterprises or actual control experience. If you have achieved significant accomplishments in the business field but lack advantages in age or language proficiency compared to traditional employer-sponsored programs, BC Entrepreneur Immigration is your ideal pathway.",
      },
      categories: {
        title: "Three Program Categories",
        items: [
          {
            name: "Base Category",
            description: "Designed for individual entrepreneurs, primarily assessing the household net assets and personal investment capacity of applicants and spouses. The financial threshold is moderate, requiring personal investment and active participation in business operations. Investment location can be any city or community in BC. This category uses an EOI scoring mechanism, nominating only the applicant and family members.",
          },
          {
            name: "Strategic Projects",
            description: "Uses overseas enterprises as the application entity, focusing on company assets, enterprise scale, and business viability rather than personal household assets. Investment amounts are typically higher, suitable for established businesses planning to establish branch operations in BC. This category does not enter the EOI scoring pool and can nominate up to 5 key employees and their family members in a single application.",
          },
          {
            name: "Regional Pilot",
            description: "Designed for individual entrepreneurs, assessing personal and household assets, but with significantly lower financial and investment thresholds than the base category. Projects must be located in designated small and medium-sized cities or communities in BC and obtain local endorsement. Using simplified scoring and community review combined approach, with clear geographic restrictions but relatively lower overall competition, nominating only the applicant and family members.",
          },
        ],
      },
      process: {
        title: "Application Process",
        text: "The basic process from site visit, business plan preparation, registration, invitation (ITA), work visa to final nomination:",
        steps: [
          "Initial Assessment and Consultation",
          "Prepare Business Plan and Financial Documents",
          "Submit EOI (Expression of Interest) or Direct Application",
          "Receive Invitation (ITA)",
          "Apply for Work Visa",
          "Receive Provincial Nomination",
          "Apply for Permanent Residence",
        ],
      },
      cta: "Schedule Professional Consultation Now",
      successCases: "Investment Immigration Success Cases",
    },
  };

  const t = isEnglish ? content.en : content.zh;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t.nav.back}</span>
          </button>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
          >
            {t.nav.language}
          </button>
        </div>
      </div>

      {/* Section 1: Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t.overview.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.overview.text}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/CzR3vynOXwkVLil8nGhSBg-img-1_1770078013000_na1fn_YnVzaW5lc3NjbGFzcy1vdmVydmlldw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0N6UjN2eW5PWHdrVkxpbDhuR2hTQmctaW1nLTFfMTc3MDA3ODAxMzAwMF9uYTFmbl9ZblZ6YVc1bGMzTmpiR0Z6Y3kxdmRtVnlkbWxsZHcuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cw6W1ZIETdX8HrY4NNZvR6LvGgBSfqn6hou0CDb7S01xgcSK9K7Mp~b7YBq9H6AIne6aFiUMn6QuPCqJ3iVBN7uxjvsARZWAzbgsX4tgg7AQshvpmujeZpnaJ28lzzMziBhLeieMj5XTWtRjxV0Nwe3G1oyocX6SPMCOGpFBRA-HbrIkeQqG9no0ZMI1qXzApjC2GGj8mG0XG1gH4461JurZ6qkh05TE8MapIqGo-k2ohfOsKNkMpJMEta5UAn6wP40OUxri-Ot7zR8Od6MT1Zko4Ru5JW911H6Sse3lZdh7zGER6CEfjGe3TSQu7xH01weB9ttg71gqUo54C9~8eg__"
                alt="Vancouver BC Skyline"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: "16/9" }}
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
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/CzR3vynOXwkVLil8nGhSBg-img-2_1770078023000_na1fn_YnVzaW5lc3NjbGFzcy13aG8tYXBwbGllcw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0N6UjN2eW5PWHdrVkxpbDhuR2hTQmctaW1nLTJfMTc3MDA3ODAyMzAwMF9uYTFmbl9ZblZ6YVc1bGMzTmpiR0Z6Y3kxM2FHOHRZWEJ3YkdsbGN3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ZZOETabnRFCdTJq6PJe2zRKrtDmcq8YWH6dTBGzgQQuA3iyhLZwx3h258b8U60OzDz4UPqdK5HbWCILP4zTMoIfCnDooHZG~gSuqq1RDRdqk4~lXE3sDk777n1yU5wu03VpL4y69S4ZFkCFt3qrkExCld2w1P131ZOm7SxSxdCjwenjRmJMsmOhU0keeoa9vwoIcSsEljybyt7pzSIJNuXguywfTovyltKyxrZTwWDsDU788aJINDVZqmCS6ctxW3kB-uMh0VtIWdW1gE~rwEhFZgFSJaVsuBz~Xx-x9jB2wIGz4al1ha5up5CphZpDKCvEXWnkV3koWV4rmWZqIAQ__"
                alt="Business Meeting"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t.whoApplies.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.whoApplies.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Categories */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                {t.categories.title}
              </h2>
              <div className="space-y-8">
                {t.categories.items.map((item, index) => (
                  <div key={index} className="border-l-4 border-accent pl-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/CzR3vynOXwkVLil8nGhSBg-img-3_1770078011000_na1fn_YnVzaW5lc3NjbGFzcy1jYXRlZ29yaWVz.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0N6UjN2eW5PWHdrVkxpbDhuR2hTQmctaW1nLTNfMTc3MDA3ODAxMTAwMF9uYTFmbl9ZblZ6YVc1bGMzTmpiR0Z6Y3kxallYUmxaMjl5YVdWei5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tHHDgE5VW3LYOJJ8Jq0W7xHU6WWGqqO5hkrE5teiqZMZKkgkCDdaUQx0kJT0XLPWcnnXOrlzXee~kufMM5lmTZKv2sG8KmLMlLSRDjSVlOLDX0hzT3xxsshz3O9ZiVozawixuz228E~ONo5qAFaSWf6Z4wuP4ZgPfik1F2AKe1O7BBkgvaxPNhvRtjaN1djF7wTrCM9D6x1y4gQtQV5DxnDOzIjPahKhhDmFyRlIeQpQ747X~jCqHfqwfUDh9CeXmlUX~-PB4HsWpV7zh-U2J45O6RyTUWCU7LxgHGRLQjO4TGVaRBq-eajKmRr9OMvCuh3N9nV7BIr0LQDVA6Am~w__"
                alt="BC Regions"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/CzR3vynOXwkVLil8nGhSBg-img-4_1770078029000_na1fn_YnVzaW5lc3NjbGFzcy1wcm9jZXNz.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0N6UjN2eW5PWHdrVkxpbDhuR2hTQmctaW1nLTRfMTc3MDA3ODAyOTAwMF9uYTFmbl9ZblZ6YVc1bGMzTmpiR0Z6Y3kxd2NtOWpaWE56LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eo67CWQb70EaHi-yh-Umy1uhw8wMC~zyokHWe-LBq9JGNRJMGMD4tqdQdVY0cL2o9YECVe~~jZu634On~PTuEHarW~X9i5~dh2wVyRp8G9Ogr6FxUuwAy3y4zBj5FxUJ7gLhjrisjgNefKKSwhqLR2UOmCHdpi2WCjorH48YWRTmMzNTKH69GevKbLjckb1SORnek4tkd5wakv-jPTuo2FZBgQFq~cRIkKhx69MKyVfxVG3epr2dwBoooVEDdj82fwTWpK5KMBVh2Now4DUU6xfIMTH7yuGfdorsYswf1-B5xTwbdVfGj9ZilNsSOkvyFibBodFEumsw9SHxrxvYcw__"
                alt="Process Flowchart"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t.process.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t.process.text}
              </p>
              <ol className="space-y-3">
                {t.process.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-8 h-8 bg-accent text-white rounded-full font-bold flex-shrink-0">
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

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            {isEnglish
              ? "Ready to Start Your Investment Immigration Journey?"
              : "准备开启您的投资移民之旅了吗？"}
          </h2>
          <a href="/booking">
            <Button
              size="lg"
              className="bg-white text-accent hover:bg-gray-100 font-bold text-lg px-8 py-6"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Success Cases Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t.successCases}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isEnglish
                ? "Real success stories from our clients"
                : "来自我们客户的真实成功故事"}
            </p>
          </div>

          {/* Success Cases Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <p className="text-sm text-accent font-semibold mb-2">
                  {isEnglish ? "2023" : "2023年"}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {isEnglish
                    ? "BC Retail Business Acquisition"
                    : "BC零售企业收购成功案例"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Successful acquisition of retail stores in Vancouver with investment of 800K CAD"
                    : "成功收购温哥华零售店铺，投资80万加元"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <p className="text-sm text-accent font-semibold mb-2">
                  {isEnglish ? "2024" : "2024年"}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {isEnglish
                    ? "Tech Startup Strategic Category"
                    : "科技初创公司战略类别获批"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Singapore tech company established R&D center in Vancouver"
                    : "新加坡科技公司在温哥华建立研发中心"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <p className="text-sm text-accent font-semibold mb-2">
                  {isEnglish ? "2023" : "2023年"}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {isEnglish
                    ? "Regional Pilot in Kamloops"
                    : "区域试点项目在坎卢普斯成功落地"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isEnglish
                    ? "Real estate consulting business established in Kamloops with 500K investment"
                    : "在坎卢普斯投资50万加元建立房地产咨询公司"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
