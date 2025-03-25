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
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-custom py-48">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-32">
          {/* Logo和简短介绍 */}
          <div className="md:col-span-2">
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#home" className="text-2xl font-heading font-bold text-white mb-16 inline-block">
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-primary rounded-full opacity-20 scale-150"></span>
                  KKKK AI Space
                </span>
              </a>
            </motion.div>
            {mounted ? (
              <div className="mb-16 space-y-4">
                <p>一名从零开始的AI应用开发者，发现需求、创造价值。</p>
                <p>An AI developer starting from scratch, discovering needs and creating value.</p>
              </div>
            ) : (
              <p className="mb-16">
                🤖 一名从零开始的AI应用开发者，发现需求、创造价值。分享个人成长和创业感悟以及AI工具&产品。
              </p>
            )}
            <div className="flex space-x-8">
              <a 
                href="https://github.com/erickkkyt?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex flex-col items-center"
                aria-label="GitHub"
              >
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a 
                href="https://www.youtube.com/@kkkkeric98" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex flex-col items-center"
                aria-label="YouTube"
              >
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </div>
                <span className="text-sm font-medium">YouTube</span>
              </a>
              <a 
                href="https://www.xiaohongshu.com/user/profile/61503913000000000201d805" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex flex-col items-center"
                aria-label="小红书"
              >
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 22h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm3-3H7V5h2v14zm8 0h-6V5h6v14z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">小红书</span>
              </a>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-16">
              {mounted ? "内容导航" : "快速链接"}
            </h3>
            <ul className="space-y-8">
              <li>
                <a href="#home" className="hover:text-white transition-colors">个人介绍</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">项目作品</a>
              </li>
              <li>
                <a href="#tools" className="hover:text-white transition-colors">
                  {mounted ? "常用工具" : "AI工具"}
                </a>
              </li>
            </ul>
          </div>
          
          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-16">联系我</h3>
            <ul className="space-y-8">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:kh844257437@gmail.com" className="hover:text-white transition-colors">
                  {mounted ? "kh844257437@gmail.com" : "your.email@example.com"}
                </a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:15355407564" className="hover:text-white transition-colors">
                  {mounted ? "WeChat: 15355407564" : "+86 123 456 7890"}
                </a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{mounted ? "中国，北京" : "中国，北京市"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="mt-48 pt-24 border-t border-gray-800 text-center md:text-left md:flex md:justify-between">
          <p>&copy; {currentYear} KKKK Space. 保留所有权利.</p>
          <div className="mt-8 md:mt-0">
            <a href="#" className="hover:text-white transition-colors mr-16">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>
      
      {/* 回到顶部按钮 */}
      <div className="fixed bottom-24 right-24 z-50">
        <a 
          href="#home"
          className="bg-primary hover:bg-primary/90 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
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