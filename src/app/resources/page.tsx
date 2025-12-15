import Link from 'next/link';
import { Download, FileText, BookOpen } from 'lucide-react';

export default function ResourcesPage() {
  const freebies = [
    { title: 'n8n 入门资料包', desc: '1.5w 字基础教程、节点速查表', href: '/course' },
    { title: '自动化场景清单', desc: '30+ 典型业务场景拆解与思路', href: '/blog' },
    { title: '流程模板试用', desc: '精选免费模板，下载即用', href: '/templates' },
  ];

  return (
    <div className="container-custom max-w-5xl py-16 space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Resources</p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">免费资源与引流品</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200">下载资料包、试用模板，了解课程内容，留下邮箱或加入社群获取更新。</p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {freebies.map((item) => (
          <Link key={item.title} href={item.href} className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-gray-900/70 p-6 shadow-sm hover:-translate-y-1 transition-transform">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-primary/40 bg-white/70 dark:bg-gray-800/70 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <BookOpen className="w-4 h-4" />
            获取更多更新
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-200">课程内将持续更新新的模板与案例，订阅或加群获取第一时间通知。</p>
        </div>
        <Link href="/course" className="btn-primary px-5 py-3 text-sm font-semibold rounded-xl">
          查看课程
        </Link>
      </div>
    </div>
  );
}
