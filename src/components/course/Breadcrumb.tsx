import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link
                href="/"
                className="flex items-center hover:text-gray-900 dark:hover:text-gray-200 transition-colors font-medium"
            >
                Home
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
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
                        className="text-gray-400 dark:text-gray-600"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 dark:text-gray-200 font-medium">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
