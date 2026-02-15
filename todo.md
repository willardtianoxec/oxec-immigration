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
- [x] Build individual blog post page
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

## Skilled Worker Page Development (Current Sprint - Phase 16)
- [ ] 生成技术移民主题图片资产 - 创建6张专业图片（综述、EE、BC PNP、LMIA、ICT、PGWP）
- [ ] 创建/skillworker页面组件 - 6个Section的交替布局，硬编码中文内容
- [ ] 实现锚点导航功能 - 5个快速跳转卡片，平滑滚动至页内位置
- [ ] 集成成功案例和CTA - 拉取技术移民相关案例，添加预约咨询按钮
- [ ] 测试和创建检查点 - 验证编译状态和页面显示


## CMS Content Publishing System (Current Sprint - Phase 17)
- [ ] 设计数据模型 - 统一Post模型支持成功案例和博客，包含分类、标签、内容等
- [ ] 创建数据库表 - posts表、categories表、tags表，支持关联查询
- [ ] 实现tRPC接口 - CRUD操作、分类过滤、搜索功能
- [ ] 建立后台管理界面 - 文章创建、编辑、删除、发布管理
- [ ] 建立前台展示页面 - /blog 和 /success-cases 页面，支持分类过滤
- [ ] 测试和优化 - 验证编译状态，确保功能完整

## BC PNP Calculator Reconstruction (Current Sprint - Phase 18)
- [x] 设计BC PNP算分逻辑 - 人力资源因素(40分)、语言能力(40分)、经济因素
- [x] 创建CLB换算函数 - IELTS/CELPIP/PTE与CLB等级转换
- [x] 实现calculateBCPNP tRPC端点 - 后端评分计算逻辑
- [x] 构建BCCalculator前端页面 - 参考Calculator.tsx的布局
- [x] 实现人力资源因素表单 - 工作经验、学历、加分项
- [x] 实现语言能力表单 - 考试类型选择、成绩输入、CLB换算
- [x] 实现经济因素表单 - 时薪、区域因素、地区经验加分
- [x] 集成实时出分看板 - 动态更新总分和分数明细
- [x] 添加CTA按钮 - "联系专业顾问锁定名额"链接至/booking
- [x] 测试所有评分场景 - 验证CLB换算、分数计算、UI交互
- [x] 创建检查点 - 验证编译状态和功能完整性


## CRS Calculator Reconstruction (Current Sprint - Phase 19)
- [x] 分析需求并设计数据结构 - 方案A（单身/无配偶）和方案B（有配偶）
- [x] 创建CLB转换函数 - IELTS/CELPIP/PTE/TEF/TCF到CLB等级的转换
- [x] 实现方案A评分逻辑 - 人力资本、语言能力、可转移技能、加分项
- [x] 实现方案B评分逻辑 - 包含配偶因素的完整评分
- [x] 构建calculateCRS tRPC端点 - 支持方案A和B的后端计算
- [x] 重构Calculator前端页面 - 家庭移民安排选择、表单布局、实时计算
- [x] 实现实时分数更新 - 动态显示总分和分项明细（核心因素、可转移、加分项）
- [x] 创建单元测试 - 验证所有CLB转换和评分场景
- [x] 测试所有场景 - 验证两个方案的计算准确性
- [x] 创建检查点 - 完成CRS Calculator重构

## CRS Calculator Bug Fix (Current Sprint - Phase 21)
- [x] 分析配偶字段验证错误 - spouseAge最小值17，配偶字段值不匹配
- [x] 修复配偶字段默认值 - spouseAge改为17，education改为bachelor，languageTest改为none
- [x] 优化handleCalculate函数 - 只在married-with-spouse时发送配偶字段
- [x] 测试修复结果 - 验证计算功能正常，总分314
- [x] 创建检查点 - 完成配偶字段验证修复


