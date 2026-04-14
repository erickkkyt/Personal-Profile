'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  loginHref: string;
  wechatImage: string;
};

export function PaywallCta({ loginHref, wechatImage }: Props) {
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowQr(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <>
      <div className="max-w-3xl rounded-2xl border border-gray-200/80 bg-white/95 px-6 py-6 text-center shadow-2xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          登录并付费后可查看完整内容
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          已付费用户请先登录；未付费用户完成付款后立即解锁全部课程。
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={loginHref}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800"
          >
            登录继续
          </Link>
          <button
            type="button"
            onClick={() => setShowQr(true)}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-800 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800"
          >
            付费解锁
          </button>
        </div>
      </div>

      {showQr && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowQr(false)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-gray-200/70 bg-white shadow-[0_30px_120px_-40px_rgba(0,0,0,0.65)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="关闭二维码"
              onClick={() => setShowQr(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-7 text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">添加微信咨询</h3>
                <p className="text-sm text-gray-600">扫码或长按识别二维码，备注「付费解锁」</p>
              </div>
              <div className="mx-auto relative w-[248px] aspect-square overflow-hidden rounded-[20px] bg-white border border-gray-200 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)]">
                <img
                  src={wechatImage}
                  alt="微信二维码"
                  className="absolute inset-0 w-full h-full object-cover -translate-y-[32px]"
                />
              </div>
              <p className="text-xs text-gray-500">若二维码失效，请通过微信「kkkk_n8n」添加</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
