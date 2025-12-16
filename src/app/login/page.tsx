'use client' // *** 添加这一行，将组件转换为客户端组件 ***

import Link from 'next/link';
import { useState, useTransition, useEffect, Suspense } from 'react'; // 导入 Hooks and Suspense
import { useSearchParams } from 'next/navigation'; // 导入 useSearchParams
import { login, signup } from './actions'; // 导入 Server Actions
import { createClient } from '@/utils/supabase/client'; // 更正：从项目工具类导入 Supabase 客户端创建函数

// 新的内部组件，包含原有逻辑
function LoginContent() {
  const supabase = createClient(); // 更正：使用导入的函数创建 Supabase 客户端实例
  const searchParams = useSearchParams(); // 获取 searchParams
  // const [email, setEmail] = useState(''); // 可以用 state 管理输入，但 FormData 也能工作
  // const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null); // 用于显示成功或错误消息
  const [isPending, startTransition] = useTransition(); // 用于处理异步操作状态

  useEffect(() => {
    const urlMessage = searchParams?.get('message');
    if (urlMessage) {
      setMessage(decodeURIComponent(urlMessage));
    }
    const urlError = searchParams?.get('error'); // 也检查常见的 error 参数
    if (urlError) {
      setMessage(decodeURIComponent(urlError));
    }
  }, [searchParams]); // 当 searchParams 改变时重新运行

  // 处理登录的函数 (注意：login 成功时会 redirect)
  const handleLogin = (formData: FormData) => {
    startTransition(async () => {
      setMessage(null); // 清除旧消息

      // 添加next参数到formData
      const next = searchParams?.get('next') || '/';
      formData.append('next', next);

      // login 成功时 redirect, 失败时返回对象
      const result = await login(formData);
      if (result?.message) { // 仅当 login 返回错误消息时设置
         setMessage(result.message);
      }
      // 不需要处理成功情况，因为 redirect 会发生
    });
  };

  // 处理注册的函数
  const handleSignup = (formData: FormData) => {
    startTransition(async () => {
      setMessage(null); // 清除旧消息
      const result = await signup(formData); // 调用注册 action
      if (result.message) {
        setMessage(result.message); // 显示来自 action 的消息
      }
    });
  };

  // 新增：处理 Google 登录的函数
  const handleGoogleSignIn = async () => {
    setMessage(null); // 清除之前的消息
    startTransition(async () => { // 使用 transition 来管理加载状态
      // 获取重定向目标
      const next = searchParams?.get('next') || '/';
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          // 如果需要，可以在这里添加 scopes: 'email profile' 等
        },
      });
      if (error) {
        setMessage(`Google Sign-In Error: ${error.message}`);
      }
      // 成功时，用户会被重定向到 Google，然后重定向回 /auth/callback
      // Supabase 会处理会话，然后通常重定向到主页或仪表盘
      // 因此这里不需要显式的成功消息或重定向逻辑
    });
  };

  // 注意：如果 actions.ts 返回的错误消息是中文，这里的判断逻辑可能需要调整，或者 actions.ts 也需要国际化
  // 为简单起见，我们假设错误消息会包含 'failed' 或 'error'，或者可以根据后端实际返回的英文错误消息调整
  const isError = message && (
    message.toLowerCase().includes('failed') ||
    message.toLowerCase().includes('error') ||
    message.toLowerCase().includes('incorrect') ||
    message.toLowerCase().includes('invalid') ||
    message.toLowerCase().includes('empty') || // 对应 "不能为空"
    message.toLowerCase().includes('must')    // 对应 "必须"
  );
  const isSuccess = message && !isError;

  return (
    // 黑色主题背景
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1220] via-[#0F1A2F] to-[#0B2A3A] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 -top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_10px_10px,#ffffff0f_1px,transparent_0)] [background-size:140px_140px]" />
      </div>

      {/* 黑色主题卡片 */}
      <div className="relative max-w-lg w-full space-y-10 bg-gray-900/85 border border-white/10 p-10 sm:p-12 shadow-[0_30px_120px_-40px_rgba(20,220,190,0.35)] rounded-[32px] backdrop-blur-2xl">
        <div className="text-center space-y-4">
          {/* 白色标题适配黑色背景 */}
          <h2 className="text-3xl font-bold tracking-tight text-white">
            登录 / 注册
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">使用邮箱或 Google 登录；登录并付费后可访问课程全部内容。</p>
        </div>

        {/* 黑色主题消息提示框 */}
        {message && (
          <div className={`p-4 rounded-xl text-center mb-6 border ${
            isError
              ? 'bg-red-900/50 border-red-700 text-red-300 text-sm backdrop-blur-sm' // 错误样式适配黑色主题
              : 'bg-emerald-900/40 border-emerald-700 text-emerald-200 text-base font-medium py-3 backdrop-blur-sm' // 成功样式适配黑色主题
          }`}>
            {message}
          </div>
        )}

        <form className="mt-2 space-y-8" onSubmit={(e) => e.preventDefault()}> {/* 阻止 form 默认提交 */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">邮箱</label>
              <input
                id="email"
                name="email" // name 属性仍用于 FormData
                type="email"
                autoComplete="email"
                required
                // value={email} // 如果使用 state 管理输入
                // onChange={(e) => setEmail(e.target.value)}
                // 黑色主题输入框样式
                className="appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-gray-400 text-white bg-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 focus:z-10 sm:text-sm backdrop-blur-sm"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">密码</label>
              <input
                id="password"
                name="password" // name 属性仍用于 FormData
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                // value={password} // 如果使用 state 管理输入
                // onChange={(e) => setPassword(e.target.value)}
                 // 黑色主题输入框样式
                className="appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-gray-400 text-white bg-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 focus:z-10 sm:text-sm backdrop-blur-sm"
                placeholder="••••••••（至少 6 位字符）"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 pt-5"> {/* 增加一点上边距 */}
            <button
              type="button" // 更改为 type="button"
              // 移除 formAction
              onClick={(e) => {
                // e.preventDefault(); // 已在 form 的 onSubmit 中阻止
                const formData = new FormData(e.currentTarget.form!);
                handleLogin(formData);
              }}
              disabled={isPending} // 禁用按钮当操作进行中
              // 黑色主题按钮样式
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/60 focus:ring-offset-gray-900 disabled:opacity-60 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isPending ? '处理中...' : '登录'}
            </button>
            <button
              type="button"
              onClick={(e) => {
                const formData = new FormData(e.currentTarget.form!);
                handleSignup(formData);
              }}
              disabled={isPending}
              className="group relative w-full flex justify-center py-3 px-4 border border-white/15 text-sm font-semibold rounded-xl text-white/90 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/60 focus:ring-offset-gray-900 disabled:opacity-60 backdrop-blur-sm transition-all duration-200"
            >
              {isPending ? '处理中...' : '注册'}
            </button>
          </div>
        </form>
        
        {/* 黑色主题分隔线 */}
        <div className="my-6 flex items-center justify-center">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 flex-shrink text-gray-400 text-sm">或</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isPending}
          className="group relative w-full flex items-center justify-center py-3 px-4 border border-white/10 text-sm font-semibold rounded-xl text-white/90 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/60 focus:ring-offset-gray-900 disabled:opacity-60 backdrop-blur-sm transition-all duration-200"
        >
          {isPending ? (
            '处理中...'
          ) : (
            <>
              <svg className="mr-2 -ml-1 w-[18px] h-[18px]" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M17.64,9.20455c0-.63864-.05682-1.25682-.16818-1.85455H9V11.15909h4.845C13.65909,12.43182,12.81364,13.46136,11.61364,14.15455v2.36818h3.04091C16.58182,14.84091,17.64,12.27273,17.64,9.20455Z" fill="#4285F4"/>
                <path d="M9,18c2.43182,0,4.46591-.80682,5.95455-2.18182l-3.04091-2.36818C11.14091,13.75,10.14545,14.09091,9,14.09091c-2.77273,0-5.12045-1.87273-5.95455-4.42045H0v2.45C1.47727,15.17727,4.96364,18,9,18Z" fill="#34A853"/>
                <path d="M3.04545,10.90909c-.22273-.66818-.22273-1.39091,0-2.05909V6.4H0C-.622727,7.69091-1,9.13636-1,10.63636S-.622727,13.58182,0,14.87273l3.04545-2.45Z" fill="#FBBC05"/>
                <path d="M9,3.54545c1.31364,0,2.51818,.45455,3.45909,1.36364l2.68636-2.68636C13.46136,.80227,11.43182,0,9,0,4.96364,0,1.47727,2.82273,0,6.4l3.04545,2.45C3.87955,5.41818,6.22727,3.54545,9,3.54545Z" fill="#EA4335"/>
              </svg>
              使用 Google 登录
            </>
          )}
        </button>
        {/* ---结束新增部分--- */}

        <div className="text-center mt-6"> {/* 调整上边距 */}
          <Link href="/" className="text-sm font-medium text-white hover:text-primary transition-colors">
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}

// LoginPage теперь оборачивает LoginContent в Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800"><p className="text-white">Loading...</p></div>}>
      <LoginContent />
    </Suspense>
  );
}