## Calculator 表单调整 (Current Sprint - Phase 20)
- [x] 更新家庭移民安排选项和备注
- [x] 更新人力资源因素分区的标签和选项
- [x] 调整表单结构
- [x] 更新配偶信息模块的标签和选项
- [x] 更新可转移技能因素分区
- [x] 更新附加分项分区
- [x] 重组分数明细显示逻辑
- [x] 测试所有修改并保存检查点

## CRS Calculator 出分板详细分项显示 (Current Sprint - Phase 22)
- [x] 分析当前出分板结构和后端calculateCRS逻辑
- [x] 修改后端calculateCRS返回详细分项数据
- [x] 重构前端出分板UI显示详细分项
- [x] 测试出分板显示和分项准确性
- [x] 保存检查点 - 完成出分板详细分项显示

## CRS Calculator 可转移技能加分规则修复 (Current Sprint - Phase 23)
- [x] 实现海外经验+语言的细粒度加分规则（CLB 7-8 vs CLB 9-10）
- [x] 实现海外经验+加国经验的细粒度加分规则（经验年数区间）
- [x] 修复所有可转移技能的条件判断
- [x] 测试修复后的算法是否正确（预期 507 分）
- [x] 保存检查点 - 完成可转移技能加分规则修复

## CRS Calculator 双语言支持修改 (Current Sprint - Phase 24)
- [x] 重构语言选择表单：第一语言（英语/法语）和第二语言（可选）
- [x] 第一语言为英语时，显示IELTS/CELPIP/PTE选项
- [x] 第一语言为法语时，显TEF/TCF选项
- [x] 第二语言为英语时，显IELTS/CELPIP/PTE选项
- [x] 第二语言为法语时，显TEF/TCF选项
- [x] 第二语言不能与第一语言相同（条件禁用）
- [x] 第二语言默认为"没有"
- [x] 添加第二语言赋分规则（CLB 9-10: 6分/项，CLB 7-8: 3分/项，CLB 5-6: 1分/项，CLB 4以下: 0分/项）
- [x] 实现双语言附加分规则（TEF/TCF CLB 7+ 且 IELTS/CELPIP/PTE CLB 5+ = 50分）
- [x] 实现单语言高分附加分规则（TEF/TCF CLB 7+ 但 IELTS/CELPIP/PTE CLB 4以下或无 = 25分）
- [x] 修复最高学历"请选择"文字颜色为黑色
- [x] 修复加拿大教育"无"改为"没有"
- [x] 修复海外工作经验去掉"请选择"，默认为"没有"
- [x] 更新CRS计算器测试用例，包含第二语言场景
- [x] 验证所有语言组合的赋分正确性
- [x] 测试UI条件显示逻辑
- [x] 保存检查点 - 完成双语言支持修改

## CRS Calculator 视觉调整 (Current Sprint - Phase 25)
- [x] 恢复计算器图标在标题前
- [x] 更新副标题为"最新CRS Calculator/综合排名系统/评估入池分数/Express Entry"
- [x] 调整问题和选框之间的距离
- [x] 移除可转移技能的"系统将根据您的基础信息自动计算加分"说明
- [x] 添加右侧信息面板，未填写表单时显CRS相关信息
- [x] 保存检查点 - 完成CRS计算器视觉调整

## CRS Calculator 表单验证 (Current Sprint - Phase 26)
- [x] 添加表单验证逻辑 - 检查必填项是否已填写
- [x] 实现Dialog弹窗提示 - 未填写表单时显Dialog提示具体的需要填写的字段
- [x] 测试表单验证功能 - 验证所有场景下的验证是否正确
- [x] 保存检查点 - 完成表单验证功能

## CLB Translator 换算工具 (Current Sprint - Phase 27)
- [x] 创建CLBTranslator.tsx页面 - 使用BCCalculator布局
- [x] 实现语言考试选项卡 - IELTS、CELPIP、PTE、TEF、TCF
- [x] 添加成绩输入表单 - 听力、阅读、写作、口语四个字段
- [x] 实现CLB换算逻辑 - 复用Calculator中的换算规则
- [x] 显示换算结果 - 大分（最低等级CLB）和小分（各项CLB）
- [x] 添加右侧信息面板 - 关于CLB的说明
- [x] 在App.tsx添加路由 - /clbtranslator
- [x] 测试所有语言考试类型的换算
- [x] 保存检查点 - 完成CLB换算工具

