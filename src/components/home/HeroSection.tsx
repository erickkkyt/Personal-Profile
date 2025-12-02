'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

interface HeroSectionProps {
  id: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 视差滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxLayers = document.querySelectorAll('.parallax__layer');
      parallaxLayers.forEach((layer: any, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const tags = ["AI 工作流", "n8n 自动化", "智能体", "无代码产品", "内容运营自动化"];

  return (
    <section id={id} className="min-h-screen relative overflow-hidden flex items-center py-28 md:py-36">
      {/* 动态背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] animate-pulse delay-2000"></div>
      </div>

      <div className="container-custom relative z-10 mx-auto px-4 md:px-10 lg:px-14 flex flex-col md:flex-row items-start md:items-stretch justify-between gap-12 lg:gap-16">
        <div className="md:w-7/12 lg:w-7/12 md:pr-10 flex flex-col justify-center gap-7">
          {/* 标签 */}
          <motion.div
            className="flex flex-wrap gap-2 mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tags.map((tag, index) => (
              <span key={index} className="px-4 py-1.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-primary/10 text-primary dark:text-secondary rounded-full text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all cursor-default">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* 标题 */}
          <motion.h1
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-bold mb-7 text-gray-900 dark:text-white leading-[1.12] tracking-tight max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            让普通人也能用 AI
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              构建自动化系统与产品
            </span>
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            不需要代码，用 n8n + AI 获得工程力，让系统替你工作。
          </motion.p>

          {/* 按钮 */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link
              href="/course"
              className="btn-primary flex items-center justify-center px-8 py-4 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1"
            >
              立即学习 n8n 实战课
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="#"
              className="btn-outline flex items-center justify-center px-8 py-4 text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:-translate-y-1"
            >
              领取免费 1.5w 字 n8n 入门资料包
              <Download className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>

        <div className="md:w-5/12 lg:w-5/12 flex justify-center md:justify-end relative">
          {/* 头像 */}
          <motion.div
            className="relative w-72 h-72 md:w-96 md:h-96"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <motion.div
              className="relative w-full h-full rounded-full p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/avatar.jpg"
                alt="KKKK AI Space"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>

            {/* 装饰元素 */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 z-20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
              transition={{ delay: 0.8, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Status</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Open to Work</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
