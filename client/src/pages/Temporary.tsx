import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function Temporary() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [, navigate] = useLocation();
  const [activeMenu, setActiveMenu] = useState("study");

  const menuItems = [
    { id: "study", label: isEnglish ? "Study Abroad" : "留学申请" },
    { id: "family-stay", label: isEnglish ? "Spousal & Family" : "陪读与家庭" },
    { id: "visitor", label: isEnglish ? "Visitor Visa" : "探亲旅游" },
    { id: "super-visa", label: isEnglish ? "Super Visa" : "父母超级签证" },
  ];

  const scrollToSection = (id: string) => {
    setActiveMenu(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sectionContent = {
    study: {
      titleCN: "留学申请：开启加拿大教育之门",
      titleEN: "Study Abroad: Open the Door to Canadian Education",
      descCN: "加拿大拥有世界一流的教育体系和多元化的学习环境。通过我们的专业指导，您可以顺利申请加拿大的高中、大专、大学和研究生项目。我们帮助您规划最适合的学习路径，并在签证申请过程中提供全面支持。",
      descEN: "Canada offers world-class education and diverse learning environments. With our professional guidance, you can successfully apply to Canadian high schools, colleges, universities, and graduate programs. We help you plan the best learning path and provide comprehensive support throughout the visa application process.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg",
    },
    "family-stay": {
      titleCN: "陪读与家庭：与亲人一起成长",
      titleEN: "Spousal & Family: Grow Together with Loved Ones",
      descCN: "家庭团聚是移民的重要部分。无论您是学生、工作者还是永久居民，我们都可以帮助您的配偶和家庭成员获得相应的签证。我们提供专业的咨询和申请支持，确保您的家庭能够在加拿大团聚。",
      descEN: "Family reunification is an important part of immigration. Whether you are a student, worker, or permanent resident, we can help your spouse and family members obtain appropriate visas. We provide professional consultation and application support to ensure your family can reunite in Canada.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg",
    },
    visitor: {
      titleCN: "探亲旅游：畅游加拿大",
      titleEN: "Visitor Visa: Explore Canada",
      descCN: "访问加拿大是体验这个美丽国家的最好方式。我们提供专业的访问签证申请服务，帮助您的亲友顺利获得访问签证。无论是探亲还是旅游，我们都能确保申请过程顺利进行。",
      descEN: "Visiting Canada is the best way to experience this beautiful country. We provide professional visitor visa application services to help your family and friends obtain visitor visas smoothly. Whether it's visiting relatives or tourism, we ensure a smooth application process.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg",
    },
    "super-visa": {
      titleCN: "父母超级签证：让父母安心来访",
      titleEN: "Super Visa: Bring Your Parents to Visit",
      descCN: "超级签证是为加拿大公民和永久居民的父母和祖父母设计的长期访问签证。这个签证允许您的父母在加拿大停留长达2年。我们提供完整的申请指导，确保您的父母能够获得这个特殊的签证。",
      descEN: "The Super Visa is a long-term visitor visa designed for parents and grandparents of Canadian citizens and permanent residents. This visa allows your parents to stay in Canada for up to 2 years. We provide complete application guidance to ensure your parents obtain this special visa.",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg",
    },
  };

  const content = sectionContent[activeMenu as keyof typeof sectionContent];

  return (
    <div 
      className="w-full min-h-screen relative"
      style={{
        backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663292376041/CeepOLbixyTTUyft.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Navigation Bar - Sticky */}
      <nav className="sticky top-0 z-40 bg-white border-b border-border shadow-sm" style={{ height: '55px' }}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          <Link href="/">
            <img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} />
          </Link>

          <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'space-around', marginLeft: '32px' }}>
            <Link href="/">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">首页</span>
            </Link>
            <Link href="/skillworker">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">服务</span>
            </Link>
            <Link href="/success-cases">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">成功案例</span>
            </Link>
            <Link href="/blog">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">博客</span>
            </Link>
            <Link href="/team">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">关于我们</span>
            </Link>
          </div>

          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isEnglish ? '中文' : 'ENG'}
          </button>

          <Link href="/contact">
            <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              预约咨询
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content Area with Sidebar */}
      <div className="flex relative z-10">
        {/* Sidebar Navigation - Sticky */}
        <aside 
          className="sticky top-[55px] h-fit w-60 bg-slate-800 text-white p-0 shadow-lg"
          style={{ zIndex: 30 }}
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 rounded transition-all relative"
                style={{
                  backgroundColor: activeMenu === item.id ? '#475569' : 'transparent',
                  color: activeMenu === item.id ? '#0061FF' : '#ffffff',
                }}
              >
                {activeMenu === item.id && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: '#0061FF' }}
                  />
                )}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative z-20">
          {/* Content Container with Glassmorphism */}
          <div 
            className="mx-12 my-8 rounded-lg p-8"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.2), 0 20px 50px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Section Content */}
            {menuItems.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className={activeMenu === item.id ? 'block' : 'hidden'}
              >
                <h2 
                  className="text-4xl font-black mb-6"
                  style={{
                    fontFamily: "'Alibaba PuHuiTi Black', sans-serif",
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 900,
                  }}
                >
                  {isEnglish ? content.titleEN : content.titleCN}
                </h2>
                
                <div className="flex gap-8 items-start mb-8">
                  <img 
                    src={content.image} 
                    alt={isEnglish ? content.titleEN : content.titleCN}
                    className="w-2/5 h-auto rounded-lg object-cover"
                  />
                  <div className="w-3/5">
                    <p className="text-base leading-relaxed text-gray-700 mb-6">
                      {isEnglish ? content.descEN : content.descCN}
                    </p>
                    <Button 
                      onClick={() => navigate("/contact")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                      立即预约咨询
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Alibaba PuHuiTi Black', sans-serif",
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: 900,
                }}
              >
                {isEnglish ? "Ready to Start Your Journey?" : "准备开始您的移民之旅？"}
              </h3>
              <p className="text-gray-700 mb-6">
                {isEnglish 
                  ? "Let our expert team help you navigate the temporary residence process and achieve your goals in Canada." 
                  : "让我们的专家团队帮助您顺利完成临时居民申请，实现您在加拿大的梦想。"}
              </p>
              <Button 
                onClick={() => navigate("/contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded text-lg"
              >
                立即预约咨询
              </Button>
            </div>
          </div>

          {/* Bottom Spacing for Footer */}
          <div className="h-12" />
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}
