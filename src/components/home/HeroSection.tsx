'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download, X } from 'lucide-react';
import ContactModal from '@/components/shared/ContactModal';

interface HeroSectionProps {
  id: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const [mounted, setMounted] = useState(false);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tags = ["AI 工作流", "n8n 自动化", "智能体", "无代码产品", "内容运营自动化"];
  const tagColors = ["bg-primary", "bg-secondary", "bg-accent", "bg-primary/80", "bg-secondary/80"];

  return (
    <section id={id} className="relative overflow-hidden min-h-screen flex items-center py-24 md:py-32 lg:py-40">
      {/* 背景 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1828] via-[#0F233C] to-[#0A3B45]" />
        <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_14px_14px,#14B8A610_1px,transparent_0)] [background-size:180px_180px]" />
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="container-custom max-w-7xl px-4 md:px-6 relative z-10 grid md:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-16">
        <div className="flex flex-col justify-center gap-10 max-w-[840px]">
          {/* 顶部标签 */}
          <motion.div
            className="flex flex-nowrap gap-3 mb-4 max-w-full overflow-x-auto pb-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {tags.map((tag, index) => (
              <span key={tag} className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 text-gray-100 rounded-full text-sm font-semibold tracking-wide shadow-sm backdrop-blur-md whitespace-nowrap">
                <span className={`h-2.5 w-2.5 rounded-full ${tagColors[index % tagColors.length]}`}></span>
                {tag}
              </span>
            ))}
          </motion.div>

          {/* 标题 + 副标题 */}
          <div className="space-y-6">
            <motion.h1
              className="text-[2.9rem] md:text-[3.2rem] lg:text-[3.5rem] font-heading font-bold text-white leading-[1.05] tracking-tight max-w-[820px]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              让普通人也能用 AI
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7B7] via-[#22D3EE] to-[#F59E0B]">
                构建自动化系统与产品
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-[20px] text-gray-200 max-w-2xl leading-[1.75] tracking-wide"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              不需要代码，用 n8n + AI 获得工程力，让系统替你工作。
            </motion.p>
          </div>

          {/* CTA + 高光点 */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/course"
                className="btn-primary flex items-center justify-center px-8 py-4 text-base font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 rounded-xl"
              >
                立即学习 n8n 实战课
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                role="button"
                className="btn-outline flex items-center justify-center px-8 py-4 text-base font-semibold hover:bg-white/10 transition-all hover:-translate-y-1 rounded-xl border-white/20 text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setShowQr(true);
                }}
              >
                领取免费 1.5w 字 n8n 入门资料包
                <Download className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-gray-300">
              <span className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">📈 真实案例与模板内含</span>
              <span className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">⏱️ 上手快 · 无代码</span>
              <span className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">🔒 支持试听与保障说明</span>
            </div>
          </motion.div>
        </div>

        {/* 右侧视觉卡片 */}
        <motion.div
          className="relative w-full flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/12 via-white/6 to-transparent border border-white/15 shadow-[0_30px_120px_-40px_rgba(20,220,190,0.35)] backdrop-blur-md" />
            <div className="absolute inset-3 rounded-[24px] overflow-hidden border border-white/10 bg-gray-900/60">
              <img
                src="/avatar.jpg"
                alt="KKKK AI Space"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -left-6 bottom-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/40 dark:border-gray-700 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Status</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Open to Work</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 领取资料包二维码弹窗 */}
      <ContactModal
        isOpen={showQr}
        onClose={() => setShowQr(false)}
        title="添加微信领取资料包"
        subtitle="长按/扫码二维码，备注「n8n资料包」"
        note="若二维码失效，请通过微信「15355407564」添加"
      />
    </section>
  );
};

export default HeroSection;
