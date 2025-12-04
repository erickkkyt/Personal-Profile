import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/course');

export type Heading = {
    text: string;
    slug: string;
    level: number;
};

export type CoursePost = {
    slug: string[];
    title: string;
    description?: string;
    content: string;
    headings: Heading[];
};

export type CourseTreeItem = {
    name: string;
    path: string; // Relative path from contentDirectory, e.g., "8-1-async-polling" or "chapter-1/intro"
    type: 'file' | 'directory';
    title?: string; // From frontmatter if file
    children?: CourseTreeItem[];
};

export type CourseSection = {
    id: string;
    title: string;
    introSlug: string; // 顶部入口页的 slug（位于 contentDirectory 下的 mdx 文件）
    directory: string; // 对应二级目录所在的文件夹名称
};

// 固定一级目录的顺序和映射关系，避免重复
export const COURSE_STRUCTURE: CourseSection[] = [
    {
        id: 'guide',
        title: '课程整体概览',
        introSlug: 'guide',
        directory: '如何高效使用和学习本课程',
    },
    {
        id: 'demand2workflow',
        title: 'n8n 基础与底层逻辑',
        introSlug: 'demand2workflow',
        directory: 'Demand to Workflow',
    },
    {
        id: 'core-skills',
        title: 'n8n 核心节点与功能',
        introSlug: 'core-skills',
        directory: 'n8n 核心技能',
    },
    {
        id: 'advanced-cases',
        title: 'n8n 高阶工作流案例',
        introSlug: 'advanced-cases',
        directory: 'n8n高阶实战工作流案例',
    },
    {
        id: 'resources',
        title: 'n8n 能力扩展工具库',
        introSlug: 'resources',
        directory: 'n8n资源中心',
    },
];

function buildDirectoryTree(dir: string, contentRelativePath: string, routePrefix: string): CourseTreeItem[] {
    if (!fs.existsSync(dir)) {
        return [];
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const directories = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
    const mdxFiles = entries
        .filter(entry => entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')))
        .map(entry => entry.name);

    const items: CourseTreeItem[] = [];

    for (const dirName of directories.sort()) {
        const fullPath = path.join(dir, dirName);
        const childContentPath = path.join(contentRelativePath, dirName);
        const childRoutePath = path.join(routePrefix, dirName);

        items.push({
            name: dirName,
            path: childRoutePath,
            type: 'directory',
            title: dirName,
            children: buildDirectoryTree(fullPath, childContentPath, childRoutePath),
        });
    }

    for (const fileName of mdxFiles.sort()) {
        const fullPath = path.join(dir, fileName);
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContent);
        const slug = fileName.replace(/\.mdx?$/, '');

        items.push({
            name: fileName,
            path: path.join(routePrefix, slug),
            type: 'file',
            title: data.title || slug,
        });
    }

    return items;
}

export function getCoursePosts(): CourseTreeItem[] {
    return COURSE_STRUCTURE.map((section) => {
        const children = buildDirectoryTree(
            path.join(contentDirectory, section.directory),
            section.directory,
            section.introSlug
        );

        return {
            name: section.id,
            path: section.introSlug,
            type: 'directory',
            title: section.title,
            children,
        };
    });
}

// 将路由 slug 映射到真实内容路径（兼容友好 slug 与目录名）
function resolveRealSlug(slug: string[]): string {
    if (!slug.length) return '';

    const [first, ...rest] = slug;
    const matchedSection = COURSE_STRUCTURE.find(
        (section) =>
            section.introSlug === first ||
            section.directory === first ||
            section.id === first
    );

    if (matchedSection) {
        // 一级页 -> 对应 introSlug 文件
        if (rest.length === 0) {
            return matchedSection.introSlug;
        }
        // 二级页 -> 目录/子文件
        const realFirst = sectionDirectorySafe(matchedSection.directory);
        return [realFirst, ...rest].join('/');
    }

    // 未匹配则原样返回
    return [first, ...rest].join('/');
}

// 防止 path.join 把以斜杠开头的目录当作绝对路径
function sectionDirectorySafe(directory: string) {
    return directory.startsWith('/') ? directory.slice(1) : directory;
}

export function getPostBySlug(slug: string[]): CoursePost | null {
    const realSlug = resolveRealSlug(slug);

    // 首先尝试直接匹配 .mdx 文件
    let fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        // 如果直接匹配不到，则尝试匹配同名目录下的 index.mdx 文件
        fullPath = path.join(contentDirectory, realSlug, 'index.mdx');
        if (!fs.existsSync(fullPath)) {
            return null; // 两种情况都找不到，则返回 null
        }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract headings
    const headings: Heading[] = [];
    const lines = content.split('\n');
    let inCodeBlock = false;

    for (const line of lines) {
        if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
        }

        if (!inCodeBlock) {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2].trim();
                // Simple slug generation, should match rehype-slug logic roughly
                const slug = text
                    .toLowerCase()
                    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // Support Chinese characters
                    .replace(/^-+|-+$/g, '');

                headings.push({ text, slug, level });
            }
        }
    }

    return {
        slug,
        title: data.title || realSlug,
        description: data.description,
        content,
        headings,
    };
}
