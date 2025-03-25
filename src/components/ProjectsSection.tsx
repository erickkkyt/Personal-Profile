'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Project } from '@/types';

// AI项目数据
const projects: Project[] = [
  {
    id: '1',
    title: '长文本转小红书卡片',
    description: '万字长文秒变爆款卡片\n让深度思考也能拥有轻盈表达',
    updateTime: '待更新 to be updated\n预计上线时间为2025.03.27',
    image: '',
    tags: ['Web应用'],
    demoUrl: '#',
    sourceUrl: '#'
  },
  {
    id: '2',
    title: '命理分析类应用',
    description: '运用中国传统命理分析方法\n为你的未来提供另一个视角',
    updateTime: '待更新 to be updated\n预计上线时间为2025.03.31',
    image: '',
    tags: ['Web应用', '微信小程序'],
    demoUrl: '#',
    sourceUrl: '#'
  },
  {
    id: '3',
    title: '海外高质量内容知识库',
    description: '打破海外高质量内容信息差\n用深度阅读代替碎片阅读',
    updateTime: '待更新 to be updated\n预计上线时间为2025.04.03',
    image: '',
    tags: ['Web应用'],
    demoUrl: '#',
    sourceUrl: '#'
  }
];

interface ProjectsSectionProps {
  id: string;
}

const ProjectsSection = ({ id }: ProjectsSectionProps) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 动画控制
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // 添加自定义样式
  useEffect(() => {
    const styles = document.createElement('style');
    styles.innerHTML = `
      .border-gradient {
        position: relative;
      }
      .border-gradient::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 3px solid transparent;
        border-radius: 0.375rem;
        background: linear-gradient(45deg, #2E3192, #00AEEF) border-box;
        -webkit-mask: 
          linear-gradient(#fff 0 0) padding-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        opacity: 0.7;
        pointer-events: none;
      }
      .leading-relaxed {
        line-height: 1.6;
      }
      .noise-texture {
        position: relative;
      }
      .noise-texture::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.08;
        mix-blend-mode: soft-light;
        pointer-events: none;
        z-index: 1;
      }
    `;

    if (typeof document !== 'undefined') {
      document.head.appendChild(styles);
      return () => {
        document.head.removeChild(styles);
      };
    }
  }, []);

  // 鼠标悬停处理
  const handleMouseEnter = (projectId: string) => {
    setActiveProject(projectId);
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <section id={id} className="section bg-white dark:bg-gray-800" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-32">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-50">项目作品</h2>
          <p className="text-lg gradient-text font-medium mb-12">
            {mounted ? "KKKK AI Projects" : "KKKK Project"}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {mounted ? "独立开发作品集，MAGA (Make AI Application Great Again)" : "这些是我开发的AI相关项目，展示了我在人工智能领域的实践和探索。"}
          </p>
        </div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-48">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="card overflow-hidden bg-gray-50 dark:bg-gray-900/90 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl noise-texture relative dark:border dark:border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
              }}
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* 项目信息 */}
              <div className="p-16 flex flex-col h-full space-y-5">
                <div className="flex-grow space-y-6">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-center leading-relaxed text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  
                  {/* 产品简介和更新时间 - 无边框版本 */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-100 text-center whitespace-pre-line leading-relaxed bg-gray-100 dark:bg-gray-800/90 p-4 rounded-lg shadow-sm border border-gray-200/40 dark:border-gray-600/50 mx-2 relative z-10">
                        {project.description || ''}
                      </p>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <h4 className="text-base text-gray-500 dark:text-gray-300 text-center font-medium mb-3">更新时间</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-100 text-center whitespace-pre-line">
                        <span className="inline-block">
                          预计上线时间为
                          <span className="ml-1 text-primary dark:text-blue-300 font-semibold px-3 py-0.5 bg-primary/10 dark:bg-blue-900/50 rounded-full border border-primary/20 dark:border-blue-700/40 shadow-sm">
                            {project.updateTime.split('为')[1].trim()}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap justify-center gap-8 p-3 rounded-lg mt-2 relative z-10">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="badge bg-gray-100/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-100 backdrop-blur-sm text-sm px-3 py-1 rounded-full border border-gray-200/40 dark:border-gray-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 链接按钮 */}
                <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-700/40 relative z-10">
                  <div className="flex justify-center items-center gap-12 py-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-secondary transition-all font-medium relative overflow-hidden group px-4 py-1.5 rounded-md hover:bg-primary/5 dark:hover:bg-secondary/5"
                    >
                      <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-y-[-2px]">直达项目</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/60 via-primary/40 to-secondary/60 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </a>
                    <div className="h-6 w-[1px] bg-gradient-to-b from-gray-200/60 via-gray-300/80 to-gray-200/60 dark:from-gray-600/40 dark:via-gray-500/60 dark:to-gray-600/40"></div>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-secondary transition-all font-medium relative overflow-hidden group px-4 py-1.5 rounded-md hover:bg-primary/5 dark:hover:bg-secondary/5"
                    >
                      <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-y-[-2px]">Github源码</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/60 via-primary/40 to-secondary/60 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 