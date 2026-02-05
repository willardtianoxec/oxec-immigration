# OXEC Immigration Services - Project TODO

## Database & Backend
- [x] Design database schema for appointments, blog posts, success cases
- [x] Create tRPC procedures for appointment booking
- [x] Create tRPC procedures for immigration calculator
- [x] Create tRPC procedures for blog article management (CRUD)
- [x] Create tRPC procedures for success cases management (CRUD)
- [x] Implement owner notification for new appointments
- [x] Add admin-only procedures for content management

## Frontend - Public Pages
- [x] Design color scheme and typography (elegant professional style)
- [x] Create responsive navigation bar with logo and menu
- [x] Build hero section with professional image and CTA buttons
- [x] Create services showcase grid (5 services)
- [x] Build appointment booking form with validation
- [x] Create immigration points calculator with real-time scoring
- [x] Build success cases showcase section
- [x] Create blog listing page with categories and search
- [ ] Build individual blog post page
- [ ] Create About Us section
- [x] Build footer with contact information

## Frontend - Admin Panel
- [x] Create admin dashboard layout
- [x] Build blog article creation/editing interface
- [x] Build success case creation/editing interface
- [x] Add content management tables with actions
- [x] Implement role-based access control

## Internationalization (i18n)
- [x] Create i18n configuration and translation files
- [x] Implement language context and provider
- [x] Add language toggle button to navigation
- [x] Translate all pages to Chinese
- [x] Add language persistence to localStorage
- [x] Test language switching across all pages

## Testing & Polish
- [x] Write vitest tests for all tRPC procedures
- [x] Test responsive design on mobile/tablet/desktop
- [x] Test appointment booking flow
- [x] Test calculator accuracy
- [x] Test admin content management
- [ ] Optimize performance and accessibility


## UI/UX Optimization (Current Sprint)
- [x] 导航栏布局重构 - 合并所有导航项为单一Flex Group，应用等距分隔
- [x] 标题排版优化 - 强制首行标题不换行（"专业、领先、值得信赖的"）
- [x] Logo尺寸微调 - 缩小至原尺寸的50%（从64px到32px）
- [x] 服务卡片视觉升级 - 用高质量图片替换Emoji图标，添加深色半透明遮罩


## Service Cards Enhancement (Current Sprint - Phase 2)
- [x] 恢复服务卡片文本内容 - 在图片下方添加标题和说明文字
- [x] 配置服务卡片路由链接 - 为5个卡片设置对应的路由
- [x] 生成5个服务子页面 - 创建/businessclass, /familyclass, /prcard, /reconsideration, /temporary页面

## Reconsideration Page Implementation (Current Sprint - Phase 8)
- [x] 生成拒签主题图片资产 - 创建3张专业图片（开启大门、Refused印章、专业团队）
- [x] 实现/reconsideration页面组件 - 4个Section的交替布局
- [x] 集成中英文切换功能 - 硬编码中英文内容，无i18n变量
- [x] 集成成功案例数据展示 - 3个成功案例卡片
- [x] 测试与优化 - 验证编译状态，确保TypeScript无错误
- [x] 添加悬停效果 - 实现卡片上浮和图片放大效果
- [x] 对齐优化 - 确保图片高度一致，文字对齐


## Team Page Implementation (Current Sprint - Phase 3)
- [x] 准备团队成员的头像图片 - 创建4位成员的头像
- [x] 创建团队页面结构 - 建立Team.tsx页面
- [x] 实现人员概览卡片区 - 4列网格布局，包含头像、姓名和职位
- [x] 实现详细介绍区域 - 4位成员的交替式图文布局
- [x] 添加平滑滚动交互 - 点击卡片平滑滚动到详细介绍
- [x] 应用视觉风格 - 纯白背景、充足留白、高端专业感


## Navigation & Button Optimization (Current Sprint - Phase 4)
- [x] 创建新页面框架 - /skillworker, /citizenship, /bccalculator
- [x] 实现导航栏服务下拉菜单 - 7个服务项的悬停下拉菜单
- [x] 重构移民服务板块按钮 - 统一样式，拆分算分工具为两个按钮
- [x] 修改首屏CTA按钮 - 将"移民算分工具"改为"查看案例"，链接到/success-cases
- [x] 更新App.tsx路由 - 添加3个新页面的路由配置


## Booking Page Enhancement (Current Sprint - Phase 5)
- [x] 多语言切换功能 - 页面顶部添加ENG按钮，支持中英文即时切换
- [x] Google地图集成 - 在页脚上方嵌入地图，标记公司位置(4710 Kingsway, Burnaby, BC)
- [x] 预约表单邮件自动化 - 配置表单提交触发邮件发送至Business@oxecimm.com
- [x] 成功提示弹窗 - 显示绿色成功提示，告知用户24小时内会被联系


