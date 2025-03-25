// 工具数据类型
export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: string;
  proficiency: number; // 1-5
  lastUsed: string; // ISO日期字符串
}

// 文章数据类型
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  readingTime: number; // 分钟
  publishedAt: string; // ISO日期字符串
  content?: string; // 仅在单篇文章页面加载
}

// 社交媒体链接类型
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

// SEO元数据类型
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// 联系表单字段
export interface ContactFormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// AI工具类型
export interface AITool {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  url: string;
}

// 项目类型
export interface Project {
  id: string;
  title: string;
  description: string;
  updateTime: string;  // 更新时间
  image: string;
  tags: string[];
  demoUrl: string;
  sourceUrl: string;
} 