import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: '#203341' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Branding & Acknowledgement */}
          <div>
            <div className="mb-6">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/i9ZSSj6IB1QFKBGCY6lMon/sandbox/PWnhQEBOUFfG0zPmjqUIQX_1770247840697_na1fn_b3hlYy1sb2dvLXdoaXRl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvaTlaU1NqNklCMVFGS0JHQ1k2bE1vbi9zYW5kYm94L1BXbmhRRUJPVUZmRzB6UG1qcVVJUVhfMTc3MDI0Nzg0MDY5N19uYTFmbl9iM2hsWXkxc2IyZHZMWGRvYVhSbC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KHJ-CChbpkpn93BgLsqpvDS3VPxfouVVv8p~oUF7RCprgiUcOSvFJ6~iMq-0f4xd3oydodPoUruGDx0qgY2hzqEGt6TASqE7JwcGBB67iLQMzYg5OPyvNOQkhbKlE-P0aw4jQc0fu-2ojev7Dwv7axPmGDFp~CwbNimx-n5hxDlxovjh80TfeA2Kel4zvdD~hUPcHtw5YsuPEZzwSzo3~QLHi3D9GwupQysPek7mRQA73YuHliEP6V0lwh~lDawe2ypO4eErXJtxuVbbjTjX4DVp8maCxmtb3OjG6HFq-XX1fooSeb1wyL4qOg7D8pcaZHgfjMEZ-meCif70cynx9Q__"
                alt="OXEC Immigration Logo"
                className="h-12 w-auto mb-4"
              />
            </div>
            <div className="space-y-4 text-sm" style={{ color: '#E5E7EB' }}>
              <div>
                <p className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                  办公地点
                </p>
                <p className="leading-relaxed">
                  傲赛（OXEC）移民事务所位于 Burnaby 最核心的 MetroTower 1 办公楼，距 Metrotown 天车站仅 5 分钟步行距离。我们设有安全私密的办公室，致力于保障客户的隐私与机密信息。
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                  服务承诺
                </p>
                <p className="leading-relaxed">
                  我们拥有足够的资源与技术，借助安全的客户管理系统与严格的文件管理制度，为加拿大和世界各地的客户提供可信赖的法律服务。
                </p>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                  原住民致谢
                </p>
                <p className="leading-relaxed text-xs">
                  我们感谢并尊重 Burnaby 所在地的原住民——Musqueam、Squamish 和 Tsleil-Waututh 民族的传统领地。我们致力于在此地进行业务时，尊重原住民的权利和文化遗产。
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Contact & Legal */}
          <div>
            <h3 className="font-bold text-lg mb-6" style={{ color: '#FFFFFF' }}>
              联系方式
            </h3>
            <div className="space-y-4 text-sm mb-8" style={{ color: '#E5E7EB' }}>
              <div>
                <p className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                  办公地址
                </p>
                <p>4710 Kingsway, Metrotower 1</p>
                <p>Burnaby, BC V5H 4M2</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                  电话
                </p>
                <a href="tel:+12365215115" className="hover:text-white transition">
                  +1 (236) 521-5115
                </a>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                  邮件
                </p>
                <a
                  href="mailto:business@oxecimm.com"
                  className="hover:text-white transition"
                >
                  business@oxecimm.com
                </a>
              </div>
            </div>

            <div className="border-t border-gray-600 pt-6">
              <h4 className="font-bold text-sm mb-3" style={{ color: '#FFFFFF' }}>
                免责声明
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#E5E7EB' }}>
                本网页所载信息仅供一般参考之用，不应被视为法律意见，亦不构成顾问与客户之间的正式代理关系。除非双方签署正式的《专业服务协议》(Retainer Agreement)，否则本事务所对依赖上述信息产生的任何后果不承担担保责任。
              </p>
            </div>
          </div>

          {/* Column 3: Practice Areas */}
          <div>
            <h3 className="font-bold text-lg mb-6" style={{ color: '#FFFFFF' }}>
              业务领域
            </h3>
            <nav className="space-y-3 text-sm">
              <div>
                <Link href="/businessclass">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    投资移民
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/familyclass">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    家庭团聚移民
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/prcard">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    枫叶卡续签与加急
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/reconsideration">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    拒签与程序公正信
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/temporary">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    留学与访问申请
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/skillworker">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    技术移民
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/citizenship">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    公民入籍
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6" style={{ color: '#FFFFFF' }}>
              资源中心
            </h3>
            <nav className="space-y-3 text-sm">
              <div>
                <Link href="/crs-calculator">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    联邦快速通道算分工具
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/bccalculator">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    BC省提名计划算分工具
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/success-cases">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    成功案例
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/blog">
                  <span
                    className="hover:text-white transition cursor-pointer"
                    style={{ color: '#E5E7EB' }}
                  >
                    移民观察
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t border-gray-600 pt-8"
          style={{ color: '#E5E7EB' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
            <p>
              © 2024 OXEC Immigration Services Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/term-of-service">
                <span className="hover:text-white transition cursor-pointer">
                  Term of Service
                </span>
              </Link>
              <Link href="/term-of-use">
                <span className="hover:text-white transition cursor-pointer">
                  Term of Use
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
