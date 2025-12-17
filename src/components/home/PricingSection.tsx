'use client';

import { SectionShell } from './SectionShell';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ContactModal from '@/components/shared/ContactModal';

export function PricingSection() {
    const [showConsultModal, setShowConsultModal] = useState(false);

    const plans = [
        {
            name: '工作流模板库',
            price: '¥299',
            period: '/ 次',
            description: '拿来即用的高质量模板，适合只需素材的你。',
            features: [
                '含 50+ 常用场景工作流',
                '永久使用，无授权限制',
                '含部署与导入教程',
                '不含系统课程讲解',
            ],
            cta: '获取模板',
            href: '/templates',
            variant: 'secondary',
        },
        {
            name: 'n8n 系统实战课',
            price: '¥699',
            period: '/ 年',
            description: '从入门到精通，建构你的自动化思维体系。',
            features: [
                '全套视频课程 (持续更新)',
                '包含所有工作流模板 (价值 ¥299)',
                '专属学员交流群',
                '实战案例拆解 + 答疑',
                '支持试听，1天无理由退款',
            ],
            cta: '立即加入',
            href: '/course',
            variant: 'primary',
            popular: true,
        },
        {
            name: '企业定制 / 咨询',
            price: 'Custom',
            period: '',
            description: '根据业务需求定制开发，交付可运行的系统。',
            features: [
                '需求诊断与方案设计',
                '端到端系统开发与部署',
                '员工培训与文档交付',
                '长期技术支持与维护',
            ],
            cta: '预约咨询',
            href: '/contact', // Assuming a contact page or anchor
            variant: 'outline',
        },
    ];

    return (
        <SectionShell id="products" title="选择适合你的方案" subtitle="Pricing">
            <div className="grid gap-8 lg:gap-12 md:grid-cols-3 max-w-7xl mx-auto items-start">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2
              ${plan.popular
                                ? 'bg-gradient-to-b from-primary/20 to-primary/5 border-primary/50 shadow-2xl shadow-primary/20 z-10 scale-105'
                                : 'bg-white/50 border-gray-200 dark:bg-white/5 dark:border-white/10 hover:border-primary/30 dark:hover:border-white/20'
                            }
            `}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-secondary to-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className={`text-lg font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-4xl font-bold tracking-tight ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.price}</span>
                                <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>{plan.period}</span>
                            </div>
                            <p className={`text-sm mt-4 leading-relaxed h-10 ${plan.popular ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>{plan.description}</p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature) => (
                                <li key={feature} className={`flex items-start gap-3 text-sm ${plan.popular ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300'}`}>
                                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-secondary' : 'text-gray-400 dark:text-gray-500'}`} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {plan.cta === '预约咨询' ? (
                            <button
                                onClick={() => setShowConsultModal(true)}
                                className={`w-full flex items-center justify-center py-4 rounded-xl text-sm font-bold transition-all
                  ${plan.variant === 'primary'
                                        ? 'bg-white text-primary hover:bg-gray-100 shadow-lg shadow-white/10'
                                        : plan.variant === 'secondary'
                                            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10'
                                    }
                `}
                            >
                                {plan.cta}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        ) : (
                            <Link
                                href={plan.href}
                                className={`w-full flex items-center justify-center py-4 rounded-xl text-sm font-bold transition-all
                  ${plan.variant === 'primary'
                                        ? 'bg-white text-primary hover:bg-gray-100 shadow-lg shadow-white/10'
                                        : plan.variant === 'secondary'
                                            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10'
                                    }
                `}
                            >
                                {plan.cta}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <ContactModal
                isOpen={showConsultModal}
                onClose={() => setShowConsultModal(false)}
                title="企业定制与咨询"
                subtitle="长按/扫码添加微信，备注「企业咨询」"
            />
        </SectionShell>
    );
}
