'use client';

import React from 'react';

interface SectionShellProps {
    id?: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}

export function SectionShell({ id, title, subtitle, children, className = '' }: SectionShellProps) {
    return (
        <section id={id} className={`py-20 md:py-28 ${className}`}>
            <div className="container-custom mx-auto px-5 md:px-8">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-br from-white via-white to-white/80 p-10 md:p-14 shadow-[0_25px_80px_-40px_rgba(15,35,60,0.45)] dark:border-white/10 dark:from-gray-900/90 dark:via-gray-900/85 dark:to-gray-900/80">
                    <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_10px_10px,#0F233C0F_1px,transparent_0)] [background-size:120px_120px]" />
                    <div className="pointer-events-none absolute -right-40 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -left-28 -bottom-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
                    <div className="relative z-10">
                        <div className="max-w-3xl mb-10 md:mb-14">
                            {subtitle && (
                                <p className="text-sm font-bold tracking-[0.15em] uppercase text-primary/90 dark:text-white/80 mb-3">
                                    {subtitle}
                                </p>
                            )}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white tracking-tight">
                                {title}
                            </h2>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
