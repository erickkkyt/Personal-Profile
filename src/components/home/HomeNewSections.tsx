'use client';

import { ArrowRight, Bot, Brain, Layers, Network, Workflow, ActivitySquare, Megaphone, BookOpen, Video, MessageCircle, Sparkles, ShieldCheck, CreditCard } from 'lucide-react';
import Link from 'next/link';

type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function SectionShell({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 md:py-28">
      <div className="container-custom mx-auto px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-br from-white via-white to-white/80 p-8 md:p-12 shadow-[0_25px_80px_-40px_rgba(15,35,60,0.45)] dark:border-white/10 dark:from-gray-900/90 dark:via-gray-900/85 dark:to-gray-900/80">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_10px_10px,#0F233C0F_1px,transparent_0)] [background-size:120px_120px]" />
          <div className="pointer-events-none absolute -right-40 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-28 -bottom-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative z-10">
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="text-sm font-bold tracking-[0.15em] uppercase text-primary/90 dark:text-white/80 mb-3">{subtitle}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, description, icon }: CardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-white p-7 shadow-[0_20px_60px_-24px_rgba(15,35,60,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,35,60,0.35)] dark:border-white/10 dark:bg-gray-800/85 dark:shadow-[0_20px_60px_-30px_rgba(20,220,190,0.12)]">
      <div className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/12 to-secondary/12 text-primary group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110 dark:from-white/10 dark:to-white/5 dark:text-secondary">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-[15px] text-gray-600 leading-relaxed dark:text-gray-200 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors">{description}</p>
    </div>
  );
}

