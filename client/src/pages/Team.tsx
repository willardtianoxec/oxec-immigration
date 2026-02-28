import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Footer } from "@/components/Footer";
import { MapView } from "@/components/Map";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  position: "left" | "right";
}

interface TeamMemberWithTranslation extends TeamMember {
  nameEn: string;
  titleEn: string;
  descriptionEn: string;
}

const teamMembers: TeamMemberWithTranslation[] = [
  {
    id: "member-1",
    name: "Warren Tian",
    nameEn: "Warren Tian",
    title: "创始人",
    titleEn: "Founder",
    description: "Warren拥有20年以上的加拿大移民法律服务经验，曾帮助数百个家庭成功实现加拿大移民梦想。\n\n作为傲赛移民事务所的创始人，他目前主要负责事务所的战略决策、重点客户关系维护，并指导日常运营。",
    descriptionEn: "Warren has over 20 years of experience in Canadian immigration law services and has helped hundreds of families achieve their Canadian immigration dreams. As the founder of OXEC Immigration Services, he is currently responsible for strategic decision-making, key client relationship management, and guiding daily operations.",
    image: "/images/WarrenTian-1771925780342.webp",
    position: "left"
  },
  {
    id: "member-2",
    name: "Yijiang (Edward) Ge",
    nameEn: "Yijiang (Edward) Ge",
    title: "持牌移民顾问 | RCIC",
    titleEn: "Licensed Immigration Consultant | RCIC",
    description: "Edward是一位拥有十余年行业经验的加拿大持牌移民顾问（RCIC），长期专注于经济类移民、家庭团聚移民、各类临时签证、人道类申请以及枛叶卡续签等业务领域。\n\n凝聚扩实的法规知识、丰富的实务经验与严谨的案件分析能力，他为客户提供专业、系统且具有前父性的移民解决方案。\n\n在执业中，Edward尤其擅长处理复杂及疑难个案，多次通过精准解析移民官拒签理由与审理逻辑，成功协助客户将拒签翻案；他也善于从法律与事实层面深入挥提人道理由，帮助处于困境中的家庭通过合规途径获得永久居民身份；对于收到移民官PF Letter的案件，他能针对移民官关注的重点逐项专业回应，切实降低风险并提升申请成功率。\n\nEdward的职业生涯起步于温哥华Downtown的知名移民咨询公司，后于2019年加入傲赛，并随后取得了持牌资格。他本科毕业于清华大学，在南加利福尼亚大学取得了数学专业硕士学位。",
    descriptionEn: "Edward is a Canadian licensed immigration consultant (RCIC) with over a decade of industry experience, specializing in economic immigration, family sponsorship, various temporary visas, humanitarian applications, and PR card renewals. With solid regulatory knowledge, extensive practical experience, and rigorous case analysis skills, he provides clients with professional, systematic, and forward-looking immigration solutions. In his practice, Edward excels at handling complex and difficult cases, having successfully overturned multiple refusals by precisely analyzing immigration officers' reasons and review logic. He is skilled at uncovering humanitarian grounds from legal and factual perspectives, helping families in difficult situations obtain permanent resident status through compliant pathways. For cases receiving immigration officer PF Letters, he can professionally respond to each point of concern, effectively reducing risks and improving application success rates. Edward's career began at a prominent immigration consulting firm in downtown Vancouver. He joined OXEC in 2019 and subsequently obtained his licensing. He holds a bachelor's degree from Tsinghua University and a master's degree in mathematics from the University of Southern California.",
    image: "/images/EdwardGe-1771925780343.webp",
    position: "right"
  },
  {
    id: "member-3",
    name: "Qingyi (Willard) Tian",
    nameEn: "Qingyi (Willard) Tian",
    title: "持牌移民顾问 | RCIC-IRB",
    titleEn: "Licensed Immigration Consultant | RCIC-IRB",
    description: "Willard是加拿大持牌移民顾问（RCIC-IRB），重点关注商业类移民、家庭团聚移民和拒签重申案件，擅长疑难案件分析、商业投资规划、移民政策研究和不可入境处理。\n\nWillard的职业生涯起步于傲赛移民事务所。自2023年加入团队以来，他积累了充实的移民咨询经验，能够在充分掌握法律原则和审理逻辑的基础上，详细梳理案件重点、制定申请策略，帮助申请人扭转局面、跨越障碍。在进入移民行业前，Willard在科技文化领域有15年的工作经历，在头部互联网企业担任商业分析师、制片人和项目总监等职位。\n\nWillard拥有武汉大学广告专业学士学位和清华大学传播学硕士学位。他于2025年取得了加拿大女王大学（Queen's University）移民与公民法研究生文凭，目前正在不列颠哥伦比亚大学攻读会计文凭。\n\nWillard也是关注科技行业的独立学者。2009年，清华大学出版社出版了他的学术专著《手机：个人移动多媒体》；2018年，他作为中国代表团一员参加了在德国柏林举办的欧广联中国周活动，并做主题演讲。",
    descriptionEn: "Willard is a Canadian licensed immigration consultant (RCIC-IRB) focusing on business immigration, family sponsorship, and refusal reconsideration cases, with expertise in complex case analysis, business investment planning, immigration policy research, and inadmissibility issues. Willard's career began at OXEC Immigration Services. Since joining the team in 2023, he has accumulated substantial immigration consulting experience and can, based on a thorough understanding of legal principles and review logic, carefully analyze case highlights, develop application strategies, and help applicants turn situations around and overcome obstacles. Before entering the immigration industry, Willard had 15 years of experience in technology and culture, serving as a business analyst, producer, and project director at leading internet companies. Willard holds a bachelor's degree in advertising from Wuhan University and a master's degree in communication from Tsinghua University. He obtained a graduate diploma in Immigration and Citizenship Law from Queen's University in 2025 and is currently pursuing an accounting diploma at the University of British Columbia. Willard is also an independent scholar interested in the technology industry. In 2009, Tsinghua University Press published his academic monograph \"Mobile Phones: Personal Mobile Multimedia\". In 2018, he participated as a member of the Chinese delegation in the \"EBU China Week\" held in Berlin, Germany, and delivered a keynote speech.",
    image: "/images/QingyiWillardTian.webp",
    position: "left"
  },
  {
    id: "member-4",
    name: "Dandan (Katherine) Zhao",
    nameEn: "Dandan (Katherine) Zhao",
    title: "行政与客户服务主管",
    titleEn: "Administrative and Customer Service Manager",
    description: "Katherine是傲赛移民事务所的行政与客户服务主管，负责日常运营，重点关注移民申请流程、档案管理、客户账户管理和客户关系维护。她与公司负责人密切合作，保证事务所的顺畅运营。\n\nKatherine毕业于东北财经大学，获国际经济与贸易专业学士学位。Katherine拥有9年移民及签证咨询服务经验，曾在北京和大连担任移民项目文案专员5年，于2022年加入傲赛团队。",
    descriptionEn: "Katherine is the Administrative and Customer Service Manager at OXEC Immigration Services, responsible for daily operations with a focus on immigration application processes, file management, client account management, and customer relationship maintenance. She works closely with company leadership to ensure smooth operations of the firm. Katherine graduated from Northeastern University of Finance and Economics with a bachelor's degree in International Economics and Trade. She has 9 years of experience in immigration and visa consulting services, having served as an immigration project specialist in Beijing and Dalian for 5 years before joining OXEC in 2022.",
    image: "/images/KatherineZhao-1771925780342.webp",
    position: "right"
  },
  {
    id: "member-5",
    name: "Vivian Ma",
    nameEn: "Vivian Ma",
    title: "财务主管",
    titleEn: "Finance Manager",
    description: "Vivian是傲赛团队重要的成员，负责公司财务管理和资金运作，确保所有财务流程的规范性和透明度。\n\nVivian以其专业的财务知识和严谨的工作态度，为公司的稳健发展提供坚实的财务支撑。",
    descriptionEn: "Vivian is an important member of the OXEC team, responsible for company financial management and fund operations, ensuring the standardization and transparency of all financial processes. With her professional financial knowledge and rigorous work attitude, Vivian provides solid financial support for the company's steady development.",
    image: "/images/VivianMaap.webp",
    position: "left"
  },

];

