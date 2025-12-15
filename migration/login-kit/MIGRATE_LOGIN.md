# Vogue AI 登录功能迁移指南

把这个 `migration/login-kit` 目录复制到你的新项目根目录，然后按照下面步骤接入。文件路径保持不变，方便直接覆盖/复用。

## 1) 必需环境变量
在新项目的 `.env.local` (或环境配置) 填好：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google OAuth + One-Tap
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
NEXT_PUBLIC_GOOGLE_ONE_TAP_ENABLED="true"  # 需要启用时设为 true
```

- Supabase 控制台开启 Google Provider，并设置站点 URL、重定向 URL：`https://your-domain/auth/callback`（含本地版本）。
- Google Cloud Console 启用 Google Identity API，配置 OAuth 同意屏幕和授权来源/回调同上。

## 2) 必要依赖
确保安装：
```bash
npm i @supabase/ssr @supabase/supabase-js
```
Next.js 13/14 app router 项目默认即可；若使用 pages router，需要调整中间件与路由位置。

## 3) 需要复制/放置的文件
将下列文件按原路径放入新项目（已在 `migration/login-kit/src/...` 里准备好）：

- `src/utils/supabase/server.ts`：服务端 Supabase client（基于 cookies）。
- `src/utils/supabase/client.ts`：浏览器 Supabase client。
- `src/utils/supabase/middleware.ts`：会话刷新 & cookie 同步。
- `src/utils/supabase/admin.ts`：Service Role 用的 Admin client（仅在安全环境使用）。
- `src/middleware.ts`：Next 中间件，调用 `updateSession` 刷新 session。若你已有 middleware，合并 matcher 配置即可。

- `src/app/login/page.tsx`：登录/注册 UI + 调用 server actions，支持 `next` 重定向参数，含 Google OAuth 按钮。
- `src/app/login/actions.ts`：`login` (signInWithPassword + redirect) 与 `signup` (signUp) 的 Server Action。
- `src/app/login/layout.tsx`：/login 页的 `noindex` 与 AdSense Script。

- `src/app/auth/callback/route.ts`：Google OAuth 回调，`exchangeCodeForSession` 后重定向到 `next`（含白名单校验）。
- `src/app/auth/confirm/route.ts`：邮箱 OTP 确认回调。

- `src/components/auth/GoogleOneTap.tsx`：One-Tap 展示组件（全局提示条）。
- `src/hooks/useOneTapLogin.tsx`：One-Tap 核心逻辑，调用 `signInWithIdToken`。
- `src/types/google-one-tap.d.ts`：Google Identity/One-Tap TS 类型声明。

## 4) 全局挂载 One-Tap 脚本与组件
在你的根布局（示例：`src/app/layout.tsx`）中加入：
- `<Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />`
- 全局渲染 `<GoogleOneTap />`（从 `src/components/auth/GoogleOneTap` 引入）。
- 确保 `<html lang="...">` 下的 `<body>` 里渲染该组件。

若已有其它脚本，保持加载顺序即可；One-Tap 依赖浏览器环境，因此必须在客户端运行。

## 5) 受保护路由/API 的用法
- **API Route（示例见 `src/app/api/veo3/generate/route.ts`）**：
  ```ts
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ message: 'Auth required' }, { status: 401 });
  ```
  记得使用服务器端 client（`src/utils/supabase/server.ts`）。

- **前端受保护操作**：在组件中用浏览器 client：
  ```ts
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) router.push('/login?next=' + encodeURIComponent(pathname));
  ```

- **导航栏示例**：`src/components/common/Header.tsx` 里有生成带 `next` 参数登录链接、监听 `onAuthStateChange` 的模式，可参考迁移。

## 6) 登录页行为说明
- 邮箱密码登录：`login(formData)` 成功后会 `redirect(next || '/')`，失败返回 `{ success: false, message }` 供 UI 展示。
- 注册：`signup(formData)` 校验长度 >=6，成功返回提示信息（若你的 Supabase 开启邮箱验证，则用户需点邮件）。
- Google 登录按钮：调用 `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: origin + '/auth/callback?next=...' }})`。
- One-Tap：在全局自动弹出，未登录用户才提示；验证 Google `id_token` 后调用 `signInWithIdToken`，成功后 `router.refresh()`。

## 7) 路由与 SEO
- `/login` 通过 `layout.tsx` 设置 `robots.noindex`，必要时在你的项目保持同样配置。
- `public/robots.txt` 若有自定义，需要手动添加 `Disallow: /login`。

## 8) 迁移步骤速览
1. 复制 `migration/login-kit/src` 下所有文件到新项目对应路径。
2. 根布局加入 GIS 脚本并渲染 `<GoogleOneTap />`。
3. 配置 `.env.local` 并在 Supabase/Google 控制台完成 OAuth 设置。
4. 为需要保护的 API/页面添加 `auth.getUser()` 检查和未登录重定向。
5. 启动项目，访问 `/login`，测试邮箱密码和 Google 登录/One-Tap。

## 9) 常见坑
- 环境变量必须有 `NEXT_PUBLIC_` 前缀才能在浏览器端读取。
- `SUPABASE_SERVICE_ROLE_KEY` 只在安全的 server 端使用，勿暴露到客户端。
- One-Tap 仅在 HTTPS/localhost 下工作，且域名需在 Google 控制台授权。
- 如果你已有全局中间件，合并 `config.matcher`，避免覆盖现有规则。

复制本目录后，如需差异对比，可使用 `diff -ruN migration/login-kit/src your-project/src` 进行校验。
