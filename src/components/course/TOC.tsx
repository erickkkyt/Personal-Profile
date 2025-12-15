'use client';

import { useEffect, useState } from 'react';

export function TOC() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [paywallLocked, setPaywallLocked] = useState(false);

    useEffect(() => {
        const paywallState = document.getElementById('paywall-state')?.getAttribute('data-paywall');
        setPaywallLocked(paywallState === 'locked');
    }, []);

    useEffect(() => {
        const updateHeadings = () => {
            const mainContent = document.getElementById('course-main-content');
            if (!mainContent) return;

            const elements = mainContent.querySelectorAll('h2, h3');
            const headingData: { id: string; text: string; level: number }[] = [];

            elements.forEach((el) => {
                if (el.id) {
                    headingData.push({
                        id: el.id,
                        text: el.textContent || '',
                        level: parseInt(el.tagName.substring(1)),
                    });
                }
            });

            setHeadings(headingData);
        };

        updateHeadings();

        const observer = new MutationObserver(updateHeadings);
        const mainContent = document.getElementById('course-main-content');
        if (mainContent) {
            observer.observe(mainContent, { childList: true, subtree: true });
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const mainContent = document.getElementById('course-main-content');
            if (!mainContent) return;

            const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];

            let closestHeading = '';
            let closestDistance = Infinity;

            for (const el of headingElements) {
                const rect = el.getBoundingClientRect();
                const distance = Math.abs(rect.top - 100);

                if (rect.top <= 150 && distance < closestDistance) {
                    closestDistance = distance;
                    closestHeading = el.id;
                }
            }

            if (closestHeading) {
                setActiveId(closestHeading);
            }
        };

        const mainContent = document.getElementById('course-main-content');
        if (mainContent) {
            mainContent.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        return () => {
            if (mainContent) mainContent.removeEventListener('scroll', handleScroll);
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="sticky top-10 mx-4 w-[272px] max-w-full rounded-2xl border border-gray-200 bg-white/92 px-6 py-6 shadow-lg shadow-gray-200/40 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70 dark:shadow-none">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-600 dark:text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                本页导航
            </div>
            <ul className={`space-y-1 text-sm leading-6 ${paywallLocked ? 'pointer-events-none opacity-60 select-none' : ''}`}>
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-colors duration-150 ${heading.level === 3 ? 'pl-5' : 'pl-2'
                                } ${activeId === heading.id
                                    ? 'bg-blue-50 text-primary font-medium'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/60'
                                }`}
                            onClick={(e) => {
                                if (paywallLocked) {
                                    e.preventDefault();
                                    return;
                                }
                                e.preventDefault();
                                const el = document.getElementById(heading.id);
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    setActiveId(heading.id);
                                }
                            }}
                            aria-disabled={paywallLocked}
                            tabIndex={paywallLocked ? -1 : 0}
                        >
                            <span className={`h-2 w-2 rounded-full ${activeId === heading.id ? 'bg-primary' : 'bg-gray-300'}`} />
                            <span className="truncate">{heading.text}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
