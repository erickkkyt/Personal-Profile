# 个人主页项目 - 技术架构文档

## 项目概述

这是一个基于Next.js的个人主页项目，展示个人介绍、AI项目、常用工具等内容。项目支持响应式设计和亮/暗主题切换功能。

## 当前技术栈

- **前端框架**: Next.js 14 + React 18
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS + SCSS
- **状态管理**: Zustand
- **动画效果**: Framer Motion
- **数据获取**: GraphQL + graphql-request

## 架构分析

### 目录结构

```
├── app/                   # Next.js App Router
│   ├── layout.tsx         # 应用布局
│   └── page.tsx           # 主页面
├── src/
│   ├── components/        # React组件
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── AIToolsSection.tsx
│   │   ├── ToolsSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── lib/               # 工具和状态
│   │   └── store.ts       # Zustand状态管理
│   └── styles/
│       └── globals.scss   # 全局样式
├── public/                # 静态资源
├── tailwind.config.js     # Tailwind配置
└── next.config.js         # Next.js配置
```

### 功能模块

1. **导航栏**: 页面导航和主题切换
2. **个人介绍**: 展示个人信息和技能
3. **项目展示**: 展示AI相关项目
4. **工具展示**: 展示常用AI工具
5. **博客区域**: 文章列表和过滤功能
6. **联系方式**: 联系表单和社交媒体链接

### 当前样式问题

1. 混合使用Tailwind和SCSS导致维护复杂
2. Tailwind类名冗长影响代码可读性
3. 响应式设计实现复杂
4. 主题切换逻辑分散
5. 样式重用性较差
6. 可能使用了不稳定的Tailwind版本

## 样式解决方案优化

### 推荐方案

#### 1. 降级Tailwind到稳定版本

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@3.3.5 postcss@8.4.31 autoprefixer@10.4.16 --save-dev
```

#### 2. 引入CSS-in-JS

安装styled-components:

```bash
npm install styled-components@6.1.1 @types/styled-components --save
```

#### 3. 创建UI组件库

```
src/
└── components/
    └── ui/              # 新建UI组件文件夹
        ├── Button.tsx
        ├── Card.tsx
        ├── Container.tsx
        ├── Text.tsx
        └── index.ts     # 导出所有UI组件
```

#### 4. 实现主题系统

```
src/
└── styles/
    ├── globals.scss    # 保留全局样式
    ├── theme.ts        # 新建主题配置文件
    └── ThemeProvider.tsx # 新建主题提供者组件
```

### 实现示例

#### 主题配置 (src/styles/theme.ts)

```typescript
export const lightTheme = {
  colors: {
    primary: '#2A5C82',
    secondary: '#5FA8D3',
    accent: '#F5B041',
    background: {
      main: '#ffffff',
      card: '#f9fafb',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Open Sans", sans-serif',
  },
};

export const darkTheme = {
  colors: {
    primary: '#5FA8D3',
    secondary: '#2A5C82',
    accent: '#F5B041',
    background: {
      main: '#111827',
      card: '#1f2937',
    },
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
    }
  },
  // 其他属性与lightTheme相同
  spacing: { ...lightTheme.spacing },
  borderRadius: { ...lightTheme.borderRadius },
  shadows: { ...lightTheme.shadows },
  fonts: { ...lightTheme.fonts },
};

export type ThemeType = typeof lightTheme;
```

#### 主题提供者 (src/styles/ThemeProvider.tsx)

```tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, ThemeType } from './theme';
import { useThemeStore } from '@/lib/store';

