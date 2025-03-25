# 个人主页项目 - 技术架构文档 (2025版)

## 项目概述

这是一个基于Next.js的个人主页项目，重点展示个人介绍、AI项目作品和常用AI工具。项目采用现代化前端技术栈，支持响应式设计和深色/浅色主题切换功能，通过精美的设计和流畅的交互体验，展示个人在AI领域的专业能力和项目成果。

## 技术栈

- **前端框架**: Next.js 14.1+ (App Router) + React 18
- **开发语言**: TypeScript 5.3+
- **样式方案**: Tailwind CSS 3.4 + CSS Modules
- **状态管理**: Zustand 4.4+
- **动画效果**: Framer Motion 11+
- **数据获取**: Next.js Server Components + React Server Actions

## 优化后架构

### 目录结构

```
├── app/                      # Next.js App Router
│   ├── (routes)/             # 应用路由
│   │   ├── page.tsx          # 主页
│   │   └── projects/         # 项目详情页
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── layout.tsx            # 根布局
│   └── providers.tsx         # 客户端提供者
├── components/               # React组件
│   ├── ui/                   # 基础UI组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── index.ts
│   ├── core/                 # 核心布局组件
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── sections/             # 页面部分组件
│       ├── hero-section.tsx
│       ├── projects-section.tsx
│       └── ai-tools-section.tsx
├── lib/                      # 工具和状态
│   ├── store.ts              # Zustand状态管理
│   ├── fonts.ts              # 字体配置
│   └── utils.ts              # 工具函数
├── styles/                   # 样式文件
│   ├── globals.css           # 全局样式
│   └── theme.ts              # 主题配置
├── types/                    # TypeScript类型定义
│   └── index.ts              # 类型定义文件
├── data/                     # 数据文件
│   ├── projects.ts           # 项目数据
│   └── tools.ts              # AI工具数据
├── public/                   # 静态资源
│   ├── favicon.ico           # 网站图标
│   ├── icon.png              # PNG格式图标
│   ├── apple-touch-icon.png  # iOS设备图标
│   └── images/               # 图像资源
├── tailwind.config.js        # Tailwind配置
├── next.config.js            # Next.js配置
└── tsconfig.json             # TypeScript配置
```

## 主要功能模块

### 1. 导航栏 (Navbar)

- 响应式设计，支持桌面和移动设备
- 平滑的滚动导航，支持锚点定位
- 主题切换功能（亮/暗主题）
- 自动根据滚动位置调整导航样式

### 2. 个人介绍区域 (HeroSection)

- 个人头像和简介展示
- 主要技能展示，包括AI编程、需求发现、SEO运营等
- 社交媒体链接（GitHub、YouTube、小红书）
- 视差滚动效果增强视觉体验

### 3. 项目展示区域 (ProjectsSection)

- 展示AI相关项目作品
- 每个项目包含标题、描述、预计上线时间、标签等信息
- 项目卡片采用精美的悬停效果和动画
- 支持直接访问项目和查看源代码

### 4. AI工具展示区域 (AIToolsSection)

- 按类别展示常用AI工具
- 多种类别筛选：AI大模型、AI音/视频工具、出海工具、社媒工具等
- 工具卡片展示工具名称、描述和快速访问链接
- 平滑的过滤切换动画效果

### 5. 页脚区域 (Footer)

- 项目简介和社交媒体链接
- 导航快速链接
- 联系方式展示
- 回到顶部按钮

## 后续扩展计划

### 1. 项目详情页面

为每个AI项目创建独立的详情页，包含更详细的项目说明、技术栈、实现挑战和解决方案等内容。

```
app/
└── projects/
    └── [slug]/
        └── page.tsx
```

### 2. 数据持久化和CMS集成

将项目和工具数据从静态数据转为通过CMS管理，方便更新和维护：

- 考虑使用Notion API、Contentful或Sanity作为轻量级CMS
- 使用Next.js的ISR (Incremental Static Regeneration)功能实现动态更新

### 3. 博客功能

添加博客部分，分享AI领域见解和技术文章：

- 使用MDX实现Markdown + React组件混合内容
- 实现标签系统和搜索功能
- 添加评论系统

### 4. 使用量数据分析

添加工具使用量和受欢迎度的分析展示：

- 集成简单的分析系统，收集和展示工具的使用情况
- 添加推荐评分系统，让访问者为工具评分

### 5. 国际化支持

实现中英文双语网站：

- 使用next-intl或next-i18next实现多语言支持
- 根据用户浏览器语言自动切换
- 添加语言切换按钮

## 部署与CI/CD

### Vercel部署

1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量和构建设置
4. 启用自动部署

### 性能监控

- 集成Lighthouse CI进行性能监控
- 使用Vercel Analytics追踪用户体验数据
- 定期检查Core Web Vitals指标

## 总结

本项目采用现代化前端技术栈，实现了一个功能完备、视觉精美的个人AI主页。通过Next.js 14的App Router架构，结合React 18的先进特性，打造了高性能、SEO友好的用户体验。主要特色包括：

1. **现代化架构**: 采用最新的Next.js App Router和React 18，提供优秀的开发体验和性能
2. **精美UI设计**: 通过Tailwind CSS结合精心设计的组件，创建视觉吸引力强的界面
3. **流畅动画**: 利用Framer Motion实现丰富的交互动画，增强用户体验
4. **主题切换**: 支持亮色/暗色主题无缝切换，适应不同用户偏好
5. **响应式设计**: 完全适配从移动设备到桌面设备的各种屏幕尺寸
6. **性能优化**: 通过代码分割、图像优化和延迟加载等技术确保快速加载和响应

该项目不仅展示了技术能力，也通过内容组织展现了个人在AI领域的专业素养和项目经验，为访问者提供了关于AI项目和工具的有价值信息。
