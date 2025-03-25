'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { SocialLink } from '@/types';

// 社交链接数据
const socialLinks: SocialLink[] = [
  {
    id: '1',
    platform: 'GitHub',
    url: 'https://github.com/erickkkyt?tab=repositories',
    icon: 'github'
  },
  {
    id: '2',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@kkkkeric98',
    icon: 'youtube'
  },
  {
    id: '3',
    platform: 'XiaoHongShu',
    url: 'https://www.xiaohongshu.com/user/profile/61503913000000000201d805',
    icon: 'xiaohongshu'
  }
];

// 技能数据
const skills = [
  { name: 'AI编程', engName: 'AI Coding', value: 30, icon: '💻' },
  { name: '需求发现', engName: 'Requirement Discovery', value: 40, icon: '🔍' },
  { name: 'SEO运营', engName: 'SEO Operation', value: 20, icon: '🔮' },
  { name: '社媒营销', engName: 'Social Media Marketing', value: 20, icon: '📱' },
  { name: 'AI商业化', engName: 'AI Commercialization', value: 20, icon: '💰' },
];

interface HeroSectionProps {
  id: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 视差滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxLayers = document.querySelectorAll('.parallax__layer');
      parallaxLayers.forEach((layer: any, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 动画触发
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section id={id} className="min-h-screen relative overflow-hidden parallax">
      {/* 背景视差层 */}
      <div className="parallax__layer">
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-b from-secondary/5 to-transparent"></div>
      </div>
      <div className="parallax__layer">
        <div className="absolute bottom-0 left-0 w-1/2 h-screen bg-gradient-to-t from-primary/5 to-transparent"></div>
      </div>
      
      <div className="container-custom relative z-10 pt-32 md:pt-40 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-32 md:mb-0" ref={ref}>
          {/* 头像 */}
          <motion.div 
            className="relative mx-auto md:mx-0 w-48 h-48 md:w-64 md:h-64 mb-24"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
            <img 
              src="/avatar.jpg" 
              alt="KKKK AI Space" 
              className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800"
            />
          </motion.div>
          
          {/* 姓名和职称 */}
          <motion.h1 
            className="text-4xl md:text-5xl font-heading font-bold mb-8 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.7,
                  delay: 0.2
                } 
              }
            }}
          >
            <span className="block">KKKK</span>
            <span className="gradient-text">AI自由职业&独立开发</span>
          </motion.h1>
          
          {/* 简介 */}
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 mb-24 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.7,
                  delay: 0.4
                } 
              }
            }}
          >
            🤖 一名从零开始的AI应用开发者，发现需求、创造价值<br/>
            🚀 南京理工→南洋理工→股权投资→AI领域自由职业者<br/>
            💻 分享个人成长和创业感悟以及AI工具&产品
          </motion.p>
          
          {/* 社交链接 */}
          <motion.div 
            className="flex justify-center md:justify-start space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  duration: 0.7,
                  delay: 0.6
                } 
              }
            }}
          >
            {socialLinks.map((link, index) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary transition-all hover:scale-110 flex flex-col items-center"
                aria-label={link.platform}
              >
                {/* 社交图标 */}
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                {link.platform === 'GitHub' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                )}
                {link.platform === 'YouTube' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                )}
                {link.platform === 'XiaoHongShu' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 22h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm3-3H7V5h2v14zm8 0h-6V5h6v14z"/>
                  </svg>
                )}
                </div>
                {/* 平台名称 */}
                <span className="text-sm font-medium">{link.platform === 'XiaoHongShu' ? '小红书' : link.platform}</span>
              </a>
            ))}
          </motion.div>
        </div>
        
        <div className="md:w-1/2 flex justify-center md:justify-end">
          {/* 相关技能模块 */}
          <motion.div 
            className="relative w-full max-w-[450px] -mt-8 md:ml-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            variants={{
              visible: { 
                opacity: 1, 
                scale: 1, 
                transition: { 
                  duration: 0.7,
                  delay: 0.4
                } 
              }
            }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transform hover:shadow-2xl transition-all">
              <div className="text-center">
                <h3 className="text-xl font-heading font-bold mb-1 text-gray-800 dark:text-gray-100">相关技能 Relevant Skills</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">（持续成长ing）</p>
              </div>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    className="skill-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={controls}
                    variants={{
                      visible: { 
                        opacity: 1, 
                        x: 0, 
                        transition: { 
                          duration: 0.5,
                          delay: 0.2 + (index * 0.1)
                        } 
                      }
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">{skill.icon}</span>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">{skill.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{skill.engName}</p>
                      </div>
                      <span className="ml-auto text-base font-semibold text-primary dark:text-secondary">{skill.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" 
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;