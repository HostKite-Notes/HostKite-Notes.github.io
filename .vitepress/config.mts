import {defineConfig, UserConfig} from 'vitepress'
import {defineTeekConfig} from "vitepress-theme-teek/config";
import {getSideBar} from "./config/sidebar";
import {getNav} from "./config/nav";
import {Constants} from "./constants";
import llmstxt from "vitepress-plugin-llms";
import path from "node:path";
import fs from "node:fs";
import {pagefindPlugin} from "vitepress-plugin-pagefind";

// Teek 主题配置
const teekConfig = defineTeekConfig({
    teekTheme: true,
    teekHome: false, // 是否开启博客首页
    vpHome: false, // 是否隐藏 VP 首页 rr
    loading: false,
    sidebarTrigger: true, // 是否开启侧边栏折叠功能\
    author: {name: "Ylliu", link: "https://github.com/HostKite"},
    description: "个人笔记网站",
    codeBlock: {
        copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
    },
    articleShare: {enabled: true},
    vitePlugins: {
        sidebar: false, // 是否启用 sidebar 插件
        permalink: false, // 是否启用 permalink 插件
        mdH1: false, // 是否启用 mdH1 插件
        autoFrontmatter: false, // 是否启用 autoFrontmatter 插件
        docAnalysis: true, // 是否启用 docAnalysis 插件
    },
    toComment: {
        enabled: false, // 是否启动滚动到评论区功能
    },
    articleUpdate: {
        enabled: false
    }
});

// https://vitepress.dev/reference/site-config
export default defineConfig(() => {
    const notesPath = path.join(Constants.ROOT_PATH, Constants.POSTS_PATH)
    if (!fs.existsSync(notesPath)) {
        fs.mkdirSync(notesPath, {recursive: true});
    }

    const srcPath = path.join(Constants.ROOT_PATH, Constants.POSTS_PATH)
    if (!fs.existsSync(srcPath)) {
        fs.mkdirSync(srcPath, {recursive: true});
    }

    const sidebarConfPath = path.join(Constants.ROOT_PATH, Constants.SIDEBAR_PATH)
    if (!fs.existsSync(sidebarConfPath)) {
        fs.mkdirSync(sidebarConfPath, {recursive: true});
    }
    return {
        srcDir: Constants.POSTS_PATH,
        outDir: Constants.OUT_PATH,
        extends: teekConfig,
        title: "HostKite-Notes",
        description: "个人笔记网站",
        markdown: {
            breaks: true,
            lineNumbers: true,
            image: {
                // 默认禁用；设置为 true 可为所有图片启用懒加载。
                lazyLoading: true,
            },
            container: {
                tipLabel: "提示",
                warningLabel: "警告",
                dangerLabel: "危险",
                infoLabel: "信息",
                detailsLabel: "详细信息",
            },
        },
        themeConfig: {
            logo: {src: '/avatar.svg', width: 24, height: 24},
            outline: {
                level: [2, 4],
                label: "本页导航",
            },
            docFooter: {
                prev: "上一页",
                next: "下一页",
            },
            sidebar: getSideBar(),
            nav: getNav(),
            socialLinks: [
                {icon: 'github', link: 'https://github.com/HostKite-Notes/HostKite-Notes.github.io'}
            ],
        },
        vite: {
            publicDir: "../public",
            plugins: [
                llmstxt(),
                pagefindPlugin({
                    btnPlaceholder: '搜索',
                    placeholder: '搜索文档',
                    emptyText: '空空如也',
                    heading: '共: {{searchResult}} 条结果',
                })
            ],
        },
    } satisfies UserConfig<DefaultTheme.Config>
})
