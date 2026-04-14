import { COURSE_STRUCTURE, getPostBySlug } from '@/lib/course';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { VideoPlayer } from '@/components/course/VideoPlayer';
import { Breadcrumb, BreadcrumbItem } from '@/components/course/Breadcrumb';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { createClient } from '@/utils/supabase/server';
import { supabaseAdmin } from '@/utils/supabase/admin';
import { PaywallCta } from '@/components/course/PaywallCta';

// Define custom components available in MDX
const components = {
    VideoPlayer,
};

// 目录标题映射，确保一级目录与二级目录显示一致
const directoryTitles: Record<string, string> = {
    guide: '课程整体概览',
    overview: '课程整体概览',
    '如何高效使用和学习本课程': '课程整体概览',
    '课程整体概览': '课程整体概览',
    'basic-intro': 'n8n 基础与底层逻辑',
    'Demand to Workflow': 'n8n 基础与底层逻辑',
    'n8n基础与底层逻辑': 'n8n 基础与底层逻辑',
    'n8n 基础与底层逻辑': 'n8n 基础与底层逻辑',
    'core-skills': 'n8n 核心节点与功能',
    'n8n 核心技能': 'n8n 核心节点与功能',
    'n8n核心节点与功能': 'n8n 核心节点与功能',
    'n8n 核心节点与功能': 'n8n 核心节点与功能',
    'advanced-cases': 'n8n 高阶工作流案例',
    'n8n高阶实战工作流案例': 'n8n 高阶工作流案例',
    'n8n高阶工作流案例': 'n8n 高阶工作流案例',
    'n8n 高阶工作流案例': 'n8n 高阶工作流案例',
    resources: 'n8n 能力扩展工具库',
    'n8n资源中心': 'n8n 能力扩展工具库',
    'n8n能力扩展工具库': 'n8n 能力扩展工具库',
    'n8n 能力扩展工具库': 'n8n 能力扩展工具库',
};

export default async function CoursePage({ params }: { params: { slug: string[] } }) {
    // 付费墙：允许概览页和前三个介绍页公开访问
    const slugPath = params.slug.join('/');
    const publicSlugs = [
        'overview',
        'overview/01-intro',
        'overview/02-roadmap',
        'overview/03-changelog',
    ];
    const isPublicPage = publicSlugs.includes(slugPath);

    // 登录 & 付费状态
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    let isPaidUser = false;

    if (user) {
        // 使用 service role 在服务端读取，避免 RLS 影响
        const { data: paymentProfile } = await supabaseAdmin
            .from('user_profiles')
            .select('paid')
            .eq('uid', user.id)
            .maybeSingle();

        isPaidUser = paymentProfile?.paid === true;
    }

    const paywallActive = !isPublicPage && !isPaidUser;
    const nextPath = `/course/${slugPath}`;

    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    // 生成面包屑导航
    const breadcrumbItems: BreadcrumbItem[] = [
        { label: 'n8n 课程', href: '/course' }
    ];

    const matchedSection = COURSE_STRUCTURE.find(
        (section) =>
            section.introSlug === params.slug[0] ||
            section.directory === params.slug[0] ||
            section.id === params.slug[0]
    );

    // 如果是一级目录页面
    if (params.slug.length === 1) {
        const categoryTitle =
            matchedSection?.title || directoryTitles[params.slug[0]] || params.slug[0];
        breadcrumbItems.push({ label: categoryTitle });
    }
    // 如果是二级页面
    else if (params.slug.length > 1) {
        const categoryTitle =
            matchedSection?.title || directoryTitles[params.slug[0]] || params.slug[0];
        const categoryHref = matchedSection
            ? `/course/${matchedSection.introSlug}`
            : `/course/${params.slug[0]}`;

        breadcrumbItems.push({
            label: categoryTitle,
            href: categoryHref,
        });
        // 当前页面
        breadcrumbItems.push({ label: post.title });
    }

    return (
        <>
            <div id="paywall-state" data-paywall={paywallActive ? 'locked' : 'open'} className="hidden" />
            <Breadcrumb items={breadcrumbItems} />

            <article
                className={`prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-h2:text-emerald-700 prose-h2:font-extrabold prose-h3:text-indigo-800 prose-h3:underline prose-h3:decoration-indigo-400 prose-h3:decoration-2 prose-h3:underline-offset-4 prose-h4:text-slate-600 prose-h4:font-semibold ${
                    paywallActive ? 'relative pb-36' : ''
                }`}
            >
                <div className="mb-8 border-b border-gray-200 pb-8 dark:border-gray-800">
                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {post.title}
                    </h1>
                    {post.description && (
                        <p className="text-xl text-gray-500 dark:text-gray-400">
                            {post.description}
                        </p>
                    )}
                </div>
                <div
                    className={
                        paywallActive
                            ? 'relative max-h-[420px] overflow-hidden opacity-90 pointer-events-none select-none'
                            : ''
                    }
                >
                    <MDXRemote
                        source={post.content}
                        components={components}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [
                                    rehypeSlug,
                                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                                ],
                            },
                        }}
                    />
                </div>

                {paywallActive && (
                    <>
                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/5 via-white/80 to-white dark:from-gray-900/5 dark:via-gray-900/80 dark:to-gray-900"
                            aria-hidden="true"
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center pt-8 pb-12">
                            <PaywallCta
                                loginHref={`/login?next=${encodeURIComponent(nextPath)}`}
                                wechatImage="/qr/wechat-hero.jpg"
                            />
                        </div>
                    </>
                )}
            </article>
        </>
    );
}