## CLB Translator 换算规则修复 (Current Sprint - Phase 28)
- [x] 修复低于CLB 4的成绩处理 - 显示"CLB 4以下"而不是"CLB 0"
- [x] 修复CELPIP换算规则 - 按照正确的规则转换
- [x] 添加表单验证 - 未填写成绩时显Dialog提示
- [x] 测试所有语言考试类型的换算
- [x] 保存检查点 - 完成CLB换算规则修复

## CLB Translator 标题和布局优化 (Current Sprint - Phase 29)
- [x] 添加计算器图标到标题前 - 使用Lucide React的Calculator图标
- [x] 调整标题字体为Alibaba PuHuiTi Black - 字重900
- [x] 重构语言成绩模块布局 - 四个单项改为水平横排
- [x] 实现Stack布局 - 上方标签，下方输入框
- [x] 设置合适的间距和对齐 - gap 20px，flex-wrap支持
- [x] 固定输入框宽度 - 确保视觉一致性
- [x] 测试响应式设计 - 验证不同屏幕尺寸的显示效果
- [x] 保存检查点 - 完成CLB换算工具优化

## CLB Translator 弹性布局优化 (Current Sprint - Phase 30)
- [x] 设置父容器左对齐 - justify-content: flex-start
- [x] 设置每个单项左对齐 - align-items: flex-start
- [x] 实现自適应宽度 - 输入框width: 100%或flex: 1
- [x] 设置固定间隔 - gap: 15px
- [x] 保持上下结构 - 标签在上，输入框在下
- [x] 设置flex-wrap: nowrap - 保持横排质感
- [x] 测试不同屏幕尺寸 - 验证响应式表现
- [x] 保存检查点 - 完成弹性布局优化

## CLB Translator 右侧说明文本分段优化 (Current Sprint - Phase 31)
- [x] 将右侧说明文本分为两个文本框
- [x] 第一个文本框：CLB定义说明
- [x] 第二个文本框：联邦快速通道CLB要求
- [x] 两个文本框之间添加适当间距
- [x] 测试修改效果
- [x] 保存检查点 - 完成右侧说明文本分段优化

## FSW 算分工具 (Current Sprint - Phase 32)
- [x] 创建FSWCalculator.tsx页面 - 参考BCCalculator布局
- [x] 实现语言技能模块 - 第一语言和第二语言的条件选择
- [x] 实现CLB换算和赋分 - 第一语言24分，第二语言4分
- [x] 实现教育背景赋分 - 博士25分到高中以下0分
- [x] 实现工作经验赋分 - 6年15分到1年9分
- [x] 实现年龄赋分 - 18-35岁12分，逐年递减
- [x] 实现工作安排赋分 - 满足条件10分
- [x] 实现适应性赋分 - 最高10分，其中工作经历10分，其他5分
- [x] 添加表单验证 - 未填写时显示Dialog提示
- [x] 实现结果显示 - 右侧显示总分和各类别分数
- [x] 在App.tsx中添加路由 - /fswcalculator
- [x] 测试所有赋分规则和条件逻辑
- [x] 保存检查点 - 完成FSW算分工具

## Article Management Filtering (Current Sprint - Phase 33)
- [x] 添加内容分类筛选器 - 在AdminPosts页面添加contentCategory下拉选择
- [x] 实现筛选逻辑 - 根据选择的分类过滤文章列表
- [x] 更新API调用 - 传递contentCategory参数到posts.list端点
- [x] 测试筛选功能 - 验证按分类筛选的准确性
- [x] 保存检查点 - 完成文章管理筛选功能

