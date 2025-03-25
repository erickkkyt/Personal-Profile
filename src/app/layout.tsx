import type { Metadata } from 'next';
import Script from 'next/script';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: '个人专业主页',
  description: '我的个人专业主页，展示我的技能、项目和博客',
  keywords: '前端开发, Web开发, React, Next.js',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: '个人专业主页',
    description: '我的个人专业主页，展示我的技能、项目和博客',
    url: 'https://your-website.com',
    siteName: '个人专业主页',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Your Name',
              url: 'https://your-website.com',
              jobTitle: '前端开发工程师',
              sameAs: [
                'https://github.com/yourusername',
                'https://linkedin.com/in/yourusername',
                'https://twitter.com/yourusername',
              ],
            }),
          }}
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XSV0VDCENG"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XSV0VDCENG');
          `}
        </Script>
      </head>
      <body className="dark-transition">
        {children}
      </body>
    </html>
  );
} 