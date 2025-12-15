'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Download, ShieldCheck, BookOpen, X } from 'lucide-react';
import { Breadcrumb } from '@/components/course/Breadcrumb';

export default function TemplatesPage() {
  const [showQr, setShowQr] = useState(false);

  const templates = [
    { title: '电商运营流水线', detail: '商品同步、评价抓取、看板更新', tag: '热门' },
    { title: '内容矩阵自动化', detail: '生成-排版-定时发布-数据回流', tag: '矩阵' },
    { title: '社群私域沉淀', detail: '多渠道消息归档、标签、群发', tag: '私域' },
  ];

  return (
    <div className="container-custom max-w-5xl py-16 space-y-10">
      <Breadcrumb items={[{ label: '模板合集' }]} />

      <header className="space-y-3">
        <p className="text-sm font-semibold text-white uppercase tracking-[0.2em] drop-shadow">Templates</p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white drop-shadow">模板合集 · 299 元一次性</h1>
        <p className="text-lg text-white/85 drop-shadow-sm">高质量工作流模板打包下载。已包含在 699/年课程内，单独购买适合已有基础或只需素材的用户。</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/course" className="btn-primary px-6 py-3 text-sm font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40">
            课程内含全部模板
          </Link>
          <button
            type="button"
            onClick={() => setShowQr(true)}
            className="btn-outline px-6 py-3 text-sm font-medium rounded-xl border-white/30 text-white hover:bg-white/10"
          >
            咨询与定制
          </button>
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {templates.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(20,220,190,0.25)] backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-white/85 uppercase tracking-[0.16em] mb-3 px-3 py-1 rounded-full bg-white/10 border border-white/15">
              <ShieldCheck className="w-4 h-4" />
              {item.tag}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-white/80 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/40 bg-white/8 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-[0_25px_80px_-40px_rgba(15,118,110,0.35)] backdrop-blur-md">
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-bold text-white">怎么获取模板？</h2>
          <p className="text-sm text-white/85">购买课程自动获得全部模板；单独购买可直接下载当前版本，后续更新在课程内同步。</p>
        </div>
        <div className="flex gap-3">
          <Link href="/course" className="btn-primary px-5 py-3 text-sm font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40">
            进入课程
          </Link>
          <button
            type="button"
            onClick={() => setShowQr(true)}
            className="btn-outline px-5 py-3 text-sm font-medium rounded-xl border-white/30 text-white hover:bg-white/10"
          >
            联系客服
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <BookOpen className="w-4 h-4" />
          模板与课程关系
        </div>
        <ul className="list-disc list-inside text-sm text-white/85 space-y-2 marker:text-white/70">
          <li>课程 699/年，持续更新，内含全部模板与更新。</li>
          <li>模板单买 299/次，适合已有基础或只需素材的用户。</li>
          <li>想要最新更新与系统化指导，建议直接选课程。</li>
        </ul>
      </section>

      {/* 微信二维码弹窗 */}
      {showQr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowQr(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-gray-900/90 border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              aria-label="关闭二维码"
              onClick={() => setShowQr(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 space-y-4 text-center">
              <h3 className="text-lg font-semibold text-white">添加微信咨询</h3>
              <p className="text-sm text-gray-300">扫码或长按识别二维码，备注「咨询」</p>
              <div className="mx-auto w-56 h-56 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-inner">
                <img
                  src="/qr/wechat-hero.png"
                  alt="微信二维码"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-400">若二维码失效，请通过微信「n8n_kkkk」添加</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
