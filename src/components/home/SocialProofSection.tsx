'use client';

import { motion } from 'framer-motion';

export function SocialProofSection() {
    const stats = [
        { label: '学员加入', value: '500+' },
        { label: '节省时间', value: '10,000h+' },
        { label: '自动化工作流', value: '2,000+' },
        { label: '好评率', value: '99%' },
    ];

    return (
        <section className="py-10 border-b border-white/5 bg-white/5 backdrop-blur-sm">
            <div className="container-custom mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 items-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm font-medium text-gray-400 mt-1 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
