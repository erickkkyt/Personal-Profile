'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Article } from '@/types';
import { useBlogStore } from '@/lib/store';

// 模拟文章数据
const articles: Article[] = [
  {
    id: '1',
    title: 'React 18中的新特性及其实际应用',
    slug: 'react-18-new-features',
    excerpt: 'React 18带来了许多激动人心的新特性，包括自动批处理、并发渲染和服务器组件等。本文将探讨这些特性如何改变我们的开发方式。',
    coverImage: '/blog/react18.jpg',
    tags: ['React', '前端', 'JavaScript'],
    readingTime: 5,
    publishedAt: '2023-03-15'
  },
  {
    id: '2',
    title: 'TypeScript中的高级类型技巧',
    slug: 'typescript-advanced-types',
    excerpt: '深入了解TypeScript中的条件类型、映射类型、类型守卫和工具类型，帮助你编写更安全、更灵活的代码。',
    coverImage: '/blog/typescript.jpg',
    tags: ['TypeScript', '前端', '编程技巧'],
    readingTime: 8,
    publishedAt: '2023-02-28'
  },
  {
    id: '3',
    title: 'Next.js应用路由的性能优化策略',
    slug: 'nextjs-performance-optimization',
    excerpt: '探索Next.js应用路由中的性能优化技术，包括并行路由、拦截路由和部分渲染等新特性。',
    coverImage: '/blog/nextjs.jpg',
    tags: ['Next.js', '性能优化', '前端'],
    readingTime: 6,
    publishedAt: '2023-02-10'
  },
  {
    id: '4',
    title: '使用Framer Motion创建流畅的Web动画',
    slug: 'framer-motion-animations',
    excerpt: 'Framer Motion是一个强大的React动画库，本文将介绍如何使用它创建复杂而流畅的交互动画效果。',
    coverImage: '/blog/framer-motion.jpg',
    tags: ['动画', 'React', 'Framer Motion'],
    readingTime: 7,
    publishedAt: '2023-01-25'
  },
  {
    id: '5',
    title: 'Web开发中的状态管理模式',
    slug: 'state-management-patterns',
    excerpt: '比较React生态系统中不同的状态管理解决方案，包括Context API、Redux、Zustand和Jotai等。',
    coverImage: '/blog/state-management.jpg',
    tags: ['状态管理', 'React', '架构'],
    readingTime: 10,
    publishedAt: '2023-01-12'
  },
  {
    id: '6',
    title: '使用GraphQL和Hygraph构建内容管理系统',
    slug: 'graphql-hygraph-cms',
    excerpt: '探索如何使用GraphQL和Hygraph（前身为GraphCMS）构建灵活的内容管理系统，并与Next.js集成。',
    coverImage: '/blog/graphql-cms.jpg',
    tags: ['GraphQL', 'CMS', 'Next.js'],
    readingTime: 8,
    publishedAt: '2022-12-20'
  }
];

// 日期格式化
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
};

// 分页处理
const ITEMS_PER_PAGE = 6;

interface BlogSectionProps {
  id: string;
}

const BlogSection = ({ id }: BlogSectionProps) => {
  const { currentPage, searchQuery, selectedTags, setCurrentPage, setSearchQuery, addTag, removeTag, clearTags } = useBlogStore();
  
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [paginatedArticles, setPaginatedArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();

  // 过滤和分页文章
  useEffect(() => {
    // 过滤
    let filtered = [...articles];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article => 
        selectedTags.every(tag => article.tags.includes(tag))
      );
    }
    
    setFilteredArticles(filtered);
    
    // 计算总页数
    const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    setTotalPages(pages || 1);
    
    // 如果当前页超出范围，则重置为第一页
    if (currentPage > pages) {
      setCurrentPage(1);
    }
    
    // 分页
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedArticles(filtered.slice(start, end));
    
  }, [searchQuery, selectedTags, currentPage, setCurrentPage]);

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      removeTag(tag);
    } else if (selectedTags.length < 3) {
      addTag(tag);
    }
  };

  // 动画控制
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section id={id} className="section bg-white dark:bg-gray-800" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-48"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16">最新文章</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            分享我对Web开发、前端技术和最佳实践的见解和经验。
          </p>
        </motion.div>

        {/* 搜索和筛选 */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
          }}
        >
          {/* 搜索框 */}
          <div className="relative max-w-md mx-auto mb-24">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-16 py-12 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* 已选标签 */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              <span className="text-sm text-gray-500 dark:text-gray-400">已选标签:</span>
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="badge bg-primary text-white flex items-center"
                >
                  {tag}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3 ml-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}
              <button
                onClick={clearTags}
                className="text-xs text-primary dark:text-secondary hover:underline"
              >
                清除全部
              </button>
            </div>
          )}
        </motion.div>

        {/* 文章瀑布流 */}
        {paginatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-32">
            {paginatedArticles.map((article, index) => (
              <motion.article
                key={article.id}
                className="card flex flex-col h-full group"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.5, 
                      delay: 0.1 * index 
                    } 
                  }
                }}
              >
                {/* 文章封面图 */}
                <div className="mb-16 overflow-hidden rounded-lg">
                  <div className="relative h-0 pb-[56.25%]">
                    <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                  </div>
                </div>
                
                {/* 文章内容 */}
                <div className="flex flex-col flex-grow">
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {article.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`badge text-xs ${
                          selectedTags.includes(tag)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  
                  {/* 标题 */}
                  <h3 className="text-xl font-heading font-bold mb-8 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* 摘要 */}
                  <p className="text-gray-600 dark:text-gray-400 mb-16 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* 元信息 */}
                  <div className="flex justify-between items-center mt-auto pt-16 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.readingTime} 分钟阅读
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-48">
            <p className="text-gray-500 dark:text-gray-400">没有找到符合条件的文章</p>
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <motion.div 
            className="flex justify-center mt-48"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }
            }}
          >
            <nav className="flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-8 rounded-lg ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-8 rounded-lg ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </motion.div>
        )}

        {/* 查看全部按钮 */}
        <motion.div 
          className="text-center mt-48"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } }
          }}
        >
          <a 
            href="#blog" 
            className="btn btn-primary inline-flex items-center"
          >
            查看全部文章
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 