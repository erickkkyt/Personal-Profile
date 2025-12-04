'use client';

import { ArrowRight, Bot, Brain, Layers, Network, Workflow, ActivitySquare, Megaphone, BookOpen, Video, MessageCircle, Sparkles } from 'lucide-react';
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
        <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 md:p-12 shadow-2xl shadow-gray-200/50 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/40 dark:shadow-none">
          <div className="max-w-3xl mb-10 md:mb-14">
            <p className="text-sm font-bold tracking-[0.15em] uppercase text-primary/90 mb-3">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function Card({ title, description, icon }: CardProps) {
  return (
    <div className="group rounded-2xl border border-white/80 bg-white/60 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary/20 dark:border-gray-800 dark:bg-gray-800/40 dark:hover:shadow-none dark:hover:bg-gray-800/60">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary group-hover:to-primary/90 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-[15px] text-gray-600 leading-relaxed dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">{description}</p>
    </div>
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
      tag: '电商运营',
      title: '减少 80% 重复劳动',
      detail: '搭建商品信息同步 + 评价抓取 + Dashboard 自动更新，团队每天节省 3 小时。',
    },
    {
      tag: '内容团队',
      title: '小红书矩阵自动化',
      detail: '批量生成笔记、定时发布、数据回流，整体效率提升 3 倍。',
    },
    {
      tag: '私域/社群',
      title: '消息同步与沉淀',
      detail: '多渠道消息一键归档、自动标签、群发，获客转化流程标准化。',
    },
  ];

  return (
    <SectionShell id="cases" title="真实案例" subtitle="Case Studies">
      <div className="grid gap-8 md:grid-cols-3">
        {cases.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-white/80 bg-white/60 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary/20 dark:border-gray-800 dark:bg-gray-800/40 dark:hover:bg-gray-800/60"
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary tracking-wide uppercase group-hover:bg-primary group-hover:text-white transition-colors">
              {item.tag}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
            <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">{item.detail}</p>
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
