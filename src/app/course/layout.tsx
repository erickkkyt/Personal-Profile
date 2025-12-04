import { getCoursePosts } from '@/lib/course';
import { Sidebar } from '@/components/course/Sidebar';
import { TOC } from '@/components/course/TOC';
import Link from 'next/link';

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const posts = getCoursePosts();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-gray-900">
            {/* Left Sidebar - Hidden on mobile, visible on lg */}
            <aside className="hidden w-72 flex-shrink-0 border-r border-gray-200 overflow-y-auto bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50 lg:block">
                <Sidebar items={posts} />
            </aside>

            {/* Main Content Area */}
            <main
                id="course-main-content"
                className="flex-1 overflow-y-auto scroll-smooth relative"
            >
                {/* Mobile Header (Hamburger placeholder) */}
                <div className="sticky top-0 z-10 flex items-center border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 lg:hidden">
                    <Link href="/" className="mr-4 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        &larr; Back
                    </Link>
                    <span className="font-semibold text-gray-900 dark:text-white">n8n 课程</span>
                </div>

                <div className="mx-auto max-w-4xl px-8 py-10">
                    {children}
                </div>
            </main>

            {/* Right Sidebar (TOC) - Hidden on mobile/tablet, visible on xl */}
            <aside className="hidden w-72 flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-white pr-8 dark:border-gray-800 dark:bg-gray-900 xl:block">
                <TOC />
            </aside>
        </div>
    );
}
