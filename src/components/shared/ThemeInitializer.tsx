'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store';
import { usePathname } from 'next/navigation';

export default function ThemeInitializer() {
  const { theme, setTheme } = useThemeStore();
  const pathname = usePathname();

  // 初始化主题：课程页亮色，其他页暗色
  useEffect(() => {
    const isCourse = pathname?.startsWith('/course');
    const target = isCourse ? 'light' : 'dark';
    setTheme(target);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', target);
    }
  }, [pathname, setTheme]);

  // 将主题应用到 html 标签
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  return null;
}
