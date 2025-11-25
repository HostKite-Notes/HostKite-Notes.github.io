import path from "node:path";

export const Constants = {
    ROOT_PATH: process.cwd(),
    OUT_PATH: 'dist',
    POSTS_PATH: 'posts',
    SIDEBAR_PATH: path.join('.vitepress', 'sidebar'),
} as const