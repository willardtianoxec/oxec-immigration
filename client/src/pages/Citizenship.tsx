import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Citizenship() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();

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
            {isEnglish ? "Canadian Citizenship" : "加拿大公民身份"}
          </h1>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isEnglish ? "中文" : "ENG"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        {/* Section 1: Overview - Left Text, Right Image */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "64px" }}>
              {isEnglish
                ? "Become a Canadian Citizen: Opening a New Chapter of Identity"
                : "成为加拿大公民：开启身份的新篇章"}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? "Obtaining Canadian citizenship is an important milestone in every immigrant's journey. As a Canadian citizen, you will enjoy broader rights and protections, including:\n\n• Political Participation: Gain the right to vote and be elected in federal, provincial, and municipal elections.\n\n• Identity Stability: Citizenship is permanent and not subject to residency obligations, and cannot be easily revoked.\n\n• Passport Benefits: Hold one of the world's most powerful passports, enjoying visa-free entry to most countries globally.\n\n• Career Opportunities: Eligible to apply for certain government positions or security-sensitive roles reserved for citizens."
                : "获得加拿大公民身份是每一位移民旅程中的重要里程碑。作为加拿大公民，您将享有更广泛的权利与保障，包括：\n\n• 政治参与权：获得在联邦、省及市政选举中的投票权与被选举权。\n\n• 身份稳定性：公民身份永久有效，不受居住义务（Residency Obligation）的限制，且无法被轻易剥夺。\n\n• 护照便利：持有世界上最强大的护照之一，享受全球多数国家的免签入境待遇。\n\n• 职业机会：有资格申请某些仅限公民担任的政府敏感职位或安全敏感岗位。"}
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/u6aTSFsI93UUCpbJ3kinYK-img-1_1770249464000_na1fn_Y2l0aXplbnNoaXAtb2F0aC1jZXJlbW9ueQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L3U2YVRTRnNJOTNVVUNwYkoza2luWUstaW1nLTFfMTc3MDI0OTQ2NDAwMF9uYTFmbl9ZMmwwYVhwbGJuTm9hWEF0YjJGMGFDMWpaWEpsYlc5dWVRLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=BgYB88TwuZVdf7zdlHJRa8cge~kcCgmm6oHkq8Oe36y-p-5drnJNr-uZtesfY8cJR1rqiOaLrMzixaCbBY-d3a6xRlmaK8dziZjLjeAoFORt24Ww5ykYoQLjZw5lsVm2LXXQV5D8vVOy5H6iEEaRHxS2iwIFa1kuvXVMTfkqKkmHuxkiQqCSir5PKxa49Co5wa8bh~u94MBFvc3YVNFLxXSkmfQV6mcx49uMswAoZ~utIldkRRTEjXXGDcAusUO~OS7jZPlxThU64GSAvCxQkcKNMywXAs1vYFTTBAuiqvG4KPqpjt-lue7HZn6rVx7DWC~vX7fqVbyEPZbeuH-ozg__"
              alt="Citizenship Oath Ceremony"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Section 2: Requirements - Left Image, Right Text */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="flex justify-center lg:order-first">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/u6aTSFsI93UUCpbJ3kinYK-img-2_1770249466000_na1fn_Y2l0aXplbnNoaXAtbGVnYWwtZG9jdW1lbnRz.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L3U2YVRTRnNJOTNVVUNwYkoza2luWUstaW1nLTJfMTc3MDI0OTQ2NjAwMF9uYTFmbl9ZMmwwYVhwbGJuTm9hWEF0YkdWbllXd3RaRzlqZFcxbGJuUnouanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cABEHdxI0alrNfY85ZKeAafRL2apWiA9w39NXf9qaogEmj69b4TKO-vEyHTQCMQwmJb8MaqfLmwF4HYyhPV4DufRcG2sLwLQhZ~KMstjjaWbPEjC7onNGAObzvPsmFF~5~oUowjzlBuoAEmFbO-vpADDKdSd4-Htld4MCRqaBRad4QyHKE3w7DMSbWrMlZbcbAM2m5-3~Q7pr~9-5UPUxJ3~T4co~9AyL1P2pnhJz2nZQG5RU4vFOJ-bnnj0XhSQvnY0Pv04a2vvnzIErKfeVKNwvz7HWWwk2jpYudNbbrvhCR4rDpNSeU3tvjWGh62hGjWWdzmqrXLoBIC-aw~rBw__"
              alt="Citizenship Legal Documents"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center lg:order-last">
            <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "64px" }}>
              {isEnglish
                ? "Core Requirements for Citizenship Application"
                : "入籍申请的核心条件与路径"}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 whitespace-pre-line">
              {isEnglish
                ? "Canadian citizenship is primarily obtained through Naturalization. Applicants typically need to meet the following statutory requirements:\n\n• Residency Requirement: Within the 5 years before submitting an application, you must have actually resided in Canada as a permanent resident for at least 1,095 days (3 years).\n\n• Tax Compliance: Within the 5 years before applying, you must have filed personal income tax returns for at least 3 years.\n\n• Language Proficiency: Applicants aged 18-54 must demonstrate English or French language proficiency at CLB 4 level or higher (listening and speaking skills).\n\n• Citizenship Test: Pass a knowledge test on Canadian history, geography, government structure, and citizenship rights and responsibilities.\n\n• Lineage Status: If you are the first-generation child of a Canadian citizen born abroad, you may directly confirm citizenship status through the Citizenship Certificate pathway."
                : "加拿大公民身份主要通过归化入籍（Naturalization）获得，申请人通常需满足以下法定要求：\n\n• 居留要求：在递交申请前的 5 年内，以永久居民身份在加拿大境内实际居住至少 1,095 天（满 3 年）。\n\n• 税务合规：在申请前的 5 年内，至少有 3 年履行了个人所得税申报义务。\n\n• 语言能力：18 至 54 岁的申请人需证明其英语或法语达到 CLB 4 级及以上水平（听说能力）。\n\n• 入籍考试：通过关于加拿大历史、地理、政府架构及公民权利义务的知识测试。\n\n• 亲属身份：若为加拿大公民在海外出生的第一代子女，可通过公民身份证明（Citizenship Certificate）路径直接确认公民身份。"}
            </p>
          </div>
        </section>

        {/* Section 3: How OXEC Helps */}
        <section className="py-20 bg-slate-50 rounded-lg p-12 my-12">
          <h2 className="text-3xl lg:text-4xl font-black mb-8 text-center" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontSize: "64px" }}>
            {isEnglish
              ? "How OXEC Can Help You"
              : "傲赛（OXEC）提供哪些帮助"}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed text-center max-w-4xl mx-auto">
            {isEnglish
              ? "During the citizenship process, you may be concerned about 'defects in residency time calculation' or 'citizenship exam preparation.' The OXEC team can provide you with precise residency day calculations and citizenship exam guidance, ensuring your citizenship application is flawless."
              : "入籍过程中您可能担心的通常是'居住时间计算中的瑕疵'或'入籍考试的准备'。傲赛（OXEC）团队可为您提供精准的居住天数核算及入籍考试指导，确保您的入籍申请万无一失。"}
          </p>
        </section>

        {/* CTA Button */}
        <section className="py-12 text-center">
          <Button
            onClick={() => navigate("/booking")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            {isEnglish
              ? "Start Your Citizenship Application - Book a Consultation Now"
              : "开启您的公民申请 - 立即预约咨询"}
          </Button>
        </section>
      </main>
    </div>
  );
}
