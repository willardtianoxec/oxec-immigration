import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';

export default function ReconsiderationPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();

  const t = isEnglish ? {
    nav: {
      back: 'Back to Home',
      language: 'CHN',
    },
    title: 'Visa Refusal and Procedural Fairness Letter',
    overview: {
      title: 'Calmly Face Visa Refusal Risks',
      content: 'Canada\'s entry application threshold ranks among the highest in the world. Every year, countless applicants face visa refusals due to various reasons, disrupting their work, family visits, or study plans. Facing refusal, there\'s no need to panic. OXEC specializes in handling various difficult and refused cases, with rich practical experience to help you turn crisis into opportunity through legal means.',
    },
    challenges: {
      title: 'Why Was Your Application Refused?',
      content: [
        'Misrepresentation: Often due to memory errors or oversights, providing false information on key details such as refusal history, immigration history, or marital status.',
        'Incomplete Documentation: Missing critical supporting documents due to operational errors, or submitting incorrect formats.',
        'Criminal Inadmissibility: Being deemed inadmissible due to criminal records outside Canada.',
      ],
    },
    pfLetter: {
      title: 'Understanding the Procedural Fairness Letter',
      content: 'A Procedural Fairness (PF) Letter is the immigration officer\'s final opportunity to give applicants a chance to respond before making a final refusal decision. When a visa officer has serious doubts about the authenticity of documents or the applicant\'s qualifications (such as suspecting misrepresentation), this letter is issued. This is the critical moment that determines the case\'s fate, requiring a precise legal response within the specified timeframe.',
    },
    solutions: {
      title: 'OXEC\'s Professional Solutions',
      content: [
        'Resubmission and Explanation: Supplement core evidence addressing the refusal reasons with logically rigorous legal defense.',
        'Administrative Appeal: On behalf of clients, file appeals to the Immigration Appeal Division when conditions permit.',
        'PF Letter Deep Response: Professional evidence organization and factual statements to seek withdrawal of doubts.',
        'Criminal Rehabilitation: Assist applicants with foreign criminal records to apply for Rehabilitation, permanently eliminating inadmissibility status.',
      ],
    },
    cta: 'Rescue Your Application - Schedule Urgent Consultation',
  } : {
    nav: {
      back: '返回主页',
      language: 'ENG',
    },
    title: '拒签和程序公正信',
    overview: {
      title: '冷静面对拒签风险',
      content: '加拿大的入境申请门槛位居世界前列，每年都有大量申请人因各种原因面临拒签，导致工作、探亲或学习计划中断。面对拒签，不必过度惊慌。傲赛（OXEC）专注于处理各类疑难及被拒案例，我们拥有丰富的实战经验，助您通过法律途径转危为安。',
    },
    challenges: {
      title: '为什么您的申请会被拒绝？',
      content: [
        '虚假陈述 (Misrepresentation)：常因记忆错误或疏忽，在拒签史、移民史或婚史等关键信息上提供不实说明。',
        '材料不完整 (Incomplete)：因操作失误遗漏关键证明文件，或提交了错误的格式。',
        '刑事不可入境 (Inadmissible)：因在加拿大境外留有犯罪记录，被判定为不可入境。',
      ],
    },
    pfLetter: {
      title: '程序公正信（Procedural Fairness Letter）',
      content: 'PF Letter 是移民局在做出最终拒签决定前给予申请人的最后申辞机会。当签证官对材料真实性或申请人资格产生严重质疑（如怀疑虚假陈述）时会发出此信。这是决定案件生死的关键时刻，必须在规定时间内做出精准的法律回复。',
    },
    solutions: {
      title: '傲赛的专业解决方案',
      content: [
        '重新递交与解释：针对拒签理由补充核心证据，进行逻辑严密的法律辩护。',
        '行政申诉 (Appeal)：在符合条件的情况下，代表客户向移民上诉委员会提出上诉。',
        'PF Letter 深度回复：针对程序公正信进行专业的证据梳理与事实陈述，力求撤销质疑。',
        '刑事洗白 (Criminal Rehabilitation)：协助有境外记录的申请人申请康复（Rehabilitation），永久消除不可入境状态。',
      ],
    },
    cta: '抢救您的申请 - 预约紧急咨询',
  };

  const successCases = [
    {
      title: isEnglish ? 'Misrepresentation Allegation Withdrawn - 5-Year Ban Lifted' : '虚假陈述指控撤销 - 5年禁令解除',
      category: isEnglish ? 'Visa Refusal/PF' : '拒签重审/PF',
      keyPoints: isEnglish ? 'Case Challenge: Misrepresentation allegation; Final Result: Visa approved, ban withdrawn' : '案件难点：虚假陈述指控；最终获批：签证获批，禁令撤销',
      processingTime: isEnglish ? '8 months' : '8个月',
      year: 2023,
    },
    {
      title: isEnglish ? 'Perfect PF Letter Response - Visa Approved' : '程序公正信完美回复 - 签证获批',
      category: isEnglish ? 'Visa Refusal/PF' : '拒签重审/PF',
      keyPoints: isEnglish ? 'Case Challenge: PF Letter response; Final Result: Study permit approved' : '案件难点：PF Letter回复；最终获批：学签获批',
      processingTime: isEnglish ? '6 months' : '6个月',
      year: 2023,
    },
    {
      title: isEnglish ? 'Criminal Rehabilitation Success - Inadmissibility Eliminated' : '刑事康复申请成功 - 不可入境状态消除',
      category: isEnglish ? 'Visa Refusal/PF' : '拒签重审/PF',
      keyPoints: isEnglish ? 'Case Challenge: Criminal rehabilitation; Final Result: Permanent residence approved' : '案件难点：刑事康复申请；最终获批：永久居民身份获批',
      processingTime: isEnglish ? '12 months' : '12个月',
      year: 2024,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t.nav.back}</span>
          </button>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-accent text-white hover:bg-accent/90 transition-colors font-medium"
            style={{ borderRadius: '0px' }}
          >
            {t.nav.language}
          </button>
        </div>
      </nav>

      {/* Section 1: Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.overview.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.overview.content}</p>
            </div>
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-1_1770162528000_na1fn_cmVjb25zaWRlcmF0aW9uLW92ZXJ2aWV3.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTFfMTc3MDE2MjUyODAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxXOTJaWEoyYVdWMy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uOa4eCyL12L5jPJXT4qY4XecneW~hnhNlv1zQwvKoAWVNmPLbzOiIBFuW5nFs5GfdcYl4hVUcvbBi17TZwno-AsoflnW3QXb4b~XXICEKuepxcqF0fdM6QAkVbrTRgDNSLjo5C~3RdhFlM-VqjTXOPMNrVW4tDNI3Ug7~Y~tSdCBxr0TGaK3aJT492iwiVRL~UU3jj92TKn~EoGFA3eeVXivtiwlsz7s4fJ9vc4vfMT-6EQ7gNQv-Tox5eTXMsxOPF7l0I41ntftyAaKp1VXuCVI7cY-9NckuAhEStnxGqZxQVN8l1BmG~2BRY8Yon5~2Zcm1NQJNjBhkqg8es4OrA__"
                alt="Open door to Canada"
                className="w-full h-auto shadow-lg object-cover"
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
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-2_1770162530000_na1fn_cmVjb25zaWRlcmF0aW9uLXJlZnVzYWw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTJfMTc3MDE2MjUzMDAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxYSmxablZ6WVd3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TT8tyb0etBE3bM4iyFncy~oQI1tzeqX6rYekUdY3psnfEcS0gyoF75xyA57n16rAP4GQswfYbPtgt9wBzCTYdVb402aZclR6j42GvS8741iTm9NayRcPQbMMq7Xv5mZiYhVmlru6n~hUrz7AdPaiRSfXSPWa2f554-UNxs8Gr84wDn3qcxG4NGwLAKdgIV2LveaanN5C738DR6dQrf6W5O1S3~IH8DnncdZVBBWkFSyj1xrAjDRWzOm2~2Fg7tvmKs2Qsxz7PRAT488UQ5cdPjGxgMGO5YlbtdyA4-afRvGJe6KjZAD6tEW3DCk3KhBbC0ohykuGZnYBSglOwWZvjQ__"
                alt="Refused stamp"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.challenges.title}</h2>
              <div className="space-y-4">
                {t.challenges.content.map((item, idx) => (
                  <p key={idx} className="text-lg text-muted-foreground leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: PF Letter Explanation */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.pfLetter.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.pfLetter.content}</p>
            </div>
            <div>
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/Et35ZRYRa73QJkrxcQLmL5-img-3_1770162536000_na1fn_cmVjb25zaWRlcmF0aW9uLXNvbHV0aW9ucw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L0V0MzVaUllSYTczUUprcnhjUUxtTDUtaW1nLTNfMTc3MDE2MjUzNjAwMF9uYTFmbl9jbVZqYjI1emFXUmxjbUYwYVc5dUxYTnZiSFYwYVc5dWN3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VNo9Qygri8Kels0VtMlLPnlF5HthK-xbSO2Ftk~7ME5TmOUSUVPUTrf8KnoQENPi0OAvqCx3NFg7NoWJ~wXXVk6-Kvp0XYQrscaEOKVeP2AevAupQINSKZAFEbYz33nsjo2GL0XH4CxhfEF-9oiZ1S1LG~ouJjp7f6WiBNCoaoRefrGhINDi6FQnfSZMipaVL1I~PR98Px1L0GL5ARo18czY-TUylsT8PUnVj3uLNUTmzND9mORrK9ZV3Dzhvev1xTWsAhJ~GZsjAyseMxvXC597w3PS~08pOaXRhYhnn6-DgP-UWlyERP9UT4hUdt4InOzpTECmmUSgIc1uBn3Mtg__"
                alt="Professional team"
                className="w-full h-auto shadow-lg object-cover"
                style={{ aspectRatio: '16/9', borderRadius: '0px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{t.solutions.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {t.solutions.content.map((solution, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg text-muted-foreground leading-relaxed">{solution}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/booking')}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg font-semibold"
              style={{ borderRadius: '0px' }}
            >
              {t.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isEnglish ? 'Success Cases - Visa Refusal Reconsideration' : '成功案例 - 拒签重审'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isEnglish ? 'Real stories of clients who successfully overturned visa refusals' : '真实案例：成功翻转拒签的客户故事'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((caseItem, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{caseItem.title}</h3>
                  <p className="text-sm text-blue-100 mb-4">{caseItem.category}</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>{isEnglish ? 'Processing Time:' : '处理周期：'}</strong> {caseItem.processingTime}</p>
                    <p><strong>{isEnglish ? 'Success Year:' : '成功年份：'}</strong> {caseItem.year}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground leading-relaxed">{caseItem.keyPoints}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: '#203341' }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">{isEnglish ? 'Contact Us' : '联系我们'}</h3>
              <p className="text-gray-300">
                {isEnglish ? 'Email: info@oxec.ca' : '邮箱：info@oxec.ca'}
              </p>
              <p className="text-gray-300">
                {isEnglish ? 'Phone: +1-604-XXX-XXXX' : '电话：+1-604-XXX-XXXX'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{isEnglish ? 'Services' : '服务项目'}</h3>
              <ul className="text-gray-300 space-y-2">
                <li>{isEnglish ? 'Visa Refusal' : '拒签重审'}</li>
                <li>{isEnglish ? 'PF Letter Response' : 'PF Letter回复'}</li>
                <li>{isEnglish ? 'Criminal Rehabilitation' : '刑事康复'}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{isEnglish ? 'Location' : '地址'}</h3>
              <p className="text-gray-300">
                {isEnglish ? 'Burnaby, BC, Canada' : '加拿大卑诗省本拿比'}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OXEC Immigration. {isEnglish ? 'All rights reserved.' : '版权所有。'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
