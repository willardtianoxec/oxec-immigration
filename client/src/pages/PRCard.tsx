"use client";

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function PRCard() {
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

  const content = {
    zh: {
      nav: {
        back: "返回主页",
        language: "ENG",
      },
      title: "枫叶卡续签与加急",
      overview: {
        title: "枫叶卡续签与加急：保持您的永久居民身份",
        text: "加拿大永久居民卡（PR卡）是您在加拿大的身份证明。如果您的PR卡即将过期或已经过期，或者您需要紧急入境加拿大处理家庭紧急情况，傲赛提供专业的续签和加急办理服务。",
      },
      whoApplies: {
        title: "谁需要续签或加急办理PR卡？",
        text: "任何PR卡即将过期（通常在过期前9个月）或已经过期的永久居民都需要续签。此外，如果您因家庭紧急情况（如家人病危、突发事故等）需要紧急返回加拿大，我们提供人道豁免和加急办理服务。",
      },
      categories: {
        title: "我们的服务",
        items: [
          {
            name: "常规续签",
            description: "标准的PR卡续签流程，适用于卡片即将过期或已过期的申请人。我们协助您准备所有必需文件，确保申请符合加拿大移民局的所有要求。处理时间通常为4-6周。",
          },
          {
            name: "加急办理",
            description: "如果您需要更快获得PR卡，我们提供加急服务。这对于计划出国旅行或需要快速返回加拿大的申请人特别有用。加急处理通常可在2-3周内完成。",
          },
          {
            name: "人道豁免",
            description: "在紧急情况下（如家人病危、重大事故等），我们可以帮助您申请人道豁免，允许您在没有有效PR卡的情况下紧急返回加拿大。这需要证明确实存在紧急情况和不可预见的困难。",
          },
        ],
      },
      process: {
        title: "项目申请流程",
        text: "无论是常规续签还是加急办理，我们都遵循以下流程确保您的申请顺利进行：",
        steps: [
          "初步咨询与资格评估",
          "准备所需文件与照片",
          "提交申请至加拿大移民局",
          "跟踪申请进度",
          "接收并激活新的PR卡",
        ],
      },
      cta: "立即预约咨询",
      readyText: "准备续签您的枫叶卡了吗？",
    },
    en: {
      nav: {
        back: "Back to Home",
        language: "中文",
      },
      title: "PR Card Renewal & Urgent Processing",
      overview: {
        title: "PR Card Renewal & Urgent Processing: Maintain Your Permanent Resident Status",
        text: "The Canadian Permanent Resident Card (PR Card) is your proof of identity as a permanent resident. If your PR card is expiring soon or has already expired, or if you need urgent entry to Canada to handle a family emergency, OXEC provides professional renewal and urgent processing services.",
      },
      whoApplies: {
        title: "Who Needs PR Card Renewal or Urgent Processing?",
        text: "Any permanent resident whose PR card is expiring soon (typically within 9 months of expiration) or has already expired needs renewal. Additionally, if you need to urgently return to Canada due to a family emergency (such as a seriously ill family member or sudden accident), we provide humanitarian exemption and urgent processing services.",
      },
      categories: {
        title: "Our Services",
        items: [
          {
            name: "Standard Renewal",
            description: "Standard PR card renewal process for applicants whose cards are expiring soon or have expired. We assist you in preparing all required documents to ensure your application meets all requirements of Immigration, Refugees and Citizenship Canada. Processing time is typically 4-6 weeks.",
          },
          {
            name: "Urgent Processing",
            description: "If you need to obtain your PR card faster, we offer urgent processing services. This is especially useful for applicants planning international travel or needing to quickly return to Canada. Urgent processing can typically be completed within 2-3 weeks.",
          },
          {
            name: "Humanitarian Exemption",
            description: "In emergency situations (such as a seriously ill family member or major accident), we can help you apply for a humanitarian exemption, allowing you to urgently return to Canada without a valid PR card. This requires proof of a genuine emergency and unforeseen hardship.",
          },
        ],
      },
      process: {
        title: "Application Process",
        text: "Whether it's standard renewal or urgent processing, we follow this process to ensure your application proceeds smoothly:",
        steps: [
          "Initial Consultation & Eligibility Assessment",
          "Prepare Required Documents & Photos",
          "Submit Application to Immigration Canada",
          "Track Application Progress",
          "Receive & Activate Your New PR Card",
        ],
      },
      cta: "Book a Consultation Now",
      readyText: "Ready to renew your PR card?",
    },
  };

  const currentContent = isEnglish ? content.en : content.zh;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80">
              <img src="/oxec-logo.png" alt="OXEC" className="h-8" />
              <span className="font-bold text-lg">OXEC</span>
            </a>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="text-gray-700 hover:text-blue-600">
                {isEnglish ? "Home" : "首页"}
              </a>
            </Link>

            <div className="relative group">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                {isEnglish ? "Services" : "服务"}
                <ChevronDown size={16} />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg">
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/success-cases">
              <a className="text-gray-700 hover:text-blue-600">
                {isEnglish ? "Success Cases" : "成功案例"}
              </a>
            </Link>

            <Link href="/blog">
              <a className="text-gray-700 hover:text-blue-600">
                {isEnglish ? "Blog" : "博客"}
              </a>
            </Link>

            <Link href="/team">
              <a className="text-gray-700 hover:text-blue-600">
                {isEnglish ? "About" : "关于我们"}
              </a>
            </Link>

            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
            >
              {currentContent.nav.language}
            </button>

            <Link href="/booking">
              <a>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  {isEnglish ? "Book Consultation" : "预约咨询"}
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1
              className="text-foreground mb-6"
              style={{
                fontFamily: '"Alibaba PuHuiTi", sans-serif',
                fontWeight: 900,
                fontSize: "48px",
              }}
            >
              {currentContent.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {currentContent.overview.text}
            </p>
            <Link href="/booking">
              <a>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  {currentContent.cta}
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2
                className="text-foreground mb-6"
                style={{
                  fontFamily: '"Alibaba PuHuiTi", sans-serif',
                  fontWeight: 900,
                  fontSize: "48px",
                }}
              >
                {currentContent.overview.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {currentContent.overview.text}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/XnGLwIhhmxNA7O3v0G3qAj-img-1_1771374647000_na1fn_aHVtYW5pdGFyaWFuLWV4ZW1wdGlvbi1zY2VuZQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1huR0x3SWhobXhOQTdPM3YwRzNxQWotaW1nLTFfMTc3MTM3NDY0NzAwMF9uYTFmbl9hSFZ0WVc1cGRHRnlhV0Z1TFdWNFpXMXdkR2x2YmkxelkyVnVaUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vVZUQ~LLvgLrkTcEFF9iBC8MlXEllGb2vGHEf~tBsgao2jXoneakcdT3DXImf8T1VjUDs1ofzGi1Kx5hJ4UpNrnuNfUi~WBFzkIDjy~WBvSUb7PQ3K8sjxB7Y7yjUMUSjg2wDhl6-fFqzeoax8c2eWVRehtQabqG7zegOTMOPBFrgkvsB~8IA4Mr~S-TjhXUgsmI~4tErUW4xpLAp0dqaEOgwXBsOA2qPp7qkBGJt-xDU66UGUk8Wmik6xci3dExCGKt3x-vW657lOjLvPD51epSjDmFMLTS4tyx3GdtFzpHZFmW7Zl3qEJoHyTTUigsLOG2MsRHZN4PkZtxlNZ2-w__"
                alt="人道豁免场景"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who Applies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/XnGLwIhhmxNA7O3v0G3qAj-img-2_1771374626000_na1fn_dXJnZW50LWJvYXJkaW5nLXNjZW5l.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1huR0x3SWhobXhOQTdPM3YwRzNxQWotaW1nLTJfMTc3MTM3NDYyNjAwMF9uYTFmbl9kWEpuWlc1MExXSnZZWEprYVc1bkxYTmpaVzVsLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pGVVQvvruP~2Hd6SqSf8pdVPvZWYymzC8ydg8smB2SJkZg2rP8E~nkXjnIL0SVWD4jMSIqrx8mZwqw7lz0avbYUAM9GLh7U2j937EPBHGxoOtKIXvFCXfoEfZZakYO7tIFZSpLYlziE4jcSY8WYoxP6dlpPop~j9rfoCSmadtNlPRn9JUvuyQtJE8mSFG4ViTqrzt7RHMKGyLAPgF4Pf15SYLaRPLglX7UF34o7fHSzEmwreMALBL6xgKbiKDyCwrF5LDMmoDxVYQn3mVMUXhGiHLTlV-Sh7fduhqvToCFDu2~aQpqkdE-2NomSjOYuNpxd9BSX0J-8oz3kwAUB3-w__"
                alt="旅客紧急登机"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2
                className="text-foreground mb-6"
                style={{
                  fontFamily: '"Alibaba PuHuiTi", sans-serif',
                  fontWeight: 900,
                  fontSize: "48px",
                }}
              >
                {currentContent.whoApplies.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {currentContent.whoApplies.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-foreground text-center mb-16"
            style={{
              fontFamily: '"Alibaba PuHuiTi", sans-serif',
              fontWeight: 900,
              fontSize: "48px",
            }}
          >
            {currentContent.categories.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.categories.items.map((item, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {item.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2
                className="text-foreground mb-6"
                style={{
                  fontFamily: '"Alibaba PuHuiTi", sans-serif',
                  fontWeight: 900,
                  fontSize: "48px",
                }}
              >
                {currentContent.process.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {currentContent.process.text}
              </p>

              <ol className="space-y-4">
                {currentContent.process.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-lg text-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="order-1 md:order-2">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">
                    {isEnglish ? "Need Help?" : "需要帮助？"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isEnglish
                      ? "Our team is ready to assist you with your PR card renewal or urgent processing needs."
                      : "我们的团队已准备好协助您处理PR卡续签或加急办理需求。"}
                  </p>
                  <Link href="/booking">
                    <a>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                        {currentContent.cta}
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 bg-cover bg-center text-white relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=400&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">{currentContent.readyText}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? "Let our experienced team guide you through the process smoothly and efficiently."
              : "让我们经验丰富的团队为您顺利高效地指导整个流程。"}
          </p>
          <Link href="/booking">
            <a>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                {currentContent.cta}
              </Button>
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
