'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserBadge from './UserBadge';
import { createClient } from '@/utils/supabase/client';

// 导航链接数据
const navLinks = [
  { href: '#', label: '社交媒体' },
  { href: '#products', label: '产品方案' },
  { href: '/templates', label: '高阶模板' },
  { href: '/course', label: '课程入口' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-[0_12px_40px_-24px_rgba(15,35,60,0.45)] border-b border-gray-200/70 dark:border-gray-800' : 'bg-gradient-to-b from-white/85 via-white/40 to-transparent dark:from-gray-900/80 dark:via-gray-900/40 dark:to-transparent border-b border-transparent'
      }`}>
      <div className="container-custom py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-heading font-bold text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 text-base md:text-xl">{mounted ? "KKKK AI Space · 用 n8n 构建落地的 AI 工作流与智能体" : "AI个人主页"}</span>
          </a>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/85 hover:text-white transition-colors"
                onClick={(e) => {
                  if (link.href === '#') e.preventDefault();
                }}
              >
                {link.label}
              </a>
            ))}
            {isLoggedIn ? (
              <div className="ml-6">
                <UserBadge variant="dark" />
              </div>
            ) : (
              <a
                href="/login"
                className="ml-6 text-sm font-semibold text-white px-4 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 shadow-sm transition-all"
              >
                登录 / 注册
              </a>
            )}
          </nav>

          {/* 移动菜单按钮 */}
          <button
            className="md:hidden p-3 text-white/85 border border-white/30 rounded-full bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 移动导航菜单 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gray-900 absolute w-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-6 flex flex-col space-y-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-white/85 hover:text-white transition-colors"
                  onClick={(e) => {
                    if (link.href === '#') e.preventDefault();
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <div className="pt-2">
                  <UserBadge variant="dark" />
                </div>
              ) : (
                <a
                  href="/login"
                  className="text-sm font-semibold text-white flex items-center gap-2 px-4 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  登录 / 注册
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 