## Article Editor Unification (Current Sprint - Phase 34)
- [x] 添加type选择器 - 在AdminPostForm添加文章类型选择
- [x] 添加contentCategory选择器 - 在AdminPostForm添加内容分类下拉选择
- [x] 实现保存草稿功能 - 添加handleSaveDraft函数
- [x] 实现发布功能 - 添加handlePublish函数
- [x] 合并新建和编辑路由 - 将/admin/posts/new和/admin/posts/:id/edit合并为/admin/posts/:id?
- [x] 测试编辑器功能 - 验证新建文章流程
- [x] 保存检查点 - 完成文章编辑器统一功能

## Article Preview & Publishing Flow (Completed - Phase 35)
- [x] 分析预览功能需求 - 预览页面应展示最终发布效果，支持编辑-预览切换
- [x] 创建PostPreview预览组件 - 独立的文章预览组件，支持Markdown渲染
- [x] 创建预览页面路由 - /admin/posts/:id/preview 路由
- [x] 在编辑器中添加预览按钮 - 实现"预览"按钮，导航到预览页面
- [x] 实现预览和编辑的切换 - 预览页面显示"返回编辑"按钮
- [x] 测试预览功能流程 - 验证编辑-预览-发布的完整流程
- [x] 保存检查点 - 完成预览功能实现

## Article Editor Optimization (Completed - Phase 36)
- [x] 合并自定义分类和标签 - 将两个字段合并为单一的标签系统
- [x] 实现URL Slug自动生成 - 根据标题自动生成slug，支持手动编辑
- [x] 更新AdminPostForm UI - 移除自定义分类字段，统一标签输入
- [x] 更新数据库schema - 调整posts表的字段结构
- [x] 测试标签合并功能 - 验证标签的添加、删除、编辑
- [x] 测试Slug生成功能 - 验证自动生成和手动编辑


## Article Page Layout Design (Completed - Phase 37)
- [x] 分析heronlaw.ca的文章页面设计 - 研究参考网站的页面布局、排版、色彩搅配
- [x] 设计文章页面的信息架构 - 标题、副标题、元数据、内容、相关文章等
- [x] 创建BlogPost文章详情页面 - /blog/:slug 路由的文章详情页面
- [x] 创建SuccessCaseDetail成功案例页面 - /success-cases/:slug 路由的成功案例页面
- [x] 添加页面路由 - 在App.tsx中添加新的路由配置
- [x] 测试文章页面功能 - 验证文章页面的显示和交互
- [x] 保存检查点 - 完成文章页面设计实现


## Article Publishing Display Fix (Completed - Phase 38)
- [x] 修复成功案例列表页面 - 使用正确的API端点显示已发布文章
- [x] 在管理后台添加查看按钮 - 为已发布文章添加查看按钮，直接链接到已发布页面
- [x] 测试修复后的功能 - 验证成功案例列表页面正常显示已发布文章


## Google Reviews Preview on Homepage (Completed - Phase 39)
- [x] 配置Google Places API - 获取API密钥并设置认证
- [x] 创建后端tRPC端点 - 实现trpc.reviews.getGoogleReviews端点
- [x] 创建GoogleReviewsPreview组件 - 预览版本展示5.0星评分和3-4条精选点评
- [x] 在主页集成预览 - 在"全球服务"部分之前添加Google点评预览
- [x] 测试预览功能 - 验证点评数据加载和显示
- [x] 保存检查点 - 完成Google点评预览功能

## Latest Articles Card Responsive Layout Fix (Completed - Phase 40)
- [x] 分析响应式布局问题 - 固定宽度和高度导致缩放时重叠
- [x] 移除固定宽度属性 - 从width: 576px改为flex自动宽度
- [x] 改进图片比例处理 - 使用CSS aspect-ratio: 16/9替代固定高度
- [x] 优化容器布局 - 使用flex flex-col确保正确的响应式堆叠
- [x] 改进间距配置 - 使用gap-8 lg:gap-12替代固定gap-12
- [x] 添加文本截断 - 使用line-clamp防止文本溢出
- [x] 测试响应式效果 - 验证桌面、平板、移动视图的显示
- [x] 保存检查点 - 完成最新文章卡片响## Bug Fixes & Improvements (Completed)
- [x] 修复图片上传Data Too Long错误 - 使用S3上传而不是Data URL
- [x] 添加"显示草稿"选项到管理后台
- [x] 修复TypeScript类型错误
- [x] 修复GoogleReviewsPreview中的API调用
- [x] 修复/success-cases/{id}页面错误 - 修改getBySlug procedure以支持ID和slug

