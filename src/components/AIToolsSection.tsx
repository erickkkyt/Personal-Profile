'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { AITool } from '@/types';
import { useToolsFilterStore } from '@/lib/store';

// AI工具数据
const aiTools: AITool[] = [
  {
    id: '1',
    name: 'Poe',
    icon: 'poe',
    category: 'AI大模型',
    description: '一站式AI平台，集成GPT-4.5、Claude 3.7 Sonnet、DeepSeek-R1等多个大语言模型',
    url: 'https://poe.com'
  },
  {
    id: '2',
    name: '豆包',
    icon: 'doubao',
    category: 'AI大模型',
    description: '字节跳动旗下AI助手，基于先进的大语言模型，提供智能对话、文本创作、代码编程等多样化服务',
    url: 'https://www.doubao.com/chat/'
  },
  {
    id: '3',
    name: 'Kimi',
    icon: 'kimi',
    category: 'AI大模型',
    description: '由月之暗面开发的新一代AI助手，拥有强大的知识库和对话能力，支持中英文多语言交互',
    url: 'https://kimi.moonshot.cn/'
  },
  {
    id: '4',
    name: 'Grok',
    icon: 'grok',
    category: 'AI大模型',
    description: 'X (前Twitter) 旗下的AI助手，以实时信息访问和幽默对话风格著称，由xAI团队开发',
    url: 'https://grok.com/'
  },
  {
    id: '5',
    name: 'Gemini',
    icon: 'gemini',
    category: 'AI大模型',
    description: 'Google最新推出的多模态AI模型，支持文本、图像、音频等多种输入形式的智能交互',
    url: 'https://gemini.google.com/app'
  },
  {
    id: '6',
    name: 'ChatGPT',
    icon: 'chatgpt',
    category: 'AI大模型',
    description: 'OpenAI开发的革命性对话模型，支持自然语言理解和生成，广泛应用于各类对话和创作场景',
    url: 'https://chatgpt.com/'
  },
  {
    id: '7',
    name: '海螺AI',
    icon: 'hailuo',
    category: 'AI音/视频工具',
    description: 'Minimax旗下多模态大模型，图片和视频生成能力较强',
    url: 'https://hailuoai.com/'
  },
  {
    id: '8',
    name: '可灵AI',
    icon: 'kling',
    category: 'AI音/视频工具',
    description: '快手官方AI视频工具，支持表情替换、人物动作模仿、音视频同步等功能，让创作更有趣',
    url: 'https://klingai.kuaishou.com/'
  },
  {
    id: '9',
    name: '即梦AI',
    icon: 'jianying',
    category: 'AI音/视频工具',
    description: '字节跳动旗下剪映推出的AI创作工具，支持AI绘画、视频生成、音乐制作、对口型等多样化功能',
    url: 'https://jimeng.jianying.com/ai-tool/home'
  },
  {
    id: '10',
    name: 'Viggle',
    icon: 'viggle',
    category: 'AI音/视频工具',
    description: '专业的AI视频创作平台，支持一键生成营销视频、产品介绍、教学内容等，让视频创作更简单高效',
    url: 'https://viggle.ai/home'
  },
  {
    id: '11',
    name: 'Noiz',
    icon: 'noiz',
    category: 'AI音/视频工具',
    description: '智能音频处理工具，提供AI降噪、音频分离、音质增强等功能，让音频处理更专业',
    url: 'https://noiz.ai/landing'
  },
  {
    id: '12',
    name: 'HeyGen',
    icon: 'heygen',
    category: 'AI音/视频工具',
    description: '专业的AI数字人视频生成平台，支持多语言配音和数字人定制，轻松创建高质量营销和培训视频',
    url: 'https://www.heygen.com/'
  },
  {
    id: '13',
    name: 'GitHub',
    icon: 'github',
    category: '出海工具',
    description: '全球最大的代码托管平台，提供代码版本控制、项目协作、CI/CD等功能',
    url: 'https://github.com/'
  },
  {
    id: '14',
    name: 'Cloudflare',
    icon: 'cloudflare',
    category: '出海工具',
    description: 'CDN服务商，提供网站加速、DDoS防护、DNS管理等服务，帮助网站快速部署',
    url: 'https://dash.cloudflare.com/'
  },
  {
    id: '15',
    name: 'Vercel',
    icon: 'vercel',
    category: '出海工具',
    description: '前端部署和托管平台，提供全球CDN、自动HTTPS、持续部署等功能，Next.js的最佳部署平台',
    url: 'https://vercel.com/home'
  },
  {
    id: '16',
    name: 'Spaceship',
    icon: 'spaceship',
    category: '出海工具',
    description: '网站域名搜索和购买，支持支付宝付款',
    url: 'https://www.spaceship.com/'
  },
  {
    id: '17',
    name: 'Toolify',
    icon: 'toolify',
    category: '出海工具',
    description: '专注于出海营销的AI工具集合平台，提供多语言内容生成、市场分析、用户洞察等功能',
    url: 'https://www.toolify.ai/'
  },
  {
    id: '18',
    name: 'Product Hunt',
    icon: 'producthunt',
    category: '出海工具',
    description: '全球最大的新产品发布平台，帮助创业者获得早期用户反馈和产品曝光，是产品出海的重要渠道',
    url: 'https://www.producthunt.com/'
  },
  {
    id: '19',
    name: '抖音创作者平台',
    icon: 'douyin',
    category: '社媒工具',
    description: '抖音官方创作者平台，提供视频发布、数据分析、互动管理等功能，助力创作者内容运营和变现',
    url: 'https://creator.douyin.com/'
  },
  {
    id: '20',
    name: '小红书创作者平台',
    icon: 'xiaohongshu',
    category: '社媒工具',
    description: '小红书官方创作者平台，支持笔记发布、数据洞察、活动合作等功能，帮助创作者打造个人品牌',
    url: 'https://creator.xiaohongshu.com/login'
  },
  {
    id: '21',
    name: '视频号创作者平台',
    icon: 'channels',
    category: '社媒工具',
    description: '微信视频号官方运营平台，整合内容发布、数据分析、粉丝运营等功能，连接微信生态流量',
    url: 'https://channels.weixin.qq.com/login.html'
  },
  {
    id: '22',
    name: 'YouTube Studio',
    icon: 'youtube',
    category: '社媒工具',
    description: 'YouTube官方创作者工作室，提供视频管理、数据分析、收益追踪等功能，是海外视频创作必备工具',
    url: 'https://studio.youtube.com'
  },
  {
    id: '23',
    name: '微信公众平台',
    icon: 'wechat',
    category: '社媒工具',
    description: '微信官方内容创作平台，支持图文编辑、消息群发、粉丝管理、数据分析等功能，连接微信庞大用户生态',
    url: 'https://mp.weixin.qq.com/'
  }
];

