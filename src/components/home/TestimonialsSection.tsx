'use client';

import { SectionShell } from './SectionShell';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
    const reviews = [
        {
            name: '林志豪',
            role: '跨境电商运营总监',
            content: '我们团队之前每天要花 4 小时给新款做上架图。用课程里的 AI 换装流水线后，成本从每张 50 元降到 3 毛钱，上架速度快了 10 倍。',
            stars: 5,
        },
        {
            name: 'Sarah Chen',
            role: '独立 IP 主理人',
            content: '一个人做公众号太累了。学完这套 n8n 系统课，我把选题、写稿、排版全部自动化了。现在的我只负责审稿，每天多出 3 小时做深度思考。',
            stars: 5,
        },
        {
            name: '王浩',
            role: 'MCN 机构内容合伙人',
            content: '以前分析竞对小红书全靠人工刷，数据滞后。现在用这套爬虫+分析工作流，每天早晨自动推送到飞书群，爆款率提升了 40%。',
            stars: 5,
        },
        {
            name: '谢总',
            role: '某 SaaS 公司创始人',
            content: '购买了企业咨询服务，帮我们把销售线索流转完全打通了。现在客户填表单后，自动分发给销售并录入 CRM，漏单率直接归零。',
            stars: 5,
        },
    ];

    return (
        <SectionShell id="testimonials" title="学员与客户评价" subtitle="Testimonials">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {reviews.map((review, index) => (
                    <div key={index} className="flex flex-col rounded-2xl border border-gray-100 bg-white/60 dark:border-white/10 dark:bg-white/5 p-8 shadow-sm">
                        <div className="flex gap-1 mb-4 text-amber-400">
                            {[...Array(review.stars)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                            "{review.content}"
                        </p>
                        <div className="mt-auto">
                            <p className="font-bold text-gray-900 dark:text-white text-base">{review.name}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionShell>
    );
}
