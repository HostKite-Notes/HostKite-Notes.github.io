import type {DefaultTheme} from "vitepress";
import * as fs from "node:fs"
import * as path from 'node:path';
import {Constants} from "../constants";
import {formatNoteName, resolveSidebarInfo} from "./util";

interface FileInfo {
    fileName: string
    noteName: string
    isDirectory: boolean
}

function getFileInfos(filePath: string) {
    const getCompareKey = (fileInfo: FileInfo) => fileInfo.isDirectory ? -1 : 1
    return fs.readdirSync(filePath)
        .filter(fileName => fileName !== 'index.md' && !fileName.includes('@'))
        .map(fileName => {
            const stat = fs.lstatSync(path.join(filePath, fileName))
            return {
                fileName: fileName,
                noteName: fileName.replace(/\.md$/, '').trim(),
                isDirectory: stat.isDirectory(),
            }
        })
        .sort((file1, file2) => getCompareKey(file1) - getCompareKey(file2));
}

function getSidaBarItem(filePath: string) {
    return getFileInfos(filePath).map(fileInfo => {
        const item: DefaultTheme.SidebarItem = {}
        const fullPath = path.join(filePath, fileInfo.fileName)
        if (fileInfo.isDirectory) {
            item.text = `📘 ${fileInfo.noteName}`
            item.collapsed = false
            item.items = getSidaBarItem(fullPath)
        } else {
            item.text = `📝 ${fileInfo.noteName}`
            item.link = `/${path.relative(path.join(Constants.ROOT_PATH, Constants.POSTS_PATH), fullPath).replace(/\\/g, '/')}`
        }
        return item
    })
}


function resolveSortMap(sidebarConf: string[]) {
    const map = new Map<string, string[]>

    const configs = sidebarConf.map(conf => resolveSidebarInfo(conf))
    let currSeq = -1
    const stack = []
    for (let config of configs) {
        const isNotEmpty = stack.length
        if (currSeq < config.seq) {
            stack.push(config.name)
        } else if (currSeq === config.seq) {
            stack.pop()
            stack.push(config.name)
        } else {
            const count = (currSeq - config.seq)
            for (let i = 0; i < count; i++) {
                stack.pop()
            }
        }
        currSeq = config.seq
        if (!isNotEmpty) continue
        const path = stack.slice(0, -1).join('::')
        const titles = map.get(path) ?? [];
        titles.push(config.name)
        map.set(path, titles)
    }
    return map
}

function sortBySidebarConf(sidebars: DefaultTheme.SidebarMulti[keyof DefaultTheme.SidebarMulti], sortMap: Map<string, string[]>, path: string) {
    const getCompareKey = (o: DefaultTheme.SidebarItem, path: string, sortMap: Map<string, string[]>) => {
        const noteName = formatNoteName(o.text)
        let sortSeq = Infinity
        const sortArray = sortMap.get(path)
        if (sortArray) {
            const index = sortArray.indexOf(noteName)
            sortSeq = index < 0 ? Infinity : index
        }
        return sortSeq;
    }

    if (Array.isArray(sidebars)) {
        sidebars.sort((o1, o2) => getCompareKey(o1, path, sortMap) - getCompareKey(o2, path, sortMap))
        for (let sidebar of sidebars) {
            if (!sidebar.items) continue
            sortBySidebarConf(sidebar.items, sortMap, `${path}::${formatNoteName(sidebar.text)}`)
        }
    }

}

function resolveSidebarConf(sidebars: DefaultTheme.SidebarMulti[keyof DefaultTheme.SidebarMulti], deep: number) {
    let result = []
    if (Array.isArray(sidebars)) {
        for (let sidebar of sidebars) {
            const noteName = formatNoteName(sidebar.text)
            result.push(`${' '.repeat((deep - 1) * 4)}${deep}. ${noteName}`)
            if (!sidebar.items) continue
            result.push(resolveSidebarConf(sidebar.items, deep + 1))
        }
    }

    return result.join('\n')
}

function rewriteSidebarConf(sidebars: DefaultTheme.SidebarMulti[keyof DefaultTheme.SidebarMulti], fullPath: string) {
    const result = resolveSidebarConf(sidebars, 1)
    fs.writeFileSync(fullPath, result, 'utf-8')
}


export const getSideBar = () => {
    const sidebar: DefaultTheme.SidebarMulti = {}
    const srcDirPath = path.join(Constants.ROOT_PATH, Constants.POSTS_PATH);
    for (let fileName of fs.readdirSync(srcDirPath)) {
        const filePath = path.join(srcDirPath, fileName);
        const stat = fs.lstatSync(filePath)
        if (stat.isFile() || fileName.includes('@')) continue
        sidebar[`/${fileName}/`] = getSidaBarItem(filePath)
    }

    for (let sidebarKey in sidebar) {
        const fileName = formatNoteName(sidebarKey)
        const fullPath = path.join(Constants.ROOT_PATH, Constants.SIDEBAR_PATH, `${fileName}.conf`)
        if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, '', 'utf-8')
        }
        const fileContent = fs
            .readFileSync(fullPath, 'utf-8')
            .split('\n')
            .map(line => line.replace("\r", "").trim())
            .filter(line => line !== '' && /^[1-9]+\./.test(line))
        fileContent.unshift('0.')
        sortBySidebarConf(sidebar[sidebarKey], resolveSortMap(fileContent), '')
        rewriteSidebarConf(sidebar[sidebarKey], fullPath)
    }
    return sidebar
}