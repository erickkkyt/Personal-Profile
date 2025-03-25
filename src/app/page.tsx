'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AIToolsSection from '@/components/AIToolsSection';
import Footer from '@/components/Footer';
import { useThemeStore } from '@/lib/store';

export default function Home() {
  const { theme, setTheme } = useThemeStore();

  // 检查并设置主题
  useEffect(() => {
    // 从localStorage获取主题，如果没有则使用系统偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, [setTheme]);

  // 应用主题到html元素
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* 个人自我介绍 */}
      <HeroSection id="home" />
      
      {/* 我的AI项目作品 */}
      <ProjectsSection id="projects" />
      
      {/* 我的常用AI工具 */}
      <AIToolsSection id="tools" />
      
      <Footer />
    </main>
  );
} 