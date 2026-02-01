import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Temporary() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm" style={{height: '55px'}}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          <Link href="/"><img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} /></Link>
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
                留学与访问申请
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  提供留学签证和访问签证申请的专业指导和支持。
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">服务概述</h2>
                <p className="text-muted-foreground mb-6">
                  我们为学生和访问者提供专业的签证申请指导和全面支持。
                </p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">项目特点</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                  <li>留学签证申请</li>
                  <li>访问签证申请</li>
                  <li>专业的指导</li>
                  <li>高成功率</li>
                </ul>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">申请流程</h2>
                <p className="text-muted-foreground mb-6">
                  详细的申请流程将在咨询时为您详细说明。
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
            <div><h3 className="font-bold mb-4">{t("footer.services")}</h3><ul className="text-sm space-y-2 opacity-80"><li><Link href="/businessclass"><span className="hover:opacity-100 cursor-pointer">投资移民</span></Link></li></ul></div>
            <div><h3 className="font-bold mb-4">{t("footer.resources")}</h3><ul className="text-sm space-y-2 opacity-80"><li><Link href="/"><span className="hover:opacity-100 cursor-pointer">首页</span></Link></li></ul></div>
            <div><h3 className="font-bold mb-4">{t("footer.contact")}</h3><p className="text-sm opacity-80">{t("footer.address")}</p></div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80"><p>&copy; 2024 OXEC Immigration Services Ltd. {t("footer.rights")}</p></div>
        </div>
      </footer>
    </div>
  );
}