export default function Team() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const detailRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    // Add marker to the office location
    const officeLocation = { lat: 49.227280, lng: -123.000137 };
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: officeLocation,
      title: "OXEC Immigration Services - Metrotown Tower",
    });
  };

  const serviceItems = [
    { label: "投资移民", href: "/businessclass" },
    { label: "家庭团聚移民", href: "/familyclass" },
    { label: "枫叶卡续签与加急", href: "/prcard" },
    { label: "拒签与程序公正信", href: "/reconsideration" },
    { label: "留学与访问", href: "/temporary" },
    { label: "技术移民", href: "/skillworker" },
    { label: "公民入籍", href: "/citizenship" },
  ];

  const scrollToMember = (memberId: string) => {
    const element = detailRefs.current[memberId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm" style={{height: '55px'}}>
        <div className="container flex items-center py-4" style={{ justifyContent: 'space-between', height: '55px' }}>
          {/* Logo */}
          <Link href="/">
            <img src="/oxec-logo.png" alt="OXEC Immigration Services Ltd." className="cursor-pointer flex-shrink-0" style={{ height: '40px', width: '160px' }} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center" style={{ flex: 1, justifyContent: 'space-around', marginLeft: '32px' }}>
            <Link href="/">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                {language === "en" ? "Home" : "首页"}
              </span>
            </Link>
            <div className="relative group">
              <button
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="flex items-center text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
              >
                {language === "en" ? "Services" : "服务"}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesDropdownOpen && (
                <div
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute left-0 mt-0 w-56 bg-white border border-border rounded-md shadow-lg z-50"
                >
                  {serviceItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span className="block px-4 py-3 text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer first:rounded-t-md last:rounded-b-md">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/success-cases">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                {language === "en" ? "Success Cases" : "成功案例"}
              </span>
            </Link>
            <Link href="/blog">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                {language === "en" ? "Blog" : "博客"}
              </span>
            </Link>
            <Link href="/team">
              <span className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer">
                {language === "en" ? "About" : "关于我们"}
              </span>
            </Link>
            <button
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              {language === "en" ? "中文" : "ENG"}
            </button>
            <Link href="/booking">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <span>{language === "en" ? "Book Consultation" : "预约咨询"}</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container py-4 space-y-3">
              <Link href="/">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">
                  {language === "en" ? "Home" : "首页"}
                </span>
              </Link>
              <Link href="/success-cases">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">
                  {language === "en" ? "Success Cases" : "成功案例"}
                </span>
              </Link>
              <Link href="/blog">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">
                  {language === "en" ? "Blog" : "博客"}
                </span>
              </Link>
              <Link href="/team">
                <span className="block text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2">
                  {language === "en" ? "About" : "关于我们"}
                </span>
              </Link>
              <button
                onClick={() => setLanguage(language === "en" ? "zh" : "en")}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium cursor-pointer py-2"
              >
                {language === "en" ? "中文" : "ENG"}
              </button>
              <Link href="/booking">
                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                  <span>{language === "en" ? "Book Consultation" : "预约咨询"}</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-20">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontWeight: 900 }}>
                {language === "en" ? "Our Team" : "我们的团队"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {language === "en" 
                  ? "Composed of experienced immigration consultants, legal experts, and service team members dedicated to providing professional and efficient immigration services to every client." 
                  : "由资深移民顾问、法律专家和服务团队组成，致力于为每一位客户提供专业、高效的移民服务。"}
              </p>
            </div>

            {/* Team Members Gallery Grid */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 -mt-8" style={{marginBottom: '60px'}}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => scrollToMember(member.id)}
                  className="cursor-pointer group text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 w-64 rounded-lg p-3 bg-white shadow-md"
                  style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    <img
                      src={member.image}
                      alt={language === "en" ? member.nameEn : member.name}
                      className="w-full h-64 object-cover group-hover:brightness-90 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontWeight: 900 }}>{language === "en" ? member.nameEn : member.name}</h3>
                  <p className="text-sm text-muted-foreground">{language === "en" ? member.titleEn : member.title}</p>
                </div>
              ))}
            </div>
            {/* Detailed Profiles Section */}
            <div className="space-y-16">
              {teamMembers.map((member) => (
                <div key={member.id} ref={(el) => { if (el) detailRefs.current[member.id] = el; }}>
                  <div className={`grid md:grid-cols-2 gap-12 items-center ${member.position === "right" ? "md:grid-cols-2" : ""}`}>
                    {/* Image */}
                    <div className={`${member.position === "right" ? "md:order-2" : ""}`}>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-auto shadow-lg object-cover"
                        style={{ aspectRatio: '3/4' }}
                      />
                    </div>

                    {/* Text Content */}
                    <div className={`${member.position === "right" ? "md:order-1" : ""} space-y-4 flex flex-col justify-start`}>
                      <div>
                        <h2 className="text-4xl font-bold text-foreground mb-1" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontWeight: 900, fontSize: '36px' }}>
                          {language === "en" ? member.nameEn : member.name}
                        </h2>
                        <p className="text-lg text-primary font-semibold">{language === "en" ? member.titleEn : member.title}</p>
                      </div>

                      <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {language === "en" ? member.descriptionEn : member.description}
                      </div>

                      <div className="pt-6">
                        <Link href="/booking">
                          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none flex items-center justify-center whitespace-nowrap" style={{minWidth: 'auto', padding: '10px 16px'}}>
                            <span className="flex items-center whitespace-nowrap gap-2">
                              {language === "en" ? "Consult This Expert" : "咨询此专家"}
                              <ArrowRight className="h-4 w-4 flex-shrink-0" style={{fontSize: '16px'}} />
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontWeight: 900, fontSize: '48px' }}>
              {language === "en" ? "Our Office" : "我们的办公室"}
            </h2>
            <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-300">
              <MapView
                onMapReady={handleMapReady}
                initialCenter={{ lat: 49.227280, lng: -123.000137 }}
                initialZoom={16}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