interface AIToolsSectionProps {
  id: string;
}

const AIToolsSection = ({ id }: AIToolsSectionProps) => {
  const { category, setCategory, resetFilters } = useToolsFilterStore();
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  // 组件挂载时初始化
  useEffect(() => {
    setMounted(true);
    // 设置默认类别为"AI大模型"并应用初始筛选
    if (aiTools.length > 0) {
      const initialFiltered = aiTools.filter(tool => tool.category === 'AI大模型');
      setFilteredTools(initialFiltered);
      setCategory('AI大模型');
    }
  }, [setCategory]);

  // 过滤工具 - 直接响应category变化
  useEffect(() => {
    if (!category) return;
    
    console.log('正在筛选:', category);
    const filtered = aiTools.filter(tool => tool.category === category);
    console.log('筛选结果:', filtered.length, '个工具');
    
    // 直接设置筛选结果
    setFilteredTools(filtered);
    
    // 简单动画，无需复杂控制
    if (isInView && controls) {
      controls.start('visible');
    }
  }, [category, controls, isInView]);

  // 基础动画控制
  useEffect(() => {
    if (isInView && controls) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // 渲染工具卡片函数
  const renderToolCards = () => {
    if (!filteredTools || filteredTools.length === 0) {
      return (
        <div className="col-span-3 text-center py-48">
          <p className="text-gray-500 dark:text-gray-400">没有找到符合条件的AI工具</p>
        </div>
      );
    }

    return filteredTools.map((tool, index) => (
      <motion.div
        key={`${tool.id}-${index}`}
        className="card flex flex-col hover:shadow-lg transition-shadow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
      >
        {/* 工具图标和标题 */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-heading font-bold">{tool.name}</h3>
            <span className="badge bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 backdrop-blur-sm text-sm">
              {tool.category}
            </span>
          </div>
        </div>
        
        {/* 工具描述 */}
        <div className="mb-16 flex-grow">
          <p className="text-gray-600 dark:text-gray-400">
            {tool.description}
          </p>
        </div>
        
        {/* 工具链接 */}
        <div className="mt-auto pt-16 border-t border-gray-100 dark:border-gray-700">
          <a 
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer" 
            className="block w-full text-center px-4 py-2.5 text-sm font-medium text-primary dark:text-secondary hover:text-white dark:hover:text-white bg-primary/5 dark:bg-secondary/5 hover:bg-primary dark:hover:bg-secondary rounded-lg transition-all duration-300"
          >
            快速访问
          </a>
        </div>
      </motion.div>
    ));
  };

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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">常用工具</h2>
          <p className="text-lg gradient-text font-medium mb-16">
            {mounted ? "KKKK AI Tools" : "KKKK AI Tool"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {mounted ? "AI应用工具箱，MAAE (Make AI Accessible for Everyone)" : "这些是我日常使用的AI工具和平台，帮助我提高工作效率和创造能力。"}
          </p>
        </motion.div>

        {/* 过滤器 */}
        <div className="mb-32 flex flex-wrap justify-center items-center gap-16">
          {/* 类别筛选 */}
          <div className="flex flex-wrap justify-center gap-8">
            {['AI大模型', 'AI音/视频工具', '出海工具', '社媒工具', '其他'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`badge ${
                  category === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* AI工具卡片网格 - 使用简化的渲染函数 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {renderToolCards()}
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection; 