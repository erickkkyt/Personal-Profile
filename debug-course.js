
const { getCoursePosts, getPostBySlug } = require('./src/lib/course');
const fs = require('fs');
const path = require('path');

// Mock process.cwd
process.cwd = () => '/Users/kkkk/Desktop/Personal-Profile';

console.log('--- Testing getCoursePosts ---');
const posts = getCoursePosts();
console.log(JSON.stringify(posts, null, 2));

console.log('\n--- Testing getPostBySlug for a child item ---');
// 假设根据截图有一个 01-demand-to-workflow/01-module-1.mdx
const slug = ['01-demand-to-workflow', '01-module-1'];
const post = getPostBySlug(slug);
if (post) {
    console.log(`Found post: ${post.title}`);
    console.log(`Content length: ${post.content.length}`);
} else {
    console.log('Post not found');
}

console.log('\n--- Testing getPostBySlug for a directory item ---');
const dirSlug = ['00-guide'];
const dirPost = getPostBySlug(dirSlug);
if (dirPost) {
    console.log(`Found dir post: ${dirPost.title}`);
} else {
    console.log('Dir post not found');
}
