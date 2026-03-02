# /admin 管理页面身份验证系统 - 测试指南

## 一、环境准备

### 1.1 创建测试管理员账户

在浏览器开发者工具中执行以下命令，或通过数据库管理界面直接插入：

```sql
-- 创建测试管理员账户
-- 密码哈希可以通过以下方式生成：
-- 在server/auth-admin.ts中调用 hashPassword('TestPassword123!')

INSERT INTO admins (username, email, passwordHash, role, isActive, mfaEnabled) VALUES
(
  'admin',
  'admin@oxec.ca',
  'REPLACE_WITH_BCRYPT_HASH',  -- 使用 hashPassword('TestPassword123!') 生成
  'admin',
  true,
  false
);
```

**生成bcrypt哈希的方法：**

在浏览器控制台中执行（需要导入auth-admin模块）：
```javascript
import { hashPassword } from './server/auth-admin';
const hash = await hashPassword('TestPassword123!');
console.log('Bcrypt hash:', hash);
```

或使用以下在线工具：https://bcrypt-generator.com/
- 输入密码：`TestPassword123!`
- 轮数：10
- 复制生成的哈希值

**默认测试账户：**
- 用户名：`admin`
- 密码：`TestPassword123!`
- 角色：`admin`
- MFA状态：未启用

### 1.2 验证数据库表

确保以下表已创建：
```bash
# 在项目根目录运行
pnpm db:push
```

检查表结构：
- `admins` - 管理员账户表
- `mfaConfigs` - MFA配置表
- `adminSessions` - 会话表
- `mfaAttempts` - MFA尝试记录表

---

## 二、单元测试

### 2.1 运行认证系统单元测试

```bash
cd /home/ubuntu/oxec-immigration

# 运行所有auth-admin相关测试
pnpm test -- server/auth-admin.test.ts

# 运行特定测试套件
pnpm test -- server/auth-admin.test.ts -t "Password Validation"
pnpm test -- server/auth-admin.test.ts -t "JWT Token"
pnpm test -- server/auth-admin.test.ts -t "TOTP Verification"
pnpm test -- server/auth-admin.test.ts -t "SMS Code Generation"
```

### 2.2 测试覆盖范围

| 测试项 | 文件 | 覆盖内容 |
|--------|------|---------|
| 密码校验 | `server/auth-admin.test.ts` | 8字符、大小写、数字、特殊字符要求 |
| 密码哈希 | `server/auth-admin.test.ts` | bcrypt哈希和验证 |
| JWT生成 | `server/auth-admin.test.ts` | token生成、验证、过期检查 |
| TOTP验证 | `server/auth-admin.test.ts` | Google Authenticator验证码验证 |
| SMS码 | `server/auth-admin.test.ts` | 6位随机数生成 |

---

## 三、集成测试（手动）

### 3.1 测试登录流程（无MFA）

**步骤：**

1. **访问登录页面**
   ```
   http://localhost:3000/admin/login
   ```

2. **输入正确的凭证**
   - 用户名：`admin`
   - 密码：`TestPassword123!`
   - 点击"登录"按钮

3. **预期结果**
   - ✓ 登录成功，重定向到 `/admin/dashboard`
   - ✓ `localStorage` 中存储 `adminToken` 和 `adminExpiresAt`
   - ✓ 页面显示管理员信息

**失败场景测试：**

```
场景1：用户名错误
- 输入：username="wrong", password="TestPassword123!"
- 预期：显示错误提示 "用户名或密码错误"

场景2：密码错误
- 输入：username="admin", password="WrongPassword123!"
- 预期：显示错误提示 "用户名或密码错误"

场景3：空字段
- 输入：username="", password=""
- 预期：登录按钮禁用，提示 "用户名不能为空" 和 "密码不能为空"
```

### 3.2 测试密码强度指示器

在登录页面密码输入框中输入不同的密码，观察实时反馈：

| 密码输入 | 强度 | 指示器颜色 |
|---------|------|-----------|
| `test` | 弱 | 红色 |
| `Test123` | 中等 | 黄色 |
| `Test123!@#` | 强 | 绿色 |

