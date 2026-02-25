'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CourseTreeItem } from '@/lib/course';

// 视频时长映射（路径相对于 /course/）
const VIDEO_DURATIONS: Record<string, string> = {
    'overview/01-intro': "26'56",
    'basic-intro/01-module-1': "26'27",
    'basic-intro/02-module-2': "11'58",
    'basic-intro/03-module-3': "21'32",
    'basic-intro/04-module-4': "35'34",
    'core-skills/05-module-5': "36'35",
    'core-skills/06-module-6': "55'56",
    'core-skills/07-module-7': "26'36",
    'advanced-cases/01-case-1': "31'29",
    'advanced-cases/02-case-2': "30'18",
    'advanced-cases/03-case-3': "23'34",
    'advanced-cases/04-case-4': "47'59",
    'advanced-cases/05-case-5': "23'03",
    'resources/04-faq': "16'46",
};

// Simple Icons
const ChevronRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const FolderIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />
    </svg>
);

function SidebarItem({ item, level = 0 }: { item: CourseTreeItem; level?: number }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    // Construct the href for files
    // Assuming item.path is relative to src/content/course, e.g. "8-1-async-polling"
    // The route is /course/[slug]
    const href = item.type === 'file' ? `/course/${item.path}` : '#';
    const isActive = item.type === 'file' && pathname === href;
    const duration = VIDEO_DURATIONS[item.path];

    // 判断是否为一级目录
    const isTopLevel = level === 0;

    if (item.type === 'directory') {
        return (
            <div className={isTopLevel ? "mb-3" : "mb-1"}>
                <div
                    className={`flex w-full items-center gap-2 rounded-lg transition-all ${isTopLevel
                        ? 'px-3 py-2.5 text-sm font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
                        : 'px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200'
                        }`}
                    style={{ paddingLeft: isTopLevel ? '12px' : `${level * 12 + 8}px` }}
                >
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
                    >
                        {isOpen ? (
                            <ChevronDown className={isTopLevel ? "h-5 w-5" : "h-4 w-4"} />
                        ) : (
                            <ChevronRight className={isTopLevel ? "h-5 w-5" : "h-4 w-4"} />
                        )}
                    </button>

                    <Link
                        href={`/course/${item.path}`}
                        className={`flex-1 flex items-center px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors truncate ${pathname === `/course/${item.path}` ? 'text-primary font-semibold' : ''
                            }`}
                    >
                        <span className="truncate leading-tight">{item.title || item.name}</span>
                    </Link>
                </div>

                {isOpen && item.children && (
                    <div className={isTopLevel ? "mt-2 ml-2 space-y-0.5" : "mt-1"}>
                        {item.children.map((child) => (
                            <SidebarItem key={child.path} item={child} level={level + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={href}
            className={`flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors ${isActive
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-400'}`}></span>
            <span className="truncate leading-tight">{item.title || item.name}</span>
            {duration && (
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {duration}
                </span>
            )}
        </Link>
    );
}

export function Sidebar({ items }: { items: CourseTreeItem[] }) {
    return (
        <nav className="h-full w-full p-4">
            <div className="mb-8 px-2 pb-4 border-b border-gray-200 dark:border-gray-700">
                <Link
                    href="/course"
                    className="inline-flex w-full justify-center items-center text-xl font-bold text-gray-900 transition-colors hover:text-primary dark:text-white text-center"
                >
                    Demand to Workflow
                </Link>
            </div>
            <div className="space-y-2">
                {items.map((item) => (
                    <SidebarItem key={item.path} item={item} />
                ))}
            </div>
        </nav>
    );
}
