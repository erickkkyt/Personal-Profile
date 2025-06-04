'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Project } from '@/types';
import CircularGallery from './CircularGallery';

// AI项目数据
const projects: Project[] = [
  {
    id: '1',
    title: '乾坤时空解析',
    description: '通过先进的人工智能技术，基于您的生辰八字提供个性化的命理分析报告',
    image: 'https://picsum.photos/seed/qiankun/800/600',
    tags: ['Web应用'],
    demoUrl: 'https://www.fourpillars.info/',
    sourceUrl: 'https://github.com/erickkkyt/Personal-Profile',
    launchDate: '2025.04.11'
  },
  {
    id: '2',
    title: 'Knowledge Card Generator',
    description: '将长文本转化为精美的知识卡片，便于学习和分享',
    image: 'https://picsum.photos/seed/knowledge/800/600',
    tags: ['Web应用'],
    demoUrl: 'https://www.knowledgecard.pro/',
    sourceUrl: 'https://github.com/erickkkyt/knowledge-card',
    launchDate: '2025.04.13'
  },
  {
    id: '3',
    title: 'AI Baby Generator',
    description: 'AI视频生成，快速生成爆火的BabyPodcast短视频，支持一键播客、配音和多平台导出，助力创作者变现。',
    image: 'https://picsum.photos/seed/baby/800/600',
    tags: ['Web应用', 'AI内容生成', '短视频工具'],
    demoUrl: 'https://www.babypodcast.pro/',
    sourceUrl: '',
    launchDate: '2025.05.26'
  }
];

// 为圆形画廊准备数据（文字模式）
const galleryItems = projects.map(project => ({
  text: project.title,
  projectData: {
    title: project.title,
    description: project.description,
    demoUrl: project.demoUrl,
    sourceUrl: project.sourceUrl
  }
}));

interface ProjectsSectionProps {
  id: string;
}

const ProjectsSection = ({ id }: ProjectsSectionProps) => {
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

        {/* 圆形画廊 */}
        <motion.div
          className="mb-48"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
        >
          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              isTextMode={true}
            />
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default ProjectsSection; 