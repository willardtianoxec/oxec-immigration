import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function PRCard() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();

  const t = isEnglish
    ? {
        nav: {
          back: "Back to Home",
          language: "中文",
        },
        overview: {
          title: "PR Card Renewal: Maintaining Your Permanent Resident Status",
          text: "As a Canadian Permanent Resident (PR), holding a valid PR card is an essential document for entering and exiting Canada and maintaining your status. According to Canadian law, permanent residents must have accumulated at least 730 days (2 years) of physical presence in Canada within the past 5 years. Timely and compliant PR card renewal is crucial to safeguard your long-term rights and privileges in Canada.",
        },
        challenges: {
          title: "Why Your PR Card Renewal May Face Risks?",
          text: "In practice, many permanent residents face renewal obstacles due to the following situations:\n\n• Miscalculation of Residency Time: Frequent international travel can result in insufficient accumulated days in Canada, falling short of the required 730 days.\n\n• Prolonged Overseas Stay: Due to family emergencies, health issues, or unforeseen circumstances, you may have been unable to return to Canada on time, resulting in insufficient residency duration.\n\n• Urgent Domestic Matters: Unexpected emergencies in your home country requiring immediate departure, but your PR card has expired or is about to expire, leaving you unable to return to Canada.",
        },
        solutions: {
          title: "OXEC's Professional Solutions: Humanitarian Exemptions & Expedited Processing",
          text: "For cases involving insufficient residency time or urgent travel needs, we offer two core solutions:\n\n• Humanitarian & Compassionate (H&C) Exemption Application: If you were unable to meet the residency requirement due to circumstances beyond your control, we can assist you in applying for a waiver of the residency requirement based on humanitarian and compassionate grounds.\n\n• Urgent Processing Service: For clients with urgent travel needs (such as serious illness of immediate family members or urgent business travel), we can apply for expedited processing, significantly reducing the approval timeline.",
        },
        trust: {
          title: "Trust OXEC for Professional Protection of Your PR Status",
          text: "While PR card renewal may appear straightforward, any residency time deficiency can trigger immigration investigations and potentially result in loss of status. OXEC has accumulated extensive practical experience in handling complex PR card renewals and humanitarian exemption cases. We are committed to protecting your permanent resident status through professional legal guidance and strategic case management.",
          button: "Protect Your PR Status - Consult an Expert Now",
        },
      }
    : {
        nav: {
          back: "返回主页",
          language: "ENG",
        },
        overview: {
          title: "枫叶卡续签：维系您的永久居民身份",
          text: "作为加拿大永久居民（PR），持有有效的枫叶卡是您出入国境及维持身份的必要凭证。根据法律要求，永久居民通常需在过去五年内在加拿大境内累计住满 730 天。准时且合规地完成续卡申请，是保障您在加拿大长期生活权益的关键一步。",
        },
        challenges: {
          title: "为什么您的续卡申请可能面临风险？",
          text: "在实际申请中，许多永久居民常因以下突发状况导致续签受阻：\n\n• 居住时间计算失误：因频繁出入境，导致实际居留天数未能精准达到 730 天。\n\n• 因故滞留境外：由于家庭、健康或突发外部环境因素，未能及时返回加拿大，导致居留时长不足。\n\n• 原籍国紧急状况：国内发生必须亲自处理的紧急事务需要立即离境，但此时枫叶卡已过期或即将到期，面临\"出得去、进不来\"的困境。",
        },
        solutions: {
          title: "困局之下：人道豁免与加急办理",
          text: "针对居留时间不足或紧急离境的需求，我们提供两种核心应对方案：\n\n• H&C 人道理由豁免申请：若您因无法控制的特殊原因未能住满规定时间，我们可协助您通过\"人道主义和同情理由（Humanitarian & Compassionate grounds）\"向移民局申请居留要求豁免。\n\n• 加急续签处理 (Urgent Processing)：针对有紧急旅行需求（如直系亲属重病、商务紧急出差等）的客户，我们可以申请加急处理通道，显著缩短获批周期。",
        },
        trust: {
          title: "信任傲赛，专业护航",
          text: "枫叶卡续签看似流程简单，但一旦涉及居留时间瑕疵，极易触发移民局的背景调查甚至导致身份丧失。傲赛（OXEC）在处理各类疑难续卡、人道豁免案件中积累了深厚的实战经验。我们致力于通过专业的法律指导和战略性的案件管理，为您的永久居民身份保驾护航。",
          button: "保护您的 PR 身份 - 立即咨询专家",
        },
      };

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
            style={{borderRadius: '0px'}}
          >
            {t.nav.language}
          </button>
        </div>
      </div>

      {/* Section 1: Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.overview.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.overview.text}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/dkNyJ2ZpH4nPNmNJgUI8V8-img-1_1770160568000_na1fn_cHJjYXJkLW92ZXJ2aWV3.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L2RrTnlKMlpwSDRuUE5tTkpnVUk4VjgtaW1nLTFfMTc3MDE2MDU2ODAwMF9uYTFmbl9jSEpqWVhKa0xXOTJaWEoyYVdWMy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VVRE4o~NK0XaFIpniY2g1sZkLlRHwbPah~7s9Y53aJm3mfSqnFs~nY0oYj6wnyCGHQVrusrM5YUBYX5b6mqzTeaqTIhgOyXtxfwm5cKk6RNoJa1w7lir2deEaWqwdyBVqdASqc7gTeT47D7QZyCFkYjxNh8rcu-HrzpmoMs4ageGe7OOlObkkovEK72Rg5mPEkVPHjF0kOdyMGB5NzN3rPm7whvr5l1yrz3KZ~9pnZd38ypi1esWER7UCAVVkRWQgvcKU3nqcv-nk5Wz1xu166wx3jd47Ud0zKKCaF42-ca9AfoZjmFX3gb8gbSQesXJKYsQ28QG7fBJxtJaqpPXRA__"
                alt="PR Card and Passport"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Challenges */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/dkNyJ2ZpH4nPNmNJgUI8V8-img-2_1770160565000_na1fn_cHJjYXJkLWNoYWxsZW5nZXM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L2RrTnlKMlpwSDRuUE5tTkpnVUk4VjgtaW1nLTJfMTc3MDE2MDU2NTAwMF9uYTFmbl9jSEpqWVhKa0xXTm9ZV3hzWlc1blpYTS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v~hwQm1aAQZ6fHXU4E9EGjwyTId1gc2lDCSZgJxPsJBZpAyU-y6kjL0d8HcfHy3puIjBNYdP3Ygb4o6ravBBri~Zt8IMHzcvJF~MQH-pVpGmBfVBtQErZsy-YPzaX~K9pTIq1EAbL0tzATHd6QTyb4Kc4cf9aH0~OzHPzKGIzc3tW5d4oZJOub8mqfRTAGW6GeIw3GJfenL0e78DCqljjPgSUH5FcsfNMrIC2O3KNjg4~oCo-4Vw7RjgzfJnZtdAxEJzYh7f3RpOau8-Ab3dqLCBw-XQrNKxeu7-ztxkxdwOQOdJybHH-yHIu6zccEH0CUrWR49Rv-wNNR-fGOwhWg__"
                alt="Anxious Applicant"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.challenges.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.challenges.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Solutions */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.solutions.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{t.solutions.text}</p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/dkNyJ2ZpH4nPNmNJgUI8V8-img-3_1770160564000_na1fn_cHJjYXJkLXNvbHV0aW9ucw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L2RrTnlKMlpwSDRuUE5tTkpnVUk4VjgtaW1nLTNfMTc3MDE2MDU2NDAwMF9uYTFmbl9jSEpqWVhKa0xYTnZiSFYwYVc5dWN3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=YG1nHUfw3-MIDwMm1ZmlUwmUrSIRxv0jPPs9yKMvZKLsIAU5dpWLm9kihOHMIMBOx0YhBZsGgKltHCfiJ1hqoElwHTGNyMrK4-5yHld7~K1K9HyLKGueTfda0-Ag89f5Lm1YkBAGrWFzFdF5rzf~mNGVZarV5DtXCAbTj1BIGXBiVkKopmfBEmvO3~QMt~oPSDSzSkiQ9O6XR0qlfw~I~9Od6wkv7pinDf0M0hfHJxhMzdCrP1e4ccoVzv7KMOKtcRhAjlPKSl0XMEPHacjjQIGrzBxJMyMp7o6L4sSNUf85i3G4p7EhWZ63-7kxdMOq1hCCNgIN3lj4tJxXVSujqA__"
                alt="Modern Solutions"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Trust OXEC */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-accent" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">{t.trust.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">{t.trust.text}</p>
          
          <Link href="/booking">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold rounded-lg">
              {t.trust.button}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#203341] text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">关于我们 / About</h3>
              <p className="text-gray-300 text-sm leading-relaxed">傲赛（OXEC）移民事务所 - 专业、领先、值得信赖的加拿大移民合作伙伴</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">服务 / Services</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="/businessclass" className="hover:text-white transition">投资移民 / Business Immigration</a></li>
                <li><a href="/familyclass" className="hover:text-white transition">家庭团聚 / Family Sponsorship</a></li>
                <li><a href="/prcard" className="hover:text-white transition">枫叶卡续签 / PR Card Renewal</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">联系方式 / Contact</h3>
              <p className="text-gray-300 text-sm">电话 / Phone: (604) 555-0123</p>
              <p className="text-gray-300 text-sm">邮箱 / Email: info@oxec.ca</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">地址 / Address</h3>
              <p className="text-gray-300 text-sm">Burnaby, BC, Canada</p>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 OXEC Immigration Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