## Article Page Layout Optimization (Current Sprint - Phase 41)
- [x] 更新数据库Schema - 为posts表添加author字段，默认为"OXEC Immigration"
- [x] 更新文章编辑器 - 添加博客文章分类选择（政策解读、新闻、移居生活、移民故事、移民项目）
- [x] 更新BlogPost页面 - 添加导航栏、作者信息、两栏布局（左主内容，右侧栏）
- [x] 更新SuccessCaseDetail页面 - 添加导航栏、作者信息、两栏布局
- [x] 创建了ArticleSidebar组件 - 实现右侧栏（分类、最近文章、标签、搜索）
- [x] 实现标签点击功能 - 点击标签后跳转到标签文章列表页面
- [x] 创建了TaggedArticles页面 - 显示指定标签下的所有文章列表
- [x] 实现搜索功能 - 在右侧栏搜索框中搜索文章
- [x] 测试预览功能流程 - 验证编辑-预览-发布的完整流程
- [x] 保存检查点 - 完成预览功能实现ptimization (Current Sprint - Phase 33)
- [x] 更新数据库Schema - 为posts表添加author字段和博客/成功案例分类字段
- [x] 更新文章编辑器 - 添加博客分类和成功案例分类选择
- [x] 更新API端点 - 支持新的分类字段过滤
- [x] 重构BlogPost页面 - 添加导航栏、作者信息、两栏布局
- [x] 创建ArticleSidebar组件 - 包含分类、最近文章、标签、搜索功能
- [x] 重构SuccessCaseDetail页面 - 添加导航栏、作者信息、两栏布局
- [x] 创建标签搜索页面 - TaggedArticles.tsx，支持按标签过滤文章
- [x] 添加路由配置 - /tagged/:tag 路由
- [x] 修复Blog.tsx - 更新为使用posts.list端点而不是blog.list
- [x] 验证SuccessCases.tsx - 已正确使用posts.list端点
- [ ] 测试所有文章页面功能 - 验证导航、侧边栏、标签搜索
- [ ] 优化响应式设计 - 确保移动设备上的显示效果

## Blog Page Card Optimization (Current Sprint - Phase 34)
- [x] 简化卡片内容 - 移除正文信息，只显示时间、标题和"点击阅读"按钮
- [x] 调整图片样式 - 移除圆角，使图片上缘与卡片边框对齐
- [ ] 测试卡片显示效果 - 验证在不同屏幕尺寸下的显示效果

## Home Page Layout Optimization (Current Sprint - Phase 35)
- [x] 修复Hero Section自适应高度 - 将height改为min-height: 80vh，使用height: auto或min-height
- [x] 添加overflow: hidden - 防止内部绝对定位元素溢出
- [x] 清除negative margin - 确保Hero Section与下一section紧挨，无重叠
- [x] 标准化section间距 - 所有section设置padding使用clamp函数实现响应式
- [x] 实现响应式间距 - 使用clamp函数，手机端自动变为padding: 40px 0;
- [x] 修复z-index问题 - 为Services及后续section添加relative z-20确保可编辑
- [x] 检查"我们的移民服务"标题字体 - 确认使用Alibaba PuHuiTi Black 64px
- [x] 统一所有标题字体 - 所有section标题使用Alibaba PuHuiTi Black 64px fontWeight 900
- [ ] 测试不同窗口尺寸 - 验证响应式布局效果
- [ ] 验证可编辑性 - 确保所有文字元素可点击和编辑

