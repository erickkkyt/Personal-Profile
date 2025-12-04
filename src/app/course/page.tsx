import { getCoursePosts } from '@/lib/course';
import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, Folder } from 'lucide-react';
import { Breadcrumb } from '@/components/course/Breadcrumb';

export default function CourseIndexPage() {
    // getCoursePosts 已经处理了目录和文件的合并，无需再过滤
    const items = getCoursePosts();

    return (
        <>
            <Breadcrumb items={[{ label: 'n8n 课程' }]} />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Demand to Workflow
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        构建用 n8n 解决任何复杂需求的底层思维
                    </p>
                </div>

                <div className="space-y-12">
                    {items.map((section) => (
                        <div key={section.path} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <Link
                                href={`/course/${section.path}`}
                                className="block p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
                            >
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center group-hover:text-primary transition-colors">
                                    <Folder className="w-5 h-5 mr-3 text-primary" />
                                    {section.title || section.name}
                                    <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h2>
                            </Link>

                            <div className="p-6 grid gap-4 md:grid-cols-2">
                                {section.children?.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={`/course/${item.path}`}
                                        className="group flex items-start p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                                    >
                                        <div className="mt-1 mr-4 p-2 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-1">
                                                {item.title || item.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                点击开始学习本章节
                                            </p>
                                        </div>
                                        <ArrowRight className="ml-auto mt-2 w-4 h-4 text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
