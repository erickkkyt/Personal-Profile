'use client';

import { SectionShell } from './SectionShell';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
    const faqs = [
        {
            q: '我完全没有编程基础，能学会吗？',
            a: '完全可以。n8n 本质是基于流程图的可视化工具，我们的课程专为非技术人员设计，从最基础的概念讲起，配合大量实操案例，确保你能听懂并上手。',
        },
        {
            q: '购买课程后包含了所有模板吗？',
            a: '是的。购买 699 元的系统课，已经自动包含了价值 299 元的所有工作流模板，以及后续更新的所有新模板，无需二次付费。',
        },
        {
            q: '如果我学不会或者觉得不合适，可以退款吗？',
            a: '支持。我们提供 7 天无理由退款服务。如果您觉得课程内容不符合您的预期，随时可以申请全额退款，没有任何风险。',
        },
        {
            q: '课程是录播还是直播？有答疑吗？',
            a: '课程以高清录播视频为主，方便您随时随地反复观看。同时我们有专属的学员群，我会定期在群里进行答疑和直播演示，确保您的问题能得到解决。',
        },
    ];

    return (
        <SectionShell id="faq" title="常见问题解答" subtitle="FAQ">
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
            </div>
        </SectionShell>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all hover:bg-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="text-base md:text-lg font-bold text-white">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
