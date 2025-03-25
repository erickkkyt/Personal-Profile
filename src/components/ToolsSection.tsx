'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Tool } from '@/types';
import { useToolsFilterStore } from '@/lib/store';

// 模拟工具数据
const tools: Tool[] = [
  {
    id: '1',
    name: 'React',
    icon: 'react',
    category: 'Frontend',
    proficiency: 5,
    lastUsed: '2023-03-15'
  },
  {
    id: '2',
    name: 'TypeScript',
    icon: 'typescript',
    category: 'Frontend',
    proficiency: 4,
    lastUsed: '2023-03-10'
  },
  {
    id: '3',
    name: 'Next.js',
    icon: 'nextjs',
    category: 'Frontend',
    proficiency: 4,
    lastUsed: '2023-03-05'
  },
  {
    id: '4',
    name: 'Node.js',
    icon: 'nodejs',
    category: 'Frontend',
    proficiency: 3,
    lastUsed: '2023-02-20'
  },
  {
    id: '5',
    name: 'Docker',
    icon: 'docker',
    category: 'DevOps',
    proficiency: 3,
    lastUsed: '2023-01-10'
  },
  {
    id: '6',
    name: 'GitHub Actions',
    icon: 'github',
    category: 'DevOps',
    proficiency: 4,
    lastUsed: '2023-02-05'
  },
  {
    id: '7',
    name: 'PostgreSQL',
    icon: 'postgresql',
    category: 'Database',
    proficiency: 3,
    lastUsed: '2023-01-15'
  },
  {
    id: '8',
    name: 'MongoDB',
    icon: 'mongodb',
    category: 'Database',
    proficiency: 4,
    lastUsed: '2023-02-25'
  },
  {
    id: '9',
    name: 'GraphQL',
    icon: 'graphql',
    category: 'Frontend',
    proficiency: 3,
    lastUsed: '2023-01-30'
  },
];

// 日期格式化
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
};

interface ToolsSectionProps {
  id: string;
}

const ToolsSection = ({ id }: ToolsSectionProps) => {
  const { category, proficiency, setCategory, setProficiency, resetFilters } = useToolsFilterStore();
  
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // 过滤工具
  useEffect(() => {
    let filtered = [...tools];
    
    if (category !== 'all') {
      filtered = filtered.filter(tool => tool.category === category);
    }
    
    if (proficiency > 0) {
      filtered = filtered.filter(tool => tool.proficiency >= proficiency);
    }
    
    setFilteredTools(filtered);
  }, [category, proficiency]);

  // 动画控制
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section id={id} className="section bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-48"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16">我的工具栈</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            这些是我日常使用的技术和工具，帮助我构建高质量的Web应用程序。
          </p>
        </motion.div>

        {/* 过滤器 */}
        <motion.div 
          className="mb-32 flex flex-col md:flex-row justify-center items-center gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
          }}
        >
          {/* 类别筛选 */}
          <div className="flex flex-wrap justify-center gap-8">
            {['all', 'Frontend', 'DevOps', 'Database'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`badge ${
                  category === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat === 'all' ? '全部' : cat}
              </button>
            ))}
          </div>
          
          {/* 熟练度筛选 */}
          <div className="flex items-center space-x-8">
            <span className="text-sm text-gray-600 dark:text-gray-400">熟练度：</span>
            <input 
              type="range" 
              min="0" 
              max="5" 
              value={proficiency} 
              onChange={(e) => setProficiency(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-sm font-medium">
              {proficiency > 0 ? `${proficiency}+` : '全部'}
            </span>
          </div>
          
          {/* 重置按钮 */}
          <button
            onClick={resetFilters}
            className="text-sm text-primary dark:text-secondary hover:underline"
          >
            重置筛选
          </button>
        </motion.div>

        {/* 工具卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 * index } }
                }}
              >
                {/* 工具图标 */}
                <div className="mb-16 flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${tool.category === 'Frontend' ? 'primary' : tool.category === 'DevOps' ? 'secondary' : 'accent'}/10 mr-12`}>
                    {/* 简单的技术图标占位符 */}
                    <span className="text-xl font-bold text-primary">{tool.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">{tool.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</span>
                  </div>
                </div>
                
                {/* 熟练度进度条 */}
                <div className="mb-16">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">熟练度</span>
                    <span className="text-sm font-medium">{tool.proficiency}/5</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        tool.category === 'Frontend' 
                          ? 'bg-primary' 
                          : tool.category === 'DevOps' 
                            ? 'bg-secondary' 
                            : 'bg-accent'
                      }`}
                      style={{ width: `${(tool.proficiency / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* 最后使用时间 */}
                <div className="mt-auto pt-16 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">最后使用</span>
                    <span className="text-sm">{formatDate(tool.lastUsed)}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-48">
              <p className="text-gray-500 dark:text-gray-400">没有找到符合条件的工具</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection; 