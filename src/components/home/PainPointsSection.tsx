'use client';

import { SectionShell } from './SectionShell';
import { XCircle, CheckCircle } from 'lucide-react';

export function PainPointsSection() {
    const comparisons = [
        {
            pain: '重复机械劳动',
            painDesc: '每天耗费 2-3 小时在复制粘贴、导数据、发报表。',
            gain: '自动化流水线',
            gainDesc: '配置一次，全年自动运行。0 人工干预，数据零出错。',
        },
        {
            pain: '系统割裂',
            painDesc: '飞书、微信、CRM、表格之间数据不通，信息孤岛。',
            gain: '数据即时同步',
            gainDesc: 'n8n 打通任意 API，消息/线索/订单毫秒级自动流转。',
        },
        {
            pain: '开发成本高',
            painDesc: '找程序员写代码太贵，还要维护服务器，不仅慢还难改。',
            gain: '低代码/无代码',
            gainDesc: '可视化编排，不懂代码也能像搭积木一样构建复杂系统。',
        },
    ];

    return (
        <SectionShell id="pain-points" title="为什么你需要自动化？" subtitle="The Problem & Solution">
            <div className="grid gap-6 md:grid-cols-3">
                {comparisons.map((item, index) => (
                    <div key={index} className="relative group perspective-1000">
                        <div className="h-full rounded-2xl border border-gray-100 bg-white/60 dark:border-white/10 dark:bg-white/5 p-6 md:p-8 transition-all hover:shadow-lg dark:hover:bg-white/10">
                            {/* Pain */}
                            <div className="mb-8 opacity-90 dark:opacity-80 group-hover:opacity-100 dark:group-hover:opacity-60 transition-opacity">
                                <div className="flex items-center gap-2 mb-3 text-red-500 dark:text-red-400">
                                    <XCircle className="w-5 h-5" />
                                    <h3 className="font-bold text-lg">Before</h3>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.pain}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.painDesc}</p>
                            </div>

                            {/* Connector */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/20 to-transparent my-6" />

                            {/* Gain */}
                            <div className="">
                                <div className="flex items-center gap-2 mb-3 text-emerald-500 dark:text-emerald-400">
                                    <CheckCircle className="w-5 h-5" />
                                    <h3 className="font-bold text-lg">After</h3>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.gain}</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item.gainDesc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionShell>
    );
}