## Booking Form Restructuring (Current Sprint - Phase 6)
- [x] 更新表单数据模型 - 添加预约事项、咨询方式、背景信息采集字段
- [x] 重构表单页面 - 添加所有新字段和单选/复选框
- [x] 实现时间选择器 - 周一至周五的上午/下午时间段选择
- [x] 配置邮件逻辑 - 自动化邮件发送包含所有表单信息
- [x] 强制中文硬编码 - 移除所有变量占位符，直接使用中文文本

## Booking Page Email & Form Optimization (Current Sprint - Phase 7)
- [ ] 修复邮件内容完整性 - 确保所有背景信息字段都包含在邮件中
- [ ] 优化表单排版布局 - 单栏布局，选项横向平铺，优化间距

## Reconsideration Page Visual Consistency Fixes (Current Sprint - Phase 9)
- [x] 移除顶部横幅 - 删除带有"拒签和程序公正信"标题的紫色横幅
- [x] 修改Section 1标题 - 将"专业应对拒签：开启再次通往加拿大的大门"改为"冷静面对拒签风险"
- [x] 检查全站一致性 - 确保顶部间距、字体大小、图片比例与其他页面一致
- [x] 再次确认去变量化 - 验证所有文本均为硬编码中文，无变量占位符

## Homepage Optimization (Current Sprint - Phase 10)
- [x] 恢复"我们的移民服务"标题 - 在服务卡片板块上方添加标题
- [x] 统一标题字体 - 所有板块标题使用阿里巴巴普惠体 Black，大小 48pt/64px
- [x] 添加最新文章板块 - 实现"我们最新的文章"分栏布局（左栏最新文章+右栏成功案例）
- [x] 修复全球服务对齐 - 点阵地图与文字垢直居中对齐
- [x] 资源本地化验证 - 确保点阵地图图片本地化或提示上传

## Homepage Restructuring (Current Sprint - Phase 11)
- [x] 移除固定高度 - 删除所有 Section 的 height 属性，改为 min-height + padding
- [x] 修复响应式布局 - 确保 Flexbox 布局，align-items: center，overflow: visible
- [x] 统一标题字体 - 所有标题应用 Alibaba PuHuiTi Black，64px，fontWeight 900
- [x] 删除重复标题 - 检查并删除"我们的移民服务"上方重复的标题
- [x] 删除冠余板块 - 移除"成功案例"板块和"最新咨询"板块
- [x] 保留最新文章板块 - 仅保留"我们最新的文章"分栏布局
- [x] 验证资源本地化 - 确认点阵地图图片已本地化

## Footer Deep Restructuring (Current Sprint - Phase 12)
- [x] 创建Footer组件和全局样式 - 背景色 #203341，文字白色/浅灰色
- [x] 实现第一栏：品牌与致谢 - Logo、地点说明、服务承诺、原住民致谢
- [x] 实现第二栏：联系与法律 - 地址、电话、邮件、免责声明
- [x] 实现第三栏：业务领域 - 5个服务链接
- [x] 实现第四栏：资源中心 - 4个工具/内容链接
- [x] 在Home页面集成Footer - 将Footer添加到页面底部
- [x] 测试和创建检查点 - 验证编译状态和响应式布局

## Footer Optimization (Current Sprint - Phase 13)
- [x] 生成白色透明背景Logo SVG - 基于导航栏Logo生成
- [x] 修改Footer底部布局 - 英文版权+Term of Service+Term of Use链接
- [x] 创建Term of Service页面 - 参考Heron Law，替换为OXEC内容
- [x] 创建Term of Use页面 - 参考Heron Law，替换为OXEC内容
- [x] 在App.tsx添加新路由 - /term-of-service 和 /term-of-use
- [x] 测试和创建检查点 - 验证编译状态和页面显示

## Citizenship Page Development (Current Sprint - Phase 14)
- [x] 生成公民入籍主题图片资产 - 创建3张专业图片（入籍宣誓、法律文书、枚叶旗建筑）
- [x] 创建/citizenship页面组件 - 3个Section交替布局，硬编码中文内容
- [x] 集成成功案例和CTA - 拉取入籍相关案例，添加预约咨询按锕
- [x] 在App.tsx添加路由 - /citizenship 路由配置
- [x] 测试和创建检查点 - 验证编译状态和页面显示

## Temporary Residents Page Development (Current Sprint - Phase 15)
- [x] 生成临时居民主题图片资产 - 创建5张专业图片（留学、配偶工签、陪读、探亲、超级签证）
- [x] 创建/temporary页面组件 - 5个Section的交替布局，硬编码中文内容
- [x] 实现锚点导航功能 - 4个快速跳转卡片，平滑滚动至页内位置
- [x] 集成成功案例和CTA - 拉取临时居民相关案例，添加预约咨询按钮
- [x] 测试和创建检查点 - 验证编译状态和页面显示
