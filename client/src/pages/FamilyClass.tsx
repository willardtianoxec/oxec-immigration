import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FamilyClass() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm" style={{height: '55px'}}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          <Link href="/">
            <img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} />
          </Link>

          <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'space-around', marginLeft: '32px' }}>
            <Link href="/"><span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.home")}</span></Link>
            <Link href="/"><span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.services")}</span></Link>
            <Link href="/"><span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.success_cases")}</span></Link>
            <Link href="/"><span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.blog")}</span></Link>
            <Link href="/"><span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{t("nav.about")}</span></Link>
            <button className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">{language === "en" ? "中文" : "ENG"}</button>
            <Link href="/"><Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"><span>{t("nav.contact")}</span></Button></Link>
          </div>
          <button className="md:hidden"><span>Menu</span></button>
        </div>
      </nav>

      <main className="flex-1">
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "阿里巴巴普惠体, Cormorant Garamond, serif" }}>
                家庭团聚移民
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  帮助家庭成员团聚，提供完整的申请协助和文件支持。
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">服务概述</h2>
                <p className="text-muted-foreground mb-6">
                  我们专业的团队将帮助您完成家庭团聚移民申请，确保您与亲人团聚。
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">项目特点</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>完整的申请协助</li>
                  <li>详细的文件支持</li>
                  <li>专业的法律指导</li>
                  <li>快速的处理时间</li>
                </ul>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">申请要求</h2>
                <p className="text-muted-foreground mb-6">
                  详细的申请要求将在咨询时为您详细说明。
                </p>
                <div className="mt-12">
                  <Link href="/booking">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                      <span>预约咨询<ArrowRight className="ml-2 h-5 w-5" /></span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div><h3 className="font-bold mb-4">{t("footer.about")}</h3><p className="text-sm opacity-80">{t("footer.about_desc")}</p></div>
            <div><h3 className="font-bold mb-4">{t("footer.services")}</h3><ul className="text-sm space-y-2 opacity-80"><li><Link href="/businessclass"><span className="hover:opacity-100 cursor-pointer">投资移民</span></Link></li><li><Link href="/familyclass"><span className="hover:opacity-100 cursor-pointer">家庭团聚</span></Link></li></ul></div>
            <div><h3 className="font-bold mb-4">{t("footer.resources")}</h3><ul className="text-sm space-y-2 opacity-80"><li><Link href="/"><span className="hover:opacity-100 cursor-pointer">首页</span></Link></li></ul></div>
            <div><h3 className="font-bold mb-4">{t("footer.contact")}</h3><p className="text-sm opacity-80">{t("footer.address")}</p></div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80"><p>&copy; 2024 OXEC Immigration Services Ltd. {t("footer.rights")}</p></div>
        </div>
      </footer>
    </div>
  );
}