**密码要求检查清单：**
- [ ] 至少8个字符
- [ ] 包含大写字母 (A-Z)
- [ ] 包含小写字母 (a-z)
- [ ] 包含数字 (0-9)
- [ ] 包含特殊字符 (!@#$%^&*等)

### 3.3 测试密码可见性切换

1. 在密码输入框中输入密码
2. 点击眼睛图标切换密码可见性
3. 预期结果：
   - ✓ 点击时，密码从 `•••••` 变为明文
   - ✓ 再次点击，密码隐藏
   - ✓ 眼睛图标相应改变

---

## 四、MFA功能测试（准备中）

### 4.1 启用Google Authenticator MFA

**前置条件：** 已登录到管理员账户

**步骤：**

1. 访问 `/admin/settings/mfa` (待实现)
2. 选择 "Google Authenticator"
3. 扫描二维码或手动输入密钥
4. 在Google Authenticator应用中验证
5. 输入6位验证码完成设置

**预期结果：**
- ✓ MFA已启用
- ✓ 显示备用码（用于账户恢复）
- ✓ 下次登录时需要输入验证码

### 4.2 启用SMS MFA

**步骤：**

1. 访问 `/admin/settings/mfa`
2. 选择 "短信验证"
3. 输入手机号码
4. 输入收到的验证码
5. 完成设置

**预期结果：**
- ✓ MFA已启用
- ✓ 下次登录时会发送短信验证码

### 4.3 测试MFA登录流程

**启用MFA后的登录测试：**

1. 访问 `/admin/login`
2. 输入用户名和密码
3. 点击登录
4. 重定向到 `/admin/mfa-verify` (待实现)
5. 输入6位验证码（Google Authenticator或SMS）
6. 点击验证
7. 预期：重定向到 `/admin/dashboard`

**MFA失败场景：**

```
场景1：验证码错误
- 输入错误的6位数字
- 预期：显示 "验证码错误，请重试"

场景2：验证码过期
- 等待30秒后再输入验证码
- 预期：显示 "验证码已过期，请重新获取"

场景3：尝试次数过多
- 连续5次输入错误验证码
- 预期：显示 "尝试次数过多，请稍后再试"，15分钟后重试
```

---

## 五、会话管理测试

### 5.1 会话超时测试（待实现）

**步骤：**

1. 登录到管理员账户
2. 记录登录时间
3. 等待8小时不操作
4. 尝试访问 `/admin/dashboard`

**预期结果：**
- ✓ 会话过期
- ✓ 自动重定向到 `/admin/login`
- ✓ 显示提示 "会话已过期，请重新登录"

### 5.2 不活跃警告测试（待实现）

**步骤：**

1. 登录到管理员账户
2. 7小时50分钟不操作
3. 观察页面

**预期结果：**
- ✓ 显示警告弹窗 "您已有7小时50分钟未操作，将在10分钟后自动退出"
- ✓ 点击"继续操作"按钮，会话延长
- ✓ 点击"现在退出"按钮，立即登出

### 5.3 多标签页会话同步测试

**步骤：**

1. 打开两个浏览器标签页
2. 在标签页A中登录
3. 在标签页B中访问 `/admin/dashboard`
4. 在标签页A中点击登出

**预期结果：**
- ✓ 标签页B自动检测到会话失效
- ✓ 自动重定向到登录页面

---

## 六、安全性测试

### 6.1 CSRF防护测试

**步骤：**

1. 在浏览器控制台中尝试直接调用登录API
2. 不包含CSRF令牌

**预期结果：**
- ✓ 请求被拒绝
- ✓ 返回错误 "Invalid CSRF token"

### 6.2 SQL注入防护测试

**步骤：**

1. 在登录表单中输入SQL注入代码
   ```
   用户名：admin' OR '1'='1
   密码：anything
   ```

2. 点击登录

**预期结果：**
- ✓ 显示错误 "用户名或密码错误"
- ✓ 没有执行SQL注入

### 6.3 暴力破解防护测试

**步骤：**

1. 连续尝试10次错误的密码登录
2. 观察系统响应

**预期结果：**
- ✓ 在5次失败后，账户被临时锁定
- ✓ 显示 "账户已被锁定，请在15分钟后重试"
- ✓ 15分钟后可以重新尝试

---

## 七、浏览器兼容性测试

在以下浏览器中测试登录流程：

| 浏览器 | 版本 | 测试状态 |
|--------|------|---------|
| Chrome | 最新 | [ ] |
| Firefox | 最新 | [ ] |
| Safari | 最新 | [ ] |
| Edge | 最新 | [ ] |

**测试项：**
- [ ] 登录表单显示正确
- [ ] 密码可见性切换正常
- [ ] 密码强度指示器显示正确
- [ ] 登录成功后重定向正常
- [ ] 错误提示显示正确

---

## 八、性能测试

### 8.1 登录响应时间

```bash
# 使用curl测试登录API响应时间
curl -w "@curl-format.txt" -o /dev/null -s \
  -X POST http://localhost:3000/api/trpc/adminAuth.login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"TestPassword123!"}'
```

**预期结果：**
- ✓ 响应时间 < 500ms
- ✓ 密码哈希验证 < 200ms

### 8.2 MFA验证响应时间

```bash
# 测试MFA验证API
curl -w "@curl-format.txt" -o /dev/null -s \
  -X POST http://localhost:3000/api/trpc/adminAuth.verifyMFA \
  -H "Content-Type: application/json" \
  -d '{"adminId":1,"code":"123456","method":"google_authenticator"}'
```

**预期结果：**
- ✓ 响应时间 < 300ms

---

## 九、调试技巧

### 9.1 查看浏览器存储

在浏览器开发者工具中：

```javascript
// 查看localStorage中的token
console.log('Admin Token:', localStorage.getItem('adminToken'));
console.log('Expires At:', localStorage.getItem('adminExpiresAt'));

// 查看sessionStorage中的MFA信息
console.log('Admin ID:', sessionStorage.getItem('adminId'));
console.log('MFA Method:', sessionStorage.getItem('mfaMethod'));
```

### 9.2 查看数据库记录

```sql
-- 查看管理员账户
SELECT id, username, email, role, isActive, mfaEnabled, lastLogin FROM admins;

-- 查看会话记录
SELECT id, adminId, token, expiresAt, ipAddress FROM adminSessions;

-- 查看MFA尝试记录
SELECT id, adminId, method, success, attemptedAt FROM mfaAttempts;
```

### 9.3 启用调试日志

在 `server/auth-admin.ts` 中添加日志：

```typescript
console.log('Login attempt:', { username, timestamp: new Date() });
console.log('Password verification:', { valid: passwordValid });
console.log('Session created:', { adminId, expiresAt });
```

---

## 十、常见问题排查

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 登录页面无法加载 | 路由未配置 | 在 `client/src/App.tsx` 中添加 `/admin/login` 路由 |
| 登录失败 "用户名或密码错误" | 账户不存在或密码错误 | 检查数据库中是否存在测试账户 |
| 密码强度指示器不显示 | 组件未导入 | 检查 `PasswordStrengthIndicator` 组件是否正确导入 |
| MFA验证失败 | TOTP密钥不匹配 | 重新生成TOTP密钥并在Google Authenticator中更新 |
| 会话过期后无法重新登录 | token未清除 | 清除 `localStorage` 中的 `adminToken` |

---

## 十一、测试检查清单

### 登录功能
- [ ] 正确的凭证可以登录
- [ ] 错误的凭证显示错误提示
- [ ] 空字段显示验证错误
- [ ] 密码可见性切换正常
- [ ] 密码强度指示器显示正确
- [ ] 登录成功后重定向到仪表板

### MFA功能
- [ ] 可以启用Google Authenticator
- [ ] 可以启用SMS验证
- [ ] MFA验证码验证正确
- [ ] 错误的验证码显示错误提示
- [ ] 尝试次数过多显示锁定提示

### 会话管理
- [ ] 会话在8小时后过期
- [ ] 7小时50分钟时显示不活跃警告
- [ ] 点击"继续操作"延长会话
- [ ] 点击"现在退出"立即登出
- [ ] 多标签页会话同步

### 安全性
- [ ] CSRF防护正常
- [ ] SQL注入防护正常
- [ ] 暴力破解防护正常
- [ ] 敏感信息不在日志中泄露

---

## 十二、后续测试（待实现功能）

- [ ] MFA设置页面 (`/admin/settings/mfa`)
- [ ] MFA验证页面 (`/admin/mfa-verify`)
- [ ] 管理员管理页面 (`/admin/users`)
- [ ] 会话自动退出功能
- [ ] SMS服务集成
- [ ] 备用码恢复流程
- [ ] 登录历史审计日志