export function ProductEntrySection() {
  const items = [
    {
      title: 'n8n 系统课 · 699/年',
      description: '持续更新，含完整大纲、实践案例、模板全量内含，支持试听与退款说明。',
      icon: <ShieldCheck className="w-6 h-6" />,
      href: '/course',
      cta: '进入课程',
    },
    {
      title: '模板合集 · 299/次',
      description: '高质量工作流模板打包下载，单次购买永久使用；课程内已包含全量模板。',
      icon: <Layers className="w-6 h-6" />,
      href: '/templates',
      cta: '查看模板',
    },
  ];

  return (
    <SectionShell id="products" title="产品与付费入口" subtitle="Course & Templates">
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 shadow-[0_20px_60px_-24px_rgba(15,35,60,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,35,60,0.35)] dark:border-white/10 dark:bg-gray-800/85 dark:shadow-[0_20px_60px_-30px_rgba(20,220,190,0.12)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary via-secondary to-accent" />
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110 dark:from-white/10 dark:to-white/5 dark:text-secondary">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">{item.title}</h3>
            <p className="text-[15px] text-white/85 leading-relaxed group-hover:text-white/90 transition-colors">{item.description}</p>
            <div className="mt-5 inline-flex items-center text-sm font-semibold text-primary group-hover:text-white transition-colors group-hover:translate-x-1 transition-transform">
              {item.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-dashed border-primary/40 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-gray-800/70">
        <CreditCard className="w-4 h-4 text-primary" />
        <span>课程内已包含全部模板；单独购买模板适合已有基础或只需素材的用户。</span>
      </div>
    </SectionShell>
  );
}

export function CapabilitiesSection() {
  const items = [
    {
      title: 'AI 工作流设计',
      description: '拆解需求、编排节点、让流程可复用、可观测、可迭代。',
      icon: <Workflow className="w-6 h-6" />,
    },
    {
      title: '智能体场景开发',
      description: 'Marketing / 内容 / 运营智能体，自动处理与决策。',
      icon: <Bot className="w-6 h-6" />,
    },
    {
      title: '多平台数据集成',
      description: '飞书、企微、公众号、小红书、数据库/API 一站打通。',
      icon: <Network className="w-6 h-6" />,
    },
    {
      title: '自动化诊断与咨询',
      description: '评估现状，提出优化方案并落地，持续迭代提升效率。',
      icon: <Brain className="w-6 h-6" />,
    },
  ];

  return (
    <SectionShell id="capabilities" title="我能帮你做什么" subtitle="Capabilities">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </div>
    </SectionShell>
  );
}

export function ScenariosSection() {
  const scenarios = [
    '电商换装自动化流水线',
    '小红书笔记批量生成与发布',
    '公众号排版 + 定时发布',
    '私域运营自动同步与沉淀',
    '数据 Dashboard 自动更新',
    '多账号矩阵运营流水线',
  ];

  return (
    <SectionShell id="scenarios" title="典型使用场景" subtitle="Scenarios">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((text) => (
          <div
            key={text}
            className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/40 hover:border-primary/20 dark:border-gray-800 dark:bg-gray-800/40 dark:hover:bg-gray-800/60 group cursor-default"
          >
            <span className="flex h-3 w-3 rounded-full bg-primary/80 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all"></span>
            <p className="text-base font-medium text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">{text}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function OfferingsSection() {
  const offerings = [
    {
      title: 'n8n 系统课',
      description: '实战型课程，499/699，循序渐进掌握自动化思维与落地。',
      icon: <Layers className="w-6 h-6" />,
    },
    {
      title: '模板库',
      description: '高质量工作流模板 199/条，拿来即用，按需定制调整。',
      icon: <ActivitySquare className="w-6 h-6" />,
    },
    {
      title: '定制项目',
      description: '3k-10k+ 的端到端交付，按目标拆解，交付能跑的系统。',
      icon: <ArrowRight className="w-6 h-6" />,
    },
    {
      title: '咨询/顾问',
      description: '策略诊断 + 持续迭代陪跑，帮你搭建可复用的自动化资产。',
      icon: <Megaphone className="w-6 h-6" />,
    },
  ];

  return (
    <SectionShell id="offerings" title="核心产品 / 服务" subtitle="What I Provide">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {offerings.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </div>
    </SectionShell>
  );
}

export function CaseStudiesSection() {
  const cases = [
    {
      tag: '内容营销',
      title: '公众号全流程自动化',
      detail: '从竞对监控、选题决策、内容撰写到排版上传的端到端自动化。',
    },
    {
      tag: '短视频运营',
      title: '抖音爆款内容爬取与二创',
      detail: '按关键词抓取抖音爆款，分析数据并驱动 AI 仿写与文案二创。',
    },
    {
      tag: '社交媒体',
      title: '小红书爆款图文自动化',
      detail: '抓取笔记数据，通过视觉分析提炼爆款因子，自动生成二创图文。',
    },
    {
      tag: '电商视觉',
      title: 'AI 虚拟模特换装流水线',
      detail: '串联 n8n + 飞书 + Nanobanana，自动生成以假乱真的真人试穿效果图。',
    },
  ];

  return (
    <SectionShell id="cases" title="真实案例" subtitle="Case Studies">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cases.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-white/80 bg-white/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary/20 dark:border-gray-800 dark:bg-gray-800/40 dark:hover:bg-gray-800/60"
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary tracking-wide uppercase group-hover:bg-primary group-hover:text-white transition-colors">
              {item.tag}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function ContentSection() {
  const contents = [
    { title: '博客 / 知识库', description: '拆解自动化方法论与案例复盘。', icon: <BookOpen className="w-6 h-6" /> },
    { title: '小红书内容', description: '运营技巧 + 工具分享，快速获取灵感。', icon: <Sparkles className="w-6 h-6" /> },
    { title: '视频教程', description: 'B 站 / YouTube 实操演示，跟着做就会。', icon: <Video className="w-6 h-6" /> },
    { title: '免费文档', description: '0.01 引流品：自动化指南、节点速查。', icon: <MessageCircle className="w-6 h-6" /> },
  ];

  return (
    <SectionShell id="content" title="内容模块" subtitle="Content">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {contents.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </div>
    </SectionShell>
  );
}

export function CommunitySection() {
  return (
    <SectionShell id="community" title="社群与联系方式" subtitle="Connect">
      <div className="grid gap-8 md:grid-cols-2 items-stretch">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-10 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-2xl font-bold text-primary mb-4">加入社群 / 领取指南</h3>
          <p className="text-base text-gray-700 leading-relaxed mb-8 dark:text-gray-300">
            微信/飞书社群、公众号、邮箱/表单。领取「免费自动化指南」或预约 30min 诊断。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/course" className="btn-primary px-6 py-3.5 text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30">
              预约咨询
            </Link>
            <a href="#" className="btn-outline px-6 py-3.5 text-sm font-medium bg-white/50 hover:bg-white dark:bg-transparent dark:hover:bg-gray-800">
              领取免费指南
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/80 bg-white/60 p-8 md:p-10 text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-200 flex flex-col justify-center">
          <p className="font-bold text-lg mb-3 text-gray-900 dark:text-white">社群入口</p>
          <p className="mb-4 text-base leading-relaxed">微信 / 飞书社群二维码，公众号，邮箱/表单。</p>
          <p className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700/50">提示：可在此放二维码或链接，保持与站点主色一致。</p>
        </div>
      </div>
    </SectionShell>
  );
}
