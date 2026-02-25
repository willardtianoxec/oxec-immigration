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
    title: "RCIC 注册移民顾问 / 创始人",
    titleEn: "RCIC Registered Immigration Consultant / Founder",
    description: "拥有多年加拿大移民法律服务经验，专注于复杂的投资移民和上诉案件。李明顾问以其深厚的法律知识和丰富的实践经验，帮助数百个家庭成功实现加拿大梦想。",
    descriptionEn: "With years of experience in Canadian immigration law services, specializing in complex investment immigration and appeal cases. Consultant Li Ming has helped hundreds of families realize their Canadian dreams through his profound legal knowledge and rich practical experience.",
    image: "/images/WarrenTian-1771925780342.webp",
    position: "left"
  },
  {
    id: "member-2",
    name: "Yijiang (Edward) Ge",
    nameEn: "Yijiang (Edward) Ge",
    title: "法律顾问",
    titleEn: "Legal Consultant",
    description: "精通家庭团聚与雇主担保类申请，以严谨的办案风格和极高的成功率深受客户信赖。王琳律师专注于处理复杂的家庭移民案件，确保每一个申请都得到最专业的指导。",
    descriptionEn: "Proficient in family sponsorship and employer-sponsored applications, trusted by clients for her rigorous approach and high success rate. Lawyer Wang Lin focuses on handling complex family immigration cases, ensuring every application receives the most professional guidance.",
    image: "/images/EdwardGe-1771925780343.webp",
    position: "right"
  },
  {
    id: "member-3",
    name: "Qingyi (Willard) Tian",
    nameEn: "Qingyi (Willard) Tian",
    title: "留学与签证专家",
    titleEn: "Study and Visa Expert",
    description: "擅长处理各类疑难留学签证及访问签申请，为申请人提供量身定制的学习计划建议。张涛专家拥有丰富的国际教育背景，深刻理解学生的需求和挑战。",
    descriptionEn: "Expert in handling various difficult study visa and visitor visa applications, providing customized study plan recommendations for applicants. Expert Zhang Tao has extensive international education background and deep understanding of students' needs and challenges.",
    image: "/images/team/WillardTian-1771926000000.webp",
    position: "left"
  },
  {
    id: "member-4",
    name: "Dandan (Katherine) Zhao",
    nameEn: "Dandan (Katherine) Zhao",
    title: "运营与客户服务主管",
    titleEn: "Operations and Customer Service Manager",
    description: "负责公司整体运营与客户沟通，确保每一个申请流程的高效透明。陈慧主管致力于为每一位客户提供卓越的服务体验和全程的专业支持。",
    descriptionEn: "Responsible for overall company operations and customer communication, ensuring efficient and transparent application processes. Manager Chen Hui is committed to providing excellent service experience and comprehensive professional support to every client.",
    image: "/images/KatherineZhao-1771925780342.webp",
    position: "right"
  }
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
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontWeight: 900, fontSize: '48px' }}>
                {language === "en" ? "Our Team" : "我们的团队"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {language === "en" 
                  ? "Experienced immigration consultants, legal experts, and service team dedicated to providing professional and efficient immigration services to every client."
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
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  ref={(el) => {
                    if (el) detailRefs.current[member.id] = el;
                  }}
                  className="scroll-mt-20"
                >
                  <div className={`grid md:grid-cols-2 gap-12 items-start ${member.position === "right" ? "md:flex-row-reverse" : ""}`}>
                    {/* Image - 6:4 vertical format */}
                    <div className={`${member.position === "right" ? "md:order-2" : ""}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={member.image}
                          alt={language === "en" ? member.nameEn : member.name}
                          className="w-full aspect-[3/4] object-cover"
                        />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className={`${member.position === "right" ? "md:order-1" : ""} space-y-4`}>
                      <div>
                        <h2 className="text-4xl font-bold text-foreground mb-1" style={{ fontFamily: '"Alibaba PuHuiTi", sans-serif', fontWeight: 900, fontSize: '36px' }}>
                          {language === "en" ? member.nameEn : member.name}
                        </h2>
                        <p className="text-lg text-primary font-semibold">{language === "en" ? member.titleEn : member.title}</p>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {language === "en" ? member.descriptionEn : member.description}
                      </p>

                      <div className="pt-6">
                        <Link href="/booking">
                          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none" style={{width: '150px'}}>
                            <span style={{width: '130px', height: '40px'}}>
                              {language === "en" ? "Consult This Expert" : "咨询此专家"}
                              <ArrowRight className="ml-2 h-5 w-5" />
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