## Google Place API Integration (Current Sprint - Phase 36)
- [x] 配置Google Place API密钥 - 将API Key添加到环境变量
- [x] 获取Google Place评价数据 - 创建 googlePlacesAPI.ts模块，使用新版Places API
- [x] 更新GoogleReviewsPreview组件 - 更新routers.ts使用真实API
- [x] 测试Google Place集成 - 使用正确的Place ID，验证评价显示效果
- [x] 验证真实评价显示 - 首页已成功显示Google Place的真实客户评价（Bofan Li、Willard Tian等）

## Home Page Final Optimization (Current Sprint - Phase 37)
- [x] 修复世界地图变形 - 设置width: 100%; height: auto; object-fit: contain;
- [x] 全局字体强制统一 - 所有标题使用48px Alibaba PuHuiTi Black
- [x] 创建默认文章标题图 - 生成带傲赛移民 OXEC Immigration文字的默认图片
- [x] 更新首页文章引用 - 创建LatestArticlesSection组件引用真实已发布的文章
- [x] 验证所有section标题字体 - 确保视觉厚重感一致

## Bug Fixes (Current Sprint - Phase 38)
- [x] 修复Hero Section响应式高度 - 修改为minHeight: 100vh，使用flex-col lg:flex-row布局
- [x] 修复标题字体加载 - 在index.html中添加阿里巴巴普惠体CDN字体链接
- [x] 修复最新文章引用 - 优化LatestArticlesSection的数据获取逻辑

## Font Integration (Current Sprint - Phase 39)
- [x] 复制阿里巴巴普惠体字体文件到项目public/fonts目录
- [x] 在index.html中配置@font-face使用本地字体文件
- [x] 验证标题是否使用了正确的字体 - Hero Section标题已显示为阿里巴巴普惠体Black
- [ ] 提交到GitHub并保存检查点

## Footer Enhancement (Current Sprint - Phase 40)
- [x] 复制CICC标志图片到项目public目录
- [x] 在Footer免责声明下方添加CICC标志
- [x] 添加"通过CICC核实移民顾问身份"验证链接
- [ ] 测试Footer显示效果并保存检查点

## Bug Fixes Phase 2 (Current Sprint - Phase 41)
- [x] 修复Footer联系方式 - 将电话和邮件合并为单一联系方式部分
- [x] 恢复服务全球文字 - 右侧文字已是正确的，不需要修改
- [x] 修复CICC验证链接样式 - 字体颜色和size与"免责声明"保持一致
- [x] 修复最新资讯引用 - 替换为LatestArticlesSection组件，正常显示已发布文章

## Content Update Phase (Current Sprint - Phase 42)
- [x] Update Global Service section text - Modify title and content

## Home Page Adjustments (Current Sprint - Phase 43)
- [x] 修改Hero标题 - "专业、领先、值得信赖的伙伴"改为"专业、资深、值得信赖的"
- [x] 更新服务卡片图片 - 五个卡片使用更能体现服务内容的图片
- [x] 修复第五个卡片文本 - 改为"留学与访问"和相应的服务内容说明
- [x] 实现客户评价滑动 - 添加左右滑动功能，显示前10条评价
- [x] 修复最新资讯卡片 - 固定16:9比例，卡片宽度不超过640px

## Post Detail Page Redesign (Current Sprint - Phase 44)
- [x] 上传两张背景图到S3 - 博客文章和成功案例各一张
- [x] 创建PostDetailLayout组件 - 实现固定背景图、毛玻璃效果和侧边栏
- [x] 更新BlogPost.tsx - 使用新的PostDetailLayout模板
- [x] 更新SuccessCaseDetail.tsx - 使用新的PostDetailLayout模板
- [x] 实现响应式调整 - 移动端改为上下堆厠，background-attachment改为scroll
- [x] 测试所有屏幕尺寸 - 验证桥接、平板、移动设备的显示效果