const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 从localStorage获取主题，如果没有则使用系统偏好
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, [setTheme]);

  // 应用主题到html元素
  useEffect(() => {
    if (!mounted) return;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // 避免服务端渲染时的不匹配问题
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
```

#### UI组件示例 (src/components/ui/Button.tsx)

```tsx
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  
  /* Size styles */
  ${props => {
    switch(props.size) {
      case 'sm':
        return css`
          padding: ${props.theme.spacing.xs} ${props.theme.spacing.sm};
          font-size: 0.875rem;
        `;
      case 'lg':
        return css`
          padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
          font-size: 1.125rem;
        `;
      default: // md
        return css`
          padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
          font-size: 1rem;
        `;
    }
  }}
  
  /* Variant styles */
  ${props => {
    switch(props.variant) {
      case 'secondary':
        return css`
          background-color: ${props.theme.colors.secondary};
          color: white;
          &:hover {
            background-color: ${props.theme.colors.secondary}e6;
          }
        `;
      case 'accent':
        return css`
          background-color: ${props.theme.colors.accent};
          color: white;
          &:hover {
            background-color: ${props.theme.colors.accent}e6;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 1px solid ${props.theme.colors.primary};
          color: ${props.theme.colors.primary};
          &:hover {
            background-color: ${props.theme.colors.primary}1a;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${props.theme.colors.primary};
          &:hover {
            background-color: ${props.theme.colors.primary}1a;
          }
        `;
      default: // primary
        return css`
          background-color: ${props.theme.colors.primary};
          color: white;
          &:hover {
            background-color: ${props.theme.colors.primary}e6;
          }
        `;
    }
  }}
  
  /* Full width */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

export default Button;
```

#### 使用UI组件示例 (组件改造)

```tsx
// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/styles/ThemeProvider';
import Button from '@/components/ui/Button';

// 导航链接数据
const navLinks = [
  { href: '#home', label: '个人介绍' },
  { href: '#projects', label: 'AI项目' },
  { href: '#tools', label: 'AI工具' }
];

// 样式化组件
const NavbarContainer = styled.header<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.3s;
  background-color: ${props => props.scrolled 
    ? (props.theme.colors.background.main + 'e6') 
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(8px)' : 'none'};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.sm : 'none'};
`;

const NavContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: bold;
  font-family: ${props => props.theme.fonts.heading};
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  color: transparent;
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.2s;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ThemeButton = styled.button`
  padding: ${props => props.theme.spacing.sm};
  border-radius: 9999px;
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.secondary};
`;

const MobileMenuButton = styled.button`
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  background-color: ${props => props.theme.colors.background.main};
  width: 100%;
  position: absolute;
`;

const MobileMenuContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavbarContainer scrolled={scrolled}>
      <NavContent>
        {/* Logo */}
        <Logo href="#home">
          {mounted ? "KKKK Space" : "AI个人主页"}
        </Logo>

        {/* 桌面导航 */}
        <DesktopNav>
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.href === '#projects' && mounted ? '项目作品' : 
              link.href === '#tools' && mounted ? '常用工具' : link.label}
            </NavLink>
          ))}
          
          {/* 主题切换按钮 */}
          <ThemeButton onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
          </ThemeButton>
        </DesktopNav>

        {/* 移动菜单按钮 */}
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </MobileMenuButton>
      </NavContent>

      {/* 移动导航菜单 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenuContent>
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.href === '#projects' && mounted ? '项目作品' : 
                  link.href === '#tools' && mounted ? '常用工具' : link.label}
                </NavLink>
              ))}
              
              {/* 主题切换按钮 */}
              <Button 
                variant="ghost" 
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
              >
                {theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
              </Button>
            </MobileMenuContent>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;
```

## 实施步骤

### 1. 环境准备

1. 降级Tailwind到稳定版本

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@3.3.5 postcss@8.4.31 autoprefixer@10.4.16 --save-dev
```

2. 安装styled-components

```bash
npm install styled-components@6.1.1 @types/styled-components --save
```

### 2. 创建主题系统

1. 创建主题配置文件 `src/styles/theme.ts`
2. 创建主题提供者组件 `src/styles/ThemeProvider.tsx`
3. 修改 `app/layout.tsx` 使用ThemeProvider包裹应用

### 3. 构建UI组件库

1. 创建 `src/components/ui` 目录
2. 实现基础UI组件：Button, Card, Container, Text等
3. 创建 `src/components/ui/index.ts` 导出所有UI组件

### 4. 重构现有组件

按照以下顺序重构组件:

1. Navbar组件 - 导航和主题切换的核心组件
2. Layout相关组件 - 布局和容器组件
3. 内容组件 - HeroSection, ProjectsSection等
4. 全局状态管理的切换

## 后续开发建议

### 1. 组件优化

- 通过提取和重用UI组件减少重复代码
- 实现组件变体来处理不同状态和样式
- 添加适当的PropTypes或TypeScript类型定义

### 2. 性能优化

- 利用Next.js的图像优化
- 组件代码分割和懒加载
- 使用React.memo()优化渲染性能

### 3. 功能扩展

- 实现博客内容的动态加载
- 添加国际化支持(i18n)
- 集成分析工具跟踪用户行为

### 4. 测试策略

- 组件单元测试(Jest + React Testing Library)
- 端到端测试(Cypress)
- 性能测试和监控

## 参考资源

- [Next.js文档](https://nextjs.org/docs)
- [Styled Components文档](https://styled-components.com/docs)
- [Framer Motion文档](https://www.framer.com/motion/)
- [Zustand文档](https://github.com/pmndrs/zustand)
- [UI设计模式](https://www.uxpin.com/studio/blog/ui-design-patterns/)
- [React性能优化](https://reactjs.org/docs/optimizing-performance.html) 