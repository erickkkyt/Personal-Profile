'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="container-custom py-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-32">
          {/* Logo和简短介绍 */}
          <div className="md:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#home" className="text-2xl font-heading font-bold text-white inline-block">
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-primary rounded-full opacity-20 scale-150 blur-xl"></span>
                  KKKK AI Space
                </span>
              </a>
            </motion.div>

            {mounted ? (
              <div className="space-y-4 max-w-md">
                <p>一名从零开始的AI应用开发者，发现需求、创造价值。</p>
                <p>An AI developer starting from scratch, discovering needs and creating value.</p>
              </div>
            ) : (
              <p className="max-w-md">
                🤖 一名从零开始的AI应用开发者，发现需求、创造价值。分享个人成长和创业感悟以及AI工具&产品。
              </p>
            )}

            <div className="flex space-x-6 pt-4">
              <a
                href="https://www.xiaohongshu.com/user/profile/61503913000000000201d805"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex flex-col items-center group"
                aria-label="小红书"
              >
                <div className="h-10 px-4 rounded-full bg-[#FF2442] flex items-center justify-center text-white text-xs font-bold tracking-wider hover:opacity-90 transition-opacity mb-2">
                  小红书
                </div>
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-8">
              {mounted ? "内容导航" : "快速链接"}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">首页</a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary transition-colors">产品方案</a>
              </li>
              <li>
                <a href="/course" className="hover:text-primary transition-colors">
                  {mounted ? "n8n 课程" : "课程"}
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-8">联系我</h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:kh844257437@gmail.com" className="hover:text-white transition-colors text-sm">
                  {mounted ? "kh844257437@gmail.com" : "your.email@example.com"}
                </a>
              </li>
              <li className="flex items-center group">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm">WeChat: 15905196940</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-24 pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} KKKK Space. 保留所有权利.</p>
          <div className="mt-4 md:mt-0 flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>

      {/* 回到顶部按钮 */}
      <div className="fixed bottom-12 right-12 z-50">
        <a
          href="#home"
          className="bg-primary/90 hover:bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1"
          aria-label="回到顶部"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer; 