## Article Editor Enhancement (Current Sprint - Phase 45)
- [x] 修复图片上传功能 - 实现拖拽上传和点击上传封面图
- [x] 重构分类逻辑 - 根据文章类型动态显示对应的内容分类选项
- [x] 添加发布日期自定义 - 允许用户自定义文章显示的发布时间
- [x] 扩大编辑框高度 - 增加侧边滑动条，提升编辑体验
- [x] 添加编辑功能 - 实现字体、程数、颜色、行距、缩进、对齐、插入图片等功能

## Article Editor - Testing & Feedback (Current Sprint - Phase 46)
- [x] 实际测试保存草稿功能 - 发现保存功能实际上是正常的，需要改进错误提示
- [ ] 添加成功提示 - 实现Toast通知显示保存成功消息
- [ ] 改进错误提示 - 改进错误显示方式，使其更清晰
- [ ] 添加加载状态 - 添加加载指示器，提高用户体验


## Article Editor & Admin Panel Improvements (Current Sprint - Phase 32)
- [x] 添加"显示草稿"选项到管理后台 - 在文章列表中添加toggle来显示/隐藏草稿文章
- [x] 修复TypeScript类型错误 - 解决SuccessCases.tsx和TaggedArticles.tsx中的类型错误
- [x] 修复GoogleReviewsPreview中的API调用 - 将getGoogleReviews改为list
- [ ] 测试完整的发布流程 - 创建、保存草稿、发布文章的完整测试


## Article Sidebar Enhancement (Current Sprint - Phase 42)
- [x] 修改ArticleSidebar组件 - 添加分类显示，支持成功案例和博客分类
- [x] 实现分类点击功能 - 点击分类后跳转到对应列表页面并筛选
- [x] 调整分类样式 - 浅色底、深色文字、无圆角
- [x] 调整标签样式 - 浅色底、深色文字、无圆角
- [x] 改进搜索框样式 - 加粗边框、无圆角、按钮高度一致
- [x] 实现搜索功能 - 跳转到列表页面并筛选搜索结果
- [x] 更新Blog和SuccessCaseDetail页面 - 传递分类信息到ArticleSidebar
- [x] 测试所有功能 - 验证分类、标签、搜索功能
- [ ] 保存checkpoint - 完成右边栏优化


## Booking Form Enhancement (Current Sprint - Phase 43)
- [ ] 添加机器人验证到预约咨询表单 - 集成reCAPTCHA v3或类似验证
- [ ] 实现30秒强制提交间隔 - 防止表单频繁提交
- [ ] 改进用户反馈 - 显示倒计时和提交状态
- [ ] 测试验证功能 - 验证机器人检测和间隔限制
- [ ] 保存checkpoint - 完成预约咨询功能增强


## Booking Form Enhancement - COMPLETED
- [x] 添加机器人验证 - 随机数学题验证
- [x] 实现30秒强制提交间隔 - 不能频繁提交表单
- [x] 测试整个流程 - 验证成功后提交表单
- [x] 保存checkpoint - 完成预约咨询功能优化


## Google Maps Location Fix - COMPLETED
- [x] 查找OXEC Immigration Services Ltd.的准确地址和GPS坐标
- [x] 修改Booking.tsx中的地图坐标 - 从49.2208, -122.9497改为49.2261785, -123.0012802
- [x] 更新地址信息 - 显示完整地址"1008-4710 Kingsway, Burnaby, BC V5H 4M2"
- [x] 更新邮箱信息 - 从info@oxecimm.com改为business@oxecimm.com
- [x] 测试地图定位 - 验证地图正确显示公司位置


## Business Class Service Page Redesign (Current Sprint - Phase 45)
- [x] 添加首页导航栏和Footer到/businessclass页面
- [x] 在返回主页和ENG按钮之间增加页面标题"投资移民"
- [x] 去掉所有图片的圆角（border-radius: 0）
- [x] 调整各section标题样式为阿里巴巴普惠体Black，48磅
- [x] 创建投资移民成功案例文章（使用文章编辑器）
- [x] 在/businessclass页面引用成功案例卡片（最多显示两个）
- [x] 替换背景图片为用户上传的Vancouver图片
- [x] 测试整个页面并保存checkpoint
